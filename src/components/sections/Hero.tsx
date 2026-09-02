import React from "react";
import { usePromo } from "../../context/PromoContext";
import { SITE_CONFIG } from "../../data/siteConfig";
import { CountdownTimer } from "../common/CountdownTimer";
import { CheckCircle, Sparkles, Clock, Smartphone, Globe, ShieldCheck, ArrowDown, Lock, Flame } from "lucide-react";

export const Hero: React.FC = () => {
  const { isPromoActive, priceFormatted, originalPriceFormatted, promoEndDateFormatted } = usePromo();

  const scrollToForm = () => {
    const el = document.getElementById("project-form-container");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="relative pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden">
      {/* Background Subtle Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 -z-10" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-100/60 via-indigo-50/50 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Main Headline with Dynamic Strikethrough & Promo Tag */}
          {isPromoActive && (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/90 text-amber-900 text-xs font-bold shadow-2xs mb-4 animate-fadeIn">
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
              <span className="tracking-wide uppercase">LIMITED PROMOTIONAL OFFER • SAVE 50%</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.15]">
            Get a Professional Website for{" "}
            <span className="text-blue-600 relative inline-block whitespace-nowrap">
              {priceFormatted}
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-blue-300 -z-10"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
            {isPromoActive && (
              <span className="block sm:inline sm:ml-3 text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-400 line-through">
                {originalPriceFormatted}
              </span>
            )}
          </h1>

          {/* Subheading focused on Meta Ads audience */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Your business deserves more than just a social media page. We design, build, and launch a custom, high-converting website with domain & hosting — delivered in <strong>5–7 days</strong>.
          </p>

          {/* Live Countdown Timer Module */}
          {isPromoActive && (
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border border-blue-100 shadow-md max-w-lg mx-auto animate-fadeIn">
              <CountdownTimer size="md" variant="card" showLabel={true} />
            </div>
          )}

          {/* Value Proposition Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-neutral-800">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Domain Included (1 Year)</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Fast Cloud Hosting (1 Year)</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Ready in 5–7 Days</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <Smartphone className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Mobile & WhatsApp Ready</span>
            </div>
          </div>

          {/* Direct Form Instruction Callout */}
          <div className="mt-8 p-4 rounded-2xl bg-neutral-900 text-white shadow-xl max-w-xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                ✍️
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                  Fill out the 2-minute project intake below
                </p>
                <p className="text-[11px] text-neutral-300">
                  {isPromoActive
                    ? `Lock in the ${priceFormatted} rate before the countdown ends.`
                    : "We'll start building your website immediately without endless back-and-forth."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={scrollToForm}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shrink-0"
              title="Jump to form"
            >
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>

          <p className="mt-3 text-[11px] text-neutral-400">
            *{SITE_CONFIG.deliveryDisclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};

