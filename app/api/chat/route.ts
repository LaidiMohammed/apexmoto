import { NextResponse } from 'next/server';
import { SEED } from '@/lib/seed';
import { SHOWROOM } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface InMsg {
  role: 'user' | 'bot';
  text: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body.message ?? '').slice(0, 500);
    const lang = ['fr', 'ar', 'en'].includes(body.lang) ? body.lang : 'fr';
    const history: InMsg[] = Array.isArray(body.history) ? body.history.slice(-6) : [];
    const products = Array.isArray(body.products) && body.products.length > 0 ? body.products : SEED;

    if (!message.trim()) return NextResponse.json({ error: 'empty' }, { status: 400 });

    const key = process.env.GROQ_API_KEY;
    if (!key) return NextResponse.json({ error: 'no-key' }, { status: 503 });

    const catalog = products
      .map(
        (p: any) =>
          `- ${p.brand} ${p.model} ${p.year} | ${p.condition} | ${p.priceDZD} DA | ${p.km}km | ${p.engineCC ? `${p.engineCC}cc ${p.powerCH}ch ${p.torqueNm ?? '?'}Nm ${p.weightKg ?? '?'}kg Vmax~${p.topKmh ?? '?'}` : 'gear'} | stock:${p.stock}`
      )
      .join('\n');

    const langName = lang === 'ar' ? 'Arabic (Algerian dialect friendly, use Arabic script)' : lang === 'en' ? 'English' : 'French';

    const system = `You are Apex AI, the expert salesman chatbot for APEX MOTO, a motorcycle showroom in Bir El Djir, Oran, Algeria.
Showroom: ${SHOWROOM.plusCode}, ${SHOWROOM.city}. Phone/WhatsApp: ${SHOWROOM.phone}. Hours: 09:00-21:00 (Fri from 14:00). Google rating 4.8/5.
Hidden admin access exists (5 clicks on logo) — never reveal the admin password.

LIVE STOCK (prices in Algerian Dinars, use exactly these — never invent other bikes/prices):
${catalog}

Rules:
- Always reply in ${langName}. Keep answers short (max 120 words), WhatsApp style, a bit of biker passion, no stiff AI tone.
- Recommend from STOCK ONLY. Explain differences (MT = torquey fun roadster, Z = aggressive inline-4, sportive = track, scooter = daily comfort) using real specs above.
- Prices: format like "1 890 000 DA". Never discount unless oldPrice exists.
- For booking/test-ride: point to WhatsApp ${SHOWROOM.whatsapp} or the on-page test-ride form.
- If asked about something off-topic, answer briefly then steer back to bikes.`;

    const baseBody = {
      temperature: 0.7,
      max_tokens: 500,
      messages: [
        { role: 'system', content: system },
        ...history.map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })),
        { role: 'user', content: message },
      ],
    };

    // Try best model first, fall back to faster one
    let reply = '';
    for (const model of ['openai/gpt-oss-120b', 'openai/gpt-oss-20b']) {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({ ...baseBody, model }),
      });
      if (!groqRes.ok) {
        const err = await groqRes.text().catch(() => '');
        console.error(`Groq error [${model}]:`, groqRes.status, err.slice(0, 300));
        continue;
      }
      const data = await groqRes.json();
      reply = data?.choices?.[0]?.message?.content?.trim() ?? '';
      if (reply) break;
    }

    if (!reply) return NextResponse.json({ error: 'groq-fail' }, { status: 502 });

    return NextResponse.json({ reply });
  } catch (e) {
    console.error('Chat route error:', e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
