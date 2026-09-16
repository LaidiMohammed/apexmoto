import type { Lang } from './types';

export const STR: Record<string, Record<Lang, string>> = {
  home: { fr: 'Accueil', ar: 'الرئيسية', en: 'Home' },
  motos: { fr: 'Motos', ar: 'الدراجات', en: 'Bikes' },
  gear: { fr: 'Casques & Accessoires', ar: 'خوذات وإكسسوارات', en: 'Gear & Accessories' },
  about: { fr: 'À propos', ar: 'من نحن', en: 'About' },
  contact: { fr: 'Contact', ar: 'اتصل بنا', en: 'Contact' },
  heroKicker: { fr: 'SHOWROOM · BIR EL DJIR · ORAN', ar: 'صالة عرض · بير الجير · وهران', en: 'SHOWROOM · BIR EL DJIR · ORAN' },
  heroTitleA: { fr: 'LA PUISSANCE', ar: 'القوة', en: 'RAW POWER' },
  heroTitleB: { fr: 'A DEUX ROUES', ar: 'على عجلتين', en: 'ON TWO WHEELS' },
  heroSub: {
    fr: 'MT · Z · Sportives · Scooters — neuf & occasion contrôlée. Essayez, comparez, repartez.',
    ar: 'MT · Z · رياضية · سكوتر — جديد ومستعمل مفحوص. جرّب، قارن، وانطلق.',
    en: 'MT · Z · Superbikes · Scooters — new & inspected used. Test, compare, ride out.',
  },
  catalog: { fr: 'Voir le catalogue', ar: 'شاهد الكتالوج', en: 'Browse catalog' },
  whatsapp: { fr: 'WhatsApp direct', ar: 'واتساب مباشر', en: 'WhatsApp us' },
  featured: { fr: 'Sélection du moment', ar: 'مختارات مميزة', en: 'Featured now' },
  searchPh: { fr: 'Rechercher MT-07, TMAX, Z900…', ar: 'ابحث عن MT-07، TMAX…', en: 'Search MT-07, TMAX, Z900…' },
  details: { fr: 'Détails', ar: 'التفاصيل', en: 'Details' },
  reserve: { fr: 'Réserver sur WhatsApp', ar: 'احجز عبر واتساب', en: 'Reserve on WhatsApp' },
  testRide: { fr: "Demande d'essai", ar: 'طلب تجربة', en: 'Book a test ride' },
  year: { fr: 'Année', ar: 'السنة', en: 'Year' },
  km: { fr: 'Kilométrage', ar: 'الكيلومترات', en: 'Mileage' },
  price: { fr: 'Prix', ar: 'السعر', en: 'Price' },
  askApex: { fr: 'Une question ? Demandez à Apex AI', ar: 'عندك سؤال؟ اسأل Apex AI', en: 'Questions? Ask Apex AI' },
};

export function t(key: string, lang: Lang): string {
  return STR[key]?.[lang] ?? STR[key]?.['fr'] ?? key;
}

export const fmtDZD = (n: number) =>
  new Intl.NumberFormat('fr-DZ').format(n) + ' DA';
export const fmtKm = (n: number) =>
  n === 0 ? '0 km (neuf)' : new Intl.NumberFormat('fr-DZ').format(n) + ' km';
