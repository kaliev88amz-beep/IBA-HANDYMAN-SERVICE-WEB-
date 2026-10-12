import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TvSetupParams, WallMaterial, MountOwnership, MountType, WireManagement } from '../types';
import { calculateTvQuote } from '../utils/calculator';
import { IbaTvMountingLogo, IbaTvMountingIcon } from './Logos';
import {
  Calculator,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Info,
  Check,
  ShieldAlert,
  Flame,
  Plus,
  Trash2,
  Table,
  Phone,
  Zap,
  Star,
  CheckCircle2,
} from 'lucide-react';

export const TvMountingHub: React.FC = () => {
  const { language, t, pricing, setActiveView, setCurrentQuote, setPrefilledRequest, showToast } = useApp();

  // TV 1 State
  const [tv1, setTv1] = useState<TvSetupParams>({
    tvSize: '56-65',
    wallMaterial: 'drywall',
    aboveFireplace: false,
    mountOwnership: 'handyman_mount',
    mountType: 'tilting',
    wireManagement: 'raceway',
    soundbar: false,
    floatingShelf: false,
  });

  // Second TV State
  const [hasSecondTv, setHasSecondTv] = useState<boolean>(false);
  const [tv2, setTv2] = useState<TvSetupParams>({
    tvSize: '44-55',
    wallMaterial: 'drywall',
    aboveFireplace: false,
    mountOwnership: 'customer_mount',
    mountType: 'fixed',
    wireManagement: 'none',
    soundbar: false,
    floatingShelf: false,
  });

  const [zipCode, setZipCode] = useState<string>('27601');

  // Calculation result based on central pricing configuration
  const quoteResult = useMemo(() => {
    return calculateTvQuote(tv1, hasSecondTv, tv2, zipCode, pricing);
  }, [tv1, hasSecondTv, tv2, zipCode, pricing]);

  const handleTransferEstimate = () => {
    setCurrentQuote(quoteResult);
    setPrefilledRequest({
      serviceId: 'tv-mounting',
      serviceTitle: 'IBA TV MOUNTING by IBA Handyman Services',
      zip: zipCode,
      description: `TV 1: ${pricing.tvSizes[tv1.tvSize]?.label || tv1.tvSize}, ${pricing.wallMaterials[tv1.wallMaterial]?.nameEn}${
        tv1.aboveFireplace ? ', Over fireplace' : ''
      }, Mount: ${tv1.mountOwnership === 'handyman_mount' ? tv1.mountType : 'Customer supplied'}, Wires: ${tv1.wireManagement}${
        hasSecondTv ? ` | TV 2: ${pricing.tvSizes[tv2.tvSize]?.label || tv2.tvSize}, ${pricing.wallMaterials[tv2.wallMaterial]?.nameEn}` : ''
      }`,
      calculatedQuote: quoteResult,
      estimatedPrice: quoteResult.total,
    });
    showToast(language === 'ru' ? 'Расчёт перенесён в форму заявки' : 'Estimate transferred to service request form');
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wallOptions: { id: WallMaterial; labelEn: string; labelRu: string; extraEn: string; extraRu: string }[] = [
    { id: 'drywall', labelEn: 'Drywall (Wood/Metal Studs)', labelRu: 'Гипсокартон (стойки)', extraEn: 'Standard $0', extraRu: 'Стандарт $0' },
    { id: 'brick', labelEn: 'Exposed Brick', labelRu: 'Кирпичная стена', extraEn: `+$${pricing.wallMaterials.brick.surcharge}`, extraRu: `+$${pricing.wallMaterials.brick.surcharge}` },
    { id: 'concrete', labelEn: 'Solid Concrete / Block', labelRu: 'Бетон / шлакоблок', extraEn: `+$${pricing.wallMaterials.concrete.surcharge}`, extraRu: `+$${pricing.wallMaterials.concrete.surcharge}` },
    { id: 'tile', labelEn: 'Porcelain / Ceramic Tile', labelRu: 'Керамическая плитка', extraEn: `+$${pricing.wallMaterials.tile.surcharge}`, extraRu: `+$${pricing.wallMaterials.tile.surcharge}` },
    { id: 'stone', labelEn: 'Natural / Stacked Stone', labelRu: 'Натуральный камень', extraEn: `+$${pricing.wallMaterials.stone.surcharge}`, extraRu: `+$${pricing.wallMaterials.stone.surcharge}` },
    { id: 'unknown', labelEn: 'Other / Not Sure', labelRu: 'Другое / не знаю точно', extraEn: 'Custom quote', extraRu: 'Индивидуальная оценка' },
  ];

  return (
    <div className="bg-page min-h-screen text-ink">
      {/* Branded Hub Header */}
      <div className="bg-surface text-ink border-b border-[#FFD400]/20 py-12 sm:py-16 relative overflow-hidden">
        {/* Ambient Warm Backlight */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[320px] bg-[#FFD400]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              {/* Authentic Logo */}
              <div className="mb-2">
                <IbaTvMountingLogo size="lg" theme="dark" layout="stacked" className="w-48 sm:w-60" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFD400] text-black text-xs font-black uppercase tracking-wider">
                <span>Clean. Secure. Professional.</span>
                <span>•</span>
                <span>Your TV. Our Expertise.</span>
              </div>

              <p className="text-sm sm:text-base text-ink-300 max-w-2xl leading-relaxed font-light">
                Transform your space — one install at a time. Professional TV wall mounting, safe fireplace installations, and clean wire concealment across Raleigh, Cary, Apex, Durham, Chapel Hill & surrounding Triangle areas.
              </p>

              {/* 4 Feature Badges from Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-page-deep border border-[#FFD400]/20 flex items-center gap-2 text-xs">
                  <Zap className="w-4 h-4 text-tv-ink shrink-0" />
                  <span className="font-semibold text-ink-200">Same-Day Service</span>
                </div>
                <div className="p-2.5 rounded-xl bg-page-deep border border-[#FFD400]/20 flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-tv-ink shrink-0" />
                  <span className="font-semibold text-ink-200">Clean Cable Routing</span>
                </div>
                <div className="p-2.5 rounded-xl bg-page-deep border border-[#FFD400]/20 flex items-center gap-2 text-xs">
                  <IbaTvMountingIcon className="w-4 h-4 shrink-0" houseColor="#FFD400" />
                  <span className="font-semibold text-ink-200">Local & Owner-Operated</span>
                </div>
                <div className="p-2.5 rounded-xl bg-page-deep border border-[#FFD400]/20 flex items-center gap-2 text-xs">
                  <Star className="w-4 h-4 text-tv-ink fill-[#FFD400] shrink-0" />
                  <span className="font-semibold text-ink-200">5-Star Rated</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#calculator"
                  className="px-5 py-3 bg-[#FFD400] hover:bg-[#FFE04D] text-black text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,212,0,0.3)] active:scale-98"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{t.tvPage.calcAnchor}</span>
                </a>
                <a
                  href="tel:9192646101"
                  className="px-4 py-3 bg-surface hover:bg-surface-2 text-tv-ink text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-2 border border-[#FFD400]/30"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (919) 264-6101</span>
                </a>
                <a
                  href="#rates-table"
                  className="px-4 py-3 bg-line/5 hover:bg-line/10 text-ink-300 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 border border-line/10"
                >
                  <Table className="w-4 h-4 text-tv-ink" />
                  <span>{t.tvPage.ratesAnchor}</span>
                </a>
              </div>
            </div>

            {/* Right: Golden Banner Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-surface to-surface border border-[#FFD400]/40 rounded-3xl p-6 text-ink shadow-2xl relative">
              <div className="text-[11px] font-black uppercase tracking-widest text-tv-ink mb-1">
                TRANSFORM YOUR SPACE
              </div>
              <div className="text-xl font-normal text-ink mb-3 leading-tight font-editorial">
                ONE INSTALL AT A TIME
              </div>
              <div className="space-y-2 text-xs font-bold text-ink-200 bg-black/40 backdrop-blur-xs p-3.5 rounded-2xl border border-line/5">
                <div className="flex justify-between">
                  <span className="text-ink-400 font-normal">Standard Mounting:</span>
                  <span className="font-extrabold text-ink">From $129</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400 font-normal">Tilting Mount Install:</span>
                  <span className="font-extrabold text-ink">From $149</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400 font-normal">Full-Motion Articulating:</span>
                  <span className="font-extrabold text-ink">From $189</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400 font-normal">In-Wall Wire Concealment:</span>
                  <span className="font-extrabold text-tv-ink">From $99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-400 font-normal">Fireplace Mounting:</span>
                  <span className="font-extrabold text-ink">From $229</span>
                </div>
              </div>
              <div className="mt-3 text-[11px] font-semibold text-tv-ink text-center tracking-wider uppercase">
                Raleigh • Cary • Apex • Durham • Chapel Hill
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-page">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold text-tv-ink uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4 text-tv-ink" />
            <span>Interactive Cost Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-ink tracking-tight font-editorial">
            {t.tvPage.calcTitle}
          </h2>
          <div className="w-16 h-0.5 bg-[#FFD400] my-4" />
          <p className="text-xs sm:text-sm text-ink-400 mt-1 max-w-3xl font-light">
            {t.tvPage.calcSubtitle}
          </p>

          {/* Pricing Notice */}
          <div className="mt-5 p-4 rounded-2xl bg-surface border border-[#FFD400]/30 text-tv-ink text-xs flex items-start gap-3 shadow-lg">
            <Info className="w-4 h-4 text-tv-ink shrink-0 mt-0.5" />
            <span className="font-light">{t.tvPage.demoRatesNotice}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calculator Configuration Steps */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Screen Size */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 border border-[#FFD400]/20">
              <label className="block text-sm font-bold text-ink mb-4 flex items-center justify-between">
                <span className="font-editorial text-lg text-ink">{t.tvPage.step1}</span>
                <span className="text-[11px] font-normal text-ink-400">Diagonal screen measurement</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(pricing.tvSizes).map(([sizeKey, sizeData]) => {
                  const isSelected = tv1.tvSize === sizeKey;
                  return (
                    <button
                      key={sizeKey}
                      type="button"
                      onClick={() => setTv1(prev => ({ ...prev, tvSize: sizeKey }))}
                      className={`p-3.5 rounded-2xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#FFD400] bg-[#FFD400]/15 text-ink ring-1 ring-[#FFD400] shadow-[0_0_15px_rgba(255,212,0,0.2)]'
                          : 'border-line/10 bg-surface text-ink-300 hover:border-[#FFD400]/40 hover:bg-line/5'
                      }`}
                    >
                      <div className="font-bold text-ink text-sm mb-0.5">{sizeData.label}</div>
                      <div className="text-[11px] text-tv-ink">From ${sizeData.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Wall Material */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 border border-[#FFD400]/20">
              <label className="block text-sm font-bold text-ink mb-4 font-editorial text-lg">
                {t.tvPage.step2}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {wallOptions.map(opt => {
                  const isSelected = tv1.wallMaterial === opt.id;
                  const label = language === 'ru' ? opt.labelRu : opt.labelEn;
                  const extra = language === 'ru' ? opt.extraRu : opt.extraEn;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTv1(prev => ({ ...prev, wallMaterial: opt.id }))}
                      className={`p-3.5 rounded-2xl text-left border text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#FFD400] bg-[#FFD400]/15 text-ink ring-1 ring-[#FFD400] font-semibold'
                          : 'border-line/10 bg-surface text-ink-300 hover:border-[#FFD400]/40 hover:bg-line/5'
                      }`}
                    >
                      <span>{label}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-line/5 text-tv-ink border border-[#FFD400]/20">
                        {extra}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Fireplace */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 border border-[#FFD400]/20">
              <label className="block text-sm font-bold text-ink mb-4 font-editorial text-lg">
                {t.tvPage.step3}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTv1(prev => ({ ...prev, aboveFireplace: false }))}
                  className={`p-4 rounded-2xl text-left border text-xs transition-all cursor-pointer ${
                    !tv1.aboveFireplace
                      ? 'border-[#FFD400] bg-[#FFD400]/15 text-ink ring-1 ring-[#FFD400] font-bold'
                      : 'border-line/10 bg-surface text-ink-300 hover:border-[#FFD400]/40 hover:bg-line/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Check className={`w-4 h-4 ${!tv1.aboveFireplace ? 'text-tv-ink' : 'text-ink-500'}`} />
                    <span>{t.tvPage.fireplaceNo}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTv1(prev => ({ ...prev, aboveFireplace: true }))}
                  className={`p-4 rounded-2xl text-left border text-xs transition-all cursor-pointer ${
                    tv1.aboveFireplace
                      ? 'border-[#FFD400] bg-[#FFD400]/15 text-ink ring-1 ring-[#FFD400] font-bold'
                      : 'border-line/10 bg-surface text-ink-300 hover:border-[#FFD400]/40 hover:bg-line/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Flame className={`w-4 h-4 ${tv1.aboveFireplace ? 'text-tv-ink' : 'text-ink-500'}`} />
                    <span>{t.tvPage.fireplaceYes}</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 4: Bracket / Mount */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 border border-[#FFD400]/20">
              <label className="block text-sm font-bold text-ink mb-4 font-editorial text-lg">
                {t.tvPage.step4}
              </label>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTv1(prev => ({ ...prev, mountOwnership: 'customer_mount' }))}
                    className={`p-3.5 rounded-2xl text-left border text-xs transition-all cursor-pointer ${
                      tv1.mountOwnership === 'customer_mount'
                        ? 'border-[#FFD400] bg-[#FFD400]/15 text-ink ring-1 ring-[#FFD400] font-bold'
                        : 'border-line/10 bg-surface text-ink-300 hover:border-[#FFD400]/40'
                    }`}
                  >
                    <span>{t.tvPage.bracketCustomer}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTv1(prev => ({ ...prev, mountOwnership: 'handyman_mount' }))}
                    className={`p-3.5 rounded-2xl text-left border text-xs transition-all cursor-pointer ${
                      tv1.mountOwnership === 'handyman_mount'
                        ? 'border-[#FFD400] bg-[#FFD400]/15 text-ink ring-1 ring-[#FFD400] font-bold'
                        : 'border-line/10 bg-surface text-ink-300 hover:border-[#FFD400]/40'
                    }`}
                  >
                    <span>{t.tvPage.bracketPro}</span>
                  </button>
                </div>

                {tv1.mountOwnership === 'handyman_mount' && (
                  <div className="pt-3 border-t border-line/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setTv1(prev => ({ ...prev, mountType: 'fixed' }))}
                      className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        tv1.mountType === 'fixed'
                          ? 'border-[#FFD400] bg-[#FFD400]/20 text-ink font-bold'
                          : 'border-line/10 bg-surface-2 text-ink-300 hover:bg-line/5'
                      }`}
                    >
                      <div className="font-bold text-ink">Fixed Flat</div>
                      <div className="text-[10px] text-tv-ink">+$20</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTv1(prev => ({ ...prev, mountType: 'tilting' }))}
                      className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        tv1.mountType === 'tilting'
                          ? 'border-[#FFD400] bg-[#FFD400]/20 text-ink font-bold'
                          : 'border-line/10 bg-surface-2 text-ink-300 hover:bg-line/5'
                      }`}
                    >
                      <div className="font-bold text-ink">Tilting (Popular)</div>
                      <div className="text-[10px] text-tv-ink">+$20 ($149 total)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTv1(prev => ({ ...prev, mountType: 'full_motion' }))}
                      className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        tv1.mountType === 'full_motion'
                          ? 'border-[#FFD400] bg-[#FFD400]/20 text-ink font-bold'
                          : 'border-line/10 bg-surface-2 text-ink-300 hover:bg-line/5'
                      }`}
                    >
                      <div className="font-bold text-ink">Full-Motion Swivel</div>
                      <div className="text-[10px] text-tv-ink">+$60 ($189 total)</div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 5: Wire Management & NEC disclaimer */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 border border-[#FFD400]/20">
              <label className="block text-sm font-bold text-ink mb-4 font-editorial text-lg">
                {t.tvPage.step5}
              </label>

              <div className="space-y-3 mb-4">
                {[
                  { id: 'none' as WireManagement, label: t.tvPage.wiresNone, cost: '$0' },
                  { id: 'raceway' as WireManagement, label: t.tvPage.wiresRaceway, cost: `+$${pricing.wireManagement.raceway}` },
                  { id: 'in_wall_low_voltage' as WireManagement, label: t.tvPage.wiresInWall, cost: `+$${pricing.wireManagement.inWallLowVoltage}` },
                ].map(item => {
                  const isSelected = tv1.wireManagement === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTv1(prev => ({ ...prev, wireManagement: item.id }))}
                      className={`w-full p-3.5 rounded-2xl text-left border text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#FFD400] bg-[#FFD400]/15 text-ink ring-1 ring-[#FFD400] font-semibold'
                          : 'border-line/10 bg-surface text-ink-300 hover:border-[#FFD400]/40 hover:bg-line/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-line/5 text-tv-ink border border-[#FFD400]/20">
                        {item.cost}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Electrical Code Disclaimer */}
              <div className="p-3.5 bg-surface border border-[#FFD400]/20 rounded-2xl text-[11px] text-ink-400 leading-relaxed flex items-start gap-2.5 font-light">
                <ShieldAlert className="w-4 h-4 text-tv-ink shrink-0 mt-0.5" />
                <span>{t.tvPage.wireDisclaimer}</span>
              </div>
            </div>

            {/* Step 6: Add-ons & Second TV Toggle */}
            <div className="dark-card rounded-3xl p-6 sm:p-7 border border-[#FFD400]/20 space-y-4">
              <label className="block text-sm font-bold text-ink font-editorial text-lg">
                {t.tvPage.step6}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTv1(prev => ({ ...prev, soundbar: !prev.soundbar }))}
                  className={`p-3.5 rounded-2xl text-left border text-xs transition-all flex items-center justify-between cursor-pointer ${
                    tv1.soundbar
                      ? 'border-[#FFD400] bg-[#FFD400]/15 text-ink font-bold ring-1 ring-[#FFD400]'
                      : 'border-line/10 bg-surface text-ink-300 hover:border-[#FFD400]/40'
                  }`}
                >
                  <span>{t.tvPage.addonSoundbar}</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${tv1.soundbar ? 'bg-[#FFD400] border-[#FFD400]' : 'border-ink-600'}`}>
                    {tv1.soundbar && <Check className="w-3 h-3 text-black" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTv1(prev => ({ ...prev, floatingShelf: !prev.floatingShelf }))}
                  className={`p-3.5 rounded-2xl text-left border text-xs transition-all flex items-center justify-between cursor-pointer ${
                    tv1.floatingShelf
                      ? 'border-[#FFD400] bg-[#FFD400]/15 text-ink font-bold ring-1 ring-[#FFD400]'
                      : 'border-line/10 bg-surface text-ink-300 hover:border-[#FFD400]/40'
                  }`}
                >
                  <span>{t.tvPage.addonShelf}</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${tv1.floatingShelf ? 'bg-[#FFD400] border-[#FFD400]' : 'border-ink-600'}`}>
                    {tv1.floatingShelf && <Check className="w-3 h-3 text-black" />}
                  </div>
                </button>
              </div>

              {/* Second TV Toggle Button */}
              <div className="pt-3 border-t border-line/10">
                {!hasSecondTv ? (
                  <button
                    type="button"
                    onClick={() => setHasSecondTv(true)}
                    className="w-full py-3 px-4 bg-line/5 hover:bg-line/10 text-ink-300 hover:text-ink border border-[#FFD400]/30 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-tv-ink" />
                    <span>{t.tvPage.secondTvPrompt}</span>
                  </button>
                ) : (
                  <div className="p-5 bg-surface-2 border border-[#FFD400]/30 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-ink font-editorial">
                        {t.tvPage.secondTvDetails}
                      </span>
                      <button
                        type="button"
                        onClick={() => setHasSecondTv(false)}
                        className="text-xs text-bad-strong hover:text-bad font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove TV 2</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[11px] text-ink-400 block mb-1">TV 2 Screen Size:</span>
                        <select
                          value={tv2.tvSize}
                          onChange={e => setTv2(prev => ({ ...prev, tvSize: e.target.value }))}
                          className="w-full text-xs p-2.5 rounded-xl border border-line/10 bg-surface text-ink"
                        >
                          {Object.entries(pricing.tvSizes).map(([k, v]) => (
                            <option key={k} value={k}>
                              {v.label} (${v.price})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <span className="text-[11px] text-ink-400 block mb-1">TV 2 Wall Material:</span>
                        <select
                          value={tv2.wallMaterial}
                          onChange={e => setTv2(prev => ({ ...prev, wallMaterial: e.target.value as WallMaterial }))}
                          className="w-full text-xs p-2.5 rounded-xl border border-line/10 bg-surface text-ink"
                        >
                          {wallOptions.map(opt => (
                            <option key={opt.id} value={opt.id}>
                              {language === 'ru' ? opt.labelRu : opt.labelEn}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ZIP code field */}
            <div className="dark-card rounded-3xl p-5 sm:p-6 border border-[#FFD400]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="text-xs font-bold text-ink-300">
                {t.tvPage.zipLabel}
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={e => setZipCode(e.target.value.slice(0, 5))}
                placeholder="27601"
                maxLength={5}
                className="w-32 px-3.5 py-2 text-xs font-bold text-ink bg-surface border border-[#FFD400]/30 rounded-xl text-center focus:outline-hidden focus:ring-2 focus:ring-[#FFD400]"
              />
            </div>
          </div>

          {/* Right Column: Live Estimate Breakdown */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="dark-card rounded-3xl p-7 sm:p-8 border border-[#FFD400]/35 shadow-2xl">
              <div className="flex items-center justify-between pb-5 border-b border-line/10">
                <h3 className="font-normal text-ink text-lg sm:text-xl font-editorial">
                  {t.tvPage.calcSummaryTitle}
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD400]/15 text-tv-ink border border-[#FFD400]/30">
                  Itemized
                </span>
              </div>

              {/* Itemized List */}
              <div className="py-5 space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {quoteResult.items.map((item, idx) => {
                  const itemName = language === 'ru' ? item.nameRu : item.nameEn;
                  const itemNote = language === 'ru' ? item.noteRu : item.noteEn;

                  return (
                    <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-ink-200">{itemName}</div>
                        {itemNote && (
                          <div className="text-[10px] text-ink-500 leading-tight font-light">{itemNote}</div>
                        )}
                      </div>
                      <div className="font-bold text-ink shrink-0">
                        {item.isCustomQuote || item.price === null ? (
                          <span className="text-tv-ink font-semibold text-[11px]">Quote Needed</span>
                        ) : (
                          `$${item.price}`
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Minimum order note */}
              {quoteResult.minimumOrderFee > 0 && (
                <div className="p-3 bg-surface-2 rounded-xl text-[11px] text-tv-ink border border-[#FFD400]/20 mb-3">
                  {t.tvPage.minimumOrderNotice.replace('{min}', pricing.minimumOrder.toString())}
                </div>
              )}

              {/* Custom item alert */}
              {quoteResult.hasCustomItems && (
                <div className="p-3 bg-surface-2 rounded-xl text-[11px] text-ink-300 border border-line/10 mb-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-tv-ink shrink-0 mt-0.5" />
                  <span className="font-light">{t.tvPage.customQuoteFlag}</span>
                </div>
              )}

              {/* Total Box */}
              <div className="pt-5 border-t border-line/10 space-y-1 mb-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-ink-400 uppercase tracking-wider">{t.calculator.subtotal}:</span>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-bold text-tv-ink font-editorial">
                      ${quoteResult.total}
                    </span>
                    {quoteResult.hasCustomItems && (
                      <span className="text-xs text-tv-ink font-bold ml-1.5">+ custom</span>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-ink-500 text-right font-light">
                  {language === 'ru' ? quoteResult.disclaimerRu : quoteResult.disclaimerEn}
                </p>
              </div>

              {/* Transfer CTA Button */}
              <button
                type="button"
                onClick={handleTransferEstimate}
                className="w-full py-4 px-4 bg-[#FFD400] hover:bg-[#FFE04D] text-black font-black uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-[0_0_20px_rgba(255,212,0,0.35)] transition-all flex items-center justify-center gap-2 group active:scale-98 cursor-pointer"
              >
                <span>{language === 'ru' ? 'Записаться с этой сметой' : 'Transfer to Booking Form'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Pricing Table Section */}
      <section id="rates-table" className="border-t border-[#FFD400]/20 bg-page-deep py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10">
            <h3 className="text-2xl sm:text-4xl font-normal text-ink mb-3 font-editorial">
              {t.tvPage.ratesTableTitle}
            </h3>
            <div className="w-16 h-0.5 bg-[#FFD400] mb-4" />
            <p className="text-xs sm:text-sm text-ink-400 font-light">
              {t.tvPage.ratesTableNote}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#FFD400]/20 bg-surface">
            <table className="w-full text-left text-xs">
              <thead className="bg-page-deep text-tv-ink font-bold border-b border-[#FFD400]/20 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-5">Service Component</th>
                  <th className="py-4 px-5">Scope Included</th>
                  <th className="py-4 px-5">Reference Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/5 text-ink-300">
                <tr className="hover:bg-line/5 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-ink">Standard TV Mounting (up to 55")</td>
                  <td className="py-3.5 px-5 font-light text-ink-400">Drywall studs, leveling, customer mount installation</td>
                  <td className="py-3.5 px-5 font-bold text-tv-ink">$129</td>
                </tr>
                <tr className="hover:bg-line/5 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-ink">Tilting Mount Installation</td>
                  <td className="py-3.5 px-5 font-light text-ink-400">Master tilting mount included + stud mounting</td>
                  <td className="py-3.5 px-5 font-bold text-tv-ink">$149</td>
                </tr>
                <tr className="hover:bg-line/5 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-ink">Full-Motion Articulating Mounting</td>
                  <td className="py-3.5 px-5 font-light text-ink-400">Heavy-duty dual-arm swivel mount included</td>
                  <td className="py-3.5 px-5 font-bold text-tv-ink">$189</td>
                </tr>
                <tr className="hover:bg-line/5 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-ink">In-Wall Wire Concealment</td>
                  <td className="py-3.5 px-5 font-light text-ink-400">Low-voltage signal cables pass-through kit</td>
                  <td className="py-3.5 px-5 font-bold text-tv-ink">$99</td>
                </tr>
                <tr className="hover:bg-line/5 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-ink">Fireplace TV Mounting</td>
                  <td className="py-3.5 px-5 font-light text-ink-400">Elevated installation, thermal clearance check</td>
                  <td className="py-3.5 px-5 font-bold text-tv-ink">$229</td>
                </tr>
                <tr className="hover:bg-line/5 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-ink">Soundbar Installation</td>
                  <td className="py-3.5 px-5 font-light text-ink-400">Mounted beneath display with precision alignment</td>
                  <td className="py-3.5 px-5 font-bold text-tv-ink">$79</td>
                </tr>
                <tr className="hover:bg-line/5 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-ink">Brick / Concrete / Tile Surface</td>
                  <td className="py-3.5 px-5 font-light text-ink-400">Carbide masonry drilling, heavy-duty sleeve anchors</td>
                  <td className="py-3.5 px-5 font-bold text-tv-ink">+$45 – +$55</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
