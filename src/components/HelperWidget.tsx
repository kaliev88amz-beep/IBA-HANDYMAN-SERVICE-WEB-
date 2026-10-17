import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { IbaHandymanIcon } from './Logos';
import { WEB3FORMS_ACCESS_KEY } from '../config/pricingConfig';
import { FaqItem } from '../types';
import { MessageSquare, X, Send, Smartphone, CheckCircle2, Loader2 } from 'lucide-react';

type ChatMessage = { role: 'user' | 'assistant'; text: string };

const COPY = {
  en: {
    greeting: "Hi! 👋 I'm the IBA assistant. Ask me about prices, TV mounting or any handyman job — or tap “Text me back” and the owner will text you.",
    placeholder: 'Type your question…',
    textMeBack: 'Text me back',
    leadTitle: "We'll text you back",
    leadIntro: 'Leave your name and number — the owner will text you shortly.',
    name: 'Name',
    phone: 'Mobile phone',
    message: 'What do you need?',
    send: 'Send',
    back: '← Back to chat',
    consent: 'By tapping Send, you agree that IBA Handyman Services may text you about your request.',
    phoneError: 'Please enter a valid 10-digit US phone number.',
    sendError: "Couldn't send. Please call or text (919) 264-6101.",
    sent: (name: string) => `Thanks, ${name}! ✅ We got your request and will text you shortly.`,
    fallback: "Good question! I'll need the owner to confirm that. Tap “Text me back” and leave your number, or call/text (919) 264-6101.",
    disclaimer: 'Prices are estimates; the final price is confirmed by the owner.',
  },
  ru: {
    greeting: 'Здравствуйте! 👋 Я помощник IBA. Спросите о ценах, монтаже ТВ или любой работе мастера — или нажмите «Напишите мне», и владелец пришлёт вам SMS.',
    placeholder: 'Напишите вопрос…',
    textMeBack: 'Напишите мне',
    leadTitle: 'Мы вам напишем',
    leadIntro: 'Оставьте имя и номер — владелец скоро напишет вам SMS.',
    name: 'Имя',
    phone: 'Мобильный телефон',
    message: 'Что нужно сделать?',
    send: 'Отправить',
    back: '← Назад в чат',
    consent: 'Нажимая «Отправить», вы соглашаетесь получить SMS от IBA Handyman Services по вашему запросу.',
    phoneError: 'Укажите корректный 10-значный номер телефона США.',
    sendError: 'Не удалось отправить. Позвоните или напишите: (919) 264-6101.',
    sent: (name: string) => `Спасибо, ${name}! ✅ Заявка получена, скоро напишем вам SMS.`,
    fallback: 'Хороший вопрос! Это лучше уточнит владелец. Нажмите «Напишите мне» и оставьте номер, или позвоните/напишите: (919) 264-6101.',
    disclaimer: 'Цены ориентировочные; итоговую цену подтверждает владелец.',
  },
};

/** Offline answer: the FAQ whose question shares the most words with the visitor's message. */
const matchFaq = (text: string, faqs: FaqItem[], ru: boolean): string | null => {
  const words = (s: string) => new Set(s.toLowerCase().match(/[\p{L}\d]{4,}/gu) || []);
  const asked = words(text);
  let best: { score: number; faq?: FaqItem } = { score: 0 };
  for (const faq of faqs) {
    const q = words(`${faq.questionEn} ${faq.questionRu}`);
    const score = [...asked].filter(w => q.has(w)).length;
    if (score > best.score) best = { score, faq };
  }
  return best.faq && best.score >= 1 ? (ru ? best.faq.answerRu : best.faq.answerEn) : null;
};

const digitsOnly = (s: string) => s.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');

