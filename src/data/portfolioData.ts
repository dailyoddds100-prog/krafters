import { PortfolioProject } from "../types";

/**
 * Portfolio Projects Data File
 * 4 Curated Projects with Client Brands & Real Domain URLs:
 * 1. Bloffville Schools (bloffvilleschools.org) - School / Education
 * 2. BuyBetter (buybetter.ng) - Skincare Brand / E-commerce
 * 3. Cilantro Restaurant (www.cilantrorestaurants.com) - Fine Dining Restaurant
 * 4. Prime Heritage Real Estate - Commercial & Luxury Real Estate
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "bloffville-schools",
    title: "Bloffville Schools",
    category: "Education",
    description: "Prestigious educational institution web portal featuring academic programs, campus photo gallery, term calendar, online admissions portal, and parent communication channels.",
    url: "https://bloffvilleschools.org",
    liveUrl: "https://bloffvilleschools.org",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Online admissions application & inquiry intake",
      "Academic curriculum & downloadable school prospectus",
      "Interactive campus facilities photo gallery & news announcements",
    ],
    tags: ["Education", "Admissions Portal", "School & College", "Document Downloads"],
    pagesCount: 5,
    deliveryDays: "6 Days",
    featured: true,
  },
  {
    id: "buybetter",
    title: "BuyBetter",
    category: "Skincare / Beauty",
    description: "Premium skincare and wellness e-commerce storefront showcasing curated botanical skincare collections, ingredient benefits, customer reviews, and fast checkout ordering.",
    url: "https://buybetter.ng",
    liveUrl: "https://buybetter.ng",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Categorized botanical skincare catalogue with high-res product showcases",
      "Verified customer testimonial review cards & ingredient breakdowns",
      "Direct WhatsApp and instant online order checkout integration",
    ],
    tags: ["Skincare", "E-commerce", "Beauty Brand", "Product Showcase"],
    pagesCount: 5,
    deliveryDays: "5 Days",
  },
  {
    id: "cilantro-restaurant",
    title: "Cilantro Restaurant",
    category: "Restaurant / Food",
    description: "Iconic fine-dining and culinary destination website featuring an interactive food & cocktail menu, VIP table reservation form, and private events catering bookings.",
    url: "https://www.cilantrorestaurants.com",
    liveUrl: "https://www.cilantrorestaurants.com",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Interactive categorized culinary & specialty cocktail menu",
      "Online table reservation & private dining booking system",
      "Google Maps integration, opening hours, and direct call/chat buttons",
    ],
    tags: ["Restaurant", "Hospitality", "Table Reservations", "Menu Showcase"],
    pagesCount: 4,
    deliveryDays: "5 Days",
  },
  {
    id: "oparahrealty",
    title: "oparahrealty",
    category: "Real Estate",
    description: "Modern real estate and luxury property portal featuring active property listings, detailed amenity tours, location guides, and instant direct WhatsApp inquiries with realtors.",
    url: "https://oparahrealty.com",
    liveUrl: "https://oparahrealty.com",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Dynamic luxury listing cards with search filters",
      "Instant WhatsApp & inquiry lead capture",
      "Integrated location maps & neighborhood guides",
    ],
    tags: ["Real Estate", "Lead Generation", "Luxury Aesthetic", "WhatsApp Lead"],
    pagesCount: 5,
    deliveryDays: "6 Days",
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All",
  "Education",
  "Skincare / Beauty",
  "Restaurant / Food",
  "Real Estate",
];
