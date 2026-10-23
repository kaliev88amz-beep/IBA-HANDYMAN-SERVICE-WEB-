import Anthropic from '@anthropic-ai/sdk';
import {
  INITIAL_PRICING_CONFIG as P,
  HANDYMAN_SERVICES,
  SERVICE_AREAS,
  DEFAULT_FAQS,
} from '../src/config/pricingConfig.js'; // .js: Vercel runs the compiled ESM output
import { translations } from '../src/config/i18n.js';
import { TV_PRICES_TEXT } from '../src/config/tvPricing.js';

/**
 * POST /api/chat — the website's AI helper (Vercel serverless function).
 * Needs the ANTHROPIC_API_KEY environment variable in Vercel; without it the
 * function answers 503 and the widget falls back to its built-in FAQ answers.
 */

const MAX_TURNS = 12;
const MAX_CHARS = 1000;
const RATE_LIMIT = 20; // messages per IP per window (per warm instance; a soft guard)
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

const KNOWLEDGE = [
  'BUSINESS: IBA Handyman Services — TV mounting and handyman services in Raleigh, NC and the Triangle.',
  'Phone / text: (919) 264-6101. Website booking: the request form on the Contact page.',
  'Hours: ' + translations.en.footer.hoursText.replace(/\n/g, '; ') + '.',
  `Minimum order: $${P.minimumOrder}.`,
  '',
  'TV MOUNTING PRICES (labor, regular drywall unless noted):',
  TV_PRICES_TEXT,
  '',
  'OTHER SERVICES:',
  ...HANDYMAN_SERVICES.map(s => `- ${s.titleEn}: ${s.shortDescEn} Price guide: ${s.demoPriceGuideEn}.`),
  '',
  'SERVICE AREA: ' + SERVICE_AREAS.map(a => a.city).join(', ') + '.',
  '',
  'FAQ:',
  ...DEFAULT_FAQS.map(f => `Q: ${f.questionEn}\nA: ${f.answerEn}`),
].join('\n');

const SYSTEM = `You are the friendly website assistant for IBA Handyman Services, a local TV mounting and handyman business in Raleigh, NC.

Answer customers' questions using only the business information below. Keep answers short (2-4 sentences), warm and practical. Reply in the customer's language (English or Russian).

Rules:
- Prices: quote only prices from the information below, as "from $X" estimates. The final price is confirmed by the owner after seeing details or photos. Never invent prices, discounts, availability or time slots.
- If a price element below conflicts with another, use the PRICES section, not the FAQ text.
- For anything not covered (unusual jobs, exact availability, special requests), say the owner will confirm.
- For TV mounting, also suggest the 5-question price quiz on the TV Mounting page for an instant estimate.
- When the customer wants to book, needs an exact quote, or asks something you can't answer, invite them to tap the "Text me back" button and leave their name and phone — the owner will text them shortly. They can also call or text (919) 264-6101.
- Only discuss topics related to this business and home services. Politely decline anything else.
- Electrical safety: never suggest running power cords inside walls; recommend the code-compliant options mentioned below.

BUSINESS INFORMATION:
${KNOWLEDGE}`;

const client = new Anthropic();

export async function POST(request: Request): Promise<Response> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'ai_not_configured' }, { status: 503 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    return Response.json({ error: 'rate_limited' }, { status: 429 });
  }
  recent.push(now);
  hits.set(ip, recent);

  let body: { messages?: { role?: string; text?: string }[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'bad_request' }, { status: 400 });
  }

  const messages: Anthropic.Beta.BetaMessageParam[] = (body.messages || [])
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string' && m.text.trim())
    .slice(-MAX_TURNS)
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.text!.slice(0, MAX_CHARS) }));
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return Response.json({ error: 'bad_request' }, { status: 400 });
  }

  try {
    const response = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 2048,
      output_config: { effort: 'low' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      cache_control: { type: 'ephemeral' },
      system: SYSTEM,
      messages,
    });

    const text = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim();
    if (response.stop_reason === 'refusal' || !text) {
      return Response.json({ error: 'no_answer' }, { status: 502 });
    }
    return Response.json({ reply: text });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json({ error: 'busy' }, { status: 429 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error('Claude API error', error.status, error.message);
    } else {
      console.error('Chat function error', error);
    }
    return Response.json({ error: 'ai_error' }, { status: 502 });
  }
}
