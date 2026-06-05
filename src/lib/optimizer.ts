import { Availability, ServiceMeta, Suggestion } from "./types";
import { STORES, getStore, distanceKm, SERVICES } from "./stores";
import { STAFF, helpersForStore } from "./staff";
import {
  DATES,
  dayLoadFor,
  openSlots,
  staffCountFor,
  utilization,
} from "./schedule";
import { Area, ServiceType } from "./types";

/**
 * AI最適化エンジン（ルールベース）。
 * 神戸マツダの複数店舗ネットワークを横断して
 *  1) 午前偏重の是正  2) 近隣店舗への振り分け  3) スタッフの応援配置
 * を自動で提案します。
 */

/** エリアの代表座標（おでかけ先の指定に使用） */
export const AREA_CENTERS: Record<Area, { lat: number; lng: number }> = {
  神戸: { lat: 34.69, lng: 135.195 },
  阪神: { lat: 34.71, lng: 135.38 },
  東播磨: { lat: 34.7, lng: 134.89 },
  西播磨: { lat: 34.79, lng: 134.69 },
  北播磨: { lat: 34.92, lng: 134.99 },
  丹波: { lat: 35.17, lng: 135.13 },
};

export const AREA_LIST = Object.keys(AREA_CENTERS) as Area[];

/**
 * 「お出かけ先で点検」レコメンド。
 * 目的地エリアと希望日から、空きのある店舗を
 * 近さ・午後の空き・全体の空きでスコアリングして並べます。
 */
export function recommendStores(params: {
  destinationArea: Area;
  date: string;
  service: ServiceType;
}): Availability[] {
  const { destinationArea, date, service } = params;
  const center = AREA_CENTERS[destinationArea];
  const meta: ServiceMeta = SERVICES[service];

  const results: Availability[] = STORES.map((store) => {
    const open = openSlots(store.id, date);
    const dist = distanceKm(center, store);
    const reasons: string[] = [];

    // 近さスコア（0-45）: 同一エリアや近距離を高評価
    const proximity = Math.max(0, 45 - dist * 0.9);
    if (store.area === destinationArea) {
      reasons.push(`おでかけ先「${destinationArea}」エリアの店舗です`);
    } else if (dist <= 15) {
      reasons.push(`目的地から約${dist}kmと近め`);
    }

    // 午後の空きスコア（0-35）: 午後を強く推して午前偏重を是正
    const pmScore = Math.min(35, open.pm * 7);
    if (open.pm >= 3) {
      reasons.push(`午後に${open.pm}枠の空きあり（待ち時間が少なめ）`);
    }

    // 全体の空きスコア（0-20）
    const amScore = Math.min(20, open.am * 3);

    // スタッフが十分かどうかの軽い加点
    const staff = staffCountFor(store.id, date);
    const staffOk = staff >= meta.staffNeeded ? 5 : 0;
    if (staff >= meta.staffNeeded && service === "車検") {
      reasons.push("車検対応の整備士が在籍");
    }

    const score = Math.round(
      Math.min(100, proximity + pmScore + amScore + staffOk),
    );

    return {
      store,
      date,
      amOpen: open.am,
      pmOpen: open.pm,
      score,
      reasons,
      distanceKm: dist,
    };
  })
    // 空きが全くない店舗は除外
    .filter((r) => r.amOpen + r.pmOpen > 0)
    .sort((a, b) => b.score - a.score);

  return results;
}

const AM_OVER = 0.85; // 午前がこの稼働率を超えたら逼迫
const PM_LOW = 0.45; // 午後がこの稼働率を下回ったら空き過多

/**
 * 午前偏重の店舗・日を検出し、午後への誘導を提案。
 */
export function afternoonShiftSuggestions(dates = DATES): Suggestion[] {
  const out: Suggestion[] = [];
  for (const store of STORES) {
    for (const date of dates) {
      const load = dayLoadFor(store.id, date);
      const u = utilization(load);
      if (u.am >= AM_OVER && u.pm <= PM_LOW) {
        const pmOpen = load.pmCapacity - load.pmBooked;
        const severity = Math.round((u.am - u.pm) * 100);
        out.push({
          kind: "afternoon-shift",
          date,
          storeId: store.id,
          severity,
          title: `${store.name}：午前が満杯・午後に${pmOpen}台分の空き`,
          detail: `午前稼働 ${(u.am * 100).toFixed(0)}% / 午後稼働 ${(
            u.pm * 100
          ).toFixed(
            0,
          )}%。午前を希望されたお客様に「午後ご来店で待ち時間ほぼゼロ＋洗車サービス」をご案内すると平準化できます。`,
          impact: `午後に${pmOpen}台分の入庫を移せれば1日の稼働ムラを解消`,
        });
      }
    }
  }
  return out.sort((a, b) => b.severity - a.severity);
}

