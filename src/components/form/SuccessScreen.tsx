import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, MessageCircle, ArrowLeft, Download, ShieldCheck, Sparkles, Clock, Calendar } from "lucide-react";
import { ProjectFormData } from "../../types";
import { usePromo } from "../../context/PromoContext";
import { buildWhatsAppLink, SITE_CONFIG } from "../../data/siteConfig";

interface SuccessScreenProps {
  formData: ProjectFormData;
  submissionId: string;
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ formData, submissionId, onReset }) => {
  const { isPromoActive, priceFormatted, originalPriceFormatted, depositFormatted } = usePromo();

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2563eb", "#3b82f6", "#10b981", "#6366f1", "#f59e0b"],
      });
    } catch (err) {
      // ignore
    }
  }, []);

  const whatsappUrl = buildWhatsAppLink({
    clientName: formData.clientName,
    businessName: formData.businessName,
    phone: formData.whatsapp,
    submissionId,
  });

  const handleDownloadSummary = () => {
    const summaryText = `
=========================================
KRAFTERS WEB STUDIO — PROJECT INTAKE RECEIPT
Package: ${priceFormatted} ${isPromoActive ? `(Special Promo - Reg: ${originalPriceFormatted})` : ""}
Included: Domain (1 Yr) + Cloud Hosting (1 Yr) + 5-7 Day Launch
Reference ID: ${submissionId}
Date: ${new Date().toLocaleDateString()}
=========================================

CLIENT & BUSINESS INFORMATION:
-------------------------------
Business Name: ${formData.businessName}
Client Name: ${formData.clientName}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}
Business Type: ${formData.businessType === "Other" ? formData.customBusinessType : formData.businessType}
Location: ${formData.location}
Business Description: ${formData.businessDescription}
About Us / History: ${formData.aboutBusiness || "Same as description"}

WEBSITE REQUIREMENTS:
---------------------
Goals: ${formData.purposes.join(", ")}
Pages: ${formData.pages.join(", ")}
Features: ${formData.features.join(", ")}

CONTENT & SERVICES:
-------------------
Content Status: ${formData.contentReadiness}
Services: ${formData.services?.filter(s => s.name).map(s => `${s.name} (${s.description || "N/A"})`).join("; ") || "None"}
Products: ${formData.products?.filter(p => p.name).map(p => `${p.name} - ${p.price || "N/A"}`).join("; ") || "None"}

DESIGN & BRANDING:
------------------
Logo Status: ${formData.hasLogo === "yes" ? "Provided" : "Clean Typographical"}
Style: ${formData.designStyles.join(", ")}
Color Scheme: ${formData.colorSchemePreference}

DOMAIN & HOSTING:
-----------------
Domain Mode: ${formData.hasExistingDomain === "yes" ? `Existing (${formData.existingDomain})` : `Preferred (${formData.preferredDomains.filter(Boolean).join(", ") || formData.preferredExtension})`}

PAYMENT & MILESTONE SCHEDULE:
-----------------------------
Total Package Price: ${priceFormatted} Total
1st Milestone (50% Deposit): ${depositFormatted} (Due on project kick-off & domain registration)
2nd Milestone (50% Balance): ${depositFormatted} (Due upon full project completion & your final sign-off)
Standard Turnaround: 5–7 Days after initial deposit and assets received
Client Preferred Timeline: ${formData.timelinePreference}

We will contact you within 24 hours to kick off development!
=========================================
`.trim();

    const blob = new Blob([summaryText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Website-Project-Summary-${formData.businessName.replace(/[^a-zA-Z0-9]/g, "-") || "Intake"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-2xl mx-auto text-center animate-fadeIn" id="success-screen">
      {/* Success Badge & Header */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md ring-8 ring-emerald-50">
        <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
      </div>

      <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-3">
        <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Reference ID: {submissionId}
      </span>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
        Your Website Request Has Been Received!
      </h2>

      <p className="text-sm sm:text-base text-neutral-600 mt-3 max-w-lg mx-auto leading-relaxed">
        Thanks, <strong>{formData.clientName || "there"}</strong>! We’ve received all your project details for{" "}
        <strong>{formData.businessName || "your business"}</strong>. We’ll review your requirements and reach out via WhatsApp or email with your onboarding roadmap.
      </p>

      {/* Progress Checklist Received Card */}
      <div className="my-8 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 text-left max-w-md mx-auto space-y-3 shadow-xs">
        <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-emerald-800">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
            ✓
          </div>
          <span>Request received & cataloged</span>
        </div>
        <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-emerald-800">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
            ✓
          </div>
          <span>Requirements submitted & saved</span>
        </div>
        <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-emerald-800">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
            ✓
          </div>
          <span>Brand assets & preferences queued for development</span>
        </div>
        <div className="pt-2 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1.5">
          <span className="flex items-center text-neutral-500">
            <Clock className="w-3.5 h-3.5 mr-1 text-blue-600" /> 5–7 Days Delivery Window
          </span>
          <span className="font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200 text-[11px] self-start sm:self-auto">
            {depositFormatted} Deposit / {depositFormatted} on Launch
          </span>
        </div>
      </div>

      {/* WhatsApp Asset Delivery Notice */}
      <div className="my-6 p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-left max-w-md mx-auto">
        <div className="flex items-start space-x-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-950">Next Step: 50% Deposit & Kickoff</h4>
            <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
              We've prepared your WhatsApp chat to confirm your 50% commitment deposit ({depositFormatted}) and receive your project assets so we can start immediately!
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat on WhatsApp (Pay {depositFormatted} Deposit)
        </a>

        <button
          type="button"
          onClick={handleDownloadSummary}
          className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs transition-all"
        >
          <Download className="w-4 h-4 mr-1.5 text-neutral-500" />
          Save Summary
        </button>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return to Website
        </button>
      </div>
    </div>
  );
};

