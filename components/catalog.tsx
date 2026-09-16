'use client';
import { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { loadProducts } from '@/lib/store';
import { CATEGORIES, type Category, type Product } from '@/lib/types';
import { usePageLang } from '@/components/shell';
import { Reveal, ZoomTitle } from '@/components/motion';
import { ProductCard } from '@/components/cards';

function CatalogInner({ gearOnly = false }: { gearOnly?: boolean }) {
  const lang = usePageLang();
  const sp = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>(sp.get('cat') || 'all');
  const [cond, setCond] = useState('all');
  const [sort, setSort] = useState('new');
  const [maxPrice, setMaxPrice] = useState(3000000);

  useEffect(() => { setProducts(loadProducts()); }, []);
  useEffect(() => { const c = sp.get('cat'); if (c) setCat(c); }, [sp]);

  const list = useMemo(() => {
    let l = [...products];
    if (gearOnly) l = l.filter((p) => p.category === 'casque' || p.category === 'accessoire');
    else l = l.filter((p) => p.category !== 'casque' && p.category !== 'accessoire');
    if (cat !== 'all') l = l.filter((p) => p.category === cat);
    if (cond !== 'all') l = l.filter((p) => p.condition === cond);
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter((p) => `${p.brand} ${p.model} ${p.year}`.toLowerCase().includes(s));
    }
    l = l.filter((p) => p.priceDZD <= maxPrice);
    if (sort === 'priceAsc') l.sort((a, b) => a.priceDZD - b.priceDZD);
    else if (sort === 'priceDesc') l.sort((a, b) => b.priceDZD - a.priceDZD);
    else if (sort === 'km') l.sort((a, b) => a.km - b.km);
    else l.sort((a, b) => b.year - a.year);
    return l;
  }, [products, q, cat, cond, sort, maxPrice, gearOnly]);

  const cats = gearOnly
    ? CATEGORIES.filter((c) => ['all', 'casque', 'accessoire'].includes(c.id))
    : CATEGORIES.filter((c) => !['casque', 'accessoire'].includes(c.id));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-4">
      <ZoomTitle>
        <p className="text-apex font-bold tracking-mega text-xs">{gearOnly ? '// GEAR SHOP' : '// SHOWROOM STOCK'}</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold mt-2">{gearOnly ? 'CASQUES & ' : 'NOS '}<span className="text-stroke-red">{gearOnly ? 'ACCESSOIRES' : 'MOTOS'}</span></h1>
      </ZoomTitle>

      <div className="mt-6 flex flex-col lg:flex-row gap-3 lg:items-center">
        <label className="flex items-center gap-2 bg-carbon-900 border border-white/15 px-4 py-3 flex-1">
          <Search className="w-4 h-4 text-zinc-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === 'ar' ? 'ابحث…' : 'Rechercher MT-07, TMAX, Z900…'} className="bg-transparent outline-none text-sm w-full placeholder:text-zinc-600" />
        </label>
        <div className="flex gap-2">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-carbon-900 border border-white/15 text-sm px-3 py-3 outline-none">
            <option value="new">Récents</option>
            <option value="priceAsc">Prix ↑</option>
            <option value="priceDesc">Prix ↓</option>
            <option value="km">Km ↓</option>
          </select>
          <select value={cond} onChange={(e) => setCond(e.target.value)} className="bg-carbon-900 border border-white/15 text-sm px-3 py-3 outline-none">
            <option value="all">Neuf + Occasion</option>
            <option value="neuf">Neuf</option>
            <option value="occasion">Occasion</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {cats.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)} className={`whitespace-nowrap text-xs font-bold px-4 py-2.5 border diag ${cat === c.id ? 'bg-apex border-apex text-white' : 'border-white/15 text-zinc-400 hover:text-white'}`}>
            {lang === 'ar' ? c.ar : lang === 'en' ? c.en : c.fr}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400">
        <SlidersHorizontal className="w-4 h-4" />
        <span>Budget max: <b className="text-white">{(maxPrice / 1000000).toFixed(1)}M DA</b></span>
        <input type="range" min={30000} max={3000000} step={50000} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="flex-1 accent-red-600" />
      </div>

      <p className="mt-6 text-sm text-zinc-500">{list.length} résultat{list.length > 1 ? 's' : ''}</p>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p, i) => (<Reveal key={p.id} delay={(i % 3) * 0.07}><ProductCard p={p} lang={lang} /></Reveal>))}
      </div>
      {list.length === 0 && <p className="py-16 text-center text-zinc-500">Aucun résultat — élargis le budget ou contacte-nous sur WhatsApp, on trouve ta moto.</p>}
    </div>
  );
}

export default function MotosPage({ gearOnly = false }: { gearOnly?: boolean }) {
  return (<Suspense fallback={<div className="p-20 text-center text-zinc-500">Chargement…</div>}><CatalogInner gearOnly={gearOnly} /></Suspense>);
}
