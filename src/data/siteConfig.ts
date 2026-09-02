export const SITE_CONFIG = {
  brandName: (import.meta.env.VITE_BRAND_NAME as string) || "Krafters",
  shortTagline: "High-Converting Websites for Ambitious Businesses",
  priceNgn: "75,000",
  priceFormatted: "₦75,000",
  deliveryTime: "5–7 Days",
  deliveryDisclaimer: "Delivery time begins once all required content, information and assets have been received.",
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER as string) || "2348123456789",
  formApiUrl: (import.meta.env.VITE_FORM_API_URL as string) || "/api/submit-project",
  supportEmail: "hello@krafters.ng",
  packageFeatures: [
    "Professional Website Design & Development",
    "Domain Name — 1 Year Included",
    "Web Hosting — 1 Year Included",
    "Mobile & Tablet Responsive Design",
    "Website Launch & SSL Security Setup",
    "WhatsApp Chat Direct Integration",
    "SEO-Optimized Code & Fast Speeds",
    "Standard 5–7 Day Turnaround",
  ],
};

export const BUSINESS_TYPES = [
  "Real Estate",
  "Restaurant / Food",
  "Fashion",
  "Education",
  "Healthcare",
  "Finance",
  "Technology",
  "Consulting",
  "Construction",
  "Beauty",
  "Hospitality",
  "Logistics",
  "Retail",
  "Professional Services",
  "Church / Ministry",
  "Personal Brand",
  "Other",
];

export const NIGERIAN_LOCATIONS = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Benin",
  "Enugu",
  "Kano",
  "Other Nigerian city",
  "Outside Nigeria",
];

export const WEBSITE_PURPOSES = [
  { id: "customers", label: "Get more customers", icon: "Users" },
  { id: "leads", label: "Generate leads", icon: "TrendingUp" },
  { id: "showcase", label: "Showcase my business", icon: "Sparkles" },
  { id: "products", label: "Sell products", icon: "ShoppingBag" },
  { id: "bookings", label: "Accept bookings", icon: "Calendar" },
  { id: "services", label: "Display services", icon: "Briefcase" },
  { id: "credibility", label: "Build credibility", icon: "ShieldCheck" },
  { id: "information", label: "Share information", icon: "Info" },
  { id: "presence", label: "Create an online presence", icon: "Globe" },
  { id: "other", label: "Other", icon: "PlusCircle" },
];

export const PAGE_OPTIONS = [
  "Home",
  "About",
  "Services",
  "Products",
  "Portfolio",
  "Projects",
  "Blog",
  "Testimonials",
  "Team",
  "FAQ",
  "Contact",
  "Gallery",
  "Pricing",
  "Booking",
  "Other",
];

export const FEATURE_OPTIONS = [
  "WhatsApp Button",
  "Contact Form",
  "Google Maps",
  "Social Media Links",
  "Booking System",
  "Online Payments",
  "Online Store",
  "Product Catalogue",
  "Blog",
  "Newsletter",
  "Image Gallery",
  "Testimonials",
  "Customer Reviews",
  "Other",
];

export const DESIGN_STYLES = [
  { name: "Modern", desc: "Clean lines, dynamic layouts, contemporary feel" },
  { name: "Minimal", desc: "Spacious, distraction-free, hyper-focused" },
  { name: "Luxury", desc: "High-end typography, refined gold & obsidian tones" },
  { name: "Corporate", desc: "Polished, authoritative, structured confidence" },
  { name: "Bold", desc: "High contrast, punchy headings, vibrant energy" },
  { name: "Creative", desc: "Expressive visual hierarchy, custom flair" },
  { name: "Elegant", desc: "Graceful serif accents, soft tones, balanced" },
  { name: "Professional", desc: "Clean trust-building aesthetic for B2B" },
  { name: "Dark / Premium", desc: "Deep charcoal palette, sleek modern contrast" },
  { name: "Bright / Friendly", desc: "Warm lighting, approachable, lively" },
];

