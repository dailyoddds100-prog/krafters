import React from "react";
import { usePromo } from "../../context/PromoContext";
import { SITE_CONFIG } from "../../data/siteConfig";
import { Globe, Server, Smartphone, Laptop, Clock, CheckCircle2, ArrowRight, Flame } from "lucide-react";

export const OfferSection: React.FC = () => {
  const { isPromoActive, priceFormatted, originalPriceFormatted, depositFormatted, promoEndDateFormatted, formattedCountdown } = usePromo();

  const cards = [
    {
      num: "01",
      title: "Professional Website",
      desc: "A modern website designed specifically around your business rather than using a generic template.",
      icon: Laptop,
      color: "from-blue-500/10 to-blue-500/5",
      badge: "Custom Design",
    },
    {
      num: "02",
      title: "Domain Name",
      desc: "Your own professional web address (.com, .com.ng, etc.) included and registered for 1 full year.",
      icon: Globe,
      color: "from-indigo-500/10 to-indigo-500/5",
      badge: "1 Year Free",
    },
    {
      num: "03",
      title: "Web Hosting",
      desc: "High-speed cloud web hosting with 99.9% uptime and SSL certificate encryption for 1 full year.",
      icon: Server,
      color: "from-emerald-500/10 to-emerald-500/5",
      badge: "Fast & Secure",
    },
    {
      num: "04",
      title: "Mobile Responsive",
      desc: "Your website will look great and load seamlessly across smartphones, tablets, laptops and desktops.",
      icon: Smartphone,
      color: "from-violet-500/10 to-violet-500/5",
      badge: "100% Adaptive",
    },
  ];

  const scrollToForm = () => {
    const el = document.getElementById("project-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="offer" className="py-20 sm:py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-800 text-blue-400 text-xs font-bold border border-neutral-700 mb-4">
            {isPromoActive ? (
              <span className="flex items-center gap-1.5 text-amber-400">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                LIMITED 50% PROMO: {priceFormatted} (REGULAR: {originalPriceFormatted})
              </span>
            ) : (
              <span>THE ALL-IN-ONE {priceFormatted} PACKAGE</span>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Everything You Need to Get Online
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {isPromoActive
              ? `Lock in the ${priceFormatted} promotional package before the countdown timer expires and the rate increases to ${originalPriceFormatted}. Everything required to launch is included.`
              : `No unexpected charges, no confusing hosting bills. Everything required to launch your professional online presence is included in one single package.`}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-neutral-800/80 border border-neutral-700/80 hover:border-blue-500/60 hover:bg-neutral-800 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-500 group-hover:text-blue-400 transition-colors font-mono">
                      {card.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-neutral-700/60 border border-neutral-600/60 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-neutral-700/70 text-neutral-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                    {card.badge}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-700/60 flex items-center text-xs text-neutral-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
                  <span>Included in {priceFormatted}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Turnaround Banner & Payment Split */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-950 via-neutral-900 to-neutral-900 border border-blue-800/40 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-xl shrink-0">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Guaranteed Turnaround</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">50% Deposit / 50% on Launch</span>
                {isPromoActive && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                    ⏳ Promo Ends: {formattedCountdown}
                  </span>
                )}
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                {priceFormatted} Total (5–7 Days Delivery)
                {isPromoActive && (
                  <span className="ml-2 text-sm text-neutral-400 line-through font-normal">
                    {originalPriceFormatted}
                  </span>
                )}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                Pay <strong>{depositFormatted} (50%)</strong> to commence domain registration and website design, and the remaining <strong>{depositFormatted} (50%)</strong> balance upon complete project satisfaction.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToForm}
            className="w-full lg:w-auto px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
          >
            <span>Get Started with {depositFormatted} Deposit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

