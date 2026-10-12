import React, { useState } from 'react';
import { Star, Award, BadgeCheck, Briefcase, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SOCIAL_LINKS, THUMBTACK_STATS, FEATURED_REVIEWS } from '../config/pricingConfig';
import { GoogleIcon } from './SocialLinks';

// Review cards visible before "Show more"
const INITIAL_REVIEWS = 6;

const Stars: React.FC<{ rating: number; className?: string }> = ({ rating, className = 'w-3.5 h-3.5' }) => (
  <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        className={`${className} ${i <= Math.round(rating) ? 'fill-[#c9a24b] text-[#c9a24b]' : 'text-neutral-600'}`}
      />
    ))}
  </span>
);

/** Compact rating pill linking to the Thumbtack profile (used in the hero). */
export const ThumbtackBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language } = useApp();
  const { rating, reviewCount, topPro } = THUMBTACK_STATS;
  return (
    <a
      href={SOCIAL_LINKS.thumbtack}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 px-4 py-2.5 rounded-xl bg-[#141414]/90 border border-white/10 hover:border-[#c9a24b]/60 transition-colors text-xs ${className}`}
    >
      <Stars rating={rating} />
      <span className="font-black text-white">{rating.toFixed(1)}</span>
      <span className="text-neutral-300">
        {language === 'ru' ? `${reviewCount} отзывов на Thumbtack` : `${reviewCount} reviews on Thumbtack`}
      </span>
      {topPro && (
        <span className="px-2 py-0.5 rounded-md bg-[#c9a24b]/15 text-[#c9a24b] font-bold uppercase tracking-wider text-[10px]">
          Top Pro
        </span>
      )}
    </a>
  );
};

/** Reviews block: rating summary, profile stats, featured reviews (if any) and a link to all reviews. */
export const ThumbtackReviews: React.FC = () => {
  const { language } = useApp();
  const { rating, reviewCount, hires, topPro, backgroundChecked } = THUMBTACK_STATS;
  const ru = language === 'ru';
  const [showAll, setShowAll] = useState(false);

  const stats = [
    topPro && { Icon: Award, label: ru ? 'Статус Top Pro' : 'Thumbtack Top Pro' },
    { Icon: Briefcase, label: ru ? `Нанимали ${hires} раз` : `Hired ${hires} times` },
    backgroundChecked && { Icon: BadgeCheck, label: ru ? 'Проверка биографии пройдена' : 'Background checked' },
  ].filter(Boolean) as { Icon: typeof Award; label: string }[];

  return (
    <div className="mt-16 bg-[#141414] border border-[#c9a24b]/20 rounded-3xl p-7 sm:p-9">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h4 className="text-xl sm:text-2xl font-editorial text-white mb-2">
            {ru ? 'Отзывы клиентов' : 'What Our Customers Say'}
          </h4>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-white leading-none">{rating.toFixed(1)}</span>
            <div>
              <Stars rating={rating} className="w-4 h-4" />
              <div className="text-xs text-neutral-400 mt-1">
                {ru ? `${reviewCount} проверенных отзывов на Thumbtack` : `${reviewCount} verified reviews on Thumbtack`}
              </div>
            </div>
          </div>
        </div>

        <ul className="flex flex-wrap gap-2.5">
          {stats.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0d0d0d] border border-white/10 text-xs text-neutral-200"
            >
              <Icon className="w-4 h-4 text-[#c9a24b]" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {FEATURED_REVIEWS.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(showAll ? FEATURED_REVIEWS : FEATURED_REVIEWS.slice(0, INITIAL_REVIEWS)).map(r => (
            <figure key={`${r.name}-${r.date}`} className="p-5 rounded-2xl bg-[#0d0d0d] border border-white/10 flex flex-col">
              <Stars rating={r.rating} />
              <blockquote className="mt-3 text-sm text-neutral-200 leading-relaxed font-light flex-1">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-4 text-xs">
                <span className="font-bold text-white">{r.name}</span>
                <span className="text-neutral-500"> · {r.service} · {r.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {!showAll && FEATURED_REVIEWS.length > INITIAL_REVIEWS && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="px-5 py-2.5 rounded-xl border border-white/15 hover:border-[#c9a24b] text-xs font-bold text-neutral-200 transition-colors cursor-pointer"
          >
            {ru
              ? `Показать ещё ${FEATURED_REVIEWS.length - INITIAL_REVIEWS} отзыва`
              : `Show ${FEATURED_REVIEWS.length - INITIAL_REVIEWS} more reviews`}
          </button>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        <a
          href={SOCIAL_LINKS.thumbtack}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#c9a24b] hover:bg-[#d8b359] text-black text-xs font-black uppercase tracking-wider transition-colors"
        >
          <span>{ru ? `Читать все ${reviewCount} отзывов на Thumbtack` : `Read all ${reviewCount} reviews on Thumbtack`}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        {(SOCIAL_LINKS.googleReview || SOCIAL_LINKS.google) && (
          <a
            href={SOCIAL_LINKS.googleReview || SOCIAL_LINKS.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0d0d0d] border border-white/15 hover:border-[#c9a24b] text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <GoogleIcon className="w-3.5 h-3.5" />
            <span>{ru ? 'Оставить отзыв в Google' : 'Review us on Google'}</span>
          </a>
        )}
      </div>
    </div>
  );
};
