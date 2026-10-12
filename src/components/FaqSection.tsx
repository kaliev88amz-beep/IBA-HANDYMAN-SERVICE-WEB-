import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { language, t, faqs } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-tv-price');

  const filteredFaqs = faqs.filter(f => {
    if (selectedCat === 'all') return true;
    return f.category === selectedCat;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#0a0a0a] border-b border-[#c9a24b]/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#c9a24b]/30 text-[#c9a24b] text-[11px] font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#c9a24b]" />
            <span>{t.faqSection.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4 font-editorial">
            {t.faqSection.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a24b] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-neutral-400 font-light">
            {t.faqSection.subtitle}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: t.faqSection.allCat },
            { id: 'tv', label: t.faqSection.tvCat },
            { id: 'booking', label: t.faqSection.bookingCat },
            { id: 'general', label: t.faqSection.generalCat },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-[#c9a24b] text-black shadow-[0_0_15px_rgba(201,162,75,0.3)]'
                  : 'bg-[#141414] text-neutral-400 hover:text-white border border-white/10 hover:border-[#c9a24b]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map(faq => {
            const isOpen = openFaqId === faq.id;
            const question = language === 'ru' ? faq.questionRu : faq.questionEn;
            const answer = language === 'ru' ? faq.answerRu : faq.answerEn;

            return (
              <div
                key={faq.id}
                className="dark-card rounded-2xl overflow-hidden border border-[#c9a24b]/20 transition-all hover:border-[#c9a24b]/40"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-white text-sm sm:text-base hover:text-[#c9a24b] transition-colors focus:outline-hidden font-normal cursor-pointer"
                >
                  <span className="font-editorial text-base sm:text-lg">{question}</span>
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#c9a24b]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200 font-light">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
