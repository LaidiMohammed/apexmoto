'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Pencil, Download, RotateCcw, LogOut, Eye } from 'lucide-react';
import { loadProducts, saveProducts, loadLeads, isAdmin, logoutAdmin } from '@/lib/store';
import { SEED } from '@/lib/seed';
import type { Product } from '@/lib/types';
import { fmtDZD } from '@/lib/i18n';

const empty: Product = {
  id: '', slug: '', category: 'roadster-mt', brand: '', model: '', year: 2024, km: 0,
  priceDZD: 1000000, condition: 'neuf', engineCC: 600, powerCH: 70, transmission: '6 vitesses',
  colors: ['Noir'], images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop'],
  desc: { fr: '', ar: '', en: '' }, features: [], stock: 1,
};

export default function Admin() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [ok, setOk] = useState('');

  useEffect(() => {
    if (!isAdmin()) { router.push('/admin/login'); return; }
    setProducts(loadProducts());
    setLeads(loadLeads());
  }, [router]);

  const persist = (next: Product[]) => { saveProducts(next); setProducts(next); window.dispatchEvent(new Event('apexmoto:update')); };

  const saveEdit = () => {
    if (!editing || !editing.brand || !editing.model) { setOk('Brand + model requis.'); return; }
    const e = { ...editing };
    if (!e.id) e.id = `p-${Date.now()}`;
    if (!e.slug) e.slug = `${e.brand}-${e.model}-${e.year}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!e.desc.fr) e.desc.fr = `${e.brand} ${e.model} ${e.year} disponible chez Apex Moto Bir El Djir.`;
    if (!e.desc.ar) e.desc.ar = e.desc.fr;
    if (!e.desc.en) e.desc.en = e.desc.fr;
    const exists = products.some((p) => p.id === e.id);
    persist(exists ? products.map((p) => (p.id === e.id ? e : p)) : [e, ...products]);
    setEditing(null); setOk('✅ Enregistré (localStorage).');
    setTimeout(() => setOk(''), 2500);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'apexmoto-db.json'; a.click();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-apex text-xs font-bold tracking-mega">// OWNER DASHBOARD</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">GESTION STOCK</h1>
          <p className="text-xs text-zinc-500 mt-1">{products.length} produits · {leads.length} demandes · vues totales {products.reduce((s, p) => s + (p.views ?? 0), 0)}</p>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <button onClick={() => setEditing({ ...empty })} className="bg-apex px-4 py-2.5 diag inline-flex gap-1 items-center"><Plus className="w-4 h-4" /> Ajouter moto</button>
          <button onClick={exportJSON} className="border border-white/20 px-4 py-2.5 diag inline-flex gap-1 items-center"><Download className="w-4 h-4" /> Export JSON</button>
          <button onClick={() => { if (confirm('Reset seed?')) persist(SEED); }} className="border border-white/20 px-4 py-2.5 diag inline-flex gap-1 items-center"><RotateCcw className="w-4 h-4" /> Reset</button>
          <button onClick={() => { logoutAdmin(); router.push('/'); }} className="border border-red-500/50 text-red-400 px-4 py-2.5 diag inline-flex gap-1 items-center"><LogOut className="w-4 h-4" /></button>
        </div>
      </div>
      {ok && <p className="mt-3 text-sm text-emerald-400 font-semibold">{ok}</p>}

      {editing && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur grid place-items-center p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-carbon-900 border border-white/15 p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-2xl font-bold">{editing.id ? 'Modifier' : 'Nouvelle'} moto / produit</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <input value={editing.brand} onChange={(e) => setEditing({ ...editing, brand: e.target.value })} placeholder="Marque (Yamaha)" className="bg-black/50 border border-white/15 px-3 py-2 outline-none focus:border-apex" />
              <input value={editing.model} onChange={(e) => setEditing({ ...editing, model: e.target.value })} placeholder="Modèle (MT-07)" className="bg-black/50 border border-white/15 px-3 py-2 outline-none focus:border-apex" />
              <input type="number" value={editing.year} onChange={(e) => setEditing({ ...editing, year: +e.target.value })} placeholder="Année" className="bg-black/50 border border-white/15 px-3 py-2 outline-none" />
              <input type="number" value={editing.km} onChange={(e) => setEditing({ ...editing, km: +e.target.value })} placeholder="Km" className="bg-black/50 border border-white/15 px-3 py-2 outline-none" />
              <input type="number" value={editing.priceDZD} onChange={(e) => setEditing({ ...editing, priceDZD: +e.target.value })} placeholder="Prix DA" className="bg-black/50 border border-white/15 px-3 py-2 outline-none" />
              <input type="number" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: +e.target.value })} placeholder="Stock" className="bg-black/50 border border-white/15 px-3 py-2 outline-none" />
              <input type="number" value={editing.engineCC} onChange={(e) => setEditing({ ...editing, engineCC: +e.target.value })} placeholder="Cylindrée" className="bg-black/50 border border-white/15 px-3 py-2 outline-none" />
              <input type="number" value={editing.powerCH} onChange={(e) => setEditing({ ...editing, powerCH: +e.target.value })} placeholder="Puissance ch" className="bg-black/50 border border-white/15 px-3 py-2 outline-none" />
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as any })} className="bg-black/50 border border-white/15 px-3 py-2 outline-none">
                <option value="roadster-mt">MT / Roadster</option><option value="roadster-z">Z / Roadster</option><option value="sportive">Sportive</option><option value="scooter">Scooter</option><option value="casque">Casque</option><option value="accessoire">Accessoire</option>
              </select>
              <select value={editing.condition} onChange={(e) => setEditing({ ...editing, condition: e.target.value as any })} className="bg-black/50 border border-white/15 px-3 py-2 outline-none">
                <option value="neuf">Neuf</option><option value="occasion">Occasion</option>
              </select>
              <input value={editing.images[0] || ''} onChange={(e) => setEditing({ ...editing, images: [e.target.value, ...(editing.images.slice(1))] })} placeholder="Image URL" className="sm:col-span-2 bg-black/50 border border-white/15 px-3 py-2 outline-none" />
              <textarea value={editing.desc.fr} onChange={(e) => setEditing({ ...editing, desc: { ...editing.desc, fr: e.target.value } })} placeholder="Description FR" rows={3} className="sm:col-span-2 bg-black/50 border border-white/15 px-3 py-2 outline-none" />
              <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={!!editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="accent-red-600" /> Vedette (home)</label>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={saveEdit} className="bg-apex font-bold px-6 py-2.5 diag text-sm flex-1">Enregistrer</button>
              <button onClick={() => setEditing(null)} className="border border-white/20 px-6 py-2.5 diag text-sm">Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 border border-white/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead><tr className="text-left text-xs text-zinc-500 border-b border-white/10"><th className="p-3">Produit</th><th className="p-3">Cat</th><th className="p-3">Année/Km</th><th className="p-3">Prix</th><th className="p-3">Vues</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                <td className="p-3 font-bold">{p.brand} {p.model} {p.featured && <span className="text-[10px] bg-apex px-1.5 py-0.5 ml-1">STAR</span>}</td>
                <td className="p-3 text-zinc-400 text-xs">{p.category} · {p.condition}</td>
                <td className="p-3 text-zinc-400 text-xs">{p.year} · {p.km} km</td>
                <td className="p-3 font-bold">{fmtDZD(p.priceDZD)}</td>
                <td className="p-3 text-zinc-400 inline-flex gap-1 items-center"><Eye className="w-3.5 h-3.5" />{p.views ?? 0}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => setEditing({ ...p })} className="p-1.5 border border-white/15 hover:border-apex"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => { if (confirm(`Supprimer ${p.brand} ${p.model}?`)) persist(products.filter((x) => x.id !== p.id)); }} className="p-1.5 border border-white/15 hover:border-red-500 text-red-400"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-3xl font-bold mt-10">DEMANDES ({leads.length})</h2>
      <div className="mt-3 grid md:grid-cols-2 gap-3">
        {leads.map((l) => (
          <div key={l.id} className="border border-white/10 bg-carbon-900 p-4 text-sm">
            <p className="font-bold">{l.name} — {l.phone} <span className="text-[10px] bg-white/10 px-2 py-0.5 ml-2">{l.type}</span></p>
            <p className="text-xs text-zinc-500 mt-1">{new Date(l.date).toLocaleString()} · produit: {l.productId}</p>
            {l.message && <p className="text-zinc-300 mt-1">{l.message}</p>}
            <a href={`https://wa.me/${String(l.phone).replace(/\D/g, '')}`} target="_blank" className="text-apex text-xs font-bold mt-2 inline-block">Rappeler sur WhatsApp →</a>
          </div>
        ))}
        {leads.length === 0 && <p className="text-sm text-zinc-600">Aucune demande pour l’instant — partage ton WhatsApp.</p>}
      </div>
      <p className="text-[11px] text-zinc-600 mt-8 pb-6">Phase 1: localStorage (`apexmoto_db_v1`). Phase 2: ce même tableau branché sur Supabase (products + leads) + Supabase Auth — export JSON prêt pour migration.</p>
    </div>
  );
}
