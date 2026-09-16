'use client';
import { useEffect, useState } from 'react';
import type { Lang } from '@/lib/types';
import { getLang, setLang } from '@/lib/store';
import { Navbar, Footer } from '@/components/chrome';
import { ChatWidget } from '@/components/chat';

export function Shell({ children }: { children: React.ReactNode }) {
  const [lang, setL] = useState<Lang>('fr');
  useEffect(() => { setL(getLang()); document.documentElement.dir = getLang() === 'ar' ? 'rtl' : 'ltr'; }, []);
  const change = (l: Lang) => {
    setLang(l); setL(l);
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  };
  return (
    <>
      <Navbar lang={lang} onLang={change} />
      <main className="pt-16 min-h-screen">{children}</main>
      <Footer lang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
}

export function usePageLang(): Lang {
  const [lang, setL] = useState<Lang>('fr');
  useEffect(() => {
    setL(getLang());
    const h = () => setL(getLang());
    const iv = setInterval(h, 500);
    window.addEventListener('storage', h);
    return () => { clearInterval(iv); window.removeEventListener('storage', h); };
  }, []);
  return lang;
}
