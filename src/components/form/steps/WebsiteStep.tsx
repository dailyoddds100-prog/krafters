import React from "react";
import { ProjectFormData } from "../../../types";
import { WEBSITE_PURPOSES, PAGE_OPTIONS, FEATURE_OPTIONS } from "../../../data/siteConfig";
import { Check, Globe, Link2, Sparkles, Layout, Layers, ShieldCheck, ShoppingBag, Calendar, Briefcase, Users, TrendingUp, Info, PlusCircle } from "lucide-react";

interface WebsiteStepProps {
  data: ProjectFormData;
  updateData: (fields: Partial<ProjectFormData>) => void;
  errors: Record<string, string>;
}

export const WebsiteStep: React.FC<WebsiteStepProps> = ({ data, updateData, errors }) => {
  const togglePurpose = (purposeLabel: string) => {
    const exists = data.purposes.includes(purposeLabel);
    if (exists) {
      updateData({ purposes: data.purposes.filter((p) => p !== purposeLabel) });
    } else {
      updateData({ purposes: [...data.purposes, purposeLabel] });
    }
  };

  const togglePage = (pageName: string) => {
    const exists = data.pages.includes(pageName);
    if (exists) {
      updateData({ pages: data.pages.filter((p) => p !== pageName) });
    } else {
      updateData({ pages: [...data.pages, pageName] });
    }
  };

  const toggleFeature = (featureName: string) => {
    const exists = data.features.includes(featureName);
    if (exists) {
      updateData({ features: data.features.filter((f) => f !== featureName) });
    } else {
      updateData({ features: [...data.features, featureName] });
    }
  };

  const updateReference = (index: number, key: "url" | "note", value: string) => {
    const updated = [...data.referenceWebsites];
    updated[index] = { ...updated[index], [key]: value };
    updateData({ referenceWebsites: updated });
  };

  const renderPurposeIcon = (iconName: string) => {
    switch (iconName) {
      case "Users": return <Users className="w-4 h-4" />;
      case "TrendingUp": return <TrendingUp className="w-4 h-4" />;
      case "Sparkles": return <Sparkles className="w-4 h-4" />;
      case "ShoppingBag": return <ShoppingBag className="w-4 h-4" />;
      case "Calendar": return <Calendar className="w-4 h-4" />;
      case "Briefcase": return <Briefcase className="w-4 h-4" />;
      case "ShieldCheck": return <ShieldCheck className="w-4 h-4" />;
      case "Info": return <Info className="w-4 h-4" />;
      case "Globe": return <Globe className="w-4 h-4" />;
      default: return <PlusCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="step-website">
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
          What should your website do?
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          Select the goals, pages, and features you want included in your website build.
        </p>
      </div>

      {/* Main Purpose */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-neutral-800">
            What is the main purpose of your website? <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-neutral-400">Select all that apply</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2.5">
          {WEBSITE_PURPOSES.map((item) => {
            const isSelected = data.purposes.includes(item.label);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => togglePurpose(item.label)}
                className={`p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                  isSelected
                    ? "bg-blue-50/90 border-blue-600 text-blue-900 shadow-xs ring-1 ring-blue-500"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className={isSelected ? "text-blue-600" : "text-neutral-400"}>
                    {renderPurposeIcon(item.icon)}
                  </span>
                  <span>{item.label}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>

        {data.purposes.includes("Other") && (
          <div className="mt-3 animate-fadeIn">
            <input
              type="text"
              placeholder="Specify your other main objective"
              value={data.customPurpose}
              onChange={(e) => updateData({ customPurpose: e.target.value })}
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        )}
        {errors.purposes && <p className="text-xs text-red-500 mt-1.5">{errors.purposes}</p>}
      </div>

      {/* Pages Needed */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-neutral-800">
            Which pages do you need? <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-neutral-400">Choose all pages</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {PAGE_OPTIONS.map((page) => {
            const isSelected = data.pages.includes(page);
            return (
              <button
                key={page}
                type="button"
                onClick={() => togglePage(page)}
                className={`p-2.5 text-center rounded-xl text-xs sm:text-sm font-medium transition-all border flex items-center justify-center space-x-1.5 ${
                  isSelected
                    ? "bg-neutral-900 border-neutral-900 text-white shadow-xs"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{page}</span>
              </button>
            );
          })}
        </div>

        {data.pages.includes("Other") && (
          <div className="mt-3 animate-fadeIn">
            <input
              type="text"
              placeholder="List any extra custom pages you need (e.g. Careers, Press, Volunteer)"
              value={data.customPage}
              onChange={(e) => updateData({ customPage: e.target.value })}
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        )}
        {errors.pages && <p className="text-xs text-red-500 mt-1.5">{errors.pages}</p>}
      </div>

      {/* Features Needed */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-neutral-800">
            Which features do you need?
          </label>
          <span className="text-xs text-neutral-400">Select any extra functionality</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {FEATURE_OPTIONS.map((feature) => {
            const isSelected = data.features.includes(feature);
            return (
              <button
                key={feature}
                type="button"
                onClick={() => toggleFeature(feature)}
                className={`p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                  isSelected
                    ? "bg-blue-50 border-blue-600 text-blue-900 shadow-xs ring-1 ring-blue-500"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                <span>{feature}</span>
                {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>

        {data.features.includes("Other") && (
          <div className="mt-3 animate-fadeIn">
            <input
              type="text"
              placeholder="Describe any other special features needed"
              value={data.customFeature}
              onChange={(e) => updateData({ customFeature: e.target.value })}
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        )}
      </div>

      {/* Reference Websites Toggle */}
      <div className="pt-2 border-t border-neutral-100">
        <label className="block text-sm font-semibold text-neutral-800 mb-2">
          Do you have websites you like or want inspiration from?
        </label>

        <div className="grid grid-cols-2 gap-3 max-w-xs">
          <button
            type="button"
            onClick={() => updateData({ hasReferenceWebsites: "yes" })}
            className={`py-2.5 text-center rounded-xl text-sm font-semibold border transition-all ${
              data.hasReferenceWebsites === "yes"
                ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            Yes, I have examples
          </button>
          <button
            type="button"
            onClick={() => updateData({ hasReferenceWebsites: "no" })}
            className={`py-2.5 text-center rounded-xl text-sm font-semibold border transition-all ${
              data.hasReferenceWebsites === "no"
                ? "bg-neutral-900 border-neutral-900 text-white shadow-xs"
                : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            No, leave it to you
          </button>
        </div>

        {data.hasReferenceWebsites === "yes" && (
          <div className="mt-4 space-y-3 p-4 bg-neutral-50/80 rounded-2xl border border-neutral-200 animate-fadeIn">
            <p className="text-xs font-semibold text-neutral-700">
              Provide up to 3 links & what you like about them:
            </p>
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="relative">
                  <Link2 className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder={`Website ${idx + 1} URL (e.g. apple.com)`}
                    value={data.referenceWebsites[idx]?.url || ""}
                    onChange={(e) => updateReference(idx, "url", e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white rounded-lg border border-neutral-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <input
                  type="text"
                  placeholder="What do you like about it? (e.g. clean layout, colors)"
                  value={data.referenceWebsites[idx]?.note || ""}
                  onChange={(e) => updateReference(idx, "note", e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-neutral-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
