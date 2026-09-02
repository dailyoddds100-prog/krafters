export interface ServiceItem {
  id: string;
  name: string;
  description: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price?: string;
  imageName?: string;
  imageData?: string;
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  testimonial: string;
}

export interface UploadedFileAsset {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
  uploadedAt: string;
}

export interface WebsiteReference {
  url: string;
  note: string;
}

export interface ProjectFormData {
  // Step 1: Business Information
  businessName: string;
  clientName: string;
  email: string;
  whatsapp: string;
  businessType: string;
  customBusinessType: string;
  location: string;
  customLocation: string;
  businessDescription: string;

  // Step 2: Website Requirements
  purposes: string[];
  customPurpose: string;
  pages: string[];
  customPage: string;
  features: string[];
  customFeature: string;
  hasReferenceWebsites: 'yes' | 'no' | '';
  referenceWebsites: WebsiteReference[];

  // Step 3: Design & Branding
  hasLogo: 'yes' | 'no' | '';
  logoFile?: UploadedFileAsset | null;
  designStyles: string[];
  colorSchemePreference: string;
  customBrandColors: string[];
  brandAssets: UploadedFileAsset[];

  // Step 4: Content
  contentReadiness: 'ready' | 'some' | 'need_help' | '';
  contentFiles: UploadedFileAsset[];
  aboutBusiness: string;
  services: ServiceItem[];
  products: ProductItem[];
  testimonials: TestimonialItem[];
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  contactAddress: string;
  socialInstagram: string;
  socialFacebook: string;
  socialTiktok: string;
  socialTwitter: string;
  socialLinkedin: string;
  socialYoutube: string;

  // Step 5: Domain
  hasExistingDomain: 'yes' | 'no' | '';
  existingDomain: string;
  preferredDomains: string[];
  preferredExtension: string;
  customExtension: string;

  // Step 6: Project Details
  timelinePreference: string;
  hadWebsiteBefore: 'yes' | 'no' | '';
  previousWebsiteReason: string;
  customPreviousReason: string;
  heardFrom: string;
  customHeardFrom: string;
  additionalNotes: string;

  // Step 7: Confirmation
  confirmedAccuracy: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  liveUrl?: string;
  image: string;
  highlights: string[];
  tags: string[];
  pagesCount: number;
  deliveryDays: string;
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}
