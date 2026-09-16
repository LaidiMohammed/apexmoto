'use client';
import { MapPin, Phone, Star, Clock } from 'lucide-react';
import { SHOWROOM } from '@/lib/types';
import { usePageLang } from '@/components/shell';
import { Reveal, ZoomTitle } from '@/components/motion';

export default function About() {
  const lang = usePageLang();
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10">
      <ZoomTitle>
        <p className="text-apex font-bold tracking-mega text-xs">// LE SHOWROOM</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold mt-2">À PROPOS <span className="text-stroke-red">D’APEX</span></h1>
      </ZoomTitle>
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <Reveal className="border border-white/10 bg-carbon-900 p-6 md:p-8 leading-relaxed text-zinc-300 text-sm md:text-base">
          <p><b className="text-white">APEX MOTO</b> — showroom moto à <b className="text-white">Bir El Djir, Oran</b>. On sélectionne MT, Z, sportives et scooters — neuf & occasion contrôlée 40 points.</p>
          <p className="mt-3">Notre promesse : pas de blabla. Tu touches, tu essayes, tu compares. Prix affichés, km réels, historique transparent. Atelier et équipement (casques, Akrapovic, gants) sur place.</p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            {[['6+', 'ans passion'], ['4.8★', 'avis Google'], ['21h', 'ouvert tard']].map(([a, b]) => (
              <div key={b} className="bg-black/50 border border-white/10 py-4"><p className="font-display text-2xl font-bold text-apex-amber">{a}</p><p className="text-xs text-zinc-500">{b}</p></div>
            ))}
          </div>
        </Reveal>
        <Reveal className="border border-white/10 overflow-hidden min-h-[320px]">
          <iframe title="map" src={SHOWROOM.mapsEmbed} className="w-full h-full min-h-[320px] grayscale invert-[0.9]" loading="lazy" />
        </Reveal>
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {[
          { icon: MapPin, t: 'Adresse', d: SHOWROOM.plusCode + ' — ' + SHOWROOM.city },
          { icon: Clock, t: 'Horaires', d: 'Sam–Jeu 09:00–21:00 · Ven 14:00–21:00' },
          { icon: Phone, t: 'Contact', d: SHOWROOM.phone + ' · WhatsApp direct' },
        ].map((c) => (
          <Reveal key={c.t} className="border border-white/10 bg-carbon-900 p-5">
            <c.icon className="w-5 h-5 text-apex" /><p className="font-bold mt-2">{c.t}</p><p className="text-sm text-zinc-400">{c.d}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6 border border-white/10 bg-carbon-900 p-6">
        <p className="font-display font-bold text-xl">AVIS CLIENTS <span className="text-apex-amber">★ {SHOWROOM.rating} ({SHOWROOM.reviewsCount})</span></p>
        <div className="mt-3 grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-black/40 border border-white/10 p-4"><p className="text-apex-amber">★★★★★</p><p className="font-bold mt-1">Mouchem Nadir</p><p className="text-zinc-300">Tbib TA3 les moto machallah</p></div>
          <div className="bg-black/40 border border-white/10 p-4"><p className="text-apex-amber">★★★★★</p><p className="font-bold mt-1">abdelkadir khlouche</p><p className="text-zinc-500 text-xs">il y a 2 semaines</p></div>
          <div className="bg-black/40 border border-white/10 p-4"><p className="text-apex-amber">★★★★★</p><p className="font-bold mt-1">Piksou Abdou</p><p className="text-zinc-500 text-xs">il y a un mois</p></div>
        </div>
      </Reveal>
    </div>
  );
}
