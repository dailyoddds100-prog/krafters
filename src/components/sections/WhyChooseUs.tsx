import React from "react";
import { Sparkles, Smartphone, Clock, PackageCheck, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "../../data/siteConfig";

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: "Professional Design",
      desc: "Your website is designed around your business rather than using a generic template. We craft bespoke typography, layouts, and brand identity styling that build immediate trust.",
      icon: Sparkles,
      tag: "Bespoke & Clean",
    },
    {
      title: "Mobile First",
      desc: "Over 80% of your customers visit from smartphones. Your website will render seamlessly with rapid touch menus, readable text, and effortless WhatsApp chat buttons.",
      icon: Smartphone,
      tag: "100% Smartphone Ready",
    },
    {
      title: "Fast Delivery",
      desc: "Get your website online in 5–7 days once all required content is provided. We follow an efficient development pipeline without unnecessary delays or idle waiting.",
      icon: Clock,
      tag: "5–7 Days Launch",
    },
    {
      title: "Everything Included",
      desc: "Domain and hosting are included in the ₦75,000 promotional package. No confusing server hosting fees, no domain registration markup, and zero hidden costs.",
      icon: PackageCheck,
      tag: "Zero Hidden Costs",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 sm:py-28 bg-white border-y border-neutral-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Why Choose Krafters
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
            Built for Businesses That Want to Look Professional Online
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
            The ₦75,000 package is an intentional promotional offer crafted to deliver agency-grade design, fast loading speeds, and real customer conversions without the exorbitant price tag.
          </p>
        </div>

        {/* 4 Feature Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-neutral-50/70 border border-neutral-200/90 hover:border-blue-400 hover:bg-blue-50/20 transition-all duration-300 group flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 text-xs font-bold shadow-2xs">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center text-xs font-semibold text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 mr-2" />
                  <span>Standard quality standard on every project</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
