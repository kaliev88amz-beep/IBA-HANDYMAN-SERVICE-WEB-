import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  IbaHandymanLogo,
  IbaTvMountingLogo,
  IbaTvMountingIcon,
  IbaHandymanIcon,
  BrandIdentityModal,
} from './Logos';
import {
  Calculator,
  CalendarCheck,
  Phone,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, t, setActiveView } = useApp();
  const [showBrandGuide, setShowBrandGuide] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d0d] text-white pt-6 pb-16">
      {/* Full-Screen Darkened Cinematic Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/iba_hero_craftsman_1791666396591.jpg"
          alt="IBA Handyman Services & TV Mounting - Raleigh NC"
          className="w-full h-full object-cover object-center filter brightness-60 contrast-115 scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic gradient overlays for ultra-luxury dark feel (#0d0d0d / #141414) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/85 to-[#0d0d0d]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0d0d0d]/80 to-[#0d0d0d]" />

        {/* Subtle Warm Gold and Blue Ambient Highlights */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[650px] h-[380px] bg-[#c9a24b]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[280px] bg-[#2563EB]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full">
        {/* Top Badges & Service Territory Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141414]/90 border border-[#c9a24b]/30 text-xs shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#c9a24b] shadow-[0_0_8px_#c9a24b] animate-ping" />
            <span className="text-neutral-300 font-medium">
              {language === 'ru' ? 'Премиальный сервис Triangle, NC' : 'Craftsman Quality • The Triangle, NC'}
            </span>
            <span className="text-neutral-600">|</span>
            <span className="text-[#c9a24b] font-bold text-[11px] tracking-wider uppercase">
              Raleigh • Cary • Apex • Durham • Chapel Hill
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBrandGuide(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-neutral-300 hover:text-white transition-all cursor-pointer"
              title={language === 'ru' ? 'Посмотреть логотипы и гамму' : 'View Brand Logos & Colors'}
            >
              <Info className="w-3.5 h-3.5 text-[#00A3E8]" />
              <span className="text-[11px] font-semibold">
                {language === 'ru' ? 'Айдентика брендов' : 'Brand Guide'}
              </span>
            </button>

            <a
              href={t.phoneHref}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#c9a24b]/20 text-[#c9a24b] text-xs font-bold transition-all shadow-sm group"
            >
              <Phone className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>(919) 264-6101</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headlines, Blue Brand Badge, and Primary Action "Записаться" */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Primary Blue Service Brand Indicator */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-[#141414]/90 border border-[#2563EB]/40 shadow-lg backdrop-blur-md">
              <IbaHandymanIcon className="w-5 h-5" />
              <span className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-white">
                IBA HANDYMAN SERVICES
              </span>
              <span className="text-[#00A3E8] text-[10px] font-bold">NC</span>
            </div>

            {/* Main Heading (Montserrat) */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] text-neutral-100 font-editorial">
              {language === 'ru' ? (
                <>
                  Безупречный ремонт и{' '}
                  <span className="gold-gradient-text font-bold">
                    прецизионный монтаж ТВ
                  </span>
                </>
              ) : (
                <>
                  Flawless Handyman &{' '}
                  <span className="gold-gradient-text font-bold">
                    Precision TV Mounting
                  </span>
                </>
              )}
            </h1>

            {/* Hairline Gold Divider */}
            <div className="w-28 h-0.5 bg-gradient-to-r from-[#c9a24b] via-[#c9a24b]/50 to-transparent" />

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed">
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
                className="px-8 py-4 bg-[#c9a24b] hover:bg-[#d8b359] text-black font-black uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-[0_0_25px_rgba(201,162,75,0.4)] hover:shadow-[0_0_35px_rgba(201,162,75,0.6)] transition-all flex items-center justify-center gap-2.5 active:scale-98 group cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                <span>{language === 'ru' ? 'Записаться' : 'Book Service'}</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Button: «Рассчитать стоимость ТВ» */}
              <button
                onClick={() => {
                  setActiveView('tv-mounting');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-4 bg-[#141414]/90 hover:bg-[#1a1a1a] text-neutral-200 hover:text-white font-bold text-xs sm:text-sm rounded-xl border border-[#c9a24b]/40 hover:border-[#c9a24b] transition-all flex items-center justify-center gap-2.5 cursor-pointer backdrop-blur-md"
              >
                <Calculator className="w-4 h-4 text-[#c9a24b]" />
                <span>{language === 'ru' ? 'Рассчитать стоимость ТВ' : 'TV Cost Calculator'}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c9a24b]/10 border border-[#c9a24b]/30 flex items-center justify-center text-[#c9a24b] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white leading-tight">
                    {language === 'ru' ? 'Оперативный выезд' : 'Fast Response'}
                  </div>
                  <div className="text-neutral-400 text-[11px]">30–40 min Triangle radius</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c9a24b]/10 border border-[#c9a24b]/30 flex items-center justify-center text-[#c9a24b] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white leading-tight">
                    {language === 'ru' ? 'Прозрачная смета' : 'Upfront Pricing'}
                  </div>
                  <div className="text-neutral-400 text-[11px]">No surprise charges</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c9a24b]/10 border border-[#c9a24b]/30 flex items-center justify-center text-[#c9a24b] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white leading-tight">
                    {language === 'ru' ? 'Чистота и лазер' : 'Clean & Level'}
                  </div>
                  <div className="text-neutral-400 text-[11px]">Meticulous attention</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: TV Mounting Specialty Card with Authentic Gold Brand Mark */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-7 sm:p-8 overflow-hidden shadow-2xl bg-[#141414]/90 backdrop-blur-xl border border-[#c9a24b]/30">
              {/* Top corner badge */}
              <div className="absolute top-0 right-0 bg-[#c9a24b] text-black text-[10px] font-black uppercase px-3.5 py-1 rounded-bl-xl tracking-widest shadow-md">
                Specialty Hub
              </div>

              {/* TV Mounting Gold & Graphite Logo */}
              <div className="mb-6 pt-2">
                <IbaTvMountingLogo size="md" theme="dark" layout="horizontal" />
              </div>

              <div className="text-xs text-[#c9a24b] font-bold tracking-widest uppercase mb-2">
                Clean. Secure. Professional. • Your TV. Our Expertise.
              </div>

              <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
                {language === 'ru'
                  ? 'Профессиональная установка любых ТВ от 32" до 85"+ на гипсокартон, кирпич, плитку или над камином с аккуратным скрытием проводов.'
                  : 'Professional TV mounting from 32" to 85"+ on drywall, brick, tile, or over fireplaces with clean cable concealment.'}
              </p>

              {/* Price Preview Card */}
              <div className="bg-[#0a0a0a] rounded-2xl p-4 border border-[#c9a24b]/20 space-y-2.5 mb-6 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-neutral-400">Standard TV Mounting:</span>
                  <span className="font-bold text-white">From $129</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-neutral-400">Tilting Mount Installation:</span>
                  <span className="font-bold text-white">From $149</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-neutral-400">Full-Motion Articulating:</span>
                  <span className="font-bold text-white">From $189</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-neutral-400">In-Wall Wire Concealment:</span>
                  <span className="font-bold text-[#c9a24b]">From $99</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Fireplace Mounting:</span>
                  <span className="font-bold text-white">From $229</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setActiveView('tv-mounting');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-[#c9a24b] font-bold text-xs rounded-xl border border-[#c9a24b]/40 hover:border-[#c9a24b] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{language === 'ru' ? 'Калькулятор' : 'Calculator'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-[#c9a24b] hover:bg-[#d8b359] text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(201,162,75,0.3)] cursor-pointer"
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
      <BrandIdentityModal
        isOpen={showBrandGuide}
        onClose={() => setShowBrandGuide(false)}
        language={language}
      />
    </section>
  );
};
