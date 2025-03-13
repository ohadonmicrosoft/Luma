import React from 'react';
import { GetStaticProps } from 'next';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { ProductHighlights } from '@/components/home/ProductHighlights';
import { BrandStory } from '@/components/home/BrandStory';

// Mock data for hero section
const heroSlides = [
  {
    id: 'tactical-gear',
    title: {
      en: 'Tactical Gear for Every Mission',
      he: 'ציוד טקטי לכל משימה'
    },
    subtitle: {
      en: 'Professional Quality Equipment',
      he: 'ציוד באיכות מקצועית'
    },
    description: {
      en: 'Explore our range of tactical equipment designed for durability and performance in extreme conditions.',
      he: 'גלה את מגוון הציוד הטקטי שלנו המתוכנן לעמידות וביצועים בתנאים קיצוניים.'
    },
    image: '/images/hero/tactical-hero.jpg',
    actionLabel: {
      en: 'Shop Tactical Gear',
      he: 'לרכישת ציוד טקטי'
    },
    actionUrl: '/categories/tactical-gear',
    secondaryActionLabel: {
      en: 'View Equipment Guide',
      he: 'מדריך ציוד'
    },
    secondaryActionUrl: '/guides/tactical-equipment',
    features: [
      {
        id: 'feature-1',
        title: {
          en: 'Military-Grade',
          he: 'דרגה צבאית'
        },
        description: {
          en: 'Meets military specifications',
          he: 'עומד במפרטים צבאיים'
        },
        icon: '/images/icons/military-grade.svg',
      },
      {
        id: 'feature-2',
        title: {
          en: 'Weather Resistant',
          he: 'עמיד בפני מזג אוויר'
        },
        description: {
          en: 'Performs in all conditions',
          he: 'מבצע בכל התנאים'
        },
        icon: '/images/icons/weather-resistant.svg',
      },
      {
        id: 'feature-3',
        title: {
          en: '5-Year Warranty',
          he: 'אחריות ל-5 שנים'
        },
        description: {
          en: 'Guaranteed performance',
          he: 'ביצועים מובטחים'
        },
        icon: '/images/icons/warranty.svg',
      },
    ],
    theme: 'dark' as const,
    align: 'left' as const,
  },
  {
    id: 'home-accessories',
    title: {
      en: 'Elevate Your Living Space',
      he: 'שדרג את חלל המחיה שלך'
    },
    subtitle: {
      en: 'Premium Home Accessories',
      he: 'אביזרי בית פרימיום'
    },
    description: {
      en: 'Discover thoughtfully designed accessories that combine functionality with style for your home.',
      he: 'גלה אביזרים מעוצבים המשלבים פונקציונליות עם סגנון לבית שלך.'
    },
    image: '/images/hero/home-hero.jpg',
    actionLabel: {
      en: 'Shop Home Collection',
      he: 'לקולקציית הבית'
    },
    actionUrl: '/categories/home-accessories',
    features: [
      {
        id: 'feature-1',
        title: {
          en: 'Sustainable Materials',
          he: 'חומרים בני-קיימא'
        },
        description: {
          en: 'Eco-friendly design',
          he: 'עיצוב ידידותי לסביבה'
        },
        icon: '/images/icons/eco-friendly.svg',
      },
      {
        id: 'feature-2',
        title: {
          en: 'Handcrafted',
          he: 'עבודת יד'
        },
        description: {
          en: 'Artisan quality',
          he: 'איכות אומן'
        },
        icon: '/images/icons/handcrafted.svg',
      },
    ],
    theme: 'light' as const,
    align: 'center' as const,
  },
];

