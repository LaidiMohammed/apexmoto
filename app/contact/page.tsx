'use client';
import { useState } from 'react';
import { Phone, MapPin, Send } from 'lucide-react';
import { SHOWROOM } from '@/lib/types';
import { addLead } from '@/lib/store';
import { Reveal, ZoomTitle } from '@/components/motion';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    addLead({ id: crypto.randomUUID(), name, phone, productId: 'contact', type: 'reservation', date: new Date().toISOString(), message: msg });
    setOk(true);
  };
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10">
      <ZoomTitle>
        <p className="text-apex font-bold tracking-mega text-xs">// CONTACT</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold mt-2">PASSE AU <span className="text-stroke-red">SHOWROOM</span></h1>
      </ZoomTitle>
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <Reveal className="border border-white/10 bg-carbon-900 p-6">
          <p className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-apex" /> {SHOWROOM.plusCode}, {SHOWROOM.city}</p>
          <a href={`tel:${SHOWROOM.phoneIntl}`} className="flex items-center gap-2 mt-2 font-bold text-lg"><Phone className="w-4 h-4 text-apex" /> {SHOWROOM.phone}</a>
          <a href={SHOWROOM.whatsapp} target="_blank" className="mt-4 inline-block bg-apex font-bold px-6 py-3 diag text-sm">WhatsApp direct</a>
          {ok ? <p className="mt-4 text-emerald-400 text-sm font-bold">✅ Message reçu ! On te rappelle vite.</p> : (
            <form onSubmit={submit} className="mt-5 space-y-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-sm outline-none focus:border-apex" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Téléphone" className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-sm outline-none focus:border-apex" />
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message — ex: dispo MT-07 ? essai samedi ?" rows={4} className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-sm outline-none focus:border-apex" />
              <button className="w-full bg-white text-black font-bold py-3 diag text-sm inline-flex justify-center gap-2 items-center"><Send className="w-4 h-4" /> Envoyer</button>
            </form>
          )}
        </Reveal>
        <Reveal className="border border-white/10 overflow-hidden min-h-[380px]">
          <iframe title="map" src={SHOWROOM.mapsEmbed} className="w-full h-full min-h-[380px] grayscale invert-[0.9]" loading="lazy" />
        </Reveal>
      </div>
    </div>
  );
}
