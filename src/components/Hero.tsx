import React from 'react';
import { useApp } from '../context/AppContext';
import { IbaTvMountingLogo } from './Logos';
import { TV_ADDONS, TV_SIZE_PRICES } from '../config/tvPricing';
import { ThumbtackBadge } from './ThumbtackReviews';
import {
  Calculator,
  ClipboardCheck,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, setActiveView, t } = useApp();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-page text-ink pt-6 pb-16">
      {/* Full-Screen Darkened Cinematic Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/iba_hero_craftsman_1791666396591.jpg"
          alt="IBA Handyman Services & TV Mounting - Raleigh NC"
          className="w-full h-full object-cover object-center filter brightness-60 contrast-115 scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic gradient overlays for ultra-luxury dark feel (#0d0d0d / #141414) */}
        <div className="absolute inset-0 bg-gradient-to-t from-page via-page/85 to-page/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-page/80 to-page" />

        {/* Subtle Warm Gold and Blue Ambient Highlights */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[650px] h-[380px] bg-accent/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[280px] bg-[#2563EB]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline and primary actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Main Heading (Montserrat) */}
            <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-ink font-editorial">
              {language === 'ru' ? (
                <>
                  Надёжный{' '}
                  <span className="gold-gradient-text font-bold">
                    монтаж ТВ и услуги мастера
                  </span>{' '}
                  в Роли, Северная Каролина
                </>
              ) : (
                <>
                  Reliable{' '}
                  <span className="gold-gradient-text font-bold">
                    TV Mounting & Handyman Services
                  </span>{' '}
                  in Raleigh, NC
                </>
              )}
            </h1>

            {/* Hairline Gold Divider */}
            <div className="w-28 h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent" />

            <p className="text-base sm:text-lg text-ink-300 max-w-2xl font-light leading-relaxed">
              {language === 'ru'
                ? 'Премиальное качество работ в Роли, Кэри, Апексе, Дареме и Чапел-Хилл. Чистый монтаж без пыли, лазерный уровень, скрытая проводка и кристально прозрачные сметы без скрытых платежей.'
                : 'Serving Raleigh, Cary, Apex, Durham, and Chapel Hill. Laser-level precision, dust-free installations, hidden cable routing, and transparent upfront pricing with zero guesswork.'}
            </p>

            {/* Action Buttons: Prominent «Записаться» and «Рассчитать стоимость» */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary Button: «Записаться» with Gold Glow */}
              <button
                onClick={() => {
                  setActiveView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-accent hover:bg-accent-hover light:bg-[#0288d1] light:hover:bg-[#0277bd] text-black light:text-white font-black uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-[0_0_25px_rgb(var(--accent-rgb)/0.4)] hover:shadow-[0_0_35px_rgb(var(--accent-rgb)/0.6)] transition-all flex items-center justify-center gap-2.5 active:scale-98 group cursor-pointer"
              >
                <ClipboardCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t.nav.freeEstimate}</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Button: «Рассчитать стоимость ТВ» */}
              <button
                onClick={() => {
                  setActiveView('tv-mounting');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-4 bg-surface/90 hover:bg-surface-2 text-ink-200 hover:text-ink font-bold text-xs sm:text-sm rounded-xl border border-accent/40 hover:border-accent transition-all flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-md"
              >
                <Calculator className="w-4 h-4 text-accent-ink" />
                <span>{language === 'ru' ? 'Рассчитать стоимость ТВ' : 'TV Cost Calculator'}</span>
              </button>
            </div>

            {/* Thumbtack rating */}
            <ThumbtackBadge />

            {/* Trust Badges */}
            <div className="pt-6 border-t border-line/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-ink shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-ink leading-tight">
                    {language === 'ru' ? 'Оперативный выезд' : 'Fast Response'}
                  </div>
                  <div className="text-ink-400 text-[11px]">30–40 min Triangle radius</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-ink shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-ink leading-tight">
                    {language === 'ru' ? 'Прозрачная смета' : 'Upfront Pricing'}
                  </div>
                  <div className="text-ink-400 text-[11px]">No surprise charges</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-ink shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-ink leading-tight">
                    {language === 'ru' ? 'Чистота и лазер' : 'Clean & Level'}
                  </div>
                  <div className="text-ink-400 text-[11px]">Meticulous attention</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: TV Mounting Specialty Card with Authentic Gold Brand Mark */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-7 sm:p-8 overflow-hidden shadow-2xl bg-surface/90 backdrop-blur-xl border border-accent/30">
              {/* Top corner badge */}
              <div className="absolute top-0 right-0 bg-accent text-black text-[10px] font-black uppercase px-3.5 py-1 rounded-bl-xl tracking-widest shadow-md">
                Specialty Hub
              </div>

              {/* TV Mounting Gold & Graphite Logo */}
              <div className="mb-6 pt-2">
                <IbaTvMountingLogo size="md" theme="dark" layout="horizontal" />
              </div>

              <div className="text-xs text-accent-ink font-bold tracking-widest uppercase mb-2">
                Clean. Secure. Professional. • Your TV. Our Expertise.
              </div>

              <p className="text-xs text-ink-300 mb-6 leading-relaxed">
                {language === 'ru'
                  ? 'Профессиональная установка любых ТВ от 32" до 85"+ на гипсокартон, кирпич, плитку или над камином с аккуратным скрытием проводов.'
                  : 'Professional TV mounting from 32" to 85"+ on drywall, brick, tile, or over fireplaces with clean cable concealment.'}
              </p>

              {/* Price Preview Card */}
              <div className="bg-page-deep rounded-2xl p-4 border border-accent/20 space-y-2.5 mb-6 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-line/5">
                  <span className="text-ink-400">TV up to 64":</span>
                  <span className="font-bold text-ink">${TV_SIZE_PRICES.m}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-line/5">
                  <span className="text-ink-400">TV 65"–75":</span>
                  <span className="font-bold text-ink">${TV_SIZE_PRICES.l}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-line/5">
                  <span className="text-ink-400">2+ TVs:</span>
                  <span className="font-bold text-ink">Save 10–20%</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-line/5">
                  <span className="text-ink-400">Wires inside the wall:</span>
                  <span className="font-bold text-accent-ink">+${TV_ADDONS.inWallWires}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-400">Above fireplace:</span>
                  <span className="font-bold text-ink">+${TV_ADDONS.fireplace}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setActiveView('tv-mounting');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-line/5 hover:bg-line/10 text-accent-ink font-bold text-xs rounded-xl border border-accent/40 hover:border-accent transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{language === 'ru' ? 'Калькулятор' : 'Calculator'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-accent hover:bg-accent-hover text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgb(var(--accent-rgb)/0.3)] cursor-pointer"
                >
                  <span>{language === 'ru' ? 'Записаться' : 'Book'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Identity & Color Guide Modal */}
    </section>
  );
};
