import React from "react";
import { ProjectFormData } from "../../../types";
import { BUSINESS_TYPES, NIGERIAN_LOCATIONS } from "../../../data/siteConfig";
import { BUSINESS_TYPE_SUGGESTIONS, DEFAULT_BUSINESS_SUGGESTIONS } from "../../../data/businessSuggestions";
import { Building, MapPin, User, Mail, Phone, Sparkles, Check } from "lucide-react";

interface BusinessStepProps {
  data: ProjectFormData;
  updateData: (fields: Partial<ProjectFormData>) => void;
  errors: Record<string, string>;
}

export const BusinessStep: React.FC<BusinessStepProps> = ({ data, updateData, errors }) => {
  const currentSuggestions = data.businessType
    ? BUSINESS_TYPE_SUGGESTIONS[data.businessType] || DEFAULT_BUSINESS_SUGGESTIONS
    : DEFAULT_BUSINESS_SUGGESTIONS;

  const applySuggestion = (suggestionText: string) => {
    updateData({ businessDescription: suggestionText });
  };
  return (
    <div className="space-y-8 animate-fadeIn" id="step-business">
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Let's start with your business
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          Tell us about your brand and how we can reach you to build your website.
        </p>
      </div>

      {/* Primary Contact & Business Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-1.5" htmlFor="businessName">
            Business Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="businessName"
              type="text"
              required
              placeholder="e.g. Apex Global Ventures"
              value={data.businessName}
              onChange={(e) => updateData({ businessName: e.target.value })}
              className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.businessName ? "border-red-400 ring-1 ring-red-200" : "border-neutral-200"
              }`}
            />
          </div>
          {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-1.5" htmlFor="clientName">
            Your Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="clientName"
              type="text"
              required
              placeholder="e.g. Adebayo Johnson"
              value={data.clientName}
              onChange={(e) => updateData({ clientName: e.target.value })}
              className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.clientName ? "border-red-400 ring-1 ring-red-200" : "border-neutral-200"
              }`}
            />
          </div>
          {errors.clientName && <p className="text-xs text-red-500 mt-1">{errors.clientName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-1.5" htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="email"
              type="email"
              required
              placeholder="e.g. adebayo@example.com"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.email ? "border-red-400 ring-1 ring-red-200" : "border-neutral-200"
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-neutral-800 mb-1.5" htmlFor="whatsapp">
            WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="whatsapp"
              type="tel"
              required
              placeholder="e.g. 08012345678 or +234..."
              value={data.whatsapp}
              onChange={(e) => updateData({ whatsapp: e.target.value })}
              className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.whatsapp ? "border-red-400 ring-1 ring-red-200" : "border-neutral-200"
              }`}
            />
          </div>
          {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
        </div>
      </div>

      {/* Business Type Selectable Cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-neutral-800">
            Business Type <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-neutral-400">Select one that best matches</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {BUSINESS_TYPES.map((type) => {
            const isSelected = data.businessType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => updateData({ businessType: type })}
                className={`p-3 text-left rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 border ${
                  isSelected
                    ? "bg-blue-50/80 border-blue-600 text-blue-900 shadow-xs ring-1 ring-blue-500"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50/80"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {data.businessType === "Other" && (
          <div className="mt-3 animate-fadeIn">
            <input
              type="text"
              placeholder="Specify your business category"
              value={data.customBusinessType}
              onChange={(e) => updateData({ customBusinessType: e.target.value })}
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        )}
        {errors.businessType && <p className="text-xs text-red-500 mt-1.5">{errors.businessType}</p>}
      </div>

      {/* Location Selectable Cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-neutral-800">
            Where is your business located? <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-neutral-400">Select location</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {NIGERIAN_LOCATIONS.map((loc) => {
            const isSelected = data.location === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => updateData({ location: loc })}
                className={`p-2.5 text-center rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                  isSelected
                    ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 inline-block mr-1 ${isSelected ? "text-white" : "text-neutral-400"}`} />
                {loc}
              </button>
            );
          })}
        </div>

        {(data.location === "Other Nigerian city" || data.location === "Outside Nigeria") && (
          <div className="mt-3 animate-fadeIn">
            <input
              type="text"
              placeholder="Enter your specific city or country"
              value={data.customLocation}
              onChange={(e) => updateData({ customLocation: e.target.value })}
              className="w-full px-4 py-2.5 bg-white rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        )}
        {errors.location && <p className="text-xs text-red-500 mt-1.5">{errors.location}</p>}
      </div>

      {/* Business Explanation with Smart Suggestions */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
          <label className="block text-sm font-semibold text-neutral-800" htmlFor="businessDesc">
            What does your business do? <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-neutral-500">
            {data.businessType && data.businessType !== "Other"
              ? `Click a suggestion below for ${data.businessType} or type your own:`
              : "Click a quick starter or type your own:"}
          </span>
        </div>

        {/* Suggestion Chips */}
        {currentSuggestions && currentSuggestions.length > 0 && (
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {currentSuggestions.map((item, idx) => {
              const isApplied = data.businessDescription === item.text;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applySuggestion(item.text)}
                  className={`inline-flex items-center text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all text-left border ${
                    isApplied
                      ? "bg-blue-600 border-blue-600 text-white shadow-2xs"
                      : "bg-blue-50/70 border-blue-200/80 text-blue-900 hover:bg-blue-100 hover:border-blue-300"
                  }`}
                  title="Click to automatically fill this description"
                >
                  <Sparkles className={`w-3 h-3 mr-1.5 shrink-0 ${isApplied ? "text-white" : "text-blue-600"}`} />
                  <span>{item.shortLabel}</span>
                  {isApplied && <Check className="w-3 h-3 ml-1 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        <div className="relative">
          <textarea
            id="businessDesc"
            rows={3}
            required
            placeholder={
              data.businessType && data.businessType !== "Other"
                ? `e.g. Briefly explain your ${data.businessType} services, key offerings, and target customers (or click a suggestion above)...`
                : "Briefly explain what your business does, your main products/services, and target customers (or click a suggestion above)..."
            }
            value={data.businessDescription}
            onChange={(e) => updateData({ businessDescription: e.target.value })}
            className={`w-full p-3.5 bg-white rounded-xl border text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.businessDescription ? "border-red-400 ring-1 ring-red-200" : "border-neutral-200"
            }`}
          />
        </div>
        {errors.businessDescription && (
          <p className="text-xs text-red-500 mt-1">{errors.businessDescription}</p>
        )}
      </div>
    </div>
  );
};
