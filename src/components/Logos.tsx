import React from 'react';

export interface LogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'blue';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'stacked' | 'icon-only';
  showSubtitle?: boolean;
}

/**
 * ==============================================================================
 * 1. IBA HANDYMAN SERVICES - OFFICIAL BLUE LOGO (СИНИЙ ЛОГОТИП КОМПАНИИ)
 * ==============================================================================
 * Color Palette:
 * - IBA Blue (logo mark): #03A9F4
 * - Charcoal (logo lettering): #2B2B2B
 * - Crisp High-Contrast White: #FFFFFF
 * - Luxury Dark Backdrop: #0D0D0D / #141414
 * - Muted Gold Accent: #C9A24B
 */
export const IbaHandymanIcon: React.FC<{
  className?: string;
  variant?: 'blue-gradient' | 'solid-blue' | 'white-on-blue';
}> = ({ className = 'w-10 h-10', variant = 'blue-gradient' }) => {
  // Geometry traced from the official logo (same as public/favicon.svg)
  const color = variant === 'white-on-blue' ? '#FFFFFF' : '#03A9F4';
  return (
    <svg
      viewBox="210 19 820 820"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IBA Handyman Services Blue Icon"
    >
      <g stroke={color}>
        {/* Outer ring, open at the bottom */}
        <path d="M297.8 586.8 A350 350 0 1 1 942.2 586.8" strokeWidth="84" />
        {/* Lower foundation arc */}
        <path d="M474 724.6 A311 311 0 0 0 766 724.6" strokeWidth="78" />
        {/* Roof peak */}
        <path d="M355.5 682.5 L620 288 L884.5 682.5" strokeWidth="90" strokeLinejoin="round" />
      </g>
    </svg>
  );
};

