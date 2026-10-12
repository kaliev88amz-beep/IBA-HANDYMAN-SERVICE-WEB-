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
        return <Armchair className="w-6 h-6 text-accent-ink" />;
      case 'Hammer':
        return <Hammer className="w-6 h-6 text-accent-ink" />;
      case 'Paintbrush':
        return <Paintbrush className="w-6 h-6 text-accent-ink" />;
      case 'Ruler':
        return <Ruler className="w-6 h-6 text-accent-ink" />;
      default:
        return <Wrench className="w-6 h-6 text-accent-ink" />;
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
    <section id="services" className="py-20 sm:py-28 bg-page border-b border-accent/20 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Editorial Serif */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-accent/30 text-accent-ink text-[11px] font-bold uppercase tracking-widest mb-4">
            <span>{t.servicesSection.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-ink tracking-tight mb-4 font-editorial">
            {t.servicesSection.title}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-5" />
          <p className="text-sm sm:text-base text-ink-400 font-light leading-relaxed">
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
                    ? 'border-accent/40 shadow-[0_0_25px_rgb(var(--accent-rgb)/0.12)]'
                    : 'border-accent/15 hover:border-accent/40'
                }`}
              >
                {isTv && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-accent text-black text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                    Featured
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-surface-2 border border-accent/20 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-accent/50 transition-all">
                      {getIcon(service.iconName)}
                    </div>
                    <span
                      className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${
                        service.isCustomOnly
                          ? 'bg-line/5 border-line/10 text-ink-400'
                          : 'bg-accent/10 border-accent/30 text-accent-ink'
                      }`}
                    >
                      {priceGuide}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-ink mb-3 font-editorial group-hover:text-accent-ink transition-colors">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-400 mb-6 leading-relaxed min-h-[44px] font-light">
                    {desc}
                  </p>

                  {/* Feature bullets */}
                  <div className="space-y-2.5 mb-7 border-t border-line/10 pt-5">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-ink-300 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-ink mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2.5 pt-4 border-t border-line/10">
                  {isTv && (
                    <button
                      onClick={() => {
                        setActiveView('tv-mounting');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-3 px-4 bg-accent hover:bg-accent-hover text-black text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgb(var(--accent-rgb)/0.25)] cursor-pointer"
                    >
                      <Calculator className="w-4 h-4 text-black" />
                      <span>{t.servicesSection.calculateTv}</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleBookService(service.id, title)}
                    className={`w-full py-3 px-4 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isTv
                        ? 'bg-line/5 hover:bg-line/10 text-ink-300 hover:text-ink border border-line/10'
                        : 'bg-line/5 hover:bg-accent text-ink-200 hover:text-black border border-line/10 hover:border-accent'
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
        <div className="mt-14 bg-surface border border-accent/20 rounded-2xl p-5 text-center text-xs text-ink-400 max-w-2xl mx-auto font-light">
          <p>{t.servicesSection.otherNotice}</p>
        </div>
      </div>
    </section>
  );
};
