import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WORK_SHOWCASE_ITEMS, SOCIAL_LINKS } from '../config/pricingConfig';
import { InstagramIcon } from './SocialLinks';
import { ThumbtackReviews } from './ThumbtackReviews';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

// Project cards shown on "All Projects" before the "Show more" button
const INITIAL_PROJECTS = 8;

export const OurWork: React.FC = () => {
  const { language, t } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({});

  const ru = language === 'ru';
  const categoryLabels: Record<string, string> = {
    tv_mounting: t.workSection.tvTab,
    shelving: ru ? 'Столярка и полки' : 'Carpentry & Shelving',
    painting: ru ? 'Стены и покраска' : 'Walls & Painting',
    install: ru ? 'Картины и светильники' : 'Pictures & Fixtures',
    outdoor: ru ? 'Работы на улице' : 'Outdoor Projects',
    assembly: t.workSection.assemblyTab,
    drywall: t.workSection.drywallTab,
  };
  // Only offer filter tabs for categories that have projects
  const tabs = [
    { id: 'all', label: t.workSection.allTab },
    ...Object.keys(categoryLabels)
      .filter(c => WORK_SHOWCASE_ITEMS.some(i => i.category === c))
      .map(c => ({ id: c, label: categoryLabels[c] })),
  ];

  const filteredItems = WORK_SHOWCASE_ITEMS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });
  // "All Projects" starts with the first rows only; category tabs show everything
  const [showAll, setShowAll] = useState(false);
  const visibleItems =
    activeCategory === 'all' && !showAll ? filteredItems.slice(0, INITIAL_PROJECTS) : filteredItems;

  const handleSliderChange = (id: string, value: number) => {
    setSliderPositions(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <section id="work" className="py-20 sm:py-28 bg-page border-b border-accent/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Editorial Serif */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-accent/30 text-accent-ink text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent-ink" />
            <span>{t.workSection.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-ink tracking-tight mb-4 font-editorial">
            {t.workSection.title}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-5" />
          <p className="text-sm sm:text-base text-ink-400 font-light">
            {t.workSection.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs with Gold Accents */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-accent text-black shadow-[0_0_15px_rgb(var(--accent-rgb)/0.3)]'
                  : 'bg-surface text-ink-400 hover:text-ink border border-line/10 hover:border-accent/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid of Before/After Showcases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {visibleItems.map(item => {
            const sliderPos = sliderPositions[item.id] ?? 50;
            const title = language === 'ru' ? item.titleRu : item.titleEn;
            const caption = language === 'ru' ? item.captionRu : item.captionEn;
            const details = language === 'ru' ? item.detailsRu : item.detailsEn;

            return (
              <div
                key={item.id}
                className="dark-card rounded-3xl overflow-hidden border border-accent/20 shadow-xl flex flex-col justify-between"
              >
                {/* Photo frame: before/after slider when a "before" photo exists */}
                <div
                  className={`relative ${item.portrait ? 'aspect-4/5' : 'aspect-4/3'} select-none overflow-hidden bg-black`}
                >
                  {/* After Image (Background) */}
                  <img
                    src={item.afterImage}
                    alt={item.beforeImage ? `${title} - After` : title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white border border-accent/60 text-[10px] font-black uppercase px-3 py-1 rounded-full z-10 shadow-lg tracking-wider">
                    {item.beforeImage ? t.workSection.afterLabel : ru ? 'Готово' : 'Completed'}
                  </div>

                  {item.beforeImage && (
                  <>

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
                    <div className="absolute top-4 left-4 bg-accent text-black text-[10px] font-black uppercase px-3 py-1 rounded-full z-10 shadow-lg tracking-wider">
                      {t.workSection.beforeLabel}
                    </div>
                  </div>

                  {/* Gold Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-accent shadow-[0_0_10px_var(--color-accent)] pointer-events-none z-20"
                    style={{ left: `calc(${sliderPos}% - 2px)` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-surface border-2 border-accent shadow-xl flex items-center justify-center text-accent-ink">
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
                  </>
                  )}
                </div>

                {/* Information Card Content */}
                <div className="p-7 space-y-3">
                  <div className="text-[11px] font-bold text-accent-ink uppercase tracking-widest">
                    {categoryLabels[item.category]}
                  </div>

                  <h3 className="font-normal text-ink text-lg sm:text-xl font-editorial leading-snug">
                    {title}
                  </h3>

                  <p className="text-xs text-ink-400 leading-relaxed font-light">
                    {caption}
                  </p>

                  <div className="pt-3 border-t border-line/10 text-[11px] font-light text-ink-400">
                    {details}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {visibleItems.length < filteredItems.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-xl border border-accent/40 hover:border-accent bg-surface text-ink text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {ru
                ? `Показать ещё работы (${filteredItems.length - visibleItems.length})`
                : `Show more projects (${filteredItems.length - visibleItems.length})`}
            </button>
          </div>
        )}

        {/* Instagram portfolio link */}
        {SOCIAL_LINKS.instagram && (
          <div className="mt-12 flex justify-center">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-surface border border-accent/40 hover:border-accent text-ink text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-accent-ink" />
              <span>
                {language === 'ru' ? 'Больше наших работ в Instagram' : 'See more of our work on Instagram'}
              </span>
              <span className="text-ink-400 normal-case tracking-normal font-medium hidden sm:inline">
                {SOCIAL_LINKS.instagramHandle}
              </span>
            </a>
          </div>
        )}

        {/* Verified Thumbtack reviews */}
        <ThumbtackReviews />
      </div>
    </section>
  );
};
