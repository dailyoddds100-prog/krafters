import React from "react";
import { ProjectFormData } from "../../../types";
import { TIMELINE_OPTIONS, PREVIOUS_WEBSITE_REASONS, HEARD_FROM_OPTIONS, SITE_CONFIG } from "../../../data/siteConfig";
import { Clock, History, Share2, MessageSquare, AlertCircle } from "lucide-react";

interface ProjectDetailsStepProps {
  data: ProjectFormData;
  updateData: (fields: Partial<ProjectFormData>) => void;
  errors: Record<string, string>;
}

export const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({ data, updateData, errors }) => {
  return (
    <div className="space-y-8 animate-fadeIn" id="step-details">
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Almost there
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          A few final questions to make sure your website launch timeline and expectations are seamlessly met.
        </p>
      </div>

      {/* Delivery Timeline Preference */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-neutral-800">
            When would you like your website completed? <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-neutral-400">Select preferred timeline</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {TIMELINE_OPTIONS.map((time) => {
            const isSelected = data.timelinePreference === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => updateData({ timelinePreference: time })}
                className={`p-3 text-center rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                  isSelected
                    ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>

        {/* 5-7 Day Delivery Disclaimer */}
        <div className="mt-3 p-3.5 bg-blue-50/80 rounded-xl border border-blue-200/70 flex items-center space-x-2.5 text-xs text-blue-900">
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Standard Turnaround:</strong> 5–7 days after all required content, information, and brand assets have been received.
          </span>
        </div>
      </div>

      {/* Previous Website History */}
      <div className="p-5 bg-neutral-50/80 rounded-2xl border border-neutral-200">
        <label className="block text-sm font-semibold text-neutral-900 mb-3">
          Have you had a website for this business before?
        </label>

        <div className="grid grid-cols-2 gap-4 max-w-xs">
          <button
            type="button"
            onClick={() => updateData({ hadWebsiteBefore: "yes" })}
            className={`py-2.5 px-4 rounded-xl text-center border-2 text-xs sm:text-sm font-bold transition-all ${
              data.hadWebsiteBefore === "yes"
                ? "bg-blue-50 border-blue-600 text-blue-900 shadow-xs"
                : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
            }`}
          >
            YES
          </button>
          <button
            type="button"
            onClick={() => updateData({ hadWebsiteBefore: "no", previousWebsiteReason: "" })}
            className={`py-2.5 px-4 rounded-xl text-center border-2 text-xs sm:text-sm font-bold transition-all ${
              data.hadWebsiteBefore === "no"
                ? "bg-neutral-900 border-neutral-900 text-white shadow-xs"
                : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
            }`}
          >
            NO
          </button>
        </div>

        {data.hadWebsiteBefore === "yes" && (
          <div className="mt-4 space-y-2 animate-fadeIn">
            <label className="block text-xs font-semibold text-neutral-800">
              What happened to your previous website?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PREVIOUS_WEBSITE_REASONS.map((reason) => {
                const isSelected = data.previousWebsiteReason === reason;
                return (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => updateData({ previousWebsiteReason: reason })}
                    className={`p-2 rounded-lg text-left text-xs font-medium border transition-all ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                        : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {reason}
                  </button>
                );
              })}
            </div>

            {data.previousWebsiteReason === "Other" && (
              <input
                type="text"
                placeholder="Specify what happened"
                value={data.customPreviousReason}
                onChange={(e) => updateData({ customPreviousReason: e.target.value })}
                className="w-full px-3 py-2 bg-white rounded-lg border border-neutral-300 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden mt-2"
              />
            )}
          </div>
        )}
      </div>

      {/* How Did You Hear About Us? */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-neutral-800">
            How did you hear about this ₦75,000 offer?
          </label>
          <span className="text-xs text-neutral-400">Select source</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {HEARD_FROM_OPTIONS.map((source) => {
            const isSelected = data.heardFrom === source;
            return (
              <button
                key={source}
                type="button"
                onClick={() => updateData({ heardFrom: source })}
                className={`p-2.5 text-center rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                  isSelected
                    ? "bg-neutral-900 border-neutral-900 text-white shadow-xs"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {source}
              </button>
            );
          })}
        </div>

        {data.heardFrom === "Other" && (
          <div className="mt-3 animate-fadeIn">
            <input
              type="text"
              placeholder="Tell us where you saw the promo"
              value={data.customHeardFrom}
              onChange={(e) => updateData({ customHeardFrom: e.target.value })}
              className="w-full px-4 py-2 bg-white rounded-xl border border-neutral-300 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        )}
      </div>

      {/* Anything else? */}
      <div>
        <label className="block text-sm font-semibold text-neutral-800 mb-1.5" htmlFor="additionalNotes">
          Anything else we should know before starting? (Optional)
        </label>
        <textarea
          id="additionalNotes"
          rows={3}
          placeholder="Any special ideas, specific competitor examples, integrations, or questions you'd like us to review..."
          value={data.additionalNotes}
          onChange={(e) => updateData({ additionalNotes: e.target.value })}
          className="w-full p-3.5 bg-white rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};
