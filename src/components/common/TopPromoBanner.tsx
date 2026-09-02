import React from "react";
import { usePromo } from "../../context/PromoContext";
import { Flame, Clock, ArrowRight, Sparkles } from "lucide-react";

export const TopPromoBanner: React.FC = () => {
  const { isPromoActive, days, hours, minutes, seconds, promoEndDateFormatted } = usePromo();

  const scrollToForm = () => {
    const el = document.getElementById("project-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-gradient-to-r from-neutral-950 via-blue-950 to-neutral-950 text-white border-b border-blue-900/40 py-2 px-3 sm:px-6 relative z-50 text-xs shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
        {/* Left message with active indicator */}
        <div className="flex items-center space-x-2">
          {isPromoActive ? (
            <>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-bold text-amber-300 uppercase tracking-wide text-[11px] sm:text-xs flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline" />
                Special 50% Promo:
              </span>
              <span className="text-neutral-200 hidden md:inline">
                Launch your business website for <strong className="text-white">₦75,000</strong> (Regular: <span className="line-through text-neutral-400">₦150,000</span>)
              </span>
              <span className="text-neutral-200 md:hidden">
                <strong className="text-white">₦75,000</strong> (<span className="line-through text-neutral-400">₦150,000</span>)
              </span>
            </>
          ) : (
            <>
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-semibold text-neutral-300">
                Standard Package: <strong className="text-white">₦150,000 Total</strong> (5–7 Day Turnaround)
              </span>
            </>
          )}
        </div>

        {/* Right Countdown & Action */}
        <div className="flex items-center space-x-3 text-xs">
          {isPromoActive && (
            <div className="flex items-center space-x-1.5 bg-neutral-900/80 px-2.5 py-1 rounded-md border border-neutral-700/60 font-mono text-[11px] text-amber-300">
              <Clock className="w-3 h-3 text-neutral-400" />
              <span>Ends in:</span>
              <strong className="text-white">
                {days}d {hours.toString().padStart(2, "0")}h {minutes.toString().padStart(2, "0")}m {seconds.toString().padStart(2, "0")}s
              </strong>
            </div>
          )}

          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-bold hover:underline cursor-pointer text-[11px] sm:text-xs"
          >
            <span>{isPromoActive ? "Claim ₦75k Offer" : "Start Project"}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
