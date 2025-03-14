import { HeroSlide, HeroFeature } from '@/components/home/HeroSection';

// Hero features with localized content
export const heroFeatures: Record<string, HeroFeature> = {
  durability: {
    id: 'durability',
    title: {
      en: 'Military-Grade Durability',
      he: 'עמידות בדרגה צבאית'
    },
    description: {
      en: 'Built to withstand extreme conditions',
      he: 'בנוי לעמוד בתנאים קיצוניים'
    },
    icon: '/images/features/durability.svg'
  },
  performance: {
    id: 'performance',
    title: {
      en: 'Peak Performance',
      he: 'ביצועים מעולים'
    },
    description: {
      en: 'Engineered for optimal functionality',
      he: 'מתוכנן לפונקציונליות אופטימלית'
    },
    icon: '/images/features/performance.svg'
  },
  innovation: {
    id: 'innovation',
    title: {
      en: 'Cutting-Edge Innovation',
      he: 'חדשנות מתקדמת'
    },
    description: {
      en: 'Advanced technologies and materials',
      he: 'טכנולוגיות וחומרים מתקדמים'
    },
    icon: '/images/features/innovation.svg'
  },
  quality: {
    id: 'quality',
    title: {
      en: 'Premium Quality',
      he: 'איכות פרימיום'
    },
    description: {
      en: 'Crafted from the finest materials',
      he: 'מיוצר מהחומרים המשובחים ביותר'
    },
    icon: '/images/features/quality.svg'
  },
  guarantee: {
    id: 'guarantee',
    title: {
      en: 'Lifetime Guarantee',
      he: 'אחריות לכל החיים'
    },
    description: {
      en: 'Built to last a lifetime',
      he: 'בנוי להחזיק מעמד לכל החיים'
    },
    icon: '/images/features/guarantee.svg'
  },
  expert: {
    id: 'expert',
    title: {
      en: 'Expert Designed',
      he: 'מעוצב על ידי מומחים'
    },
    description: {
      en: 'Created by industry professionals',
      he: 'נוצר על ידי אנשי מקצוע בתעשייה'
    },
    icon: '/images/features/expert.svg'
  }
};

// Hero slides with localized content
export const heroSlides: HeroSlide[] = [
  {
    id: 'tactical',
    title: {
      en: 'Professional Tactical Equipment',
      he: 'ציוד טקטי מקצועי'
    },
    subtitle: {
      en: 'Built for the toughest conditions',
      he: 'בנוי לתנאים הקשים ביותר'
    },
    description: {
      en: 'Discover our premium collection of military-grade tactical gear designed for professionals and enthusiasts alike.',
      he: 'גלה את האוסף היוקרתי שלנו של ציוד טקטי בדרגה צבאית המיועד לאנשי מקצוע וחובבים כאחד.'
    },
    image: '/images/hero/tactical-hero.jpg',
    mobileImage: '/images/hero/tactical-hero-mobile.jpg',
    actionLabel: {
      en: 'Shop Tactical Gear',
      he: 'קנה ציוד טקטי'
    },
    actionUrl: '/categories/tactical-gear',
    secondaryActionLabel: {
      en: 'Learn More',
      he: 'למידע נוסף'
    },
    secondaryActionUrl: '/about/tactical',
    features: [
      heroFeatures.durability,
      heroFeatures.performance,
      heroFeatures.innovation
    ],
    theme: 'dark',
    align: 'left'
  },
  {
    id: 'outdoor',
    title: {
      en: 'Outdoor Adventure Essentials',
      he: 'ציוד חיוני להרפתקאות בחוץ'
    },
    subtitle: {
      en: 'Gear up for the wilderness',
      he: 'התכונן לטבע הפראי'
    },
    description: {
      en: 'Premium outdoor equipment for hiking, camping, and survival. Be prepared for any adventure.',
      he: 'ציוד חוץ פרימיום לטיולים, מחנאות והישרדות. היה מוכן לכל הרפתקה.'
    },
    image: '/images/hero/outdoor-hero.jpg',
    mobileImage: '/images/hero/outdoor-hero-mobile.jpg',
    actionLabel: {
      en: 'Explore Outdoor',
      he: 'חקור ציוד חוץ'
    },
    actionUrl: '/categories/outdoor-equipment',
    secondaryActionLabel: {
      en: 'View Guide',
      he: 'צפה במדריך'
    },
    secondaryActionUrl: '/guides/outdoor',
    features: [
      heroFeatures.quality,
      heroFeatures.durability,
      heroFeatures.expert
    ],
    theme: 'light',
    align: 'right'
  },
  {
    id: 'home-defense',
    title: {
      en: 'Home Defense Solutions',
      he: 'פתרונות הגנה לבית'
    },
    subtitle: {
      en: 'Protect what matters most',
      he: 'הגן על מה שחשוב לך ביותר'
    },
    description: {
      en: 'Advanced security and defense solutions for your home, designed with reliability and ease of use in mind.',
      he: 'פתרונות אבטחה והגנה מתקדמים לביתך, מתוכננים עם אמינות וקלות שימוש.'
    },
    image: '/images/hero/home-defense-hero.jpg',
    mobileImage: '/images/hero/home-defense-hero-mobile.jpg',
    actionLabel: {
      en: 'Browse Defense Products',
      he: 'עיין במוצרי הגנה'
    },
    actionUrl: '/categories/home-defense',
    secondaryActionLabel: {
      en: 'Security Tips',
      he: 'טיפים לאבטחה'
    },
    secondaryActionUrl: '/guides/home-security',
    features: [
      heroFeatures.innovation,
      heroFeatures.guarantee,
      heroFeatures.performance
    ],
    theme: 'dark',
    align: 'center'
  }
]; 
