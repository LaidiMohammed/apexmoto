import type { Lang, Product } from './types';
import { fmtDZD } from './i18n';

export interface ChatMsg { role: 'user' | 'bot'; text: string }

const KB: Record<string, Record<Lang, string>> = {
  diff: {
    fr: "**MT vs Z vs Sportive vs Scooter :**\n• **MT (Yamaha)** : couple, fun, position droite — parfait Oran ville + route.\n• **Z (Kawasaki)** : plus agressif, 4 cylindres, look Sugomi.\n• **Sportive/Vitesse** : carénée, position penchée, circuit & passion (moins confortable).\n• **Scooter (TMAX/Forza)** : automatique, coffre, confort max — idéal quotidien Bir El Djir → Oran.",
    ar: "**الفرق MT و Z والرياضية والسكوتر:**\n• **MT**: عزم ومتعة ووضعية مريحة.\n• **Z**: عدوانية أكثر و4 سلندر.\n• **الرياضية**: للسرعة والحلبة.\n• **السكوتر**: أوتوماتيك وصندوق وراحة يومية.",
    en: "**MT vs Z vs Superbike vs Scooter:**\n• **MT**: torquey, fun, upright — best all-rounder.\n• **Z**: sharper, inline-4, Sugomi look.\n• **Superbike**: faired, committed, track & passion.\n• **Scooter**: twist-and-go, storage, daily comfort.",
  },
  contact: {
    fr: "📍 PCJR+7C4, Bir El Djir — ⏰ Ouvert jusqu'à 21:00 — ☎️ 0550 92 76 64 — WhatsApp direct disponible.",
    ar: "📍 بير الجير PCJR+7C4 — ⏰ مفتوح حتى 21:00 — ☎️ 0550 92 76 64",
    en: "📍 PCJR+7C4, Bir El Djir — ⏰ Open till 9PM — ☎️ 0550 92 76 64",
  },
};

export function botReply(q: string, lang: Lang, products: Product[]): string {
  const s = q.toLowerCase();
  if (/bonjour|salam|salut|hello|azul|cc/.test(s))
    return lang === 'ar' ? 'وعليكم السلام! أنا Apex AI. تحب MT ولا Z ولا سكوتر؟ قولي ميزانيتك واستعمالك.' : lang === 'en' ? "Hello! I'm Apex AI. MT, Z or scooter? Tell me budget + use and I'll recommend." : "Salut ! Je suis Apex AI. Tu cherches MT, Z, sportive ou scooter ? Dis-moi budget + usage.";
  if (/horaire|heure|ouvert|ferme|address|adresse|où|map|téléphone|tel|phone|وين|مفتوح|هاتف/.test(s)) return KB.contact[lang];
  if (/différence|difference|diff|mt.*z|z.*mt|scooter.*vitesse|وش الفرق|الفرق|vs|compare/.test(s)) return KB.diff[lang];
  if (/tmax|forza|scooter/.test(s)) {
    const list = products.filter((p) => p.category === 'scooter').slice(0, 3)
      .map((p) => `• ${p.brand} ${p.model} ${p.year} — ${fmtDZD(p.priceDZD)} — ${p.km} km`).join('\n');
    return (lang === 'ar' ? '🛵 **أفضل سكوتر عندنا:**\n' : lang === 'en' ? '🛵 **Top scooters:**\n' : '🛵 **Nos scooters top :**\n') + (list || '—');
  }
  if (/\bmt\b|mt-?0/.test(s)) {
    const list = products.filter((p) => p.category === 'roadster-mt').map((p) => `• ${p.brand} ${p.model} ${p.year} — ${fmtDZD(p.priceDZD)}`).join('\n');
    return (lang === 'fr' ? '🔥 **Gamme MT :**\n' : '🔥 **MT range:**\n') + list;
  }
  if (/\bz\b|z900|z650/.test(s)) {
    const list = products.filter((p) => p.category === 'roadster-z').map((p) => `• ${p.brand} ${p.model} — ${fmtDZD(p.priceDZD)}`).join('\n');
    return '💚 **Gamme Z :**\n' + list;
  }
  if (/prix|price|budget|combien|شحال|سعر/.test(s)) {
    const cheap = [...products].filter(p=>p.category!=='casque'&&p.category!=='accessoire').sort((a, b) => a.priceDZD - b.priceDZD).slice(0, 3)
      .map((p) => `• ${p.brand} ${p.model} — ${fmtDZD(p.priceDZD)}`).join('\n');
    return (lang === 'ar' ? '💰 **أرخص الدراجات:**\n' : '💰 **Best prices:**\n') + cheap + (lang==='fr'?'\n\nDis-moi ton budget exact, je cible mieux.' : '');
  }
  if (/casque|helmet|خوذة|gant|accessoire/.test(s)) {
    const list = products.filter((p) => p.category === 'casque' || p.category === 'accessoire').map((p) => `• ${p.brand} ${p.model} — ${fmtDZD(p.priceDZD)}`).join('\n');
    return (lang === 'fr' ? '🪖 **Équipement :**\n' : '') + list;
  }
  // product name match
  const found = products.find((p) => s.includes(p.model.toLowerCase().replace(/\s/g, '')) || s.includes(p.model.toLowerCase()) || s.includes(p.brand.toLowerCase()));
  if (found) {
    const mags = found.engineCC
      ? ` — ${found.engineCC}cc / ${found.powerCH}ch / ${found.torqueNm ?? '?'}Nm / ${found.weightKg ?? '?'}kg / V-max ~${found.topKmh ?? '?'}km/h`
      : '';
    return `**${found.brand} ${found.model} ${found.year}** — ${fmtDZD(found.priceDZD)} — ${found.km} km — ${found.condition}${mags}. ${found.desc[lang]}`;
  }
  return lang === 'ar'
    ? 'فهمتك! اسألني عن: الفرق بين MT وZ، الأسعار، TMAX، العنوان، أو قولي "ميزانية 200 مليون للمدينة".'
    : lang === 'en'
    ? 'Got it! Ask me: MT vs Z difference, prices, TMAX, address, or say "200M DZD budget for city".'
    : "Bien reçu ! Demande-moi : différence MT/Z, prix, TMAX, adresse, ou dis « budget 190M pour la ville ».";
}
