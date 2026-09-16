'use client';
import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lang } from '@/lib/types';
import { loadProducts } from '@/lib/store';
import { botReply, type ChatMsg } from '@/lib/chat';

export function ChatWidget({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: 'bot', text: lang === 'ar' ? 'سلام! أنا Apex AI 🏍️ اسألني عن MT و Z والسكوتر والأسعار.' : lang === 'en' ? "Hi! I'm Apex AI 🏍️ Ask me about MT, Z, scooters, prices." : "Salut ! Je suis Apex AI 🏍️ Demande-moi MT vs Z, prix, TMAX, adresse…" },
  ]);
  const [typing, setTyping] = useState(false);

  const quick = lang === 'ar'
    ? ['الفرق بين MT و Z؟', 'أرخص دراجة؟', 'عندكم TMAX؟', 'وين المحل؟']
    : lang === 'en'
    ? ['MT vs Z difference?', 'Cheapest bike?', 'Do you have TMAX?', 'Where are you?']
    : ['Différence MT / Z ?', 'Moto la moins chère ?', 'Vous avez TMAX ?', 'Adresse & horaires ?'];

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = botReply(q, lang, loadProducts());
      setMsgs((m) => [...m, { role: 'bot', text: reply }]);
      setTyping(false);
    }, 650);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-apex grid place-items-center shadow-[0_0_30px_rgba(225,6,0,.5)]"
        aria-label="Chat"
      >
        {open ? <X className="text-white" /> : <MessageCircle className="text-white" />}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }}
            className="fixed bottom-21 right-4 sm:right-5 z-50 w-[calc(100vw-2rem)] max-w-sm bg-carbon-900 border border-white/15 overflow-hidden flex flex-col"
            style={{ bottom: 84, height: 520, maxHeight: '70vh' }}
          >
            <div className="bg-gradient-to-r from-apex to-apex-dark px-4 py-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white" />
              <p className="font-display font-bold tracking-widest">APEX AI <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full ml-1">LOCAL · API-READY</span></p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-sm">
              {msgs.map((m, i) => (
                <div key={i} className={`max-w-[85%] px-3 py-2 whitespace-pre-line leading-relaxed ${m.role === 'bot' ? 'bg-white/8 border border-white/10 rounded-r-xl rounded-bl-xl text-zinc-100' : 'ml-auto bg-apex text-white rounded-l-xl rounded-br-xl'}`}>{m.text}</div>
              ))}
              {typing && <div className="text-xs text-zinc-500 animate-pulse">Apex écrit…</div>}
            </div>
            <div className="px-3 pb-1 flex gap-1.5 flex-wrap">
              {quick.map((q) => (
                <button key={q} onClick={() => send(q)} className="text-[11px] font-semibold border border-white/15 rounded-full px-2.5 py-1 hover:border-apex hover:text-white text-zinc-300">{q}</button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 flex gap-2 border-t border-white/10">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={lang === 'ar' ? 'اكتب سؤالك…' : 'Pose ta question…'} className="flex-1 bg-black/50 border border-white/15 rounded-full px-4 py-2 text-sm outline-none focus:border-apex" />
              <button className="w-10 h-10 rounded-full bg-apex grid place-items-center shrink-0"><Send className="w-4 h-4 text-white" /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
