import type { Product } from './types';

const img = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`;

export const SEED: Product[] = [
  {
    id: 'mt07-2023', slug: 'yamaha-mt-07-2023', category: 'roadster-mt', brand: 'Yamaha', model: 'MT-07', year: 2023, km: 4200, priceDZD: 1890000, oldPrice: 1990000, condition: 'occasion', engineCC: 689, powerCH: 74, transmission: '6 vitesses', colors: ['Noir', 'Bleu'], featured: true, stock: 2, views: 214,
    images: [img('photo-1568772585407-9361f9bf3a87'), img('photo-1558981403-c5f9899a28bc'), img('photo-1591637333184-19aa84b3e01f')],
    desc: { fr: "MT-07 occasion impeccable, couple légendaire CP2, idéale ville + route. Entretien suivi, pneus neufs.", ar: "MT-07 بحالة ممتازة، عزم قوي، مثالية للمدينة والطريق. صيانة منتظمة وإطارات جديدة.", en: "Clean used MT-07, legendary CP2 torque, perfect city + road. Serviced, new tires." },
    features: ['ABS', 'Éclairage LED', 'Pneus neufs', 'Garantie showroom 3 mois'],
  },
  {
    id: 'mt09-2024', slug: 'yamaha-mt-09-2024', category: 'roadster-mt', brand: 'Yamaha', model: 'MT-09', year: 2024, km: 0, priceDZD: 2890000, condition: 'neuf', engineCC: 890, powerCH: 119, transmission: '6 vitesses + quickshifter', colors: ['Noir', 'Gris'], featured: true, stock: 3, views: 310,
    images: [img('photo-1609630875171-b1321377ee65'), img('photo-1568772585407-9361f9bf3a87')],
    desc: { fr: "MT-09 2024 neuve, 3 cylindres CP3, quickshifter, modes D-Mode. La reine des roadsters.", ar: "MT-09 جديدة 2024، محرك 3 سلندر، كويك شيفتر. ملكة الرودستر.", en: "Brand new 2024 MT-09, CP3 triple, quickshifter, D-Modes. The roadster queen." },
    features: ['Quickshifter', '3 modes conduite', 'TFT 5"', 'Traction control'],
  },
  {
    id: 'z900-2023', slug: 'kawasaki-z900-2023', category: 'roadster-z', brand: 'Kawasaki', model: 'Z900', year: 2023, km: 6100, priceDZD: 2350000, condition: 'occasion', engineCC: 948, powerCH: 125, transmission: '6 vitesses', colors: ['Vert', 'Noir'], featured: true, stock: 1, views: 402,
    images: [img('photo-1547549082-6bc09f2049ae'), img('photo-1558981403-c5f9899a28bc')],
    desc: { fr: "Z900 Sugomi, 4 cylindres rageur, position agressive. Parfait pour passer de MT à plus radical.", ar: "Z900 بأسلوب Sugomi، 4 سلندر قوي، وضعية هجومية.", en: "Z900 Sugomi, wild inline-4, aggressive stance. Step up from MT." },
    features: ['4 cylindres', 'ABS + KTRC', 'Échappement Akrapovic option', 'Historique complet'],
  },
  {
    id: 'z650-2022', slug: 'kawasaki-z650-2022', category: 'roadster-z', brand: 'Kawasaki', model: 'Z650', year: 2022, km: 9800, priceDZD: 1590000, condition: 'occasion', engineCC: 649, powerCH: 68, transmission: '6 vitesses', colors: ['Noir'], featured: false, stock: 2, views: 150,
    images: [img('photo-1591637333184-19aa84b3e01f'), img('photo-1547549082-6bc09f2049ae')],
    desc: { fr: "Z650 accessible permis A2, légère et maniable. Idéale première grosse cylindrée.", ar: "Z650 مناسبة لرخصة A2، خفيفة وسهلة. مثالية كأول دراجة كبيرة.", en: "A2-friendly Z650, light and nimble. Ideal first big bike." },
    features: ['A2 compatible', 'Basse selle 790mm', 'Économique'],
  },
  {
    id: 'cbr600-2021', slug: 'honda-cbr600rr-2021', category: 'sportive', brand: 'Honda', model: 'CBR600RR', year: 2021, km: 12000, priceDZD: 2690000, condition: 'occasion', engineCC: 599, powerCH: 121, transmission: '6 vitesses', colors: ['Rouge'], featured: true, stock: 1, views: 520,
    images: [img('photo-1580310614729-ccd69652491d'), img('photo-1609630875171-b1321377ee65')],
    desc: { fr: "Sportive pure, position vitesse, carénage agressif. Pour circuit et passion.", ar: "دراجة رياضية خالصة، وضعية سرعة، انسيابية عدوانية.", en: "Pure supersport, racing position. For track and passion." },
    features: ['Showa Big Piston', 'Quickshifter', 'Carénage carbone option'],
  },
  {
    id: 'gsxr750-2022', slug: 'suzuki-gsx-r750-2022', category: 'sportive', brand: 'Suzuki', model: 'GSX-R750', year: 2022, km: 7500, priceDZD: 2490000, condition: 'occasion', engineCC: 750, powerCH: 150, transmission: '6 vitesses', colors: ['Bleu'], featured: false, stock: 1, views: 233,
    images: [img('photo-1615172282427-9a57ef2d142e'), img('photo-1580310614729-ccd69652491d')],
    desc: { fr: "La légendaire Gex 750, équilibre 600/1000. État collection.", ar: "الأسطورية GSX-R750، توازن مثالي. حالة ممتازة.", en: "Legendary GSX-R750, best of 600/1000 balance." },
    features: ['Brembo', 'Modes S-DMS', 'Pneus Bridgestone neufs'],
  },
  {
    id: 'tmax560-2023', slug: 'yamaha-tmax-560-2023', category: 'scooter', brand: 'Yamaha', model: 'TMAX 560', year: 2023, km: 3800, priceDZD: 2590000, condition: 'occasion', engineCC: 562, powerCH: 47, transmission: 'Automatique CVT', colors: ['Gris', 'Noir'], featured: true, stock: 2, views: 610,
    images: [img('photo-1571068316344-75bc76f77890'), img('photo-1591637333184-19aa84b3e01f')],
    desc: { fr: "Le roi des scooters, confort + perf. Coffre, pare-brise électrique, poignées chauffantes.", ar: "ملك السكوترات، راحة وأداء. صندوق، زجاج كهربائي.", en: "King of maxi-scooters, comfort + performance." },
    features: ['Pare-brise électrique', 'Poignées chauffantes', 'GPS + connectivité', 'Top-case offert'],
  },
  {
    id: 'forza750-2024', slug: 'honda-forza-750-2024', category: 'scooter', brand: 'Honda', model: 'Forza 750', year: 2024, km: 0, priceDZD: 2290000, condition: 'neuf', engineCC: 745, powerCH: 58, transmission: 'DCT automatique', colors: ['Blanc', 'Noir'], featured: false, stock: 4, views: 180,
    images: [img('photo-1609630875171-b1321377ee65'), img('photo-1571068316344-75bc76f77890')],
    desc: { fr: "Forza 750 DCT neuf, boîte double embrayage, conso basse. Le choix malin face au TMAX.", ar: "Forza 750 جديد بعلبة DCT، اقتصاد في الوقود.", en: "New Forza 750 DCT, twin-clutch, low consumption. Smart TMAX rival." },
    features: ['Boîte DCT', '4 modes', 'Coffre 2 casques', 'Garantie 2 ans'],
  },
  {
    id: 'vespa-gts', slug: 'vespa-gts-300-2023', category: 'scooter', brand: 'Vespa', model: 'GTS 300', year: 2023, km: 2100, priceDZD: 1190000, condition: 'occasion', engineCC: 278, powerCH: 24, transmission: 'Automatique', colors: ['Beige', 'Vert'], featured: false, stock: 3, views: 120,
    images: [img('photo-1517846693594-1567da72af75'), img('photo-1571068316344-75bc76f77890')],
    desc: { fr: "Vespa iconique, chic urbain Oran. Parfaite commute Bir El Djir → centre.", ar: "فيسبا أنيقة، مثالية للتنقل اليومي في وهران.", en: "Iconic Vespa, chic Oran commuter." },
    features: ['ABS + ASR', 'Design italien', 'Porte-bagage chrome'],
  },
  {
    id: 'shoei-gt', slug: 'shoei-gt-air-2', category: 'casque', brand: 'Shoei', model: 'GT-Air 2', year: 2024, km: 0, priceDZD: 89000, condition: 'neuf', engineCC: 0, powerCH: 0, transmission: '-', colors: ['Noir', 'Blanc'], featured: false, stock: 12, views: 90,
    images: [img('photo-1557800636-894a64c1696f'), img('photo-1591637333184-19aa84b3e01f')],
    desc: { fr: "Casque intégral premium, écran solaire, Pinlock. Tailles S à XXL.", ar: "خوذة ممتازة مع نظارة شمسية. مقاسات S إلى XXL.", en: "Premium full-face, sun visor, Pinlock. S to XXL." },
    features: ['ECE 22.06', 'Pinlock inclus', 'Intercom ready'],
  },
  {
    id: 'alpinestars-gants', slug: 'alpinestars-gp-plus', category: 'accessoire', brand: 'Alpinestars', model: 'GP Plus R V3', year: 2024, km: 0, priceDZD: 32000, condition: 'neuf', engineCC: 0, powerCH: 0, transmission: '-', colors: ['Noir/Rouge'], featured: false, stock: 20, views: 60,
    images: [img('photo-1558980664-10e7170b5df9'), img('photo-1558981403-c5f9899a28bc')],
    desc: { fr: "Gants racing cuir, protections carbone. Blouson et bottes dispos en magasin.", ar: "قفازات سباق جلدية بحماية كربون.", en: "Racing leather gloves, carbon protection." },
    features: ['Cuir véritable', 'Renfort carbone', 'Touchscreen'],
  },
  {
    id: 'akrapovic-ech', slug: 'akrapovic-slip-on-mt07', category: 'accessoire', brand: 'Akrapovic', model: "Slip-On MT-07", year: 2024, km: 0, priceDZD: 145000, condition: 'neuf', engineCC: 0, powerCH: 0, transmission: '-', colors: ['Titane'], featured: false, stock: 5, views: 140,
    images: [img('photo-1568772585407-9361f9bf3a87'), img('photo-1609630875171-b1321377ee65')],
    desc: { fr: "Échappement Akrapovic titane, sonorité racing, +3ch. Montage offert au showroom.", ar: "عادم Akrapovic تيتانيوم، صوت رياضي. التركيب مجاني.", en: "Akrapovic titanium slip-on, racing sound. Free fitting." },
    features: ['Titane', 'Homologué', 'Montage offert'],
  },
];