// Mock data for categories
const categoryGroups = [
  {
    id: 'tactical-categories',
    title: {
      en: 'Tactical Equipment',
      he: 'ציוד טקטי'
    },
    description: {
      en: 'Professional gear designed for durability and performance in extreme conditions',
      he: 'ציוד מקצועי המיועד לעמידות וביצועים בתנאים קיצוניים'
    },
    viewAllUrl: '/categories/tactical',
    viewAllLabel: {
      en: 'View All Tactical',
      he: 'צפה בכל הטקטי'
    },
    layout: 'showcase' as const,
    categories: [
      {
        id: 'backpacks',
        name: {
          en: 'Tactical Backpacks',
          he: 'תרמילי גב טקטיים'
        },
        description: {
          en: 'Durable tactical backpacks designed for heavy-duty use with multiple storage compartments and MOLLE systems for customizable attachments.',
          he: 'תרמילי גב טקטיים עמידים המיועדים לשימוש כבד עם תאי אחסון מרובים ומערכות MOLLE לחיבורים מותאמים אישית.'
        },
        slug: 'tactical-backpacks',
        image: '/images/categories/tactical-backpacks.jpg',
        usageScenarios: [
          {
            name: {
              en: 'Military',
              he: 'צבאי'
            },
            icon: '/images/icons/military.svg'
          },
          {
            name: {
              en: 'Hiking',
              he: 'טיולים'
            },
            icon: '/images/icons/hiking.svg'
          },
          {
            name: {
              en: 'Emergency',
              he: 'חירום'
            },
            icon: '/images/icons/emergency.svg'
          }
        ]
      },
      {
        id: 'flashlights',
        name: {
          en: 'Tactical Flashlights',
          he: 'פנסים טקטיים'
        },
        description: {
          en: 'High-performance flashlights with adjustable beam focus, multiple lighting modes, and rugged construction for reliable illumination in any situation.',
          he: 'פנסים בעלי ביצועים גבוהים עם מיקוד קרן מתכוונן, מצבי תאורה מרובים, ובנייה חזקה לתאורה אמינה בכל מצב.'
        },
        slug: 'tactical-flashlights',
        image: '/images/categories/tactical-flashlights.jpg',
        usageScenarios: [
          {
            name: {
              en: 'Night Operations',
              he: 'פעולות לילה'
            },
            icon: '/images/icons/night.svg'
          },
          {
            name: {
              en: 'Search & Rescue',
              he: 'חיפוש והצלה'
            },
            icon: '/images/icons/rescue.svg'
          }
        ]
      },
    ]
  },
  {
    id: 'home-categories',
    title: {
      en: 'Home Accessories',
      he: 'אביזרי בית'
    },
    description: {
      en: 'Thoughtfully designed pieces that combine functionality with style for your home',
      he: 'פריטים מעוצבים בקפידה המשלבים פונקציונליות עם סגנון לבית שלך'
    },
    viewAllUrl: '/categories/home',
    viewAllLabel: {
      en: 'View All Home',
      he: 'צפה בכל הבית'
    },
    layout: 'grid' as const,
    categories: [
      {
        id: 'kitchen',
        name: {
          en: 'Kitchen Essentials',
          he: 'כלים חיוניים למטבח'
        },
        description: {
          en: 'Premium kitchen tools and accessories designed for durability and performance.',
          he: 'כלי מטבח ואביזרים איכותיים המיועדים לעמידות וביצועים.'
        },
        slug: 'kitchen-essentials',
        image: '/images/categories/kitchen.jpg',
        featuredProducts: 24
      },
      {
        id: 'lighting',
        name: {
          en: 'Home Lighting',
          he: 'תאורה לבית'
        },
        description: {
          en: 'Stylish lighting solutions to create the perfect ambiance in any room.',
          he: 'פתרונות תאורה מעוצבים ליצירת אווירה מושלמת בכל חדר.'
        },
        slug: 'home-lighting',
        image: '/images/categories/lighting.jpg',
        featuredProducts: 18
      },
      {
        id: 'storage',
        name: {
          en: 'Storage Solutions',
          he: 'פתרונות אחסון'
        },
        description: {
          en: 'Innovative storage systems to keep your home organized and clutter-free.',
          he: 'מערכות אחסון חדשניות לשמירה על הבית מאורגן ונקי מאי-סדר.'
        },
        slug: 'storage-solutions',
        image: '/images/categories/storage.jpg',
        featuredProducts: 15
      },
    ]
  },
  {
    id: 'popular-categories',
    title: {
      en: 'Popular Categories',
      he: 'קטגוריות פופולריות'
    },
    viewAllUrl: '/categories',
    viewAllLabel: {
      en: 'All Categories',
      he: 'כל הקטגוריות'
    },
    layout: 'compact' as const,
    categories: [
      {
        id: 'backpacks',
        name: {
          en: 'Backpacks',
          he: 'תרמילי גב'
        },
        slug: 'backpacks',
        image: '/images/categories/backpacks-thumb.jpg',
        featuredProducts: 42
      },
      {
        id: 'flashlights',
        name: {
          en: 'Flashlights',
          he: 'פנסים'
        },
        slug: 'flashlights',
        image: '/images/categories/flashlights-thumb.jpg',
        featuredProducts: 28
      },
      {
        id: 'kitchen',
        name: {
          en: 'Kitchen',
          he: 'מטבח'
        },
        slug: 'kitchen',
        image: '/images/categories/kitchen-thumb.jpg',
        featuredProducts: 36
      },
      {
        id: 'camping',
        name: {
          en: 'Camping',
          he: 'קמפינג'
        },
        slug: 'camping',
        image: '/images/categories/camping-thumb.jpg',
        featuredProducts: 31
      },
      {
        id: 'lighting',
        name: {
          en: 'Lighting',
          he: 'תאורה'
        },
        slug: 'lighting',
        image: '/images/categories/lighting-thumb.jpg',
        featuredProducts: 24
      },
      {
        id: 'storage',
        name: {
          en: 'Storage',
          he: 'אחסון'
        },
        slug: 'storage',
        image: '/images/categories/storage-thumb.jpg',
        featuredProducts: 19
      },
    ]
  },
];

