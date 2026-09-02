import React from "react";
import { ClipboardList, Search, Code, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "../../data/siteConfig";

export const Process: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Tell Us About Your Business",
      desc: "Complete the easy multi-step project form below in just 3 minutes. Select your business type, pages needed, branding preferences, and domain choice.",
      icon: ClipboardList,
      time: "Day 1",
    },
    {
      num: "02",
      title: "Review & 50% Commitment Deposit",
      desc: "We analyze your requirements and verify your domain. We confirm project scope and you make the initial 50% deposit (₦37,500) to start development immediately.",
      icon: Search,
      time: "Day 1–2",
    },
    {
      num: "03",
      title: "We Build Your Website",
      desc: "Custom UI design, typography styling, mobile responsiveness, and feature integration (WhatsApp buttons, forms, maps) are built and rigorously tested.",
      icon: Code,
      time: "Day 2–5",
    },
    {
      num: "04",
      title: "Final Approval & Live Launch",
      desc: "You review the completed website. Upon your 100% satisfaction, the remaining 50% balance (₦37,500) is settled and your site goes live with SSL and 1-year hosting.",
      icon: Rocket,
      time: "Day 5–7",
    },
  ];

  const scrollToForm = () => {
    const el = document.getElementById("project-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-neutral-50/70 border-b border-neutral-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Simple 4-Step Process
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
            How It Works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
            From project intake to official launch in 5–7 days. We have streamlined every stage so you get a world-class website without unnecessary meetings or back-and-forth.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xs hover:border-blue-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Step Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-neutral-300 group-hover:text-blue-600 transition-colors font-mono">
                      {step.num}
                    </span>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                    {step.time}
                  </span>

                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-neutral-500">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mr-1.5 shrink-0" />
                  <span>Step {index + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button & Note */}
        <div className="mt-12 text-center space-y-3">
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Ready to Begin? Start Step 1 Below</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <p className="text-xs text-neutral-400">
            *{SITE_CONFIG.deliveryDisclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
