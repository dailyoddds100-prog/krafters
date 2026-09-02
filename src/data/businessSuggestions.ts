/**
 * Smart Industry / Business Type Description Suggestions & Prompt Starters
 */

export interface BusinessSuggestion {
  shortLabel: string;
  text: string;
}

export const BUSINESS_TYPE_SUGGESTIONS: Record<string, BusinessSuggestion[]> = {
  "Real Estate": [
    {
      shortLabel: "Property Sales & Luxury Rentals",
      text: "We specialize in luxury residential and commercial property sales, short-let rentals, and real estate investment advisory for homebuyers and investors.",
    },
    {
      shortLabel: "Land Development & Estates",
      text: "We acquire, develop, and sell verified residential plots, serviced estates, and commercial land with registered titles and flexible payment plans.",
    },
    {
      shortLabel: "Property Management & Advisory",
      text: "We provide comprehensive property management, facility maintenance, tenant sourcing, and valuation services for property owners and landlords.",
    },
  ],
  "Restaurant / Food": [
    {
      shortLabel: "Fine Dining & Lounge",
      text: "We are a contemporary restaurant and lounge offering signature chef-crafted culinary dishes, specialty cocktails, and VIP table dining experiences.",
    },
    {
      shortLabel: "Fast Casual & Food Delivery",
      text: "We serve fresh, delicious local and continental meals with quick doorstep delivery, takeaway packages, and corporate lunch catering.",
    },
    {
      shortLabel: "Bakery & Event Catering",
      text: "We bake custom celebration cakes, artisan pastries, and provide full-service catering for weddings, corporate events, and private parties.",
    },
  ],
  "Fashion": [
    {
      shortLabel: "Ready-to-Wear Clothing",
      text: "We design and retail premium ready-to-wear male and female apparel, combining contemporary urban streetwear with classic tailored style.",
    },
    {
      shortLabel: "Bespoke Tailoring & Couture",
      text: "We create bespoke custom-fitted suits, bridal wear, and traditional couture crafted with high-grade fabrics and precise attention to detail.",
    },
    {
      shortLabel: "Footwear & Accessories",
      text: "We handcraft and sell luxury leather shoes, handbags, belts, and fashion accessories for stylish men and women.",
    },
  ],
  "Education": [
    {
      shortLabel: "Private School & College (K-12)",
      text: "We are a premier private school providing blended British-Nigerian curriculum education, modern laboratory facilities, and holistic student development.",
    },
    {
      shortLabel: "Vocational & Professional Training",
      text: "We offer certified vocational training, practical tech skills, and career development programs designed to prepare students for the global workforce.",
    },
    {
      shortLabel: "Tutoring & Exam Prep Center",
      text: "We prepare candidates for national and international exams (WAEC, JAMB, IELTS, SAT) through personalized tutoring and proven study methodologies.",
    },
  ],
  "Healthcare": [
    {
      shortLabel: "Multi-Specialty Medical Clinic",
      text: "We are a modern health center offering outpatient consultations, diagnostic laboratory services, specialized medical care, and wellness checkups.",
    },
    {
      shortLabel: "Dental & Aesthetics Clinic",
      text: "We provide advanced dental care, smile makeovers, teeth whitening, and cosmetic facial aesthetics in a relaxed, hygienic clinical setting.",
    },
    {
      shortLabel: "Pharmacy & Wellness Store",
      text: "We dispense prescription medications, healthcare essentials, vitamins, and provide personalized wellness counseling to our community.",
    },
  ],
  "Finance": [
    {
      shortLabel: "Microfinance & SME Lending",
      text: "We provide accessible credit facilities, business capital loans, and personal savings solutions to help small businesses and individuals thrive.",
    },
    {
      shortLabel: "Accounting & Tax Advisory",
      text: "We offer bookkeeping, corporate financial auditing, tax compliance, and payroll management services for growing businesses and startups.",
    },
    {
      shortLabel: "Wealth Management & Investments",
      text: "We guide high-net-worth individuals and corporate organizations with strategic portfolio management, fixed income investments, and asset growth.",
    },
  ],
  "Technology": [
    {
      shortLabel: "Custom Software & Web Development",
      text: "We build scalable web applications, custom enterprise software, and mobile apps that automate workflows and drive business digital transformation.",
    },
    {
      shortLabel: "IT Support & Managed Infrastructure",
      text: "We deliver 24/7 IT support, cloud migration, enterprise cybersecurity, and network infrastructure management for modern organizations.",
    },
    {
      shortLabel: "SaaS Product & Digital Platform",
      text: "We provide an innovative cloud-based software platform designed to simplify operations, analytics, and customer engagement for businesses.",
    },
  ],
  "Consulting": [
    {
      shortLabel: "Management & Strategy Consulting",
      text: "We advise corporate executives and entrepreneurs on operational efficiency, market expansion, leadership development, and strategic growth.",
    },
    {
      shortLabel: "Human Resources & Talent Acquisition",
      text: "We help companies source, recruit, onboard, and train top-tier talent while providing HR policy and performance management structures.",
    },
    {
      shortLabel: "Brand & Marketing Advisory",
      text: "We develop high-impact brand positioning, digital marketing strategies, and customer acquisition campaigns for competitive brands.",
    },
  ],
  "Construction": [
    {
      shortLabel: "General Building & Civil Engineering",
      text: "We undertake residential and commercial building construction, civil engineering projects, and architectural design with strict structural integrity.",
    },
    {
      shortLabel: "Interior Design & Fit-Outs",
      text: "We provide luxury interior decoration, architectural space planning, modular kitchen installations, and turnkey renovation fit-outs.",
    },
    {
      shortLabel: "Building Material Supply & Fabrication",
      text: "We supply certified structural building materials, steel fabrication, roofing solutions, and heavy construction equipment rental.",
    },
  ],
  "Beauty": [
    {
      shortLabel: "Organic Skincare & Cosmetics",
      text: "We formulate and retail natural, dermatologist-tested skincare products, herbal soaps, and glowing cosmetics tailored for diverse skin types.",
    },
    {
      shortLabel: "Hair Salon & Luxury Spa",
      text: "We provide professional hair styling, braiding, relaxing massage therapies, body scrubs, and manicure/pedicure beauty services.",
    },
    {
      shortLabel: "Makeup Artistry & Brow Studio",
      text: "We specialize in bridal glam, editorial makeup, microblading, and lash extension services for modern beauty enthusiasts.",
    },
  ],
  "Hospitality": [
    {
      shortLabel: "Boutique Hotel & Suites",
      text: "We operate a luxury boutique hotel offering beautifully furnished rooms, 24/7 power, high-speed WiFi, conference halls, and warm hospitality.",
    },
    {
      shortLabel: "Short-Let Apartments",
      text: "We manage fully serviced, aesthetic short-stay apartments equipped with modern amenities for business travelers, vacationers, and tourists.",
    },
    {
      shortLabel: "Event Center & Banquet Hall",
      text: "We host memorable weddings, corporate conferences, and private celebrations in our fully air-conditioned, high-capacity banquet facilities.",
    },
  ],
  "Logistics": [
    {
      shortLabel: "Last-Mile Delivery & Courier",
      text: "We provide fast, tracked same-day doorstep dispatch and courier delivery services for e-commerce vendors, offices, and individuals.",
    },
    {
      shortLabel: "Haulage & Interstate Freight",
      text: "We move bulk cargo, industrial machinery, and raw materials across major states with a well-maintained truck fleet and goods-in-transit cover.",
    },
    {
      shortLabel: "International Shipping & Clearing",
      text: "We handle sea and air freight procurement, customs clearing, and door-to-door forwarding from China, the USA, and the UK to Nigeria.",
    },
  ],
  "Retail": [
    {
      shortLabel: "Supermarket & Household Essentials",
      text: "We retail fresh groceries, packaged food items, beverages, toiletries, and quality household consumer goods at competitive prices.",
    },
    {
      shortLabel: "Electronics & Smart Gadgets",
      text: "We sell authentic smartphones, laptops, home entertainment appliances, and smart tech accessories backed by manufacturer warranties.",
    },
    {
      shortLabel: "Home Decor & Furnishings",
      text: "We curate and sell modern furniture, decorative lighting, wall art, and bedding sets to transform living and office spaces.",
    },
  ],
  "Professional Services": [
    {
      shortLabel: "Legal Practice & Corporate Counsel",
      text: "We provide corporate legal representation, contract drafting, CAC company registration, intellectual property protection, and dispute resolution.",
    },
    {
      shortLabel: "Photography & Media Production",
      text: "We deliver high-definition photography, commercial videography, documentary production, and aerial drone coverage for brands and events.",
    },
    {
      shortLabel: "Security Services & Guarding",
      text: "We deploy trained security personnel, CCTV surveillance installations, access control systems, and VIP executive protection solutions.",
    },
  ],
  "Church / Ministry": [
    {
      shortLabel: "Community Church & Worship Center",
      text: "We are a Bible-believing Christian congregation dedicated to spreading the gospel, fostering spiritual growth, and serving our local community.",
    },
    {
      shortLabel: "Global Outreach & Media Ministry",
      text: "We broadcast life-transforming sermons, host global prayer conferences, and provide youth mentorship and humanitarian outreach missions.",
    },
  ],
  "Personal Brand": [
    {
      shortLabel: "Keynote Speaker & Executive Coach",
      text: "I help corporate leaders, founders, and professionals unlock peak performance through keynote speaking, executive coaching, and workshops.",
    },
    {
      shortLabel: "Author & Thought Leader",
      text: "I publish insightful books, podcasts, and digital courses centered around entrepreneurship, personal finance, and purposeful living.",
    },
    {
      shortLabel: "Creative Artist / Content Creator",
      text: "I create engaging digital content, visual storytelling, and brand partnerships across lifestyle, technology, and entertainment.",
    },
  ],
};

