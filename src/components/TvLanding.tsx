import React, { useState } from 'react';
import { ArrowLeft, Check, Loader2, MessageSquareText, Phone, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  FEATURED_REVIEWS,
  MESSENGER_URL,
  SOCIAL_LINKS,
  TEXT_NUMBER,
  THUMBTACK_STATS,
  WEB3FORMS_ACCESS_KEY,
} from '../config/pricingConfig';
import {
  SMALL_TV_WITH_ANOTHER,
  TV_ADDONS,
  TV_QUIZ_STEPS,
  TV_SIZE_PRICES,
  TvQuizAnswers,
  describeTvAnswers,
  estimateTvJob,
} from '../config/tvPricing';

export const PHONE_DISPLAY = '(919) 264-6101';

export const JOBS = [
  { src: '/images/work/led-niche-tv-fireplace.jpg', en: 'Backlit niche with slat wall', ru: 'Ниша с подсветкой и рейками' },
  { src: '/images/work/stone-fireplace-tv.jpg', en: 'Above a stone fireplace', ru: 'Над каменным камином' },
  { src: '/images/work/slat-wall-tv-blue-led.jpg', en: 'Slat wall with LED lights', ru: 'Рейки с LED-подсветкой' },
  { src: '/images/work/tile-fireplace-tv.jpg', en: 'Above a tiled fireplace', ru: 'Над камином из плитки' },
  { src: '/images/work/slat-wall-tv-white-panel.jpg', en: 'Media wall, floating console', ru: 'Медиастена с подвесной тумбой' },
  { src: '/images/work/fireplace-tv-wall-after.jpg', en: 'TV & electric fireplace wall', ru: 'Стена с ТВ и электрокамином' },
];

/** Simple line icons for the mount types (decorative). */
const MountIcon: React.FC<{ kind: 'fixed' | 'tilting' | 'full' | 'pulldown' }> = ({ kind }) => (
  <svg width="56" height="40" viewBox="0 0 56 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'fixed' && (<><rect x="8" y="10" width="40" height="18" rx="1" /><path d="M16 4v30M40 4v30" /></>)}
    {kind === 'tilting' && (<><path d="M10 8l36 4v16l-36 4z" /><path d="M16 2v36M40 4v32" /></>)}
    {kind === 'full' && (<><rect x="4" y="10" width="6" height="20" rx="1" /><path d="M10 20h12l8-6h6" /><path d="M36 6l12 28M48 6L36 34" /></>)}
    {kind === 'pulldown' && (<><path d="M10 2v36M18 2v36" /><path d="M18 10h14v18h14" /><rect x="40" y="22" width="10" height="12" rx="1" /></>)}
  </svg>
);

const digitsOnly = (s: string) => s.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');

