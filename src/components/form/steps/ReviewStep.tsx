import React from "react";
import { ProjectFormData } from "../../../types";
import { usePromo } from "../../../context/PromoContext";
import { SITE_CONFIG } from "../../../data/siteConfig";
import { Edit3, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Building, Layout, Palette, FileText, Globe, Sparkles, Flame, Clock } from "lucide-react";

interface ReviewStepProps {
  data: ProjectFormData;
  updateData: (fields: Partial<ProjectFormData>) => void;
  onEditStep: (stepNumber: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  updateData,
  onEditStep,
  onSubmit,
  isSubmitting,
  submitError,
}) => {
  const { isPromoActive, priceFormatted, originalPriceFormatted, depositFormatted, formattedCountdown } = usePromo();

  return (
    <div className="space-y-8 animate-fadeIn" id="step-review">
      <div>
        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Review Your Project Requirements
        </h3>
        <p className="text-sm text-neutral-500 mt-1">
          Review all details below before submitting. Click "Edit" on any section to make quick adjustments.
        </p>
      </div>

      {/* Summary Cards Grid */}
      <div className="space-y-4">
        {/* Card 1: Business */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-neutral-900">1. Business Information</h4>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-neutral-400 block font-medium">Business Name:</span>
              <span className="font-semibold text-neutral-800">{data.businessName || "—"}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Client Name:</span>
              <span className="font-semibold text-neutral-800">{data.clientName || "—"}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Contact:</span>
              <span className="font-semibold text-neutral-800">{data.email} | {data.whatsapp}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Business Type:</span>
              <span className="font-semibold text-neutral-800">
                {data.businessType === "Other" ? data.customBusinessType : data.businessType || "—"}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Location:</span>
              <span className="font-semibold text-neutral-800">
                {data.location === "Other Nigerian city" || data.location === "Outside Nigeria"
                  ? data.customLocation
                  : data.location || "—"}
              </span>
            </div>
            <div className="sm:col-span-2 md:col-span-3">
              <span className="text-neutral-400 block font-medium">Description:</span>
              <p className="text-neutral-700 italic mt-0.5 line-clamp-2">
                "{data.businessDescription || "—"}"
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Website */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Layout className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-neutral-900">2. Website Requirements</h4>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-neutral-400 block font-medium">Main Goals / Purpose:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {data.purposes.length > 0 ? (
                  data.purposes.map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-medium">
                      {p}
                    </span>
                  ))
                ) : (
                  <span className="text-neutral-400">None specified</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-neutral-400 block font-medium">Pages Requested:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {data.pages.map((pg) => (
                  <span key={pg} className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 font-medium">
                    {pg}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-neutral-400 block font-medium">Special Features:</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {data.features.length > 0 ? (
                  data.features.map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-medium">
                      {f}
                    </span>
                  ))
                ) : (
                  <span className="text-neutral-400">Standard package features</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Design & Branding */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-neutral-900">3. Design & Branding</h4>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-neutral-400 block font-medium">Logo Status:</span>
              <span className="font-semibold text-neutral-800">
                {data.hasLogo === "yes"
                  ? `Uploaded (${data.logoFile?.name || "1 file"})`
                  : "Needs clean typographical logo"}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Preferred Styles:</span>
              <span className="font-semibold text-neutral-800">
                {data.designStyles.join(", ") || "Modern"}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Color Scheme:</span>
              <span className="font-semibold text-neutral-800 capitalize">
                {data.colorSchemePreference}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Brand Assets Uploaded:</span>
              <span className="font-semibold text-neutral-800">
                {data.brandAssets.length} file(s)
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Content */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-neutral-900">4. Content & Services</h4>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-neutral-400 block font-medium">Content Readiness:</span>
              <span className="font-semibold text-neutral-800">
                {data.contentReadiness === "ready"
                  ? "Ready & Uploaded"
                  : data.contentReadiness === "some"
                  ? "Some provided"
                  : "Need copywriting assistance"}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Services Configured:</span>
              <span className="font-semibold text-neutral-800">
                {data.services.filter((s) => s.name).length} service(s)
              </span>
            </div>
            {data.products.length > 0 && (
              <div>
                <span className="text-neutral-400 block font-medium">Products / Items:</span>
                <span className="font-semibold text-neutral-800">
                  {data.products.length} product(s)
                </span>
              </div>
            )}
            {data.aboutBusiness && (
              <div className="sm:col-span-3 pt-2 border-t border-neutral-100">
                <span className="text-neutral-400 block font-medium">About Us / Story:</span>
                <p className="text-neutral-700 italic mt-0.5 line-clamp-2">
                  "{data.aboutBusiness}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Card 5: Domain & Timeline */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-neutral-900">5. Domain & Launch Details</h4>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(5)}
              className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-neutral-400 block font-medium">Domain Request:</span>
              <span className="font-semibold text-neutral-800">
                {data.hasExistingDomain === "yes"
                  ? `Existing: ${data.existingDomain}`
                  : `Preferred: ${data.preferredDomains.filter(Boolean).join(", ") || data.preferredExtension}`}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Preferred Timeline:</span>
              <span className="font-semibold text-neutral-800">{data.timelinePreference}</span>
            </div>
            <div>
              <span className="text-neutral-400 block font-medium">Previous Website:</span>
              <span className="font-semibold text-neutral-800">
                {data.hadWebsiteBefore === "yes" ? `Yes (${data.previousWebsiteReason})` : "First website"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Package & Terms Confirmation Notice */}
      <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-950 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>
              {isPromoActive ? "Promotional Package Terms & Milestone Payment" : "Standard Package Terms & Milestone Payment"}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold">
            50% / 50% Split
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 pb-1">
          <div className="p-3 bg-white/90 rounded-xl border border-blue-100">
            <span className="text-neutral-500 block font-medium text-[11px]">1st Milestone (Start)</span>
            <span className="text-sm font-bold text-blue-900">{depositFormatted} (50% Deposit)</span>
            <span className="text-[11px] text-neutral-600 block mt-0.5">Locks domain registration & kicks off UI design.</span>
          </div>
          <div className="p-3 bg-white/90 rounded-xl border border-blue-100">
            <span className="text-neutral-500 block font-medium text-[11px]">2nd Milestone (Launch)</span>
            <span className="text-sm font-bold text-emerald-800">{depositFormatted} (50% Balance)</span>
            <span className="text-[11px] text-neutral-600 block mt-0.5">Paid upon final site review & satisfaction before live handover.</span>
          </div>
        </div>
        <ul className="text-xs text-blue-900 space-y-1 pl-5 list-disc">
          <li>
            <strong>Total: {priceFormatted}</strong> {isPromoActive && <span className="line-through text-neutral-400 font-normal">({originalPriceFormatted})</span>} covers custom website design (up to 5 pages), 1-year domain name, and 1-year fast cloud hosting.
          </li>
          {isPromoActive && (
            <li className="text-amber-800 font-semibold">
              <strong>Promo Guarantee:</strong> By submitting today, your {priceFormatted} promotional rate is locked in regardless of future price adjustments.
            </li>
          )}
          <li>
            <strong>Delivery time:</strong> Standard turnaround is 5–7 days from deposit and asset receipt.
          </li>
        </ul>
      </div>

      {/* Required Checkbox */}
      <div className="pt-2">
        <label className="flex items-start space-x-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={data.confirmedAccuracy}
            onChange={(e) => updateData({ confirmedAccuracy: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded text-blue-600 border-neutral-300 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-xs sm:text-sm font-semibold text-neutral-800">
            I confirm that the information I've provided is accurate and I agree to the 50% commitment deposit ({depositFormatted}) to start development.
          </span>
        </label>
      </div>

      {submitError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!data.confirmedAccuracy || isSubmitting}
          className={`w-full py-4 rounded-xl text-base font-bold text-white shadow-lg transition-all flex items-center justify-center space-x-2 ${
            data.confirmedAccuracy && !isSubmitting
              ? "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              : "bg-neutral-300 cursor-not-allowed text-neutral-500 shadow-none"
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Submitting Your Website Request...</span>
            </>
          ) : (
            <>
              <span>Submit My Website Request</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