/**
 * Default fallback suggestions when no specific business type is selected or when "Other" is chosen
 */
export const DEFAULT_BUSINESS_SUGGESTIONS: BusinessSuggestion[] = [
  {
    shortLabel: "Products & Online Sales",
    text: "We sell quality products to customers with fast delivery, reliable customer service, and secure payment options.",
  },
  {
    shortLabel: "Professional Client Services",
    text: "We provide expert professional services and consultation to help individuals and businesses achieve their goals efficiently.",
  },
  {
    shortLabel: "Custom Craft & Bespoke Solutions",
    text: "We design and deliver tailored custom solutions crafted to meet the specific tastes and requirements of our clients.",
  },
];

/**
 * Suggestions for "About Us" section based on business type
 */
export const ABOUT_US_SUGGESTIONS: Record<string, BusinessSuggestion[]> = {
  "Real Estate": [
    {
      shortLabel: "Trust & Transparency Story",
      text: "Founded with a mission to make property ownership seamless and secure, we have helped hundreds of families and investors acquire verified properties with zero hassle.",
    },
    {
      shortLabel: "Excellence in Development",
      text: "We are driven by architectural innovation, prime location selection, and uncompromised structural quality across all our residential and commercial developments.",
    },
  ],
  "Restaurant / Food": [
    {
      shortLabel: "Passion for Fresh Flavors",
      text: "Born out of a genuine passion for authentic taste and culinary creativity, we source fresh organic ingredients daily to create memorable dining moments for our guests.",
    },
    {
      shortLabel: "Warm Hospitality Heritage",
      text: "Our journey began with a simple belief: great food brings people together. Today, we are proud to be a favorite gathering spot for families, friends, and food lovers.",
    },
  ],
  "Fashion": [
    {
      shortLabel: "Style Meets Craftsmanship",
      text: "We believe fashion is an expression of confidence and individuality. Every piece in our collection is carefully curated and tailored to meet international standards.",
    },
  ],
  "Education": [
    {
      shortLabel: "Nurturing Future Leaders",
      text: "Our institution was founded on the pillars of academic excellence, moral discipline, and creative innovation, preparing students to excel in a rapidly evolving world.",
    },
  ],
  "Beauty": [
    {
      shortLabel: "Natural Radiance & Confidence",
      text: "We empower individuals to embrace their natural beauty with safe, toxic-free formulations that nourish and protect skin health without compromise.",
    },
  ],
};
