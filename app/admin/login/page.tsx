'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { loginAdmin } from '@/lib/store';

export default function AdminLogin() {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const router = useRouter();
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pwd)) router.push('/admin');
    else setErr('Mot de passe incorrect.');
  };
  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <div className="border border-white/15 bg-carbon-900 p-8">
        <Lock className="w-8 h-8 text-apex" />
        <h1 className="font-display text-3xl font-bold mt-3">ESPACE OWNER</h1>
        <p className="text-xs text-zinc-500 mt-1">Accès caché — 5 clics logo. Stocké local Phase 1.</p>
        <form onSubmit={go} className="mt-5 space-y-3">
          <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Mot de passe" className="w-full bg-black/60 border border-white/15 px-4 py-3 text-sm outline-none focus:border-apex" />
          {err && <p className="text-xs text-red-400">{err}</p>}
          <button className="w-full bg-apex font-bold py-3 diag text-sm">Entrer</button>
        </form>
      </div>
    </div>
  );
}
