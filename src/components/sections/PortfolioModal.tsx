import React from "react";
import { PortfolioProject } from "../../types";
import { X, ExternalLink, Globe, Check, Clock, Layers, ArrowRight, ShieldCheck } from "lucide-react";

interface PortfolioModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onSelectPromo: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose, onSelectPromo }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Browser Mockup Header in Modal */}
        <div className="bg-neutral-900 p-4 rounded-t-3xl border-b border-neutral-800 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="px-4 py-1 rounded-md bg-neutral-800 text-xs font-mono text-neutral-300 max-w-xs truncate border border-neutral-700">
            {project.url}
          </div>
          <span className="text-[11px] font-semibold text-emerald-400">Delivered in {project.deliveryDays}</span>
        </div>

        {/* Project Image View */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md text-white text-xs font-bold shadow-md">
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Info & Highlights */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
            <div>
              <h3 className="text-2xl font-black text-neutral-900">{project.title}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Built with custom responsive architecture • {project.pagesCount} Essential Pages
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-bold">
                {project.deliveryDays} Turnaround
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Project Overview
            </h4>
            <p className="text-sm text-neutral-700 leading-relaxed">{project.description}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Key Features Built
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs font-medium text-neutral-800 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/80">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 text-xs font-medium">
                #{t}
              </span>
            ))}
          </div>

          {/* CTA Footer in Modal */}
          <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left text-xs text-neutral-500">
              <span className="font-bold text-neutral-900 block text-sm">Want a similar website for your business?</span>
              Get it built in 5–7 days for ₦75,000 all-inclusive.
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectPromo();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Build My Website — ₦75k</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
