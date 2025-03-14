import {
  CategoryCard,
  CategoryFeature,
} from "@/components/categories/CategoryShowcase";

// Category features with localized content
export const categoryFeatures: Record<string, CategoryFeature> = {
  waterproof: {
    id: "waterproof",
    title: {
      en: "Waterproof",
      he: "עמיד למים",
    },
    icon: "/images/features/waterproof.svg",
  },
  lightweight: {
    id: "lightweight",
    title: {
      en: "Lightweight",
      he: "קל משקל",
    },
    icon: "/images/features/lightweight.svg",
  },
  tactical: {
    id: "tactical",
    title: {
      en: "Tactical",
      he: "טקטי",
    },
    icon: "/images/features/tactical.svg",
  },
  durable: {
    id: "durable",
    title: {
      en: "Durable",
      he: "עמיד",
    },
    icon: "/images/features/durability.svg",
  },
  premium: {
    id: "premium",
    title: {
      en: "Premium",
      he: "פרימיום",
    },
    icon: "/images/features/quality.svg",
  },
  military: {
    id: "military",
    title: {
      en: "Military Grade",
      he: "דרגה צבאית",
    },
    icon: "/images/features/military.svg",
  },
};

// Categories data with localized content
export const mainCategories: CategoryCard[] = [
  {
    id: "tactical-gear",
    name: {
      en: "Tactical Gear",
      he: "ציוד טקטי",
    },
    description: {
      en: "Professional tactical equipment for military, law enforcement, and enthusiasts",
      he: "ציוד טקטי מקצועי לצבא, אכיפת חוק וחובבים",
    },
    image: "/images/hero/tactical-hero.svg",
    slug: "tactical-gear",
    features: [
      categoryFeatures.military,
      categoryFeatures.durable,
      categoryFeatures.tactical,
    ],
  },
  {
    id: "outdoor-equipment",
    name: {
      en: "Outdoor Equipment",
      he: "ציוד לשטח",
    },
    description: {
      en: "Premium outdoor gear for hiking, camping, and survival",
      he: "ציוד חוץ פרימיום לטיולים, מחנאות והישרדות",
    },
    image: "/images/hero/outdoor-hero.svg",
    slug: "outdoor-equipment",
    features: [
      categoryFeatures.waterproof,
      categoryFeatures.lightweight,
      categoryFeatures.durable,
    ],
  },
  {
    id: "home-defense",
    name: {
      en: "Home Defense",
      he: "הגנת הבית",
    },
    description: {
      en: "Advanced security and defense solutions for your home",
      he: "פתרונות אבטחה והגנה מתקדמים לביתך",
    },
    image: "/images/hero/home-defense-hero.svg",
    slug: "home-defense",
    features: [
      categoryFeatures.premium,
      categoryFeatures.durable,
      categoryFeatures.tactical,
    ],
  },
];

// Tactical subcategories
export const tacticalCategories: CategoryCard[] = [
  {
    id: "tactical-clothing",
    name: {
      en: "Tactical Clothing",
      he: "ביגוד טקטי",
    },
    image: "/images/categories/tactical-clothing.svg",
    slug: "tactical-clothing",
    features: [categoryFeatures.durable, categoryFeatures.tactical],
  },
  {
    id: "tactical-backpacks",
    name: {
      en: "Tactical Backpacks",
      he: "תרמילי גב טקטיים",
    },
    image: "/images/categories/tactical-backpacks.svg",
    slug: "tactical-backpacks",
    features: [
      categoryFeatures.durable,
      categoryFeatures.tactical,
      categoryFeatures.waterproof,
    ],
  },
  {
    id: "tactical-vests",
    name: {
      en: "Tactical Vests",
      he: "אפודים טקטיים",
    },
    image: "/images/categories/tactical-vests.svg",
    slug: "tactical-vests",
    features: [categoryFeatures.military, categoryFeatures.tactical],
  },
  {
    id: "tactical-footwear",
    name: {
      en: "Tactical Footwear",
      he: "הנעלה טקטית",
    },
    image: "/images/categories/tactical-footwear.svg",
    slug: "tactical-footwear",
    features: [categoryFeatures.durable, categoryFeatures.waterproof],
  },
];

// Outdoor subcategories
export const outdoorCategories: CategoryCard[] = [
  {
    id: "camping-equipment",
    name: {
      en: "Camping Equipment",
      he: "ציוד מחנאות",
    },
    image: "/images/categories/camping-equipment.svg",
    slug: "camping-equipment",
    features: [categoryFeatures.lightweight, categoryFeatures.waterproof],
  },
  {
    id: "hiking-gear",
    name: {
      en: "Hiking Gear",
      he: "ציוד טיולים",
    },
    image: "/images/categories/hiking-gear.svg",
    slug: "hiking-gear",
    features: [categoryFeatures.lightweight, categoryFeatures.durable],
  },
  {
    id: "survival-tools",
    name: {
      en: "Survival Tools",
      he: "כלי הישרדות",
    },
    image: "/images/categories/survival-tools.svg",
    slug: "survival-tools",
    features: [categoryFeatures.durable, categoryFeatures.tactical],
  },
];

// Home defense subcategories
export const homeDefenseCategories: CategoryCard[] = [
  {
    id: "security-systems",
    name: {
      en: "Security Systems",
      he: "מערכות אבטחה",
    },
    image: "/images/categories/security-systems.svg",
    slug: "security-systems",
    features: [categoryFeatures.premium, categoryFeatures.tactical],
  },
  {
    id: "surveillance",
    name: {
      en: "Surveillance",
      he: "מערכות מעקב",
    },
    image: "/images/categories/surveillance.svg",
    slug: "surveillance",
    features: [categoryFeatures.premium, categoryFeatures.durable],
  },
  {
    id: "personal-defense",
    name: {
      en: "Personal Defense",
      he: "הגנה אישית",
    },
    image: "/images/categories/personal-defense.svg",
    slug: "personal-defense",
    features: [categoryFeatures.tactical, categoryFeatures.premium],
  },
];
