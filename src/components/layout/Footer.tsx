import React from "react";
import { SITE_CONFIG } from "../../data/siteConfig";
import { MessageCircle, Mail, Phone, Globe, ShieldCheck, Heart, ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm">
                K
              </div>
              <span className="font-extrabold text-lg text-white">
                {SITE_CONFIG.brandName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              We design and build bespoke, high-performance websites for ambitious businesses. Delivering clean modern UI, lightning speeds, and real client conversions.
            </p>

            {/* Promo Highlights Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold">
                Professional Websites — {SITE_CONFIG.priceFormatted}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold">
                Domain + Hosting Included
              </span>
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold">
                5–7 Day Delivery
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("hero")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("offer")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ₦75k Offer Breakdown
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("why-choose-us")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("portfolio")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portfolio / Built Websites
                </button>
              </li>
            </ul>
          </div>

          {/* Process & FAQ */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Process & Info
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("how-it-works")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works (4 Steps)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("project-form")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Website Project Form
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo("faq")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  "Hi! I'm interested in the ₦75,000 professional website package."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-emerald-400 hover:underline font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <p className="text-neutral-400 text-xs">
                Direct phone & WhatsApp support available Monday – Saturday.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => scrollTo("project-form")}
                  className="w-full py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors text-center"
                >
                  Start Project Form
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brandName}. All rights reserved. Professional Websites for ₦75,000.
          </p>

          <div className="flex items-center space-x-4">
            <span>5–7 Day Delivery</span>
            <span>•</span>
            <span>Domain & Hosting Included</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
