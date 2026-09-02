import React from "react";
import { ProjectFormData } from "../../../types";
import { DOMAIN_EXTENSIONS } from "../../../data/siteConfig";
import { Globe, Check, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";

interface DomainStepProps {
  data: ProjectFormData;
  updateData: (fields: Partial<ProjectFormData>) => void;
  errors: Record<string, string>;
}

export const DomainStep: React.FC<DomainStepProps> = ({ data, updateData, errors }) => {
  const updatePreferredDomain = (index: number, value: string) => {
    const domains = [...data.preferredDomains];
    domains[index] = value;
    updateData({ preferredDomains: domains });
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="step-domain">
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Choose your website address
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          A domain name (e.g. yourbrand.com) is <strong>included free for 1 year</strong> in your ₦75,000 package.
        </p>
      </div>

      {/* Do you have a domain? */}
      <div className="p-5 bg-neutral-50/80 rounded-2xl border border-neutral-200">
        <label className="block text-sm font-semibold text-neutral-900 mb-3">
          Do you already own a registered domain name? <span className="text-red-500">*</span>
        </label>

        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            type="button"
            onClick={() => updateData({ hasExistingDomain: "yes" })}
            className={`p-4 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-center space-y-1.5 ${
              data.hasExistingDomain === "yes"
                ? "bg-blue-50/80 border-blue-600 text-blue-900 shadow-xs"
                : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
            }`}
          >
            <span className="font-bold text-sm">YES, I already have one</span>
            <span className="text-[11px] text-neutral-500">I will point DNS to the new server</span>
          </button>

          <button
            type="button"
            onClick={() => updateData({ hasExistingDomain: "no", existingDomain: "" })}
            className={`p-4 rounded-xl text-center border-2 transition-all flex flex-col items-center justify-center space-y-1.5 ${
              data.hasExistingDomain === "no"
                ? "bg-neutral-900 border-neutral-900 text-white shadow-xs"
                : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
            }`}
          >
            <span className="font-bold text-sm">NO, register one for me</span>
            <span className={`text-[11px] ${data.hasExistingDomain === "no" ? "text-neutral-300" : "text-neutral-500"}`}>
              Included in the ₦75,000 package
            </span>
          </button>
        </div>

        {/* If YES: Existing domain input */}
        {data.hasExistingDomain === "yes" && (
          <div className="mt-5 space-y-2 animate-fadeIn">
            <label className="block text-xs font-bold text-neutral-800" htmlFor="existingDomainInput">
              Enter your existing domain address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="existingDomainInput"
                type="text"
                placeholder="e.g. mybusinessname.com"
                value={data.existingDomain}
                onChange={(e) => updateData({ existingDomain: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-neutral-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
            <p className="text-xs text-neutral-500">
              We will provide the nameservers or DNS records to connect your domain.
            </p>
          </div>
        )}

        {/* If NO: 3 Preferred domains */}
        {data.hasExistingDomain === "no" && (
          <div className="mt-5 space-y-3 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Preferred domain name choices (in order of priority)
              </label>
              <p className="text-xs text-neutral-500 mb-3">
                Domain registration is subject to availability. Provide 1 to 3 options:
              </p>
            </div>

            {[0, 1, 2].map((idx) => (
              <div key={idx} className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                  #{idx + 1}
                </div>
                <input
                  type="text"
                  placeholder={`Choice ${idx + 1} (e.g. ${
                    idx === 0 ? "brandname.com" : idx === 1 ? "brandname.com.ng" : "brandnamehq.com"
                  })`}
                  value={data.preferredDomains[idx] || ""}
                  onChange={(e) => updatePreferredDomain(idx, e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-neutral-300 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            ))}
          </div>
        )}
        {errors.hasExistingDomain && <p className="text-xs text-red-500 mt-2">{errors.hasExistingDomain}</p>}
      </div>

      {/* Preferred Extension */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-neutral-800">
            Preferred Domain Extension
          </label>
          <span className="text-xs text-neutral-400">Select top preference</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {DOMAIN_EXTENSIONS.map((ext) => {
            const isSelected = data.preferredExtension === ext.ext;
            return (
              <button
                key={ext.ext}
                type="button"
                onClick={() => updateData({ preferredExtension: ext.ext })}
                className={`p-3 rounded-xl text-center border transition-all ${
                  isSelected
                    ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                <span className="font-bold text-sm block font-mono">{ext.ext}</span>
                <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-blue-100" : "text-neutral-400"}`}>
                  {ext.popular ? "Popular" : ext.note}
                </span>
              </button>
            );
          })}
        </div>

        {data.preferredExtension === "Other" && (
          <div className="mt-3 animate-fadeIn">
            <input
              type="text"
              placeholder="Specify extension (e.g. .io, .store, .co)"
              value={data.customExtension}
              onChange={(e) => updateData({ customExtension: e.target.value })}
              className="w-full px-4 py-2 bg-white rounded-xl border border-neutral-300 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        )}
      </div>

      {/* Package Value Notice */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start space-x-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-900 space-y-1">
          <p className="font-bold">1 Year Domain & Web Hosting Included in ₦75,000</p>
          <p className="text-emerald-800 leading-relaxed">
            We handle domain configuration, DNS routing, and fast cloud hosting deployment so you don't have to worry about complex server setup.
          </p>
        </div>
      </div>
    </div>
  );
};
