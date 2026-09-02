import { ProjectFormData } from "../types";

const STORAGE_KEY = "apexcraft_website_project_draft_v1";
const STEP_STORAGE_KEY = "apexcraft_website_project_step_v1";

export const initialProjectFormData: ProjectFormData = {
  // Step 1: Business
  businessName: "",
  clientName: "",
  email: "",
  whatsapp: "",
  businessType: "",
  customBusinessType: "",
  location: "",
  customLocation: "",
  businessDescription: "",

  // Step 2: Website Requirements
  purposes: [],
  customPurpose: "",
  pages: ["Home", "About", "Services", "Contact"],
  customPage: "",
  features: ["WhatsApp Button", "Contact Form", "Social Media Links"],
  customFeature: "",
  hasReferenceWebsites: "",
  referenceWebsites: [
    { url: "", note: "" },
    { url: "", note: "" },
    { url: "", note: "" },
  ],

  // Step 3: Design & Branding
  hasLogo: "",
  logoFile: null,
  designStyles: ["Modern", "Professional"],
  colorSchemePreference: "light",
  customBrandColors: ["#0f172a", "#2563eb", "#f8fafc"],
  brandAssets: [],

  // Step 4: Content
  contentReadiness: "",
  contentFiles: [],
  aboutBusiness: "",
  services: [
    { id: "srv-1", name: "", description: "" },
  ],
  products: [],
  testimonials: [],
  contactEmail: "",
  contactPhone: "",
  contactWhatsapp: "",
  contactAddress: "",
  socialInstagram: "",
  socialFacebook: "",
  socialTiktok: "",
  socialTwitter: "",
  socialLinkedin: "",
  socialYoutube: "",

  // Step 5: Domain
  hasExistingDomain: "",
  existingDomain: "",
  preferredDomains: ["", "", ""],
  preferredExtension: ".com",
  customExtension: "",

  // Step 6: Project Details
  timelinePreference: "Within 1 week",
  hadWebsiteBefore: "",
  previousWebsiteReason: "",
  customPreviousReason: "",
  heardFrom: "",
  customHeardFrom: "",
  additionalNotes: "",

  // Step 7: Confirmation
  confirmedAccuracy: false,
};

export function loadSavedDraft(): { data: ProjectFormData; step: number; hasSaved: boolean } {
  try {
    const savedJson = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(STEP_STORAGE_KEY);
    if (savedJson) {
      const parsed = JSON.parse(savedJson);
      return {
        data: { ...initialProjectFormData, ...parsed },
        step: savedStep ? Math.max(1, Math.min(7, parseInt(savedStep, 10))) : 1,
        hasSaved: true,
      };
    }
  } catch (err) {
    console.warn("Failed to load draft from localStorage", err);
  }
  return {
    data: initialProjectFormData,
    step: 1,
    hasSaved: false,
  };
}

export function saveDraft(data: ProjectFormData, step: number) {
  try {
    // Avoid saving large file base64 data to localStorage to avoid QuotaExceededError
    const sanitizedData = {
      ...data,
      logoFile: data.logoFile ? { ...data.logoFile, dataUrl: undefined } : null,
      brandAssets: data.brandAssets.map((asset) => ({ ...asset, dataUrl: undefined })),
      contentFiles: data.contentFiles.map((asset) => ({ ...asset, dataUrl: undefined })),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizedData));
    localStorage.setItem(STEP_STORAGE_KEY, step.toString());
  } catch (err) {
    console.warn("Failed to save draft to localStorage", err);
  }
}

export function clearSavedDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to clear draft", err);
  }
}