// Mock data for featured products
const featuredProducts = [
  {
    id: 'tactical-backpack-pro',
    slug: 'tactical-backpack-pro',
    name: {
      en: 'Tactical Backpack Pro',
      he: 'תרמיל גב טקטי פרו'
    },
    description: {
      en: 'Military-grade tactical backpack with MOLLE system and multiple compartments.',
      he: 'תרמיל גב טקטי בדרגה צבאית עם מערכת MOLLE ותאים מרובים.'
    },
    price: 149.99,
    currency: 'USD',
    mainImage: '/images/products/tactical-backpack-pro.jpg',
    badges: [
      {
        text: {
          en: 'Military Grade',
          he: 'דרגה צבאית'
        },
        type: 'featured'
      }
    ],
    category: {
      id: 'backpacks',
      name: {
        en: 'Backpacks',
        he: 'תרמילי גב'
      }
    },
    brand: {
      id: 'tactix',
      name: {
        en: 'TactiX',
        he: 'טקטיקס'
      }
    },
    specifications: [
      {
        id: 'capacity',
        name: {
          en: 'Capacity',
          he: 'קיבולת'
        },
        value: 45,
        unit: 'L',
        isHighlight: true
      },
      {
        id: 'weight',
        name: {
          en: 'Weight',
          he: 'משקל'
        },
        value: 1.2,
        unit: 'kg',
        isHighlight: true
      },
      {
        id: 'material',
        name: {
          en: 'Material',
          he: 'חומר'
        },
        value: '1000D Cordura',
        isHighlight: true
      }
    ],
    rating: 4.8,
    reviewCount: 124,
    isInStock: true,
    stockQuantity: 35
  },
  {
    id: 'tactical-flashlight-x800',
    slug: 'tactical-flashlight-x800',
    name: {
      en: 'Tactical Flashlight X800',
      he: 'פנס טקטי X800'
    },
    description: {
      en: 'Ultra-bright tactical flashlight with 5 lighting modes and zoom function.',
      he: 'פנס טקטי בהיר במיוחד עם 5 מצבי תאורה ופונקצית זום.'
    },
    price: 89.99,
    currency: 'USD',
    mainImage: '/images/products/tactical-flashlight-x800.jpg',
    badges: [
      {
        text: {
          en: 'New',
          he: 'חדש'
        },
        type: 'new'
      }
    ],
    category: {
      id: 'flashlights',
      name: {
        en: 'Flashlights',
        he: 'פנסים'
      }
    },
    brand: {
      id: 'lumina',
      name: {
        en: 'Lumina',
        he: 'לומינה'
      }
    },
    specifications: [
      {
        id: 'lumens',
        name: {
          en: 'Brightness',
          he: 'בהירות'
        },
        value: 2000,
        unit: 'lm',
        isHighlight: true
      },
      {
        id: 'battery',
        name: {
          en: 'Battery',
          he: 'סוללה'
        },
        value: '18650 Li-ion',
        isHighlight: true
      },
      {
        id: 'runtime',
        name: {
          en: 'Runtime',
          he: 'זמן פעולה'
        },
        value: 4.5,
        unit: 'h',
        isHighlight: true
      }
    ],
    rating: 4.7,
    reviewCount: 86,
    isInStock: true,
    stockQuantity: 42
  },
  {
    id: 'premium-chef-knife',
    slug: 'premium-chef-knife',
    name: {
      en: 'Premium Chef Knife',
      he: 'סכין שף פרימיום'
    },
    description: {
      en: 'Professional 8-inch chef knife made from high-carbon stainless steel.',
      he: 'סכין שף מקצועית 8 אינץ\' עשויה מפלדת אל-חלד עם פחמן גבוה.'
    },
    price: 129.99,
    currency: 'USD',
    discountedPrice: 99.99,
    mainImage: '/images/products/premium-chef-knife.jpg',
    badges: [
      {
        text: {
          en: 'Sale',
          he: 'מבצע'
        },
        type: 'sale'
      }
    ],
    category: {
      id: 'kitchen',
      name: {
        en: 'Kitchen',
        he: 'מטבח'
      }
    },
    brand: {
      id: 'culina',
      name: {
        en: 'Culina',
        he: 'קולינה'
      }
    },
    specifications: [
      {
        id: 'blade-length',
        name: {
          en: 'Blade Length',
          he: 'אורך להב'
        },
        value: 8,
        unit: 'in',
        isHighlight: true
      },
      {
        id: 'material',
        name: {
          en: 'Material',
          he: 'חומר'
        },
        value: 'VG-10 Steel',
        isHighlight: true
      },
      {
        id: 'handle',
        name: {
          en: 'Handle',
          he: 'ידית'
        },
        value: 'G10 Composite',
        isHighlight: true
      }
    ],
    rating: 4.9,
    reviewCount: 152,
    isInStock: true,
    stockQuantity: 28
  },
  {
    id: 'modular-storage-system',
    slug: 'modular-storage-system',
    name: {
      en: 'Modular Storage System',
      he: 'מערכת אחסון מודולרית'
    },
    description: {
      en: 'Customizable storage solution for any space with interlocking components.',
      he: 'פתרון אחסון מותאם אישית לכל חלל עם רכיבים משתלבים.'
    },
    price: 199.99,
    currency: 'USD',
    mainImage: '/images/products/modular-storage-system.jpg',
    category: {
      id: 'storage',
      name: {
        en: 'Storage',
        he: 'אחסון'
      }
    },
    brand: {
      id: 'organize',
      name: {
        en: 'Organize',
        he: 'אורגנייז'
      }
    },
    specifications: [
      {
        id: 'modules',
        name: {
          en: 'Modules',
          he: 'מודולים'
        },
        value: 6,
        unit: 'pcs',
        isHighlight: true
      },
      {
        id: 'material',
        name: {
          en: 'Material',
          he: 'חומר'
        },
        value: 'Bamboo & Steel',
        isHighlight: true
      },
      {
        id: 'weight-capacity',
        name: {
          en: 'Weight Capacity',
          he: 'קיבולת משקל'
        },
        value: 25,
        unit: 'kg/shelf',
        isHighlight: true
      }
    ],
    rating: 4.6,
    reviewCount: 64,
    isInStock: true,
    stockQuantity: 15
  },
  {
    id: 'tactical-watch-g7',
    slug: 'tactical-watch-g7',
    name: {
      en: 'Tactical Watch G7',
      he: 'שעון טקטי G7'
    },
    description: {
      en: 'Military-grade tactical watch with GPS, compass, and multiple sensors.',
      he: 'שעון טקטי בדרגה צבאית עם GPS, מצפן וחיישנים מרובים.'
    },
    price: 299.99,
    currency: 'USD',
    mainImage: '/images/products/tactical-watch-g7.jpg',
    badges: [
      {
        text: {
          en: 'Bestseller',
          he: 'רב מכר'
        },
        type: 'featured'
      }
    ],
    category: {
      id: 'watches',
      name: {
        en: 'Watches',
        he: 'שעונים'
      }
    },
    brand: {
      id: 'tactix',
      name: {
        en: 'TactiX',
        he: 'טקטיקס'
      }
    },
    specifications: [
      {
        id: 'battery-life',
        name: {
          en: 'Battery Life',
          he: 'חיי סוללה'
        },
        value: 30,
        unit: 'days',
        isHighlight: true
      },
      {
        id: 'water-resistance',
        name: {
          en: 'Water Resistance',
          he: 'עמידות למים'
        },
        value: 100,
        unit: 'm',
        isHighlight: true
      },
      {
        id: 'weight',
        name: {
          en: 'Weight',
          he: 'משקל'
        },
        value: 85,
        unit: 'g',
        isHighlight: true
      }
    ],
    rating: 4.8,
    reviewCount: 117,
    isInStock: true,
    stockQuantity: 22
  },
  {
    id: 'copper-pendant-light',
    slug: 'copper-pendant-light',
    name: {
      en: 'Copper Pendant Light',
      he: 'גוף תאורה תלוי מנחושת'
    },
    description: {
      en: 'Modern copper pendant light with adjustable height and warm illumination.',
      he: 'גוף תאורה תלוי מודרני מנחושת עם גובה מתכוונן ותאורה חמה.'
    },
    price: 169.99,
    currency: 'USD',
    discountedPrice: 139.99,
    mainImage: '/images/products/copper-pendant-light.jpg',
    badges: [
      {
        text: {
          en: 'Sale',
          he: 'מבצע'
        },
        type: 'sale'
      }
    ],
    category: {
      id: 'lighting',
      name: {
        en: 'Lighting',
        he: 'תאורה'
      }
    },
    brand: {
      id: 'illuminate',
      name: {
        en: 'Illuminate',
        he: 'אילומינייט'
      }
    },
    specifications: [
      {
        id: 'diameter',
        name: {
          en: 'Diameter',
          he: 'קוטר'
        },
        value: 30,
        unit: 'cm',
        isHighlight: true
      },
      {
        id: 'bulb-type',
        name: {
          en: 'Bulb Type',
          he: 'סוג נורה'
        },
        value: 'E27 LED',
        isHighlight: true
      },
      {
        id: 'material',
        name: {
          en: 'Material',
          he: 'חומר'
        },
        value: 'Copper',
        isHighlight: true
      }
    ],
    rating: 4.5,
    reviewCount: 78,
    isInStock: true,
    stockQuantity: 34
  },
];

