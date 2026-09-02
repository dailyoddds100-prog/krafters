import React from "react";
import { usePromo } from "../../context/PromoContext";
import { Clock, Flame, Sparkles } from "lucide-react";

interface CountdownTimerProps {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light" | "card";
  showLabel?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  size = "md",
  variant = "dark",
  showLabel = true,
}) => {
  const { isPromoActive, days, hours, minutes, seconds, promoEndDateFormatted } = usePromo();

  if (!isPromoActive) {
    return (
      <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold">
        <Clock className="w-3.5 h-3.5 text-neutral-400" />
        <span>Promo has concluded — Regular pricing (₦150,000) is now in effect</span>
      </div>
    );
  }

  const timeUnits = [
    { label: "DAYS", value: days.toString().padStart(2, "0") },
    { label: "HOURS", value: hours.toString().padStart(2, "0") },
    { label: "MINS", value: minutes.toString().padStart(2, "0") },
    { label: "SECS", value: seconds.toString().padStart(2, "0") },
  ];

  if (size === "sm") {
    return (
      <div className="inline-flex items-center space-x-1.5 font-mono text-xs font-bold text-amber-300">
        <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {showLabel && (
        <div className="flex items-center space-x-1.5 mb-2.5 text-xs font-bold uppercase tracking-wider text-amber-500">
          <Flame className="w-3.5 h-3.5 animate-pulse text-amber-500" />
          <span>₦75,000 PROMO EXPIRES IN:</span>
        </div>
      )}

      {/* Digits Grid */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {timeUnits.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <div
              className={`flex flex-col items-center justify-center rounded-xl p-2 sm:p-2.5 min-w-[54px] sm:min-w-[64px] border ${
                variant === "card"
                  ? "bg-neutral-900 border-neutral-700/80 text-white shadow-md"
                  : variant === "light"
                  ? "bg-white border-blue-200 text-neutral-900 shadow-xs"
                  : "bg-neutral-950/90 border-neutral-800 text-white shadow-inner"
              }`}
            >
              <span className="text-xl sm:text-2xl font-black font-mono tracking-tight leading-none text-blue-500">
                {unit.value}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-neutral-400 tracking-wider mt-1 uppercase">
                {unit.label}
              </span>
            </div>

            {idx < timeUnits.length - 1 && (
              <span className="text-lg font-black text-neutral-400 font-mono -mt-3">:</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="text-[11px] text-neutral-500 mt-2 font-medium">
        Valid until <strong className="text-neutral-700 dark:text-neutral-300">{promoEndDateFormatted}</strong> — Afterwards price reverts to <strong>₦150,000</strong>.
      </p>
    </div>
  );
};
