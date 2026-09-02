import React, { useState } from "react";
import { usePromo } from "../../context/PromoContext";
import { FAQS, SITE_CONFIG } from "../../data/siteConfig";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

export const FAQ: React.FC = () => {
  const { isPromoActive, priceFormatted, originalPriceFormatted } = usePromo();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white border-t border-neutral-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Clear, straightforward answers about our {priceFormatted} website package.
          </p>
        </div>

        {/* Accordions */}
        <div className="mt-12 space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-neutral-50/80 border-blue-500/60 shadow-xs ring-1 ring-blue-500/20"
                    : "bg-white border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className="text-base sm:text-lg font-bold text-neutral-900">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "bg-blue-600 text-white rotate-180" : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-neutral-600 leading-relaxed animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions WhatsApp helper */}
        <div className="mt-10 p-5 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs sm:text-sm text-blue-950">
            <span className="font-bold block">Still have a specific question about your website?</span>
            Chat directly with our lead developer on WhatsApp.
          </div>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              `Hi, I have a question about the ${priceFormatted} website package.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4 mr-1.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