/**
 * 近隣店舗への振り分け提案。
 * ある店舗が逼迫し、近隣(25km以内)に余裕のある店舗があれば案内。
 */
export function crossStoreSuggestions(dates = DATES): Suggestion[] {
  const out: Suggestion[] = [];
  for (const date of dates) {
    for (const store of STORES) {
      const u = utilization(dayLoadFor(store.id, date));
      if (u.total < AM_OVER) continue; // 逼迫していなければ対象外

      // 近隣で空いている店舗を探す
      const alt = STORES.filter((s) => s.id !== store.id)
        .map((s) => ({
          s,
          dist: distanceKm(store, s),
          util: utilization(dayLoadFor(s.id, date)).total,
        }))
        .filter((x) => x.dist <= 25 && x.util < 0.6)
        .sort((a, b) => a.util - b.util)[0];

      if (alt) {
        const altOpen = openSlots(alt.s.id, date);
        out.push({
          kind: "cross-store",
          date,
          storeId: store.id,
          severity: Math.round(u.total * 100),
          title: `${store.name}が混雑 → ${alt.s.name}（約${alt.dist}km）へ振り分け`,
          detail: `${store.name}は稼働 ${(u.total * 100).toFixed(0)}%。約${
            alt.dist
          }kmの${alt.s.name}は稼働 ${(alt.util * 100).toFixed(
            0,
          )}%で余裕あり（本日 午前${altOpen.am}・午後${altOpen.pm}枠）。お出かけ動線上のお客様に${alt.s.name}をご案内できます。`,
          impact: `ネットワーク全体での当日受け入れ台数を最大化`,
        });
      }
    }
  }
  return out.sort((a, b) => b.severity - a.severity);
}

/**
 * スタッフの応援配置提案。
 * 需要(予約台数)に対して人員が不足する店舗へ、
 * 近隣で人員に余裕のある店舗から応援可能なスタッフを提案。
 */
export function staffMoveSuggestions(dates = DATES): Suggestion[] {
  const out: Suggestion[] = [];
  for (const date of dates) {
    // 各店舗の需要(予約台数)と人員
    const stats = STORES.map((store) => {
      const load = dayLoadFor(store.id, date);
      const demand = load.amBooked + load.pmBooked;
      const staff = load.staffCount;
      // 1人あたり処理可能台数の目安を6台とする
      const need = Math.ceil(demand / 6);
      return { store, demand, staff, need, gap: need - staff };
    });

    const short = stats.filter((s) => s.gap >= 1).sort((a, b) => b.gap - a.gap);
    const spare = stats.filter((s) => s.gap <= -1);

    for (const target of short) {
      // この店舗に応援に来られるスタッフのうち、余裕のある店舗所属の人を探す
      const helpers = helpersForStore(target.store.id).filter((h) =>
        spare.some((sp) => sp.store.id === h.homeStoreId),
      );
      if (helpers.length === 0) continue;
      const helper = helpers[0];
      const from = getStore(helper.homeStoreId)!;
      const dist = distanceKm(from, target.store);
      out.push({
        kind: "staff-move",
        date,
        storeId: target.store.id,
        severity: 60 + target.gap * 10,
        title: `${target.store.name}が人員不足 → ${from.name}から${helper.name}を応援`,
        detail: `${target.store.name}は本日${target.demand}台の入庫予定に対し整備士${target.staff}名で約${target.gap}名不足。手すきの${from.name}（約${dist}km）から${helper.grade}・${helper.name}さん（${helper.skills.join(
          "・",
        )}）の応援で解消できます。`,
        impact: `応援1名で約6台分の処理能力を補強`,
      });
    }
  }
  return out.sort((a, b) => b.severity - a.severity);
}

/** すべての提案をまとめて重要度順に返す */
export function allSuggestions(dates = DATES): Suggestion[] {
  return [
    ...afternoonShiftSuggestions(dates),
    ...crossStoreSuggestions(dates),
    ...staffMoveSuggestions(dates),
  ].sort((a, b) => b.severity - a.severity);
}

/** ネットワーク全体のサマリー指標 */
export function networkSummary(dates = DATES) {
  let amBooked = 0,
    amCap = 0,
    pmBooked = 0,
    pmCap = 0;
  for (const store of STORES) {
    for (const date of dates) {
      const l = dayLoadFor(store.id, date);
      amBooked += l.amBooked;
      amCap += l.amCapacity;
      pmBooked += l.pmBooked;
      pmCap += l.pmCapacity;
    }
  }
  const amUtil = amCap ? amBooked / amCap : 0;
  const pmUtil = pmCap ? pmBooked / pmCap : 0;
  return {
    amUtil,
    pmUtil,
    amBooked,
    pmBooked,
    totalOpen: amCap - amBooked + (pmCap - pmBooked),
    imbalance: amUtil - pmUtil,
    staffTotal: STAFF.length,
    storeCount: STORES.length,
  };
}
