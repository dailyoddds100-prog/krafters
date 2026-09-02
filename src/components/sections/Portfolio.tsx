import React, { useState } from "react";
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES } from "../../data/portfolioData";
import { PortfolioProject } from "../../types";
import { usePromo } from "../../context/PromoContext";
import { trackEvent } from "../../utils/analytics";
import { ExternalLink, Globe, ArrowRight, Sparkles, Clock, Check, ArrowUpRight } from "lucide-react";

export const Portfolio: React.FC = () => {
  const { priceFormatted } = usePromo();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const scrollToForm = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const el = document.getElementById("project-form-container") || document.getElementById("project-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openLiveProject = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const featuredProject = PORTFOLIO_PROJECTS.find((p) => p.featured) || PORTFOLIO_PROJECTS[0];

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-800">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-800 text-blue-400 text-xs font-bold border border-neutral-700 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROVEN TRACK RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Websites We've Built
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
              Explore live websites Krafters has designed and launched. Click on any project to load and experience the live website in real time.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-6 p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 shrink-0">
            <div>
              <span className="text-2xl font-black text-white block">5–7 Days</span>
              <span className="text-[11px] text-neutral-400 font-medium">Avg Delivery</span>
            </div>
            <div className="w-px h-8 bg-neutral-700" />
            <div>
              <span className="text-2xl font-black text-emerald-400 block">100%</span>
              <span className="text-[11px] text-neutral-400 font-medium">Mobile Optimized</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="my-8 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-neutral-800/90 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-700/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Project Banner (when 'All' is selected) */}
        {selectedCategory === "All" && featuredProject && (
          <div className="mb-12 rounded-3xl bg-gradient-to-b from-neutral-800/90 to-neutral-900 border border-neutral-700/90 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Image Preview in Browser Frame */}
              <div className="lg:col-span-7 p-4 sm:p-6">
                <a
                  href={featuredProject.liveUrl || featuredProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-neutral-700 bg-neutral-950 overflow-hidden group relative cursor-pointer"
                  title={`Open ${featuredProject.title} in new tab`}
                >
                  {/* Browser Bar */}
                  <div className="bg-neutral-900 px-3.5 py-2 border-b border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center space-x-1.5 px-3 py-0.5 rounded bg-neutral-800 text-[11px] font-mono text-neutral-300 truncate max-w-xs group-hover:text-blue-400 transition-colors">
                      <Globe className="w-3 h-3 text-neutral-500 group-hover:text-blue-400 shrink-0" />
                      <span>{featuredProject.url.replace(/^https?:\/\//, "")}</span>
                    </div>
                    <span className="text-[10px] text-blue-400 font-mono flex items-center gap-1 font-bold">
                      VISIT LIVE <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>

                  <div className="relative aspect-video sm:aspect-16/10 overflow-hidden">
                    <img
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Live Website</span>
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-5 p-6 lg:pr-8 space-y-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  Featured Live Website
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {featuredProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {featuredProject.description}
                </p>

                <div className="space-y-2 pt-2">
                  {featuredProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-neutral-300 font-medium">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={featuredProject.liveUrl || featuredProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("portfolio_click", {
                        project_id: featuredProject.id,
                        project_title: featuredProject.title,
                        url: featuredProject.url,
                      })
                    }
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <span>Visit Live Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-bold border border-neutral-700 flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <span>Build Mine — {priceFormatted}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl sm:rounded-3xl bg-neutral-800/70 border border-neutral-700/80 hover:border-blue-500/80 overflow-hidden transition-all duration-300 group flex flex-col justify-between shadow-md hover:shadow-2xl"
            >
              {/* Browser Header inside Card */}
              <div className="bg-neutral-900 px-3.5 py-2.5 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <a
                  href={project.liveUrl || project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-[11px] font-mono text-neutral-400 hover:text-blue-400 transition-colors truncate max-w-[170px]"
                >
                  <Globe className="w-3 h-3 text-neutral-500 shrink-0" />
                  <span className="truncate">{project.url.replace(/^https?:\/\//, "")}</span>
                </a>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {project.deliveryDays}
                </span>
              </div>

              {/* Clickable Image Preview -> opens live website */}
              <a
                href={project.liveUrl || project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("portfolio_click", {
                    project_id: project.id,
                    project_title: project.title,
                    url: project.url,
                  })
                }
                className="relative aspect-16/10 overflow-hidden bg-neutral-950 block cursor-pointer"
                title={`Open ${project.title} live website`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-bold">
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-0 bg-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg flex items-center space-x-1.5 transform group-hover:scale-100 scale-95 transition-transform">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Live Website</span>
                  </span>
                </div>
              </a>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={project.liveUrl || project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("portfolio_click", {
                          project_id: project.id,
                          project_title: project.title,
                          url: project.url,
                        })
                      }
                      className="text-lg font-bold text-white hover:text-blue-400 transition-colors flex items-center gap-1.5 group/link"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover/link:text-blue-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                    </a>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-700/60 flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-blue-400 mr-0.5" />
                    <span>Built in {project.deliveryDays}</span>
                  </div>

                  <a
                    href={project.liveUrl || project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("portfolio_click", {
                        project_id: project.id,
                        project_title: project.title,
                        url: project.url,
                      })
                    }
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
