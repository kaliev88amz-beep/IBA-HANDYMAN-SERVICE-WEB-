import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WORK_SHOWCASE_ITEMS, SOCIAL_LINKS } from '../config/pricingConfig';
import { InstagramIcon } from './SocialLinks';
import { Sparkles, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';

export const OurWork: React.FC = () => {
  const { language, t } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({
    'work-1': 50,
    'work-2': 50,
    'work-3': 50,
    'work-4': 50,
  });

  const filteredItems = WORK_SHOWCASE_ITEMS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleSliderChange = (id: string, value: number) => {
    setSliderPositions(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <section id="work" className="py-20 sm:py-28 bg-[#0d0d0d] border-b border-[#c9a24b]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Editorial Serif */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#c9a24b]/30 text-[#c9a24b] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a24b]" />
            <span>{t.workSection.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4 font-editorial">
            {t.workSection.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a24b] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-neutral-400 font-light">
            {t.workSection.subtitle}
          </p>

          {/* Genuine Placeholder Notice */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-light">
            <ImageIcon className="w-3.5 h-3.5 text-[#c9a24b]" />
            <span>{t.workSection.placeholderBadge}</span>
          </div>
        </div>

        {/* Category Filter Tabs with Gold Accents */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: t.workSection.allTab },
            { id: 'tv_mounting', label: t.workSection.tvTab },
            { id: 'assembly', label: t.workSection.assemblyTab },
            { id: 'drywall', label: t.workSection.drywallTab },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#c9a24b] text-black shadow-[0_0_15px_rgba(201,162,75,0.3)]'
                  : 'bg-[#141414] text-neutral-400 hover:text-white border border-white/10 hover:border-[#c9a24b]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid of Before/After Showcases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredItems.map(item => {
            const sliderPos = sliderPositions[item.id] ?? 50;
            const title = language === 'ru' ? item.titleRu : item.titleEn;
            const caption = language === 'ru' ? item.captionRu : item.captionEn;
            const details = language === 'ru' ? item.detailsRu : item.detailsEn;

            return (
              <div
                key={item.id}
                className="dark-card rounded-3xl overflow-hidden border border-[#c9a24b]/20 shadow-xl flex flex-col justify-between"
              >
                {/* Interactive Before/After Visual Frame */}
                <div className="relative aspect-16/10 select-none overflow-hidden bg-black">
                  {/* After Image (Background) */}
                  <img
                    src={item.afterImage}
                    alt={`${title} - After`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-[#c9a24b] border border-[#c9a24b]/40 text-[10px] font-black uppercase px-3 py-1 rounded-full z-10 shadow-lg tracking-wider">
                    {t.workSection.afterLabel}
                  </div>

                  {/* Before Image (Clipped Overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={item.beforeImage}
                      alt={`${title} - Before`}
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', minWidth: '100%', height: '100%' }}
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#c9a24b] text-black text-[10px] font-black uppercase px-3 py-1 rounded-full z-10 shadow-lg tracking-wider">
                      {t.workSection.beforeLabel}
                    </div>
                  </div>

                  {/* Gold Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[#c9a24b] shadow-[0_0_10px_#c9a24b] pointer-events-none z-20"
                    style={{ left: `calc(${sliderPos}% - 2px)` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#141414] border-2 border-[#c9a24b] shadow-xl flex items-center justify-center text-[#c9a24b]">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Range input slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={e => handleSliderChange(item.id, Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                    aria-label="Before after comparison slider"
                  />
                </div>

                {/* Information Card Content */}
                <div className="p-7 space-y-3">
                  <div className="text-[11px] font-bold text-[#c9a24b] uppercase tracking-widest">
                    {item.category.replace('_', ' ')}
                  </div>

                  <h3 className="font-normal text-white text-lg sm:text-xl font-editorial leading-snug">
                    {title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {caption}
                  </p>

                  <div className="pt-3 border-t border-white/10 text-[11px] font-light text-neutral-400">
                    {details}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instagram portfolio link */}
        {SOCIAL_LINKS.instagram && (
          <div className="mt-12 flex justify-center">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#141414] border border-[#c9a24b]/40 hover:border-[#c9a24b] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-[#c9a24b]" />
              <span>
                {language === 'ru' ? 'Больше наших работ в Instagram' : 'See more of our work on Instagram'}
              </span>
              <span className="text-neutral-400 normal-case tracking-normal font-medium hidden sm:inline">
                {SOCIAL_LINKS.instagramHandle}
              </span>
            </a>
          </div>
        )}

        {/* Notice regarding authentic customer reviews */}
        <div className="mt-16 bg-[#141414] border border-[#c9a24b]/20 rounded-2xl p-7 text-center max-w-2xl mx-auto">
          <h4 className="text-sm font-editorial text-white mb-2">
            {language === 'ru' ? 'Честные отзывы клиентов' : 'Authentic Customer Reviews'}
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            {language === 'ru'
              ? 'Мы не публикуем искусственные отзывы. Ссылки на отзывы в Google Business и Nextdoor будут подключены после верификации профиля бизнеса в Raleigh.'
              : 'We do not publish fabricated testimonials. Direct verified links to Google Business and Nextdoor review profiles will appear here as jobs are completed in Raleigh.'}
          </p>
        </div>
      </div>
    </section>
  );
};