export const COLOR_SCHEMES = [
  { id: "dark", label: "Dark", preview: "bg-neutral-900 border-neutral-700 text-white" },
  { id: "light", label: "Light", preview: "bg-neutral-50 border-neutral-300 text-neutral-900" },
  { id: "bw", label: "Black & White", preview: "bg-black text-white border-neutral-800" },
  { id: "bold", label: "Bold / Colorful", preview: "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white" },
  { id: "neutral", label: "Neutral", preview: "bg-stone-100 text-stone-800 border-stone-300" },
  { id: "custom", label: "I already have brand colors", preview: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" },
];

export const DOMAIN_EXTENSIONS = [
  { ext: ".com", popular: true, note: "Global standard" },
  { ext: ".com.ng", popular: true, note: "Nigerian commercial" },
  { ext: ".ng", popular: false, note: "Premium Nigerian" },
  { ext: ".org", popular: false, note: "Organizations & non-profits" },
  { ext: ".net", popular: false, note: "Tech & networks" },
  { ext: "Other", popular: false, note: "Specify custom" },
];

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1 week",
  "Within 2 weeks",
  "Within 1 month",
  "No specific deadline",
];

export const PREVIOUS_WEBSITE_REASONS = [
  "I want a redesign",
  "The website is outdated",
  "The website stopped working",
  "I no longer have access",
  "I want something better",
  "Other",
];

export const HEARD_FROM_OPTIONS = [
  "WhatsApp",
  "Instagram",
  "Facebook",
  "TikTok",
  "X",
  "Referral",
  "Google",
  "Other",
];

export const FAQS = [
  {
    question: "How does payment work?",
    answer: "We use a transparent 50/50 payment milestone structure: 50% initial commitment deposit (₦37,500) before we begin development and domain setup, and the remaining 50% balance (₦37,500) upon complete project delivery and your final sign-off.",
  },
  {
    question: "What does the ₦75,000 package include?",
    answer: "The promotional package includes custom website design and development (up to 5 core pages), a custom domain name (.com, .com.ng) for 1 full year, fast cloud web hosting for 1 full year, SSL security encryption, and mobile optimization.",
  },
  {
    question: "How long does it take?",
    answer: "Standard delivery is 5–7 days after the initial deposit and all required business details, content, and assets have been received.",
  },
  {
    question: "Do I need to have my own domain?",
    answer: "No. A domain is included in the ₦75,000 package. You can provide your preferred domain name and we'll confirm availability.",
  },
  {
    question: "Do I need to provide all the website content?",
    answer: "Provide whatever you already have. We'll let you know what is still needed before development begins.",
  },
  {
    question: "Will my website work on phones?",
    answer: "Yes. All websites are designed to be responsive across phones, tablets and desktop devices.",
  },
  {
    question: "Can I request additional features?",
    answer: "Yes. Features outside the promotional package can be discussed and may attract an additional charge.",
  },
  {
    question: "Can I see examples of your work?",
    answer: "Yes. Browse the portfolio section above to see websites we've built.",
  },
];

export function buildWhatsAppLink(formData?: { clientName?: string; businessName?: string; phone?: string; filesList?: string; submissionId?: string }) {
  const basePhone = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  let message = "Hi Krafters! I just submitted my website request for the ₦75,000 promo package. I'm ready to make the 50% deposit (₦37,500) for the commencement of the project.";
  
  if (formData?.clientName && formData?.businessName) {
    message = `Hi Krafters! My name is ${formData.clientName} from ${formData.businessName}.

I just submitted my website project intake form for the ₦75,000 promo package (Ref: ${formData.submissionId || "KRAFTERS-75K"}).

I am ready to make the 50% deposit (₦37,500) for the commencement of the project. Please share payment details so we can kick off!`;
  }
  return `https://wa.me/${basePhone}?text=${encodeURIComponent(message)}`;
}