// Mock data for brand story
const brandStoryData = {
  title: {
    en: 'Building Equipment for Life\'s Toughest Challenges',
    he: 'בניית ציוד לאתגרים הקשים ביותר בחיים'
  },
  subtitle: {
    en: 'Our Story',
    he: 'הסיפור שלנו'
  },
  description: {
    en: 'At Luma, we believe that the right equipment can make all the difference when facing life\'s challenges. Founded by former military specialists and design experts, we create products that blend uncompromising durability with thoughtful design.\n\nOur tactical line is built to military specifications, tested in extreme conditions, and trusted by professionals worldwide. Meanwhile, our home collection brings that same attention to quality and functionality into everyday living.',
    he: 'בלומה, אנו מאמינים שהציוד הנכון יכול לעשות את כל ההבדל כאשר מתמודדים עם אתגרי החיים. נוסדנו על ידי מומחים צבאיים לשעבר ומומחי עיצוב, אנו יוצרים מוצרים המשלבים עמידות ללא פשרות עם עיצוב מחושב.\n\nקו המוצרים הטקטי שלנו בנוי לפי מפרטים צבאיים, נבדק בתנאים קיצוניים, ואמין על ידי אנשי מקצוע בכל העולם. במקביל, קולקציית הבית שלנו מביאה את אותה תשומת לב לאיכות ולפונקציונליות לחיי היומיום.'
  },
  image: '/images/brand/tactical-testing.jpg',
  secondaryImage: '/images/brand/design-studio.jpg',
  values: [
    {
      id: 'durability',
      title: {
        en: 'Uncompromising Durability',
        he: 'עמידות ללא פשרות'
      },
      description: {
        en: 'Every product undergoes rigorous testing in extreme conditions to ensure it performs when you need it most.',
        he: 'כל מוצר עובר בדיקות קפדניות בתנאים קיצוניים כדי להבטיח שהוא פועל כאשר אתה זקוק לו ביותר.'
      },
      icon: '/images/icons/durability.svg'
    },
    {
      id: 'functionality',
      title: {
        en: 'Purposeful Functionality',
        he: 'פונקציונליות ממוקדת מטרה'
      },
      description: {
        en: 'We design with purpose, ensuring every feature serves a function and enhances the user experience.',
        he: 'אנו מעצבים עם מטרה, מבטיחים שכל תכונה משרתת פונקציה ומשפרת את חווית המשתמש.'
      },
      icon: '/images/icons/functionality.svg'
    },
    {
      id: 'innovation',
      title: {
        en: 'Continuous Innovation',
        he: 'חדשנות מתמדת'
      },
      description: {
        en: 'We constantly research and develop new materials and technologies to improve our products.',
        he: 'אנו חוקרים ומפתחים באופן קבוע חומרים וטכנולוגיות חדשות לשיפור המוצרים שלנו.'
      },
      icon: '/images/icons/innovation.svg'
    },
  ],
  statistics: [
    {
      value: '15+',
      label: {
        en: 'Years Experience',
        he: 'שנות ניסיון'
      }
    },
    {
      value: '1000+',
      label: {
        en: 'Products',
        he: 'מוצרים'
      }
    },
    {
      value: '50+',
      label: {
        en: 'Countries',
        he: 'מדינות'
      }
    },
    {
      value: '500,000+',
      label: {
        en: 'Satisfied Customers',
        he: 'לקוחות מרוצים'
      }
    },
  ],
  testimonial: {
    id: 'testimonial-1',
    quote: {
      en: 'Luma equipment has been my trusted companion on expeditions across five continents. The durability is unmatched, and the attention to detail in every product shows a deep understanding of what professionals need in the field.',
      he: 'הציוד של לומה היה בן לוויה אמין שלי במשלחות בחמש יבשות. העמידות אין כמוה, ותשומת הלב לפרטים בכל מוצר מראה הבנה עמוקה של מה שאנשי מקצוע צריכים בשטח.'
    },
    author: {
      name: {
        en: 'Michael Torres',
        he: 'מייקל טורס'
      },
      title: {
        en: 'Professional Expedition Guide',
        he: 'מדריך משלחות מקצועי'
      },
      image: '/images/testimonials/expedition-guide.jpg'
    }
  },
  ctaText: {
    en: 'Explore Our Story',
    he: 'גלה את הסיפור שלנו'
  },
  ctaLink: '/about',
  badges: [
    {
      text: {
        en: 'Military Tested',
        he: 'נבדק צבאית'
      },
      icon: '/images/icons/military-tested.svg'
    },
    {
      text: {
        en: 'Lifetime Warranty',
        he: 'אחריות לכל החיים'
      },
      icon: '/images/icons/warranty.svg'
    }
  ],
  alignment: 'right' as const,
};

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection slides={heroSlides} />
      
      {/* Featured Categories */}
      <FeaturedCategories categoryGroups={categoryGroups} />
      
      {/* Featured Products */}
      <ProductHighlights
        title={{
          en: 'Best Selling Tactical Gear',
          he: 'ציוד טקטי הנמכר ביותר'
        }}
        subtitle={{
          en: 'Professional equipment for demanding conditions',
          he: 'ציוד מקצועי לתנאים תובעניים'
        }}
        products={featuredProducts.filter(p => 
          p.category?.id === 'backpacks' || 
          p.category?.id === 'flashlights' || 
          p.category?.id === 'watches'
        )}
        viewAllUrl="/categories/tactical"
        viewAllLabel={{
          en: 'View All Tactical',
          he: 'צפה בכל הטקטי'
        }}
        compareUrl="/compare"
        compareLabel={{
          en: 'Compare Selected',
          he: 'השווה מוצרים נבחרים'
        }}
        selectableProducts={true}
        layout="carousel"
      />
      
      {/* Brand Story */}
      <BrandStory {...brandStoryData} />
      
      {/* Home Collection Products */}
      <ProductHighlights
        title={{
          en: 'Premium Home Collection',
          he: 'קולקציית בית פרימיום'
        }}
        subtitle={{
          en: 'Thoughtfully designed pieces that combine functionality with style',
          he: 'פריטים מעוצבים בקפידה המשלבים פונקציונליות עם סגנון'
        }}
        products={featuredProducts.filter(p => 
          p.category?.id === 'kitchen' || 
          p.category?.id === 'lighting' || 
          p.category?.id === 'storage'
        )}
        viewAllUrl="/categories/home"
        viewAllLabel={{
          en: 'View All Home',
          he: 'צפה בכל הבית'
        }}
        layout="featured"
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // In a real app, you would fetch data from an API here
  return {
    props: {},
    revalidate: 60 * 60, // Revalidate every hour
  };
};