/** The 6-step price quiz: 5 questions, then name/phone/ZIP; the lead goes to Gmail. */
export const TvPriceQuiz: React.FC = () => {
  const { language } = useApp();
  const ru = language === 'ru';
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<TvQuizAnswers>({});
  const [contact, setContact] = useState({ name: '', phone: '', zip: '' });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalSteps = TV_QUIZ_STEPS.length + 1;
  const est = estimateTvJob(answers);
  const current = TV_QUIZ_STEPS[step];
  const done = step > TV_QUIZ_STEPS.length;
  const canText = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  const priceLabel = `${ru ? 'от' : 'from'} $${est.total}`;
  const priceNote = [
    est.discountRate ? `${Math.round(est.discountRate * 100)}% ${ru ? 'скидка за несколько ТВ' : 'multi-TV discount applied'}` : '',
    est.hasQuoteItems ? (ru ? '+ пункты, которые уточним' : '+ items we confirm') : '',
  ].filter(Boolean).join(' · ') || (ru ? 'работа; итоговую цену подтвердим в SMS' : 'labor; final price confirmed by text');

  const summary = [
    ru ? 'Здравствуйте, IBA! Мой расчёт с сайта:' : 'Hi IBA! My quote from the website:',
    ...describeTvAnswers(answers, ru).map(l => `• ${l}`),
    `${ru ? 'Оценка' : 'Estimate'}: ${priceLabel}`,
    contact.zip ? `ZIP: ${contact.zip}` : '',
  ].filter(Boolean).join('\n');

  const pick = (optionId: string) => {
    setAnswers(a => ({ ...a, [current.key]: optionId }));
    setStep(s => s + 1);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phone = digitsOnly(contact.phone);
    if (phone.length !== 10) {
      setError(ru ? 'Укажите 10-значный номер телефона США.' : 'Please enter a valid 10-digit US phone number.');
      return;
    }
    if (!/^\d{5}$/.test(contact.zip.trim())) {
      setError(ru ? 'Укажите 5-значный ZIP-код.' : 'Please enter a 5-digit ZIP code.');
      return;
    }
    setError('');
    setSending(true);
    const pretty = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `TV quote $${est.total}${est.hasQuoteItems ? '+' : ''}: ${contact.name.trim()} ${pretty} (${contact.zip.trim()})`,
          from_name: 'IBA Website — TV Price Quiz',
          Name: contact.name.trim(),
          Phone: pretty,
          'Reply by text (tap on phone)': `sms:+1${phone}`,
          'ZIP code': contact.zip.trim(),
          Answers: describeTvAnswers(answers).join('\n'),
          Estimate: `from $${est.total} (${est.tvCount} TV x $${est.perTv}${est.discountRate ? `, -${Math.round(est.discountRate * 100)}%` : ''})${est.hasQuoteItems ? ' + items to confirm' : ''}`,
          'Site language': language,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success !== true) throw new Error('send failed');
      setStep(s => s + 1);
    } catch {
      setError(ru ? `Не удалось отправить. Позвоните или напишите: ${PHONE_DISPLAY}.` : `Couldn't send. Please call or text ${PHONE_DISPLAY}.`);
    } finally {
      setSending(false);
    }
  };

  const restart = () => {
    setAnswers({});
    setContact({ name: '', phone: '', zip: '' });
    setStep(0);
  };

  const copySummary = () => {
    navigator.clipboard?.writeText(summary).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const inputClass =
    'h-12 px-4 rounded-xl border border-line/15 bg-page text-ink text-base placeholder:text-ink-500 focus:outline-hidden focus:border-accent';

  return (
    <div id="tv-quiz" className="scroll-mt-28 rounded-3xl bg-surface border border-line/10 p-5 sm:p-6 flex flex-col gap-4 shadow-2xl">
      {/* Progress */}
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full ${i <= step ? 'bg-accent' : 'bg-line/15'}`} />
        ))}
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-editorial font-extrabold text-xl text-ink">
          {done
            ? (ru ? 'Готово!' : 'Got it!')
            : current
              ? (ru ? current.titleRu : current.titleEn)
              : (ru ? 'Куда прислать цену?' : 'Where should we text your price?')}
        </h3>
        <span className="text-xs text-ink-400 shrink-0">
          {done ? (ru ? 'Отправлено' : 'Sent') : `${ru ? 'Шаг' : 'Step'} ${step + 1} ${ru ? 'из' : 'of'} ${totalSteps}`}
        </span>
      </div>

      {current && (
        <div className="grid grid-cols-2 gap-2.5">
          {current.options.map(o => {
            const selected = answers[current.key] === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => pick(o.id)}
                className={`min-h-[88px] p-3.5 rounded-2xl text-left flex flex-col gap-1.5 border-2 transition-colors ${
                  selected ? 'border-accent bg-accent/10' : 'border-transparent bg-page hover:border-accent/50'
                }`}
              >
                <span className="font-semibold text-[15px] leading-snug text-ink">{ru ? o.labelRu : o.labelEn}</span>
                <span className="text-[13px] font-semibold text-accent-ink">{ru ? o.hintRu : o.hintEn}</span>
              </button>
            );
          })}
        </div>
      )}

      {!current && !done && (
        <form onSubmit={submit} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5 text-sm text-ink-300">
            {ru ? 'Имя' : 'Name'}
            <input required value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} autoComplete="given-name" placeholder={ru ? 'Ваше имя' : 'Your name'} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-300">
            {ru ? 'Мобильный телефон' : 'Mobile phone'}
            <input required type="tel" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} autoComplete="tel" placeholder="(919) 555-0123" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-300">
            {ru ? 'ZIP-код' : 'ZIP code'}
            <input required inputMode="numeric" maxLength={5} value={contact.zip} onChange={e => setContact({ ...contact, zip: e.target.value })} autoComplete="postal-code" placeholder="27601" className={inputClass} />
          </label>
          {error && <p className="text-sm font-semibold text-bad">{error}</p>}
          <button type="submit" disabled={sending} className="h-14 rounded-xl bg-accent hover:bg-accent-hover light:bg-[#0288d1] light:hover:bg-[#0277bd] text-black light:text-white font-bold text-base flex items-center justify-center gap-2 disabled:opacity-60 transition-colors">
            {sending && <Loader2 className="w-4 h-4 animate-spin" />}
            {ru ? 'Прислать мне цену' : 'Text me my price'}
          </button>
          <p className="text-xs text-ink-400 text-center">
            {ru
              ? 'Отвечаем по SMS. Фото стены поможет назвать точную цену. Нажимая кнопку, вы соглашаетесь получить SMS по вашему запросу.'
              : 'We reply by text. A photo of the wall helps. By tapping the button you agree to receive texts about your request.'}
          </p>
        </form>
      )}

      {done && (
        <div className="flex flex-col items-center text-center gap-3 py-2">
          <div className="w-14 h-14 rounded-full bg-accent light:bg-[#0288d1] flex items-center justify-center">
            <Check className="w-7 h-7 text-black light:text-white" strokeWidth={3} />
          </div>
          <p className="text-sm text-ink-300 max-w-xs leading-relaxed">
            {ru
              ? 'Мы напишем вам SMS, чтобы подтвердить цену и время. Хотите быстрее? Отправьте расчёт нам сами:'
              : "We'll text you to confirm the final price and a time. Want it faster? Send us your quote now:"}
          </p>
          <div className="w-full grid gap-2">
            {canText ? (
              <a href={`sms:${TEXT_NUMBER}?&body=${encodeURIComponent(summary)}`} className="h-12 rounded-xl bg-[#34C759] text-white font-bold flex items-center justify-center gap-2">
                <MessageSquareText className="w-4 h-4" /> {ru ? 'Отправить в SMS' : 'Send by text'}
              </a>
            ) : (
              <button type="button" onClick={copySummary} className="h-12 rounded-xl border border-line/15 text-ink font-bold flex items-center justify-center gap-2 hover:bg-line/5">
                <MessageSquareText className="w-4 h-4" />
                {copied ? (ru ? '✓ Скопировано' : '✓ Copied') : (ru ? `Скопировать расчёт · SMS на ${PHONE_DISPLAY}` : `Copy quote · text ${PHONE_DISPLAY}`)}
              </button>
            )}
            <a href={`${MESSENGER_URL}?text=${encodeURIComponent(summary)}`} target="_blank" rel="noopener noreferrer" className="h-12 rounded-xl bg-gradient-to-r from-[#00B2FF] to-[#A033FF] text-white font-bold flex items-center justify-center gap-2">
              {ru ? 'Отправить в Messenger' : 'Send on Messenger'}
            </a>
          </div>
          <button type="button" onClick={restart} className="text-sm font-semibold text-ink-400 hover:text-ink underline underline-offset-4">
            {ru ? 'Начать заново' : 'Start over'}
          </button>
        </div>
      )}

      {/* Running estimate */}
      <div className="mt-1 p-4 rounded-2xl bg-page border border-line/10 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-ink-400">{ru ? 'Ваша оценка' : 'Your estimate'}</span>
          <span className="font-editorial text-2xl font-extrabold text-ink">{priceLabel}</span>
          <span className="text-xs text-ink-300">{priceNote}</span>
        </div>
        {step > 0 && !done && (
          <button type="button" onClick={() => setStep(s => s - 1)} className="h-11 px-4 rounded-xl border border-line/15 text-ink font-semibold text-sm flex items-center gap-1.5 hover:bg-line/5">
            <ArrowLeft className="w-4 h-4" /> {ru ? 'Назад' : 'Back'}
          </button>
        )}
      </div>
    </div>
  );
};

/** TV mounting page/section: hero with the price quiz, real jobs, mounts, prices and a review. */
export const TvLanding: React.FC = () => {
  const { language } = useApp();
  const ru = language === 'ru';
  const review = FEATURED_REVIEWS.find(r => /tv/i.test(r.service)) ?? FEATURED_REVIEWS[0];

  const mounts = [
    { kind: 'fixed' as const, en: 'Fixed', ru: 'Фиксированный', subEn: 'Flat to the wall', subRu: 'Плотно к стене', price: `+$${TV_ADDONS.fixedMount}` },
    { kind: 'tilting' as const, en: 'Tilting', ru: 'Наклонный', subEn: 'Angles down, less glare', subRu: 'Наклон вниз, меньше бликов', price: `+$${TV_ADDONS.tiltingMount}` },
    { kind: 'full' as const, en: 'Full-motion', ru: 'Поворотный', subEn: 'Pull out and turn', subRu: 'Выдвигается и поворачивается', price: `+$${TV_ADDONS.fullMotionMount}` },
    { kind: 'pulldown' as const, en: 'Fireplace pull-down', ru: 'Опускаемый над камином', subEn: 'Lowers to eye level', subRu: 'Опускается до уровня глаз', price: ru ? 'По запросу' : 'Quote' },
  ];

  const prices = [
    [ru ? 'ТВ до 32"' : 'Up to 32" TV', `$${TV_SIZE_PRICES.s} · $${SMALL_TV_WITH_ANOTHER} ${ru ? 'с другим ТВ' : 'w/ another TV'}`],
    [ru ? 'ТВ 33"–64"' : '33"–64" TV', `$${TV_SIZE_PRICES.m}`],
    [ru ? 'ТВ 65"–75"' : '65"–75" TV', `$${TV_SIZE_PRICES.l}`],
    [ru ? 'ТВ 76"+ (2 мастера)' : '76"+ TV (2 people)', `${ru ? 'от' : 'from'} $${TV_SIZE_PRICES.xl}`],
    [ru ? 'Над камином' : 'Above fireplace', `+$${TV_ADDONS.fireplace}`],
    [ru ? 'Провода в стене' : 'Wires inside the wall', `+$${TV_ADDONS.inWallWires}`],
    [ru ? 'Кирпич / камень' : 'Brick / stone wall', `+$${TV_ADDONS.brickStone}`],
  ];

  return (
    <section id="tv-mounting-hub" className="relative bg-page text-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-start">
        {/* Hero */}
        <div className="flex flex-col gap-5">
          <h2 className="font-editorial font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
            {ru ? 'МОНТАЖ ТВ' : 'TV MOUNTING'}
            <br />
            <span className="text-accent-ink">{ru ? 'В РОЛИ' : 'IN RALEIGH'}</span>
          </h2>
          <p className="text-base sm:text-lg text-ink-300 leading-relaxed max-w-lg">
            {ru
              ? 'Скрытые провода. Камины. Кирпич. Ответьте на 5 коротких вопросов и узнайте цену.'
              : 'Hidden wires. Fireplaces. Brick. Answer 5 quick questions and see your price.'}
          </p>
          <img
            src="/images/tv-hero.webp"
            alt={ru ? 'Семья смотрит новый телевизор на стене' : 'Family enjoying a newly wall-mounted TV in a bright living room'}
            className="w-full h-64 sm:h-80 object-cover object-[30%_center] rounded-3xl"
          />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-300">
            <a href={SOCIAL_LINKS.thumbtack} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-ink">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <b className="text-ink">{THUMBTACK_STATS.rating}</b> · {THUMBTACK_STATS.reviewCount} {ru ? 'отзывов на Thumbtack' : 'reviews on Thumbtack'}
            </a>
            <a href="tel:+19192646101" className="flex items-center gap-1.5 font-semibold text-accent-ink">
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <TvPriceQuiz />
      </div>

      {/* Real jobs */}
      <div className="pb-14">
        <h2 className="max-w-6xl mx-auto px-4 sm:px-6 font-editorial font-extrabold text-2xl mb-4">{ru ? 'НАШИ РАБОТЫ' : 'REAL JOBS'}</h2>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
          {JOBS.map(j => (
            <figure key={j.src} className="flex-none w-60 sm:w-64 snap-start">
              <img src={j.src} alt={ru ? j.ru : j.en} loading="lazy" className="w-full h-72 object-cover rounded-2xl" />
              <figcaption className="mt-2 text-sm text-ink-300">{ru ? j.ru : j.en}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 grid lg:grid-cols-2 gap-12">
        {/* Mounts */}
        <div className="flex flex-col gap-4">
          <h2 className="font-editorial font-extrabold text-2xl">{ru ? 'НУЖЕН КРОНШТЕЙН?' : 'NEED A MOUNT?'}</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {mounts.map(m => (
              <div key={m.kind} className="p-4 rounded-2xl bg-surface border border-line/10 flex flex-col gap-1.5">
                <span className="text-accent-ink"><MountIcon kind={m.kind} /></span>
                <span className="font-bold text-ink">{ru ? m.ru : m.en}</span>
                <span className="text-[13px] text-ink-300">{ru ? m.subRu : m.subEn}</span>
                <span className="font-bold text-accent-ink">{m.price}</span>
              </div>
            ))}
          </div>
          <div className="px-4 py-3.5 rounded-xl bg-surface border border-line/10 text-[15px]">
            {ru ? 'Есть свой кронштейн? ' : 'Have your own mount? '}
            <b>{ru ? 'Без доплаты.' : 'No extra charge.'}</b>
          </div>
        </div>

        {/* Prices */}
        <div className="flex flex-col gap-2">
          <h2 className="font-editorial font-extrabold text-2xl mb-2">{ru ? 'ПРОСТЫЕ ЦЕНЫ' : 'SIMPLE PRICES'}</h2>
          {prices.map(([label, price]) => (
            <div key={label} className="flex justify-between gap-4 py-3.5 border-b border-line/10 text-[15px]">
              <span className="text-ink-200">{label}</span>
              <b className="text-ink text-right">{price}</b>
            </div>
          ))}
          <p className="text-[13px] text-ink-400 mt-1">
            {ru
              ? 'Скидка 10% за 2 ТВ, 15% за 3, 20% за 4+. Итоговую цену подтверждаем в SMS до приезда.'
              : 'Save 10% on 2 TVs, 15% on 3, 20% on 4+. Final price confirmed by text before we come.'}
          </p>
        </div>
      </div>

      {/* Review */}
      {review && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <figure className="p-6 rounded-3xl bg-surface border border-line/10 flex flex-col gap-3">
            <div className="flex gap-0.5 text-accent" aria-label={`${review.rating} stars`}>
              {Array.from({ length: review.rating }, (_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <blockquote className="text-base leading-relaxed text-ink">“{review.text}”</blockquote>
            <figcaption className="text-sm text-ink-400">
              {review.name} · {review.service} ·{' '}
              <a href={SOCIAL_LINKS.thumbtack} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">Thumbtack</a>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};
