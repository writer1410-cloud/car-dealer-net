import {
  travelTimesFromAccess,
  accessPrefix,
  formatMinutes,
  TRAVEL_EMOJI,
  TRAVEL_LABEL,
  TravelMode,
} from "@/lib/travel";

const ORDER: TravelMode[] = ["car", "train", "bike", "walk"];

/**
 * 移動手段別のアクセス目安を表示する。
 * access の分数から徒歩・電車・自転車を概算し、車と合わせて4モードで表示。
 * 分数が読み取れない access（例:「周辺の各店」）はそのまま文字表示する。
 */
export function TravelTimes({
  access,
  className = "",
}: {
  access: string;
  className?: string;
}) {
  const times = travelTimesFromAccess(access);

  if (!times) {
    return (
      <p className={`text-xs text-ink/45 ${className}`}>📍 {access}</p>
    );
  }

  const prefix = accessPrefix(access);

  return (
    <div className={className}>
      {prefix && (
        <div className="text-[11px] text-ink/45 mb-1">{prefix}の目安</div>
      )}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink/55">
        {ORDER.map((mode) => (
          <span key={mode} className="inline-flex items-center gap-0.5">
            <span aria-hidden>{TRAVEL_EMOJI[mode]}</span>
            <span className="sr-only">{TRAVEL_LABEL[mode]}</span>
            {formatMinutes(times[mode])}
          </span>
        ))}
      </div>
    </div>
  );
}
