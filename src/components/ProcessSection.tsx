import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, CheckCircle, Calendar, Sparkles } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const { t } = useApp();

  const steps = [
    {
      num: '01',
      title: t.processSection.step1Title,
      desc: t.processSection.step1Desc,
      icon: <FileText className="w-5 h-5 text-black" />,
    },
    {
      num: '02',
      title: t.processSection.step2Title,
      desc: t.processSection.step2Desc,
      icon: <CheckCircle className="w-5 h-5 text-black" />,
    },
    {
      num: '03',
      title: t.processSection.step3Title,
      desc: t.processSection.step3Desc,
      icon: <Calendar className="w-5 h-5 text-black" />,
    },
    {
      num: '04',
      title: t.processSection.step4Title,
      desc: t.processSection.step4Desc,
      icon: <Sparkles className="w-5 h-5 text-black" />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a] border-b border-[#c9a24b]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#c9a24b]/30 text-[#c9a24b] text-[11px] font-bold uppercase tracking-widest mb-4">
            <span>{t.processSection.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4 font-editorial">
            {t.processSection.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a24b] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-neutral-400 font-light">
            {t.processSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map(step => (
            <div
              key={step.num}
              className="dark-card rounded-3xl p-7 border border-[#c9a24b]/20 shadow-xl relative flex flex-col justify-between group hover:border-[#c9a24b]/60 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#c9a24b] flex items-center justify-center shadow-[0_0_15px_rgba(201,162,75,0.3)]">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-normal text-[#c9a24b]/50 group-hover:text-[#c9a24b] transition-colors font-editorial">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-normal text-white text-lg mb-3 font-editorial group-hover:text-[#c9a24b] transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
