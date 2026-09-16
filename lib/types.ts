export type Category = 'roadster-mt' | 'roadster-z' | 'sportive' | 'scooter' | 'casque' | 'accessoire';
export type Condition = 'neuf' | 'occasion';
export type Lang = 'fr' | 'ar' | 'en';

export interface Product {
  id: string;
  slug: string;
  category: Category;
  brand: string;
  model: string;
  year: number;
  km: number;
  priceDZD: number;
  oldPrice?: number;
  condition: Condition;
  engineCC: number;
  powerCH: number;
  torqueNm?: number;
  weightKg?: number;
  seatMm?: number;
  fuelL?: number;
  topKmh?: number;
  transmission: string;
  colors: string[];
  images: string[];
  desc: Record<Lang, string>;
  features: string[];
  stock: number;
  featured?: boolean;
  views?: number;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  productId: string;
  type: 'reservation' | 'essai';
  date: string;
  message?: string;
}

export const CATEGORIES: { id: Category | 'all'; fr: string; ar: string; en: string }[] = [
  { id: 'all', fr: 'Tout', ar: 'الكل', en: 'All' },
  { id: 'roadster-mt', fr: 'MT / Roadster', ar: 'MT / رودستر', en: 'MT / Roadster' },
  { id: 'roadster-z', fr: 'Z / Roadster', ar: 'Z / رودستر', en: 'Z / Roadster' },
  { id: 'sportive', fr: 'Sportive / Vitesse', ar: 'رياضية / سرعة', en: 'Sport / Superbike' },
  { id: 'scooter', fr: 'Scooter', ar: 'سكوتر', en: 'Scooter' },
  { id: 'casque', fr: 'Casques', ar: 'خوذات', en: 'Helmets' },
  { id: 'accessoire', fr: 'Accessoires', ar: 'إكسسوارات', en: 'Accessories' },
];

export const SHOWROOM = {
  name: 'APEX MOTO',
  city: 'Bir El Djir, Oran',
  plusCode: 'PCJR+7C4, Bir El Djir',
  phone: '0550 92 76 64',
  phoneIntl: '+213550927664',
  whatsapp: 'https://wa.me/213550927664',
  hours: 'Sam – Jeu · 09:00 – 21:00',
  rating: 4.8,
  reviewsCount: 6,
  mapsEmbed:
    'https://www.google.com/maps?q=PCJR%2B7C4+Bir+El+Djir+Oran&output=embed',
};
