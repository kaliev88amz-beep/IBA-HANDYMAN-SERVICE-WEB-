import React from 'react';
import { useApp } from '../context/AppContext';
import { HANDYMAN_SERVICES } from '../config/pricingConfig';
import { IbaTvMountingIcon } from './Logos';
import {
  Armchair,
  Hammer,
  Paintbrush,
  Ruler,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Calculator,
  CalendarCheck,
} from 'lucide-react';

export const ServiceCards: React.FC = () => {
  const { language, t, setActiveView, setPrefilledRequest } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tv':
        return <IbaTvMountingIcon className="w-7 h-7" houseColor="#c9a24b" toolsColor="#FFFFFF" />;
      case 'Armchair':
        return <Armchair className="w-6 h-6 text-[#c9a24b]" />;
      case 'Hammer':
        return <Hammer className="w-6 h-6 text-[#c9a24b]" />;
      case 'Paintbrush':
        return <Paintbrush className="w-6 h-6 text-[#c9a24b]" />;
      case 'Ruler':
        return <Ruler className="w-6 h-6 text-[#c9a24b]" />;
      default:
        return <Wrench className="w-6 h-6 text-[#c9a24b]" />;
    }
  };

  const handleBookService = (serviceId: string, serviceTitle: string) => {
    setPrefilledRequest({
      serviceId,
      serviceTitle,
    });
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#0d0d0d] border-b border-[#c9a24b]/20 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#c9a24b]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Editorial Serif */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#c9a24b]/30 text-[#c9a24b] text-[11px] font-bold uppercase tracking-widest mb-4">
            <span>{t.servicesSection.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4 font-editorial">
            {t.servicesSection.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a24b] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            {t.servicesSection.subtitle}
          </p>
        </div>

        {/* Grid of services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {HANDYMAN_SERVICES.map(service => {
            const title = language === 'ru' ? service.titleRu : service.titleEn;
            const desc = language === 'ru' ? service.shortDescRu : service.shortDescEn;
            const features = language === 'ru' ? service.featuresRu : service.featuresEn;
            const priceGuide = language === 'ru' ? service.demoPriceGuideRu : service.demoPriceGuideEn;
            const isTv = service.id === 'tv-mounting';

            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 relative group dark-card ${
                  isTv
                    ? 'border-[#c9a24b]/40 shadow-[0_0_25px_rgba(201,162,75,0.12)]'
                    : 'border-[#c9a24b]/15 hover:border-[#c9a24b]/40'
                }`}
              >
                {isTv && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#c9a24b] text-black text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                    Featured
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[#1a1a1a] border border-[#c9a24b]/20 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-[#c9a24b]/50 transition-all">
                      {getIcon(service.iconName)}
                    </div>
                    <span
                      className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                        service.isCustomOnly
                          ? 'bg-white/5 border-white/10 text-neutral-400'
                          : 'bg-[#c9a24b]/10 border-[#c9a24b]/30 text-[#c9a24b]'
                      }`}
                    >
                      {priceGuide}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-white mb-3 font-editorial group-hover:text-[#c9a24b] transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed min-h-[44px] font-light">
                    {desc}
                  </p>

                  {/* Feature bullets */}
                  <div className="space-y-2.5 mb-7 border-t border-white/10 pt-5">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a24b] mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {isTv && (
                    <button
                      onClick={() => {
                        setActiveView('tv-mounting');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-3 px-4 bg-[#c9a24b] hover:bg-[#d8b359] text-black text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(201,162,75,0.25)] cursor-pointer"
                    >
                      <Calculator className="w-4 h-4 text-black" />
                      <span>{t.servicesSection.calculateTv}</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleBookService(service.id, title)}
                    className={`w-full py-3 px-4 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isTv
                        ? 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10'
                        : 'bg-white/5 hover:bg-[#c9a24b] text-neutral-200 hover:text-black border border-white/10 hover:border-[#c9a24b]'
                    }`}
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>{language === 'ru' ? 'Записаться на услугу' : 'Book this service'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note at bottom */}
        <div className="mt-14 bg-[#141414] border border-[#c9a24b]/20 rounded-2xl p-5 text-center text-xs text-neutral-400 max-w-2xl mx-auto font-light">
          <p>{t.servicesSection.otherNotice}</p>
        </div>
      </div>
    </section>
  );
};
