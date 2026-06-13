import Image from "next/image";
import Link from "next/link";
import { RentalPlan, planPhoto, formatYen } from "@/lib/rentacar";
import { getStore } from "@/lib/stores";
import { Badge, Card } from "@/components/ui";

export function PlanCard({ plan }: { plan: RentalPlan }) {
  const store = getStore(plan.fromStoreId);
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative h-48">
        <Image
          src={planPhoto(plan, 800, 500)}
          alt={plan.name}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="photo-overlay absolute inset-0" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge tone={plan.type === "日帰り" ? "sea" : "harbor"}>
            {plan.type}
          </Badge>
          {plan.badge && <Badge tone="accent">{plan.badge}</Badge>}
        </div>
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="text-xs text-white/80">{plan.area}エリア</p>
          <h3 className="text-lg font-black leading-snug">{plan.name}</h3>
          {plan.subtitleEn && (
            <p className="text-[11px] text-white/70 mt-0.5">{plan.subtitleEn}</p>
          )}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-sm text-ink/70">{plan.catch}</p>

        {plan.langs && (
          <div className="mt-2 flex flex-wrap gap-1">
            {plan.langs.map((l) => (
              <span
                key={l}
                className="rounded bg-sea-light text-sea-dark px-1.5 py-0.5 text-[11px] font-bold"
              >
                {l}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-end gap-1">
          <span className="text-2xl font-black text-accent">
            {formatYen(plan.price)}
          </span>
          <span className="text-xs text-ink/50 mb-1">{plan.priceNote}</span>
        </div>
        <p className="text-xs text-ink/50">車種：{plan.carClass}</p>

        <div className="mt-4">
          <p className="text-xs font-bold text-ink/50 mb-1">プランに含まれるもの</p>
          <ul className="space-y-1">
            {plan.includes.map((inc) => (
              <li
                key={inc}
                className="text-sm text-ink/75 flex items-start gap-1.5"
              >
                <span className="text-mountain mt-0.5 shrink-0">✓</span>
                {inc}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold text-ink/50 mb-1">めぐれるスポット</p>
          <div className="flex flex-wrap gap-1.5">
            {plan.spots.map((s) => (
              <span
                key={s}
                className="rounded-full bg-mist px-2.5 py-1 text-xs text-ink/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button className="flex-1 rounded-xl bg-accent text-white font-bold px-4 py-2.5 hover:bg-accent-dark transition">
            このプランを予約（デモ）
          </button>
          {store && (
            <Link
              href={`/stores/${store.id}`}
              className="rounded-xl border border-mist font-bold px-4 py-2.5 hover:bg-mist transition whitespace-nowrap"
            >
              出発店舗
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
