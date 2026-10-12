import React from 'react';

export interface LogoProps {
  className?: string;
  // 'dark' = theme-aware page background; 'on-dark' = always-dark surfaces (e.g. footer)
  theme?: 'dark' | 'on-dark' | 'light' | 'blue';
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
 * - Site accent (Muted Gold): #C9A24B
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
  const isDark = theme === 'dark' || theme === 'on-dark';
  const textColor = theme === 'on-dark' ? 'text-white' : isDark ? 'text-ink' : 'text-slate-900';
  const subColor = theme === 'on-dark' ? 'text-slate-300' : isDark ? 'text-ink-300' : 'text-slate-700';

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
 * 2. IBA TV MOUNTING - OFFICIAL YELLOW / BLACK LOGO (ЛОГОТИП TV MOUNTING)
 * ==============================================================================
 * Source artwork: /images/iba-tv-mounting-logo.webp (1254x1254, black background).
 * `mix-blend-lighten` lets the black background melt into the dark site panels.
 * Color Palette:
 * - Signal Yellow: #FFD400
 * - Black: #000000
 * - White: #FFFFFF
 */
const TV_LOGO_SRC = '/images/iba-tv-mounting-logo.webp';
const TV_YELLOW = '#FFD400';

export const IbaTvMountingIcon: React.FC<{
  className?: string;
  houseColor?: string;
  toolsColor?: string;
}> = ({ className = 'w-10 h-10' }) => {
  // Crops the TV-on-arm mark (x 285-1045, y 70-665 of the artwork)
  return (
    <span
      className={`tv-logo-plate inline-flex items-center justify-center ${className}`}
      role="img"
      aria-label="IBA TV Mounting Icon"
    >
      <span
        className="block w-full aspect-[760/595] mix-blend-lighten"
        style={{
          backgroundImage: `url(${TV_LOGO_SRC})`,
          backgroundSize: '165% auto',
          backgroundPosition: '57.7% 10.6%',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </span>
  );
};

export const IbaTvMountingLogo: React.FC<LogoProps> = ({
  className = '',
  theme = 'dark',
  size = 'md',
  layout = 'horizontal',
  showSubtitle = true,
}) => {
  const isDark = theme === 'dark' || theme === 'on-dark';
  const textColor = theme === 'on-dark' ? 'text-white' : isDark ? 'text-ink' : 'text-slate-900';

  if (layout === 'stacked') {
    return (
      <img
        src={TV_LOGO_SRC}
        alt="IBA TV Mounting by IBA Handyman Services"
        className={`tv-logo-plate mix-blend-lighten h-auto ${
          className || (size === 'xl' ? 'w-72' : size === 'lg' ? 'w-56' : size === 'sm' ? 'w-32' : 'w-44')
        }`}
      />
    );
  }

  // Horizontal layout
  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 font-['Montserrat',sans-serif] ${className}`}>
      <IbaTvMountingIcon
        className={`shrink-0 ${size === 'lg' ? 'w-20' : size === 'sm' ? 'w-11' : 'w-14'}`}
      />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight ${
              size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-xl sm:text-2xl'
            } ${textColor}`}
          >
            IBA
          </span>
          <span
            className={`font-black tracking-tight uppercase ${
              size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-lg sm:text-xl'
            } ${theme === 'on-dark' ? 'text-[#FFD400]' : 'text-tv-ink'}`}
          >
            TV MOUNTING
          </span>
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-3 h-0.5" style={{ backgroundColor: TV_YELLOW }} />
            <span
              className={`text-[9px] sm:text-[11px] font-medium leading-none ${
                theme === 'on-dark' ? 'text-slate-200' : isDark ? 'text-ink-200' : 'text-ink-600'
              }`}
            >
              by IBA Handyman Services
            </span>
            <span className="w-3 h-0.5" style={{ backgroundColor: TV_YELLOW }} />
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
      <div className="bg-surface border border-accent/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 text-ink max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-line/10 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-editorial font-bold text-ink">
              {language === 'ru' ? 'Официальная айдентика и логотипы IBA' : 'Official Brand Identity & Logos'}
            </h3>
            <p className="text-xs text-accent-ink mt-0.5">
              {language === 'ru'
                ? 'Цветовая палитра и разделение суббрендов IBA Handyman Services'
                : 'Color palettes & sub-brand distinction for IBA Handyman Services'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-line/10 hover:bg-line/20 flex items-center justify-center text-ink transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 1. BLUE HANDYMAN LOGO */}
          <div className="p-6 rounded-2xl bg-page border border-[#03A9F4]/40 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#03A9F4]/15 text-[#03A9F4] text-[11px] font-bold uppercase tracking-wider mb-4 border border-[#03A9F4]/30">
                {language === 'ru' ? 'Основной бренд сервиса' : 'Primary Service Brand'}
              </div>

              <div className="py-6 flex items-center justify-center">
                <IbaHandymanLogo size="lg" layout="stacked" theme="dark" />
              </div>

              <h4 className="text-base font-bold text-ink mb-2">
                IBA Handyman Services
              </h4>
              <p className="text-xs text-ink-300 leading-relaxed mb-4">
                {language === 'ru'
                  ? 'Специальный синий знак: архитектурный свод и шеврон крыши. Символизирует надёжность, плотницкие, малярные и ремонтные работы.'
                  : 'Signature Blue crest with architectural roof gable & chevron. Represents precision craftsmanship, carpentry, repairs, and general handyman services.'}
              </p>
            </div>

            {/* Colors */}
            <div className="pt-4 border-t border-line/10">
              <div className="text-[11px] font-bold text-ink-400 mb-2 uppercase tracking-wider">
                {language === 'ru' ? 'Цветовая гамма' : 'Color Palette'}:
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded-lg bg-[#03A9F4]/20 border border-[#03A9F4]">
                  <div className="font-bold text-[#03A9F4]">#03A9F4</div>
                  <div className="text-ink-400">IBA Blue</div>
                </div>
                <div className="p-2 rounded-lg bg-[#2B2B2B] border border-line/25">
                  <div className="font-bold text-ink-200">#2B2B2B</div>
                  <div className="text-ink-400">Charcoal</div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-white">
                  <div className="font-bold text-[#2B2B2B]">#FFFFFF</div>
                  <div className="text-ink-500">White</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. YELLOW TV MOUNTING LOGO */}
          <div className="p-6 rounded-2xl bg-page border border-[#FFD400]/40 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#FFD400]/15 text-tv-ink text-[11px] font-bold uppercase tracking-wider mb-4 border border-[#FFD400]/30">
                {language === 'ru' ? 'Премиум суббренд' : 'Premium Sub-brand'}
              </div>

              <div className="py-6 flex items-center justify-center">
                <IbaTvMountingLogo size="lg" layout="stacked" theme="dark" />
              </div>

              <h4 className="text-base font-bold text-ink mb-2">
                IBA TV MOUNTING by IBA Handyman Services
              </h4>
              <p className="text-xs text-ink-300 leading-relaxed mb-4">
                {language === 'ru'
                  ? 'Жёлто-чёрный знак: телевизор на поворотном кронштейне, буква «A» в виде крыши — как в основном логотипе IBA. Обозначает профессиональный монтаж ТВ и скрытую прокладку проводов.'
                  : 'Yellow & black emblem featuring a TV on an articulating wall mount, with the roof-shaped "A" echoing the main IBA mark. Dedicated to professional TV mounting and wire concealment.'}
              </p>
            </div>

            {/* Colors */}
            <div className="pt-4 border-t border-line/10">
              <div className="text-[11px] font-bold text-ink-400 mb-2 uppercase tracking-wider">
                {language === 'ru' ? 'Цветовая гамма' : 'Color Palette'}:
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded-lg bg-[#FFD400]/20 border border-[#FFD400]">
                  <div className="font-bold text-tv-ink">#FFD400</div>
                  <div className="text-ink-400">Signal Yellow</div>
                </div>
                <div className="p-2 rounded-lg bg-black border border-line/25">
                  <div className="font-bold text-ink">#000000</div>
                  <div className="text-ink-400">Black</div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-white">
                  <div className="font-bold text-black">#FFFFFF</div>
                  <div className="text-ink-500">White</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-accent hover:bg-accent-hover text-black font-black uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all"
          >
            {language === 'ru' ? 'Закрыть руководство' : 'Close Brand Guide'}
          </button>
        </div>
      </div>
    </div>
  );
};
