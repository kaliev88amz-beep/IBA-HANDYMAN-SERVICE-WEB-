import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IbaHandymanIcon } from './Logos';
import {
  MessageSquare,
  X,
  ChevronRight,
  Info,
  Send,
  HelpCircle,
} from 'lucide-react';

export const HelperWidget: React.FC = () => {
  const { language, t, faqs, setActiveView } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);

  const selectedFaq = faqs.find(f => f.id === selectedFaqId);

  const handleOpenContact = () => {
    setActiveView('contact');
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Expanded Modal / Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[500px] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                <IbaHandymanIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-white leading-tight">
                  {t.helper.title}
                </h4>
                <p className="text-[10px] text-slate-400">
                  {t.helper.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedFaqId(null);
              }}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close helper"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Notice: Stage 1 Reference Mode (Not active AI chat yet) */}
          <div className="bg-warm-50 px-3.5 py-2 border-b border-warm-200 text-[10px] text-warm-900 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-warm-700 shrink-0" />
            <span>{t.helper.statusNotice}</span>
          </div>

          {/* Body */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
            {selectedFaq ? (
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedFaqId(null)}
                  className="text-warm-600 hover:text-warm-700 font-bold text-[11px] flex items-center gap-1"
                >
                  ← {language === 'ru' ? 'Назад к списку вопросов' : 'Back to question list'}
                </button>

                <div className="font-extrabold text-slate-900 text-sm">
                  {language === 'ru' ? selectedFaq.questionRu : selectedFaq.questionEn}
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 leading-relaxed text-xs">
                  {language === 'ru' ? selectedFaq.answerRu : selectedFaq.answerEn}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleOpenContact}
                    className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-warm-400 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    <span>{t.helper.askOwner}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t.helper.chipsHeader}
                </div>

                <div className="space-y-1.5">
                  {faqs.map(faq => (
                    <button
                      key={faq.id}
                      onClick={() => setSelectedFaqId(faq.id)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-warm-300 hover:bg-warm-50/50 text-left flex items-center justify-between text-xs text-slate-800 transition-all font-medium"
                    >
                      <span className="line-clamp-2">
                        {language === 'ru' ? faq.questionRu : faq.questionEn}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1.5" />
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={handleOpenContact}
                    className="w-full py-2 px-3 bg-warm-400 hover:bg-warm-300 text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{t.helper.askOwner}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all border border-slate-700 active:scale-95 group"
          title="Quick Answers & Guide"
        >
          <div className="w-6 h-6 rounded-full bg-warm-400 text-slate-950 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-slate-100 hidden sm:inline">
            {t.helper.openHelper}
          </span>
        </button>
      )}
    </div>
  );
};
