'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MapPin, Star, ArrowRight, Gauge, ShieldCheck, Wrench, BadgeCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { loadProducts } from '@/lib/store';
import { SHOWROOM, type Product } from '@/lib/types';
import { t } from '@/lib/i18n';
import { usePageLang } from '@/components/shell';
import { Reveal, ZoomTitle } from '@/components/motion';
import { ProductCard } from '@/components/cards';

const BRANDS = ['YAMAHA', 'KAWASAKI', 'HONDA', 'SUZUKI', 'VESPA', 'SHOEI', 'AKRAPOVIC', 'ALPINESTARS'];

export default function Home() {
  const lang = usePageLang();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { setProducts(loadProducts()); }, []);
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const fresh = products.slice(0, 4);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir}>
      {/* HERO */}
      <section className="relative hero-clip bg-black overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2000&auto=format&fit=crop" alt="Apex Moto" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-transparent" />
          <div className="absolute inset-0 carbon-bg opacity-60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-28 md:pt-28 md:pb-36">
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 text-[11px] md:text-xs font-bold tracking-mega text-apex-amber border border-apex-amber/40 bg-black/50 px-4 py-2 rounded-full">
            <MapPin className="w-3.5 h-3.5" /> {t('heroKicker', lang)}
          </motion.p>
          <h1 className="font-display font-bold leading-[0.95] mt-6 text-6xl md:text-8xl lg:text-9xl">
            <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="block text-white">{t('heroTitleA', lang)}</motion.span>
            <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="block text-stroke">{t('heroTitleB', lang)}</motion.span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-5 max-w-xl text-zinc-300 text-base md:text-lg">{t('heroSub', lang)}</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-8 flex flex-wrap gap-3">
            <Link href="/motos" className="inline-flex items-center gap-2 bg-apex hover:bg-apex-dark font-bold px-7 py-3.5 diag text-sm md:text-base transition-colors">{t('catalog', lang)} <ArrowRight className="w-4 h-4" /></Link>
            <a href={SHOWROOM.whatsapp} target="_blank" className="inline-flex items-center gap-2 border border-white/25 hover:border-white bg-white/5 backdrop-blur font-bold px-7 py-3.5 diag text-sm md:text-base"><Phone className="w-4 h-4" /> {t('whatsapp', lang)}</a>
          </motion.div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2 text-zinc-300"><Star className="w-4 h-4 text-apex-amber fill-amber-400" /> <b className="text-white">{SHOWROOM.rating}</b> · {SHOWROOM.reviewsCount} avis Google</span>
            <span className="flex items-center gap-2 text-zinc-300"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Occasion contrôlée</span>
            <span className="flex items-center gap-2 text-zinc-300"><Wrench className="w-4 h-4 text-zinc-400" /> Atelier + montage offert</span>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-white/10 bg-carbon-900 overflow-hidden py-3">
        <div className="marquee-track flex gap-10 whitespace-nowrap w-max">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="font-display font-bold tracking-mega text-zinc-600 text-sm">{b} <span className="text-apex mx-4">/</span></span>
          ))}
        </div>
      </div>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 mt-16">
        <ZoomTitle>
          <p className="text-apex font-bold tracking-mega text-xs">★ APEX SELECTION</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mt-2">{t('featured', lang)} <span className="text-stroke-red">2026</span></h2>
        </ZoomTitle>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (<Reveal key={p.id} delay={(i % 3) * 0.1}><ProductCard p={p} lang={lang} /></Reveal>))}
        </div>
        <Reveal className="text-center mt-8">
          <Link href="/motos" className="inline-flex items-center gap-2 border border-white/20 hover:border-apex px-6 py-3 font-bold text-sm diag">Tout le stock <ArrowRight className="w-4 h-4" /></Link>
        </Reveal>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 mt-20">
        <ZoomTitle><h2 className="font-display text-4xl md:text-6xl font-bold">CHOISIS TON <span className="text-apex">STYLE</span></h2></ZoomTitle>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { k: 'MT / Roadster', d: 'Couple & fun', img: 'photo-1568772585407-9361f9bf3a87', href: '/motos?cat=roadster-mt' },
            { k: 'Z / Sugomi', d: 'Agressif 4-cyl', img: 'photo-1547549082-6bc09f2049ae', href: '/motos?cat=roadster-z' },
            { k: 'Sportive', d: 'Vitesse pure', img: 'photo-1580310614729-ccd69652491d', href: '/motos?cat=sportive' },
            { k: 'Scooter', d: 'TMAX · Forza', img: 'photo-1571068316344-75bc76f77890', href: '/motos?cat=scooter' },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.08}>
              <Link href={c.href} className="card-sheen group relative block aspect-[3/4] overflow-hidden border border-white/10 hover:border-apex/70">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://images.unsplash.com/${c.img}?q=80&w=800&auto=format&fit=crop`} alt={c.k} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute bottom-0 p-4"><span className="font-display font-bold text-2xl block">{c.k}</span><span className="text-xs text-zinc-300">{c.d}</span></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="mt-20 bg-carbon-900 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 grid md:grid-cols-3 gap-6">
          {[
            { icon: BadgeCheck, title: 'Contrôle 40 points', desc: 'Km vérifié, historique, essai avant achat. On ne vend que ce qu’on roulerait.' },
            { icon: Gauge, title: 'Essai sur place', desc: 'Réserve sur WhatsApp, viens à Bir El Djir, essaye et décide.' },
            { icon: Wrench, title: 'Atelier & pièces', desc: 'Montage Akrapovic offert, pneus, casques Shoei, gants, entretien.' },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1} className="border border-white/10 bg-black/40 p-6">
              <f.icon className="w-8 h-8 text-apex" />
              <p className="font-display font-bold text-xl mt-3">{f.title}</p>
              <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LATEST + REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 mt-16 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ZoomTitle><h2 className="font-display text-3xl md:text-5xl font-bold">ARRIVAGES <span className="text-stroke">RÉCENTS</span></h2></ZoomTitle>
          <div className="mt-6 grid sm:grid-cols-2 gap-5">{fresh.map((p, i) => (<Reveal key={p.id} delay={i * 0.08}><ProductCard p={p} lang={lang} /></Reveal>))}</div>
        </div>
        <Reveal className="bg-carbon-900 border border-white/10 p-6 h-fit">
          <p className="font-display font-bold tracking-widest text-lg">AVIS GOOGLE <span className="text-apex-amber">★ {SHOWROOM.rating}</span></p>
          <div className="mt-4 space-y-4 text-sm">
            <div className="border-l-2 border-apex pl-3"><p className="font-bold">Mouchem Nadir</p><p className="text-apex-amber">★★★★★</p><p className="text-zinc-300">Tbib TA3 les moto machallah</p></div>
            <div className="border-l-2 border-white/20 pl-3"><p className="font-bold">abdelkadir khlouche</p><p className="text-apex-amber">★★★★★</p><p className="text-zinc-500 text-xs">il y a 2 semaines</p></div>
            <div className="border-l-2 border-white/20 pl-3"><p className="font-bold">Piksou Abdou</p><p className="text-apex-amber">★★★★★</p><p className="text-zinc-500 text-xs">il y a un mois</p></div>
          </div>
          <a href={SHOWROOM.whatsapp} target="_blank" className="mt-5 block text-center bg-white text-black font-bold py-2.5 text-sm diag">Devenir client →</a>
          <p className="text-[11px] text-zinc-500 mt-3">📍 {SHOWROOM.plusCode} · ☎️ {SHOWROOM.phone} · jusqu’à 21:00</p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 mt-16">
        <Reveal className="relative overflow-hidden border border-apex/40 bg-gradient-to-r from-apex-dark via-black to-black p-8 md:p-12">
          <h3 className="font-display text-3xl md:text-5xl font-bold">UNE MOTO TE FAIT DE L’ŒIL ? <span className="text-apex-amber">VIENS L’ESSAYER.</span></h3>
          <p className="text-zinc-300 mt-2 text-sm md:text-base">PCJR+7C4, Bir El Djir — Ouvert jusqu’à 21:00 — 0550 92 76 64</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={SHOWROOM.whatsapp} target="_blank" className="bg-apex font-bold px-6 py-3 diag text-sm">WhatsApp direct</a>
            <Link href="/contact" className="border border-white/25 px-6 py-3 font-bold diag text-sm">Nous trouver</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