export const IbaHandymanLogo: React.FC<LogoProps> = ({
  className = '',
  layout = 'horizontal',
  theme = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subColor = isDark ? 'text-slate-300' : 'text-slate-700';

  if (layout === 'icon-only') {
    return <IbaHandymanIcon className={size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'} />;
  }

  // Wordmark mirrors the official logo: heavy "IBA" over regular "HANDYMAN SERVICES"
  const wordmarkFont = "font-['Montserrat',sans-serif]";

  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${wordmarkFont} ${className}`}>
        <IbaHandymanIcon
          className={
            size === 'xl' ? 'w-28 h-28' : size === 'lg' ? 'w-20 h-20' : size === 'sm' ? 'w-12 h-12' : 'w-16 h-16'
          }
        />
        <div className="mt-2">
          <div
            className={`font-black tracking-tight leading-none ${
              size === 'xl'
                ? 'text-5xl'
                : size === 'lg'
                ? 'text-4xl'
                : size === 'sm'
                ? 'text-xl'
                : 'text-3xl'
            } ${textColor}`}
          >
            IBA
          </div>
          {showSubtitle && (
            <div
              className={`font-medium uppercase leading-tight mt-1 ${textColor} ${
                size === 'xl' ? 'text-xl' : size === 'lg' ? 'text-base' : size === 'sm' ? 'text-[10px]' : 'text-sm'
              }`}
            >
              HANDYMAN
              <br />
              SERVICES
            </div>
          )}
        </div>
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${wordmarkFont} ${className}`}>
      <IbaHandymanIcon
        className={`shrink-0 ${size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-9 h-9' : 'w-11 h-11 sm:w-12 sm:h-12'}`}
      />
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none ${
            size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-xl' : 'text-2xl sm:text-[28px]'
          } ${textColor}`}
        >
          IBA
        </span>
        {showSubtitle && (
          <span
            className={`font-medium uppercase tracking-[0.04em] leading-tight mt-0.5 ${
              size === 'sm' ? 'text-[8px]' : 'text-[9px] sm:text-[10px]'
            } ${subColor}`}
          >
            HANDYMAN SERVICES
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * ==============================================================================
 * 2. IBA TV MOUNTING - OFFICIAL GOLD / GRAPHITE LOGO (ЛОГОТИП TV MOUNTING)
 * ==============================================================================
 * Color Palette:
 * - Primary Warm Gold / Amber: #C9A24B / #FBBF24 / #EAB308
 * - Deep Luxury Graphite: #141414 / #1E293B
 * - Pure Architectural White: #FFFFFF
 * - Tagline Accent: Muted Gold (#C9A24B)
 */
export const IbaTvMountingIcon: React.FC<{
  className?: string;
  houseColor?: string;
  toolsColor?: string;
}> = ({
  className = 'w-10 h-10',
  houseColor = '#C9A24B',
  toolsColor = '#FFFFFF',
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IBA TV Mounting Gold Icon"
    >
      <defs>
        <linearGradient id="ibaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F6E05E" />
          <stop offset="50%" stopColor="#C9A24B" />
          <stop offset="100%" stopColor="#9F7D23" />
        </linearGradient>

        <filter id="goldSoftGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C9A24B" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Chimney on the right roof slope */}
      <path
        d="M 64 21 L 72 21 L 72 38 L 64 33 Z"
        fill="url(#ibaGoldGrad)"
      />

      {/* Architectural House / Roof Silhouette */}
      <path
        d="M 50 11 L 85 39 L 80 45 L 75 42 L 75 76 L 25 76 L 25 42 L 20 45 L 15 39 Z"
        fill="none"
        stroke="url(#ibaGoldGrad)"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#goldSoftGlow)"
      />

      {/* Crossed Precision Handyman Tools (Wrench & Screwdriver) */}
      <g stroke={toolsColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Wrench Shaft (diagonal bottom-left to top-right) */}
        <path d="M 36 64 L 60 40" />
        {/* Wrench Open Jaw Head */}
        <path
          d="M 57 37 C 59 34, 63 34, 65 36 C 67 38, 67 42, 65 44"
          fill="none"
          strokeWidth="3.2"
        />
        {/* Wrench Ring Handle */}
        <circle cx="34" cy="66" r="2.5" fill={toolsColor} />

        {/* Screwdriver Shaft (diagonal top-left to bottom-right) */}
        <path d="M 40 40 L 64 64" />
        {/* Screwdriver Flat Magnetic Tip */}
        <path d="M 37 37 L 43 43" strokeWidth="4" />
        {/* Screwdriver Hex Grip Handle */}
        <rect
          x="58"
          y="58"
          width="8"
          height="6"
          rx="2"
          transform="rotate(45 58 58)"
          fill={toolsColor}
        />
      </g>
    </svg>
  );
};

export const IbaTvMountingLogo: React.FC<LogoProps> = ({
  className = '',
  theme = 'dark',
  size = 'md',
  layout = 'horizontal',
  showSubtitle = true,
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-slate-900';

  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="relative p-2.5 rounded-2xl bg-gradient-to-b from-[#1a1712] to-[#0d0d0d] border border-[#c9a24b]/40 shadow-[0_0_25px_rgba(201,162,75,0.25)]">
          <IbaTvMountingIcon
            className={
              size === 'xl' ? 'w-24 h-24' : size === 'lg' ? 'w-20 h-20' : size === 'sm' ? 'w-12 h-12' : 'w-16 h-16'
            }
            houseColor="#C9A24B"
            toolsColor={isDark ? '#FFFFFF' : '#1E293B'}
          />
        </div>
        <div className="mt-3">
          <div
            className={`font-black tracking-tight leading-none ${
              size === 'xl' ? 'text-4xl' : size === 'lg' ? 'text-3xl' : 'text-2xl'
            } ${textColor}`}
          >
            IBA
          </div>
          <div
            className={`font-black tracking-tight uppercase leading-none mt-1.5 gold-gradient-text ${
              size === 'xl' ? 'text-2xl' : size === 'lg' ? 'text-xl' : 'text-lg'
            }`}
          >
            TV MOUNTING
          </div>
          {showSubtitle && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="w-5 h-0.5 bg-[#C9A24B]" />
              <span
                className={`text-[10px] sm:text-xs font-semibold tracking-wider ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                by IBA Handyman Services
              </span>
              <span className="w-5 h-0.5 bg-[#C9A24B]" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 ${className}`}>
      <div className="relative p-1.5 rounded-xl bg-gradient-to-br from-[#1a1712] to-[#0d0d0d] border border-[#c9a24b]/40 shadow-[0_0_15px_rgba(201,162,75,0.25)] shrink-0">
        <IbaTvMountingIcon
          className={size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-8 h-8' : 'w-11 h-11'}
          houseColor="#C9A24B"
          toolsColor={isDark ? '#FFFFFF' : '#0F172A'}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight ${
              size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-lg' : 'text-xl sm:text-2xl'
            } ${textColor}`}
          >
            IBA
          </span>
          <span
            className={`font-black tracking-tight gold-gradient-text uppercase ${
              size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-base' : 'text-lg sm:text-xl'
            }`}
          >
            TV MOUNTING
          </span>
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-3 h-0.5 bg-[#C9A24B]" />
            <span
              className={`text-[9px] sm:text-[10px] font-semibold tracking-wider leading-none ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              by IBA Handyman Services
            </span>
            <span className="w-3 h-0.5 bg-[#C9A24B]" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * ==============================================================================
 * 3. BRAND IDENTITY & COLOR GUIDE COMPONENT (ГАММА И РУКОВОДСТВО ПО СТИЛЮ)
 * ==============================================================================
 * Displays both authentic logos side-by-side with exact HEX colors and roles.
 */
export const BrandIdentityModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ru';
}> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#c9a24b]/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white">
              {language === 'ru' ? 'Официальная айдентика и логотипы IBA' : 'Official Brand Identity & Logos'}
            </h3>
            <p className="text-xs text-[#c9a24b] mt-0.5">
              {language === 'ru'
                ? 'Цветовая палитра и разделение суббрендов IBA Handyman Services'
                : 'Color palettes & sub-brand distinction for IBA Handyman Services'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 1. BLUE HANDYMAN LOGO */}
          <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-[#03A9F4]/40 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#03A9F4]/15 text-[#03A9F4] text-[11px] font-bold uppercase tracking-wider mb-4 border border-[#03A9F4]/30">
                {language === 'ru' ? 'Основной бренд сервиса' : 'Primary Service Brand'}
              </div>

              <div className="py-6 flex items-center justify-center">
                <IbaHandymanLogo size="lg" layout="stacked" theme="dark" />
              </div>

              <h4 className="text-base font-bold text-white mb-2">
                IBA Handyman Services
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {language === 'ru'
                  ? 'Специальный синий знак: архитектурный свод и шеврон крыши. Символизирует надёжность, плотницкие, малярные и ремонтные работы.'
                  : 'Signature Blue crest with architectural roof gable & chevron. Represents precision craftsmanship, carpentry, repairs, and general handyman services.'}
              </p>
            </div>

            {/* Colors */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                {language === 'ru' ? 'Цветовая гамма' : 'Color Palette'}:
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded-lg bg-[#03A9F4]/20 border border-[#03A9F4]">
                  <div className="font-bold text-[#03A9F4]">#03A9F4</div>
                  <div className="text-slate-400">IBA Blue</div>
                </div>
                <div className="p-2 rounded-lg bg-[#2B2B2B] border border-white/25">
                  <div className="font-bold text-slate-200">#2B2B2B</div>
                  <div className="text-slate-400">Charcoal</div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-white">
                  <div className="font-bold text-[#2B2B2B]">#FFFFFF</div>
                  <div className="text-slate-500">White</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. GOLD TV MOUNTING LOGO */}
          <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-[#C9A24B]/40 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#C9A24B]/20 text-[#FBBF24] text-[11px] font-bold uppercase tracking-wider mb-4 border border-[#C9A24B]/30">
                {language === 'ru' ? 'Премиум суббренд' : 'Premium Sub-brand'}
              </div>

              <div className="py-6 flex items-center justify-center">
                <IbaTvMountingLogo size="lg" layout="stacked" theme="dark" />
              </div>

              <h4 className="text-base font-bold text-white mb-2">
                IBA TV MOUNTING by IBA Handyman Services
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {language === 'ru'
                  ? 'Золотисто-графитовый знак: силуэт дома с трубой и скрещенные инструменты (гаечный ключ и отвертка). Обозначает прецизионный монтаж электроники и ТВ.'
                  : 'Gold & Graphite emblem featuring house silhouette with chimney and crossed precision tools. Dedicated to high-end TV mounting and wire management.'}
              </p>
            </div>

            {/* Colors */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                {language === 'ru' ? 'Цветовая гамма' : 'Color Palette'}:
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded-lg bg-[#C9A24B]/20 border border-[#C9A24B]">
                  <div className="font-bold text-[#FBBF24]">#C9A24B</div>
                  <div className="text-slate-400">Muted Gold</div>
                </div>
                <div className="p-2 rounded-lg bg-[#F59E0B]/20 border border-[#F59E0B]">
                  <div className="font-bold text-[#FCD34D]">#F59E0B</div>
                  <div className="text-slate-400">Warm Amber</div>
                </div>
                <div className="p-2 rounded-lg bg-[#141414] border border-white/20">
                  <div className="font-bold text-white">#141414</div>
                  <div className="text-slate-400">Graphite</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[#C9A24B] hover:bg-[#D8B359] text-black font-black uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all"
          >
            {language === 'ru' ? 'Закрыть руководство' : 'Close Brand Guide'}
          </button>
        </div>
      </div>
    </div>
  );
};
