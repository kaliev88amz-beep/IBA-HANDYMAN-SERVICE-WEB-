import React, { useEffect } from 'react';
import { Phone, ShieldCheck, Star, Trophy } from 'lucide-react';
import { IbaHandymanLogo } from './Logos';
import { JOBS, PHONE_DISPLAY, TvPriceQuiz } from './TvLanding';
import { FEATURED_REVIEWS, SERVICE_AREAS, SOCIAL_LINKS, THUMBTACK_STATS } from '../config/pricingConfig';
import { SMALL_TV_WITH_ANOTHER, TV_ADDONS, TV_SIZE_PRICES } from '../config/tvPricing';

const PRICES: [string, string][] = [
  ['Up to 32" TV', `$${TV_SIZE_PRICES.s}`],
  ['33"–64" TV', `$${TV_SIZE_PRICES.m}`],
  ['65"–75" TV', `$${TV_SIZE_PRICES.l}`],
  ['76"+ TV', `from $${TV_SIZE_PRICES.xl}`],
  ['Above fireplace', `+$${TV_ADDONS.fireplace}`],
  ['Brick or stone wall', `+$${TV_ADDONS.brickStone}`],
  ['Wires hidden in the wall', `+$${TV_ADDONS.inWallWires}`],
  ['Mount (fixed · tilting · full-motion)', `+$${TV_ADDONS.fixedMount} · $${TV_ADDONS.tiltingMount} · $${TV_ADDONS.fullMotionMount}`],
];

const REVIEWS = FEATURED_REVIEWS.filter(r => /tv|picture/i.test(r.service)).slice(0, 3);

const scrollToQuiz = () => document.getElementById('tv-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/**
 * Stand-alone TV mounting page for ads (/tv-mounting): logo + phone only,
 * one goal (the price quiz), no site menu or floating widgets.
 */
export const TvAdPage: React.FC = () => {
  useEffect(() => {
    document.title = `TV Mounting in Raleigh, NC — from $${TV_SIZE_PRICES.s} | IBA`;
  }, []);

  return (
    <div className="min-h-screen bg-page text-ink font-sans antialiased pb-24 sm:pb-0">
      {/* Header: logo + phone only */}
      <header className="sticky top-0 z-40 bg-page/90 backdrop-blur-xl border-b border-line/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" aria-label="IBA Handyman Services home">
            <IbaHandymanLogo size="sm" theme="dark" />
          </a>
          <a
            href="tel:+19192646101"
            className="flex items-center gap-2 h-11 px-4 rounded-full border border-line/15 font-semibold text-sm hover:bg-line/5"
          >
            <Phone className="w-4 h-4 text-accent-ink" />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* Hero + quiz */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-14 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-start">
        <div className="flex flex-col gap-5">
          <h1 className="font-black text-5xl sm:text-6xl leading-[1.02] tracking-tight">
            TV mounting
            <br />
            <span className="text-accent-ink">in Raleigh.</span>
          </h1>
          <p className="text-lg sm:text-xl text-ink-300 leading-relaxed">
            Clean. Level. Wires hidden. From ${TV_SIZE_PRICES.s}.
          </p>
          <img
            src="/images/tv-hero.webp"
            alt="Family enjoying a newly wall-mounted TV in a bright living room"
            className="w-full h-52 sm:h-96 object-cover object-[30%_center] rounded-3xl"
          />
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-300">
            <li className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <b className="text-ink">{THUMBTACK_STATS.rating}</b> · {THUMBTACK_STATS.reviewCount} reviews
            </li>
            {THUMBTACK_STATS.topPro && (
              <li className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-accent-ink" /> Thumbtack Top Pro</li>
            )}
            {THUMBTACK_STATS.backgroundChecked && (
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-accent-ink" /> Background checked</li>
            )}
          </ul>
        </div>

        <TvPriceQuiz />
      </section>

      {/* Work */}
      <section className="pb-16">
        <h2 className="max-w-6xl mx-auto px-4 sm:px-6 font-extrabold text-3xl mb-5">Our work</h2>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
          {JOBS.map(j => (
            <img key={j.src} src={j.src} alt={j.en} loading="lazy" className="flex-none snap-start w-64 sm:w-72 h-80 object-cover rounded-3xl" />
          ))}
        </div>
      </section>

      {/* Prices */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-extrabold text-3xl mb-4">Simple prices</h2>
        <div className="divide-y divide-line/10 border-y border-line/10">
          {PRICES.map(([label, price]) => (
            <div key={label} className="flex justify-between gap-4 py-4 text-base">
              <span className="text-ink-200">{label}</span>
              <b className="text-right">{price}</b>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-ink-400">
          Labor per TV. Your own mount: no charge. Small TV with another TV: ${SMALL_TV_WITH_ANOTHER}. 2 TVs save 10%, 3 save 15%, 4+ save 20%.
        </p>
      </section>

      {/* Reviews */}
      {REVIEWS.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="font-extrabold text-3xl mb-5">What customers say</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {REVIEWS.map(r => (
              <figure key={r.name} className="p-6 rounded-3xl bg-surface border border-line/10 flex flex-col gap-3">
                <div className="flex gap-0.5 text-accent" aria-label={`${r.rating} stars`}>
                  {Array.from({ length: r.rating }, (_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <blockquote className="text-[15px] leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-auto text-sm text-ink-400">{r.name} · {r.service}</figcaption>
              </figure>
            ))}
          </div>
          <a href={SOCIAL_LINKS.thumbtack} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm text-ink-300 underline underline-offset-4 hover:text-ink">
            Read all {THUMBTACK_STATS.reviewCount} reviews on Thumbtack
          </a>
        </section>
      )}

      {/* Final call to action */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 text-center flex flex-col items-center gap-4">
        <h2 className="font-extrabold text-3xl">Ready when you are.</h2>
        <p className="text-ink-300">Get your price in 30 seconds. We confirm by text.</p>
        <button
          type="button"
          onClick={scrollToQuiz}
          className="h-14 px-8 rounded-full bg-accent hover:bg-accent-hover light:bg-[#0288d1] light:hover:bg-[#0277bd] text-black light:text-white font-bold text-base"
        >
          See my price
        </button>
      </section>

      <footer className="border-t border-line/10 py-8 text-center text-sm text-ink-400 px-4">
        <p>IBA Handyman Services · {SERVICE_AREAS.map(a => a.city).join(' · ')}</p>
        <p className="mt-2">
          <a href="tel:+19192646101" className="font-semibold text-ink">{PHONE_DISPLAY}</a>
          {' · '}
          <a href="/" className="underline underline-offset-4 hover:text-ink">All handyman services</a>
        </p>
      </footer>

      {/* Mobile bottom bar */}
      <div className="sm:hidden fixed inset-x-0 bottom-0 z-40 p-3 bg-page/95 backdrop-blur-xl border-t border-line/10 flex gap-2.5">
        <button
          type="button"
          onClick={scrollToQuiz}
          className="flex-1 h-12 rounded-xl bg-accent light:bg-[#0288d1] text-black light:text-white font-bold"
        >
          See my price
        </button>
        <a href="tel:+19192646101" className="h-12 px-5 rounded-xl border border-line/15 font-semibold flex items-center gap-2">
          <Phone className="w-4 h-4" /> Call
        </a>
      </div>
    </div>
  );
};
