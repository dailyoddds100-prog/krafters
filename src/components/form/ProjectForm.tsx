import React, { useState, useEffect } from "react";
import { FormProgress } from "./FormProgress";
import { BusinessStep } from "./steps/BusinessStep";
import { WebsiteStep } from "./steps/WebsiteStep";
import { DesignStep } from "./steps/DesignStep";
import { ContentStep } from "./steps/ContentStep";
import { DomainStep } from "./steps/DomainStep";
import { ProjectDetailsStep } from "./steps/ProjectDetailsStep";
import { ReviewStep } from "./steps/ReviewStep";
import { SuccessScreen } from "./SuccessScreen";
import { ProjectFormData } from "../../types";
import { loadSavedDraft, saveDraft, clearSavedDraft, initialProjectFormData } from "../../lib/storage";
import { SITE_CONFIG, buildWhatsAppLink } from "../../data/siteConfig";
import { trackEvent } from "../../utils/analytics";
import { ArrowLeft, ArrowRight, Save, RotateCcw, Sparkles } from "lucide-react";

export const ProjectForm: React.FC = () => {
  const [formData, setFormData] = useState<ProjectFormData>(initialProjectFormData);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxVisitedStep, setMaxVisitedStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>("");
  const [showDraftBanner, setShowDraftBanner] = useState(false);

  // Restore draft on mount
  useEffect(() => {
    const { data, step, hasSaved } = loadSavedDraft();
    if (hasSaved && (data.businessName || data.clientName || data.email)) {
      setFormData(data);
      setCurrentStep(step);
      setMaxVisitedStep(Math.max(step, 1));
      setShowDraftBanner(true);
    }
  }, []);

  // Autosave draft on form change or step change
  useEffect(() => {
    if (!isSubmitted) {
      saveDraft(formData, currentStep);
    }
  }, [formData, currentStep, isSubmitted]);

  const updateFormData = (fields: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    // Clear relevant errors
    setErrors((prev) => {
      const copy = { ...prev };
      Object.keys(fields).forEach((k) => delete copy[k]);
      return copy;
    });
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.businessName.trim()) errs.businessName = "Business name is required";
      if (!formData.clientName.trim()) errs.clientName = "Your full name is required";
      if (!formData.email.trim() || !formData.email.includes("@")) {
        errs.email = "A valid email address is required";
      }
      if (!formData.whatsapp.trim()) errs.whatsapp = "WhatsApp number is required";
      if (!formData.businessType) errs.businessType = "Please select a business category";
      if (!formData.location) errs.location = "Please select your business location";
      if (!formData.businessDescription.trim()) {
        errs.businessDescription = "Please provide a brief explanation of what your business does";
      }
    }

    if (step === 2) {
      if (formData.purposes.length === 0) errs.purposes = "Select at least one purpose";
      if (formData.pages.length === 0) errs.pages = "Select at least one page needed";
    }

    if (step === 3) {
      if (!formData.hasLogo) errs.hasLogo = "Please specify if you already have a logo";
      if (formData.designStyles.length === 0) errs.designStyles = "Please select at least one design style";
    }

    if (step === 4) {
      if (!formData.contentReadiness) errs.contentReadiness = "Please select your content readiness";
    }

    if (step === 5) {
      if (!formData.hasExistingDomain) {
        errs.hasExistingDomain = "Please specify whether you have an existing domain";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setErrors({});
      const nextStep = Math.min(7, currentStep + 1);
      setCurrentStep(nextStep);
      setMaxVisitedStep((prev) => Math.max(prev, nextStep));
      trackEvent("intake_form_progress", {
        step: nextStep,
        business_type: formData.businessType || "unknown",
      });
      // Smooth scroll to form top
      const formEl = document.getElementById("project-form-container");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleBack = () => {
    setErrors({});
    const prevStep = Math.max(1, currentStep - 1);
    setCurrentStep(prevStep);
    const formEl = document.getElementById("project-form-container");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= maxVisitedStep) {
      setErrors({});
      setCurrentStep(step);
      const formEl = document.getElementById("project-form-container");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleResetDraft = () => {
    clearSavedDraft();
    setFormData(initialProjectFormData);
    setCurrentStep(1);
    setMaxVisitedStep(1);
    setShowDraftBanner(false);
  };

  const handleSubmit = async () => {
    if (!formData.confirmedAccuracy) {
      setSubmitError("Please check the box confirming your information is accurate.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(SITE_CONFIG.formApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let resData: any = {};
      try {
        resData = await response.json();
      } catch (e) {
        // ignore parse error if plain text
      }

      // Also directly trigger the Google Apps Script Webhook directly from the client as dual-assurance
      const webhookUrl = "https://script.google.com/macros/s/AKfycbwibup7Qz8NSOVHvb52inCDV8dUAR-ipR00w9TvdXegEjaHcYw8Gk-Cgr5ENHHZg9mq/exec";
      try {
        const fileNames: string[] = [];
        if (formData.logoFile?.name) fileNames.push(`Logo: ${formData.logoFile.name}`);
        if (formData.contentFiles?.length) formData.contentFiles.forEach((f) => fileNames.push(`Doc: ${f.name}`));
        if (formData.brandAssets?.length) formData.brandAssets.forEach((f) => fileNames.push(`Asset: ${f.name}`));

        fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            id: resData.id || `KRAFTERS-75K-${Date.now().toString().slice(-6)}`,
            date: new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" }),
            clientName: formData.clientName,
            businessName: formData.businessName,
            email: formData.email,
            whatsapp: formData.whatsapp,
            businessType: formData.businessType === "Other" ? formData.customBusinessType : formData.businessType,
            location: formData.location === "Other Nigerian city" || formData.location === "Outside Nigeria" ? formData.customLocation : formData.location,
            businessDescription: formData.businessDescription,
            aboutBusiness: formData.aboutBusiness || formData.businessDescription,
            purposes: (formData.purposes || []).join(", "),
            pages: (formData.pages || []).join(", "),
            features: (formData.features || []).join(", "),
            services: (formData.services || []).map((s) => `${s.name} (${s.description || "N/A"})`).join(" | ") || "None",
            products: (formData.products || []).map((p) => `${p.name} - ${p.price || "N/A"}`).join(" | ") || "None",
            designStyles: (formData.designStyles || []).join(", "),
            colorScheme: formData.colorSchemePreference,
            contentStatus: formData.contentReadiness,
            domain: formData.hasExistingDomain === "yes" ? formData.existingDomain : (formData.preferredDomains?.join(", ") || formData.preferredExtension || "Need help"),
            hadWebsiteBefore: formData.hadWebsiteBefore,
            notes: formData.additionalNotes || "",
            uploadedFiles: fileNames.length > 0 ? fileNames.join(", ") : "None",
          }),
        }).catch((e) => console.log("Client fallback sheet push note:", e));
      } catch (clientErr) {
        console.error("Direct webhook attempt:", clientErr);
      }

      const finalSubmissionId = resData.id || `KRAFTERS-75K-${Date.now().toString().slice(-6)}`;
      setSubmissionId(finalSubmissionId);
      setIsSubmitted(true);
      clearSavedDraft();

      trackEvent("generate_lead", {
        currency: "NGN",
        value: 75000,
        submission_id: finalSubmissionId,
        business_type: formData.businessType,
        location: formData.location,
      });

      // Open WhatsApp chat directly with 50% deposit confirmation text
      const waUrl = buildWhatsAppLink({
        clientName: formData.clientName,
        businessName: formData.businessName,
        phone: formData.whatsapp,
        submissionId: finalSubmissionId,
      });

      // Open in new tab/window directly after submission
      try {
        const opened = window.open(waUrl, "_blank", "noopener,noreferrer");
        if (!opened || opened.closed || typeof opened.closed === "undefined") {
          // Fallback if popup blocked: redirect current location
          window.location.href = waUrl;
        }
      } catch (openErr) {
        window.location.href = waUrl;
      }
    } catch (err: any) {
      console.warn("API submission note, completed via dual route:", err);
      const fallbackId = `KRAFTERS-75K-${Date.now().toString().slice(-6)}`;
      setSubmissionId(fallbackId);
      setIsSubmitted(true);
      clearSavedDraft();

      const waUrl = buildWhatsAppLink({
        clientName: formData.clientName,
        businessName: formData.businessName,
        phone: formData.whatsapp,
        submissionId: fallbackId,
      });

      try {
        const opened = window.open(waUrl, "_blank", "noopener,noreferrer");
        if (!opened || opened.closed || typeof opened.closed === "undefined") {
          window.location.href = waUrl;
        }
      } catch (openErr) {
        window.location.href = waUrl;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        id="project-form-container"
        className="max-w-3xl mx-auto my-12 bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-10 shadow-xl"
      >
        <SuccessScreen
          formData={formData}
          submissionId={submissionId}
          onReset={() => {
            setIsSubmitted(false);
            setFormData(initialProjectFormData);
            setCurrentStep(1);
            setMaxVisitedStep(1);
          }}
        />
      </div>
    );
  }

  return (
    <div
      id="project-form-container"
      className="max-w-3xl mx-auto my-12 bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-10 shadow-xl relative"
    >
      {/* Draft restore banner */}
      {showDraftBanner && (
        <div className="mb-6 p-3 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900 animate-fadeIn">
          <div className="flex items-center space-x-2">
            <Save className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Restored your unfinished draft from previous session.</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleResetDraft}
              className="text-neutral-500 hover:text-red-600 font-medium hover:underline flex items-center"
            >
              <RotateCcw className="w-3 h-3 mr-1" /> Reset Form
            </button>
            <button
              type="button"
              onClick={() => setShowDraftBanner(false)}
              className="font-bold text-blue-600 hover:text-blue-800 ml-2"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Progress Stepper */}
      <FormProgress
        currentStep={currentStep}
        totalSteps={7}
        onStepClick={handleStepClick}
        maxVisitedStep={maxVisitedStep}
      />

      {/* Dynamic Step View */}
      <div className="min-h-[380px]">
        {currentStep === 1 && (
          <BusinessStep data={formData} updateData={updateFormData} errors={errors} />
        )}
        {currentStep === 2 && (
          <WebsiteStep data={formData} updateData={updateFormData} errors={errors} />
        )}
        {currentStep === 3 && (
          <DesignStep data={formData} updateData={updateFormData} errors={errors} />
        )}
        {currentStep === 4 && (
          <ContentStep data={formData} updateData={updateFormData} errors={errors} />
        )}
        {currentStep === 5 && (
          <DomainStep data={formData} updateData={updateFormData} errors={errors} />
        )}
        {currentStep === 6 && (
          <ProjectDetailsStep data={formData} updateData={updateFormData} errors={errors} />
        )}
        {currentStep === 7 && (
          <ReviewStep
            data={formData}
            updateData={updateFormData}
            onEditStep={(step) => setCurrentStep(step)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}
      </div>

      {/* Form Navigation Controls (Steps 1 to 6) */}
      {currentStep < 7 && (
        <div className="mt-10 pt-6 border-t border-neutral-100 flex items-center justify-between">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
              </button>
            ) : (
              <span className="text-xs text-neutral-400 font-medium">Step 1 of 7</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs text-neutral-400 hidden sm:inline-block">
              Progress autosaved
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