export const HelperWidget: React.FC = () => {
  const { language, t, faqs } = useApp();
  const c = COPY[language];
  const ru = language === 'ru';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [view, setView] = useState<'chat' | 'lead'>('chat');
  const [lead, setLead] = useState({ name: '', phone: '', note: '' });
  const [leadError, setLeadError] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking, view]);

  const ask = async (text: string, presetAnswer?: string) => {
    const question = text.trim();
    if (!question || thinking) return;
    const history: ChatMessage[] = [...messages, { role: 'user', text: question }];
    setMessages(history);
    setInput('');

    if (presetAnswer) {
      setMessages([...history, { role: 'assistant', text: presetAnswer }]);
      return;
    }

    setThinking(true);
    let reply: string | null = null;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (res.ok) reply = (await res.json())?.reply || null;
    } catch {
      // AI not reachable: fall back to the FAQ below
    }
    setMessages([...history, { role: 'assistant', text: reply || matchFaq(question, faqs, ru) || c.fallback }]);
    setThinking(false);
  };

  const openLeadForm = () => {
    const lastQuestion = [...messages].reverse().find(m => m.role === 'user')?.text || '';
    setLead(l => ({ ...l, note: l.note || lastQuestion }));
    setLeadError('');
    setView('lead');
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = digitsOnly(lead.phone);
    if (phone.length !== 10) {
      setLeadError(c.phoneError);
      return;
    }
    setSending(true);
    setLeadError('');
    const transcript = messages
      .map(m => `${m.role === 'user' ? 'Customer' : 'Assistant'}: ${m.text}`)
      .join('\n\n');
    const pretty = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Text back: ${lead.name.trim()} ${pretty}`,
          from_name: 'IBA Website — Quick Helper',
          Name: lead.name.trim(),
          Phone: pretty,
          'Reply by text (tap on phone)': `sms:+1${phone}`,
          Request: lead.note.trim() || '—',
          'Chat transcript': transcript || '—',
          'Site language': language,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success !== true) throw new Error('send failed');
      setMessages(m => [...m, { role: 'assistant', text: c.sent(lead.name.trim()) }]);
      setLead({ name: '', phone: '', note: '' });
      setView('chat');
    } catch {
      setLeadError(c.sendError);
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    'w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm focus:outline-hidden focus:border-warm-400 focus:ring-2 focus:ring-warm-200';

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[min(560px,calc(100vh-7rem))] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                <IbaHandymanIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white leading-tight">{t.helper.title}</h4>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {t.helper.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label={t.helper.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {view === 'chat' ? (
            <>
              {/* Conversation */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 text-sm bg-slate-50">
                <Bubble role="assistant" text={c.greeting} />

                {messages.length === 0 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t.helper.chipsHeader}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {faqs.slice(0, 5).map(faq => (
                        <button
                          key={faq.id}
                          onClick={() => ask(ru ? faq.questionRu : faq.questionEn, ru ? faq.answerRu : faq.answerEn)}
                          className="px-3 py-1.5 rounded-full border border-slate-300 bg-white hover:border-warm-400 hover:bg-warm-50 text-left text-xs text-slate-700 transition-colors"
                        >
                          {ru ? faq.questionRu : faq.questionEn}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m, i) => (
                  <Bubble key={i} role={m.role} text={m.text} />
                ))}

                {thinking && (
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs pl-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{ru ? 'Печатает…' : 'Typing…'}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="border-t border-slate-200 p-3 space-y-2 bg-white">
                <button
                  onClick={openLeadForm}
                  className="w-full py-2 px-3 bg-warm-400 hover:bg-warm-300 text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{c.textMeBack}</span>
                </button>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    ask(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    maxLength={1000}
                    placeholder={c.placeholder}
                    aria-label={c.placeholder}
                    className={inputClass}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || thinking}
                    className="p-2.5 rounded-lg bg-slate-900 text-white disabled:opacity-40 hover:bg-slate-800 transition-colors"
                    aria-label={c.send}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-[10px] text-slate-400 text-center">{c.disclaimer}</p>
              </div>
            </>
          ) : (
            /* "We'll text you back" form */
            <form onSubmit={submitLead} className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              <button type="button" onClick={() => setView('chat')} className="text-warm-600 hover:text-warm-700 font-bold text-xs">
                {c.back}
              </button>
              <div>
                <h5 className="font-extrabold text-slate-900 text-base">{c.leadTitle}</h5>
                <p className="text-xs text-slate-500 mt-0.5">{c.leadIntro}</p>
              </div>
              <label className="block space-y-1">
                <span className="text-xs font-bold text-slate-700">{c.name} *</span>
                <input
                  required
                  value={lead.name}
                  onChange={e => setLead({ ...lead, name: e.target.value })}
                  autoComplete="given-name"
                  className={inputClass}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-bold text-slate-700">{c.phone} *</span>
                <input
                  required
                  type="tel"
                  value={lead.phone}
                  onChange={e => setLead({ ...lead, phone: e.target.value })}
                  autoComplete="tel"
                  placeholder="(919) 555-0123"
                  className={inputClass}
                />
              </label>
              <label className="block space-y-1">
                <span className="text-xs font-bold text-slate-700">{c.message}</span>
                <textarea
                  rows={3}
                  value={lead.note}
                  onChange={e => setLead({ ...lead, note: e.target.value })}
                  maxLength={1000}
                  className={`${inputClass} resize-none`}
                />
              </label>
              {leadError && <p className="text-xs text-red-600 font-semibold">{leadError}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-2.5 px-3 bg-warm-400 hover:bg-warm-300 disabled:opacity-60 text-slate-950 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>{c.send}</span>
              </button>
              <p className="text-[10px] text-slate-400 leading-snug">{c.consent}</p>
            </form>
          )}
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all border border-slate-700 active:scale-95"
          title={t.helper.openHelper}
        >
          <div className="w-6 h-6 rounded-full bg-warm-400 text-slate-950 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-100 hidden sm:inline">{t.helper.openHelper}</span>
        </button>
      )}
    </div>
  );
};

const Bubble: React.FC<ChatMessage> = ({ role, text }) => (
  <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl whitespace-pre-line leading-relaxed text-[13px] ${
        role === 'user'
          ? 'bg-slate-900 text-white rounded-br-md'
          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md'
      }`}
    >
      {text}
    </div>
  </div>
);
