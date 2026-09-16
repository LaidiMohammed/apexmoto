'use client';
import { useEffect, useState } from 'react';
import type { Lead, Product } from './types';
import { SEED } from './seed';

const DB_KEY = 'apexmoto_db_v1';
const LEADS_KEY = 'apexmoto_leads_v1';
const LANG_KEY = 'apexmoto_lang';

export function loadProducts(): Product[] {
  if (typeof window === 'undefined') return SEED;
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      localStorage.setItem(DB_KEY, JSON.stringify(SEED));
      return SEED;
    }
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length === 0) return SEED;
    return arr;
  } catch {
    return SEED;
  }
}

export function saveProducts(p: Product[]) {
  localStorage.setItem(DB_KEY, JSON.stringify(p));
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setProducts(loadProducts());
    const onStorage = () => setProducts(loadProducts());
    window.addEventListener('storage', onStorage);
    window.addEventListener('apexmoto:update', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('apexmoto:update', onStorage);
    };
  }, []);
  const update = (next: Product[]) => {
    saveProducts(next);
    setProducts(next);
    window.dispatchEvent(new Event('apexmoto:update'));
  };
  return { products, update };
}

export function bumpViews(id: string) {
  try {
    const all = loadProducts();
    const next = all.map((p) => (p.id === id ? { ...p, views: (p.views ?? 0) + 1 } : p));
    saveProducts(next);
  } catch {}
}

export function loadLeads(): Lead[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY) || '[]');
  } catch {
    return [];
  }
}
export function addLead(l: Lead) {
  const all = loadLeads();
  all.unshift(l);
  localStorage.setItem(LEADS_KEY, JSON.stringify(all));
  window.dispatchEvent(new Event('apexmoto:update'));
}

export const ADMIN_PWD = 'ldldld';
export function isAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('apex_admin') === '1';
}
export function loginAdmin(pwd: string): boolean {
  if (pwd === ADMIN_PWD) {
    sessionStorage.setItem('apex_admin', '1');
    return true;
  }
  return false;
}
export function logoutAdmin() {
  sessionStorage.removeItem('apex_admin');
}

export function getLang(): 'fr' | 'ar' | 'en' {
  if (typeof window === 'undefined') return 'fr';
  return (localStorage.getItem(LANG_KEY) as any) || 'fr';
}
export function setLang(l: string) {
  localStorage.setItem(LANG_KEY, l);
}
