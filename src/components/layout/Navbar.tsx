import React, { useState, useEffect } from "react";
import { usePromo } from "../../context/PromoContext";
import { SITE_CONFIG } from "../../data/siteConfig";
import { Sparkles, Menu, X, ArrowRight, ShieldCheck, Zap, Flame } from "lucide-react";
import krafters from "../../img/krafterss.png"

export const Navbar: React.FC = () => {
  const { isPromoActive, priceFormatted, days } = usePromo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-3.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="flex items-center space-x-2 text-left group cursor-pointer focus:outline-hidden"
        >
          <div className="w-9 h-9 flex items-center justify-center group-hover:scale-105">
            <img src={krafters} alt="Krafters logo" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-900 block leading-tight">
              {SITE_CONFIG.brandName}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("offer")}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>{isPromoActive ? "₦75k Offer" : "Package"}</span>
            {isPromoActive && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                {days}d left
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("portfolio")}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Portfolio
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("how-it-works")}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("faq")}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            type="button"
            onClick={() => scrollToSection("project-form")}
            className="inline-flex items-center px-4.5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get My Website — {priceFormatted}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-blue-400" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            type="button"
            onClick={() => scrollToSection("project-form")}
            className="px-3 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-bold"
          >
            {priceFormatted}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-5 space-y-4 animate-fadeIn shadow-xl">
          <div className="flex flex-col space-y-3">
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="text-left text-sm font-semibold text-neutral-800 py-2 border-b border-neutral-100"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("offer")}
              className="text-left text-sm font-semibold text-neutral-800 py-2 border-b border-neutral-100"
            >
              {isPromoActive ? "₦75k Promo Breakdown" : "Website Package Breakdown"}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("portfolio")}
              className="text-left text-sm font-semibold text-neutral-800 py-2 border-b border-neutral-100"
            >
              Portfolio / Built Websites
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className="text-left text-sm font-semibold text-neutral-800 py-2 border-b border-neutral-100"
            >
              How It Works (5–7 Days)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("faq")}
              className="text-left text-sm font-semibold text-neutral-800 py-2 border-b border-neutral-100"
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => scrollToSection("project-form")}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2"
            >
              <span>Start My Website — {priceFormatted}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

