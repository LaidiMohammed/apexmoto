'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Bike, Menu, X, Phone, MapPin } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { t } from '@/lib/i18n';
import { getLang, setLang } from '@/lib/store';
import { SHOWROOM } from '@/lib/types';

export function useLang() {
  const [lang, setL] = useState<Lang>('fr');
  useEffect(() => { setL(getLang()); }, []);
  const change = (l: Lang) => { setLang(l); setL(l); window.dispatchEvent(new Event('apex:lang')); };
  useEffect(() => {
    const h = () => setL(getLang());
    window.addEventListener('apex:lang', h);
    window.addEventListener('storage', h);
    return () => { window.removeEventListener('apex:lang', h); window.removeEventListener('storage', h); };
  }, []);
  return { lang, change };
}

export function Navbar({ lang, onLang }: { lang: Lang; onLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const timer = useRef<any>(null);
  const router = useRouter();

  const logoClick = () => {
    const n = clicks + 1;
    setClicks(n);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setClicks(0), 1200);
    if (n >= 5) { setClicks(0); router.push('/admin/login'); }
  };

  const links = [
    { href: '/', label: t('home', lang) },
    { href: '/motos', label: t('motos', lang) },
    { href: '/accessoires', label: t('gear', lang) },
    { href: '/a-propos', label: t('about', lang) },
    { href: '/contact', label: t('contact', lang) },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-carbon-950/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-3">
        <button onClick={logoClick} className="flex items-center gap-2.5 select-none" title="Apex Moto">
          <span className="grid place-items-center w-9 h-9 bg-apex diag font-display font-bold text-lg">A</span>
          <span className="font-display font-700 tracking-widest text-lg font-bold">APEX <span className="text-apex">MOTO</span></span>
          <Bike className="w-4 h-4 text-zinc-500 hidden sm:block" />
        </button>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white transition-colors relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-apex group-hover:w-full transition-all" />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-xs font-bold">
            {(['fr', 'ar', 'en'] as Lang[]).map((l) => (
              <button key={l} onClick={() => onLang(l)} className={`px-2.5 py-1 rounded-full uppercase ${lang === l ? 'bg-apex text-white' : 'text-zinc-400 hover:text-white'}`}>{l}</button>
            ))}
          </div>
          <a href={SHOWROOM.whatsapp} target="_blank" className="hidden md:inline-flex items-center gap-2 bg-apex hover:bg-apex-dark text-white text-sm font-bold px-4 py-2 diag transition-colors">
            <Phone className="w-4 h-4" /> {SHOWROOM.phone}
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-zinc-300">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-carbon-950 px-4 py-4 space-y-3">
          {links.map((l) => (<Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-1.5 font-display tracking-wider text-lg">{l.label}</Link>))}
          <div className="flex gap-2 pt-2">
            {(['fr', 'ar', 'en'] as Lang[]).map((l) => (
              <button key={l} onClick={() => onLang(l)} className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase border ${lang === l ? 'bg-apex border-apex' : 'border-white/15 text-zinc-400'}`}>{l}</button>
            ))}
          </div>
          <p className="text-xs text-zinc-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {SHOWROOM.plusCode} · 09:00–21:00</p>
        </div>
      )}
    </header>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-white/10 bg-black mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <p className="font-display text-2xl font-bold">APEX <span className="text-apex">MOTO</span></p>
          <p className="text-sm text-zinc-400 mt-2">{SHOWROOM.plusCode}<br />{SHOWROOM.city}</p>
          <p className="text-sm text-zinc-400 mt-1">⏰ {lang === 'ar' ? 'مفتوح حتى 21:00' : lang === 'en' ? 'Open till 9PM' : 'Ouvert · Ferme à 21:00'}</p>
          <p className="text-sm font-bold mt-2">☎️ {SHOWROOM.phone}</p>
        </div>
        <div className="text-sm space-y-2 text-zinc-400">
          <p className="text-white font-bold font-display tracking-widest">NAVIGATION</p>
          <Link href="/motos" className="block hover:text-white">Motos</Link>
          <Link href="/accessoires" className="block hover:text-white">Casques & Accessoires</Link>
          <Link href="/a-propos" className="block hover:text-white">À propos</Link>
          <Link href="/contact" className="block hover:text-white">Contact</Link>
        </div>
        <div className="text-sm space-y-2 text-zinc-400">
          <p className="text-white font-bold font-display tracking-widest">SHOWROOM</p>
          <p>⭐ {SHOWROOM.rating} — {SHOWROOM.reviewsCount} avis Google</p>
          <p>Neuf & occasion contrôlée</p>
          <p>Essai sur place · Paiement facilité</p>
        </div>
        <div>
          <p className="text-white font-bold font-display tracking-widest text-sm">HORAIRES</p>
          <p className="text-sm text-zinc-400 mt-2">Sam – Jeu : 09:00 – 21:00<br />Ven : 14:00 – 21:00</p>
          <a href={SHOWROOM.whatsapp} target="_blank" className="inline-flex mt-4 bg-apex px-5 py-2.5 text-sm font-bold diag">WhatsApp</a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-600">© 2026 Apex Moto Oran — Bir El Djir · PCJR+7C4</div>
    </footer>
  );
}
