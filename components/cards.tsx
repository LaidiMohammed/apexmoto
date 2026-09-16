'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Gauge, Calendar, Eye } from 'lucide-react';
import type { Lang, Product } from '@/lib/types';
import { fmtDZD, fmtKm } from '@/lib/i18n';

export function ProductCard({ p, lang }: { p: Product; lang: Lang }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
      <Link href={`/produit/${p.slug}`} className="card-sheen group block bg-carbon-900 border border-white/10 hover:border-apex/60 transition-colors overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.images[0]} alt={`${p.brand} ${p.model}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-1 diag ${p.condition === 'neuf' ? 'bg-emerald-500 text-black' : 'bg-apex-amber text-black'}`}>{p.condition === 'neuf' ? 'NEUF' : 'OCCASION'}</span>
            {p.oldPrice && <span className="text-[11px] font-bold px-2.5 py-1 bg-apex text-white diag">PROMO</span>}
          </div>
          <span className="absolute bottom-3 right-3 text-[11px] font-bold bg-black/70 backdrop-blur px-2 py-1 rounded flex items-center gap-1"><Eye className="w-3 h-3" /> {p.views ?? 0}</span>
          <span className="absolute bottom-3 left-3 font-display font-bold text-xl drop-shadow">{p.brand} <span className="text-apex-amber">{p.model}</span></span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.year}</span>
            <span className="flex items-center gap-1"><Gauge className="w-3.5 h-3.5" /> {fmtKm(p.km)}</span>
            {p.engineCC > 0 && <span>{p.engineCC}cc</span>}
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              {p.oldPrice && <p className="text-xs text-zinc-500 line-through">{fmtDZD(p.oldPrice)}</p>}
              <p className="font-display text-2xl font-bold text-white">{fmtDZD(p.priceDZD)}</p>
            </div>
            <span className="text-xs font-bold text-apex group-hover:translate-x-1 transition-transform">DÉTAILS →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
