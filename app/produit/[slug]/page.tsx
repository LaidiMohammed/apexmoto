'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Gauge, Cog, Zap, Phone, ArrowLeft, BadgeCheck, Eye } from 'lucide-react';
import { loadProducts, bumpViews, addLead } from '@/lib/store';
import { SHOWROOM, type Product } from '@/lib/types';
import { fmtDZD, fmtKm } from '@/lib/i18n';
import { usePageLang } from '@/components/shell';
import { Reveal } from '@/components/motion';
import { ProductCard } from '@/components/cards';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lang = usePageLang();
  const [p, setP] = useState<Product | null>(null);
  const [all, setAll] = useState<Product[]>([]);
  const [img, setImg] = useState(0);
  const [tab, setTab] = useState<'desc' | 'specs' | 'avis'>('desc');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const list = loadProducts();
    setAll(list);
    const found = list.find((x) => x.slug === slug);
    if (found) { setP(found); bumpViews(found.id); }
  }, [slug]);

  if (!p) return <div className="mx-auto max-w-7xl px-4 py-24 text-zinc-500">Chargement… <Link href="/motos" className="text-apex underline">Retour catalogue</Link></div>;

  const similar = all.filter((x) => x.id !== p.id && (x.category === p.category || x.brand === p.brand)).slice(0, 3);
  const waText = encodeURIComponent(`Salut Apex Moto! Je suis intéressé par ${p.brand} ${p.model} ${p.year} à ${fmtDZD(p.priceDZD)} (${p.slug}). Dispo pour essai?`);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    addLead({ id: crypto.randomUUID(), name, phone, productId: p.id, type: 'essai', date: new Date().toISOString() });
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8">
      <Link href="/motos" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"><ArrowLeft className="w-4 h-4" /> Catalogue</Link>
      <div className="mt-4 grid lg:grid-cols-2 gap-8">
        <div>
          <motion.div key={img} initial={{ opacity: 0.4, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="aspect-[16/11] overflow-hidden border border-white/10 bg-carbon-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.images[img]} alt={p.model} className="w-full h-full object-cover" />
          </motion.div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {p.images.map((s, i) => (
              <button key={i} onClick={() => setImg(i)} className={`aspect-[16/10] overflow-hidden border ${img === i ? 'border-apex' : 'border-white/10 opacity-70 hover:opacity-100'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs">
            <span className={`font-bold px-3 py-1 diag ${p.condition === 'neuf' ? 'bg-emerald-500 text-black' : 'bg-apex-amber text-black'}`}>{p.condition.toUpperCase()}</span>
            <span className="text-zinc-500 flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {p.views ?? 0} vues</span>
            <span className="text-zinc-500">{p.stock > 0 ? `Stock: ${p.stock}` : 'Sur commande'}</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mt-3">{p.brand} <span className="text-apex">{p.model}</span></h1>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Calendar, k: 'Année', v: String(p.year) },
              { icon: Gauge, k: 'Km', v: fmtKm(p.km) },
              { icon: Cog, k: 'Moteur', v: p.engineCC ? `${p.engineCC}cc` : '—' },
              { icon: Zap, k: 'Puissance', v: p.powerCH ? `${p.powerCH} ch` : '—' },
              { icon: Zap, k: 'Couple', v: p.torqueNm ? `${p.torqueNm} Nm` : '—' },
              { icon: Gauge, k: 'Poids', v: p.weightKg ? `${p.weightKg} kg` : '—' },
              { icon: Calendar, k: 'Selle', v: p.seatMm ? `${p.seatMm} mm` : '—' },
              { icon: Cog, k: 'V-max', v: p.topKmh ? `${p.topKmh} km/h` : '—' },
            ].map((s) => (
              <div key={s.k} className="bg-carbon-900 border border-white/10 p-3">
                <s.icon className="w-4 h-4 text-apex" />
                <p className="text-[11px] text-zinc-500 mt-1">{s.k}</p>
                <p className="font-bold text-sm">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            {p.oldPrice && <p className="text-zinc-500 line-through text-sm">{fmtDZD(p.oldPrice)}</p>}
            <p className="font-display text-4xl font-bold">{fmtDZD(p.priceDZD)}</p>
            <p className="text-xs text-zinc-500">Boîte: {p.transmission} · Couleurs: {p.colors.join(', ')}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={`${SHOWROOM.whatsapp}?text=${waText}`} target="_blank" className="inline-flex items-center gap-2 bg-apex hover:bg-apex-dark font-bold px-6 py-3 diag text-sm"><Phone className="w-4 h-4" /> Réserver sur WhatsApp</a>
            <button onClick={() => setTab('desc')} className="border border-white/20 px-6 py-3 font-bold diag text-sm">Demande d’essai ↓</button>
          </div>
          <ul className="mt-5 space-y-1.5 text-sm">
            {p.features.map((f) => (<li key={f} className="flex items-center gap-2 text-zinc-300"><BadgeCheck className="w-4 h-4 text-emerald-400" /> {f}</li>))}
          </ul>
        </div>
      </div>

      <div className="mt-10 border border-white/10 bg-carbon-900">
        <div className="flex border-b border-white/10 text-sm font-bold">
          {([['desc', 'Description'], ['specs', 'Fiche technique'], ['avis', 'Essai & avis']] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`px-5 py-3 ${tab === k ? 'text-white border-b-2 border-apex bg-white/5' : 'text-zinc-500'}`}>{l}</button>
          ))}
        </div>
        <div className="p-5 text-sm leading-relaxed text-zinc-300">
          {tab === 'desc' && <p>{p.desc[lang]}</p>}
          {tab === 'specs' && (
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              {[['Marque', p.brand], ['Modèle', p.model], ['Année', p.year], ['Kilométrage', fmtKm(p.km)], ['Moteur', p.engineCC ? p.engineCC + ' cc' : '—'], ['Puissance', p.powerCH ? p.powerCH + ' ch' : '—'], ['Couple', p.torqueNm ? p.torqueNm + ' Nm' : '—'], ['Poids tous pleins', p.weightKg ? p.weightKg + ' kg' : '—'], ['Hauteur de selle', p.seatMm ? p.seatMm + ' mm' : '—'], ['Réservoir', p.fuelL ? p.fuelL + ' L' : '—'], ['Vitesse max', p.topKmh ? '~' + p.topKmh + ' km/h' : '—'], ['Transmission', p.transmission], ['État', p.condition], ['Stock', p.stock]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/8 py-2"><span className="text-zinc-500">{k}</span><b className="text-white">{v}</b></div>
              ))}
            </div>
          )}
          {tab === 'avis' && <p>⭐ {SHOWROOM.rating}/5 sur Google — « Tbib TA3 les moto machallah » (Mouchem Nadir). Viens essayer à Bir El Djir, ouvert jusqu’à 21:00.</p>}
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        <Reveal className="border border-white/10 bg-carbon-900 p-6">
          <h3 className="font-display text-2xl font-bold">DEMANDE D’ESSAI</h3>
          {sent ? (
            <p className="mt-3 text-emerald-400 text-sm font-semibold">✅ Reçu ! On t’appelle vite au {phone}. Ou WhatsApp direct: {SHOWROOM.phone}</p>
          ) : (
            <form onSubmit={submit} className="mt-4 space-y-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ton nom" className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-sm outline-none focus:border-apex" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Téléphone 0550…" className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-sm outline-none focus:border-apex" />
              <button className="bg-apex font-bold px-6 py-2.5 diag text-sm w-full">Envoyer la demande</button>
              <p className="text-[11px] text-zinc-500">Stocké localement (Phase 1) — visible dans /admin. Supabase en Phase 2.</p>
            </form>
          )}
        </Reveal>
        <Reveal className="border border-white/10 overflow-hidden min-h-[280px]">
          <iframe title="map" src={SHOWROOM.mapsEmbed} className="w-full h-full min-h-[280px] grayscale invert-[0.9]" loading="lazy" />
        </Reveal>
      </div>

      {similar.length > 0 && (
        <div className="mt-12">
          <h3 className="font-display text-3xl font-bold">TU AIMERAIS <span className="text-stroke">AUSSI</span></h3>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{similar.map((s) => (<ProductCard key={s.id} p={s} lang={lang} />))}</div>
        </div>
      )}
    </div>
  );
}
