import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, MessageSquareText, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MESSENGER_URL, TEXT_NUMBER } from '../config/pricingConfig';

// Pre-filled message so customers send the details we need for a quote
const PREFILLED_MESSAGE = {
  en: [
    "Hi IBA! I'd like a quote.",
    '• Service needed (TV mounting / handyman):',
    '• TV size & wall type (drywall, brick, fireplace):',
    '• ZIP code:',
    '• Preferred date & time:',
  ].join('\n'),
  ru: [
    'Здравствуйте, IBA! Хочу узнать стоимость.',
    '• Какая услуга нужна (монтаж ТВ / мастер):',
    '• Диагональ ТВ и тип стены (гипсокартон, кирпич, над камином):',
    '• ZIP-код:',
    '• Удобные дата и время:',
  ].join('\n'),
};

const MessengerIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.15.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.98-.87a.8.8 0 0 1 .54-.04c.91.25 1.87.38 2.9.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63z" />
  </svg>
);

/** Floating bottom-left button: lets visitors message us on Facebook Messenger or by text (SMS). */
export const MessageUsButton: React.FC = () => {
  const { language } = useApp();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const ru = language === 'ru';

  // Close the menu on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const message = encodeURIComponent(PREFILLED_MESSAGE[language]);
  const options = [
    {
      key: 'messenger',
      href: `${MESSENGER_URL}?text=${message}`,
      external: true,
      title: 'Messenger',
      hint: ru ? 'Написать в Facebook' : 'Chat on Facebook',
      icon: <MessengerIcon className="w-4 h-4" />,
      iconClass: 'bg-gradient-to-br from-[#00B2FF] to-[#A033FF]',
    },
    {
      key: 'sms',
      // "?&body=" works on both iPhone and Android
      href: `sms:${TEXT_NUMBER}?&body=${message}`,
      external: false,
      title: ru ? 'SMS' : 'Text us',
      hint: '(919) 264-6101',
      icon: <MessageSquareText className="w-4 h-4" />,
      iconClass: 'bg-[#34C759]',
    },
  ];
  const label = ru ? 'Написать нам' : 'Message Us';

  return (
    <div ref={rootRef} className="fixed bottom-4 left-4 z-50">
      {open && (
        <div className="mb-3 w-60 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 space-y-1 animate-in slide-in-from-bottom-2 duration-150">
          {options.map(o => (
            <a
              key={o.key}
              href={o.href}
              {...(o.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <span className={`w-8 h-8 rounded-full text-white flex items-center justify-center shrink-0 ${o.iconClass}`}>
                {o.icon}
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-white">{o.title}</span>
                <span className="block text-[11px] text-slate-400">{o.hint}</span>
              </span>
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={label}
        title={label}
        className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all border border-slate-700 active:scale-95"
      >
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00B2FF] to-[#A033FF] flex items-center justify-center">
          {open ? <X className="w-3.5 h-3.5" /> : <MessageCircle className="w-3.5 h-3.5" />}
        </span>
        <span className="text-xs font-bold text-slate-100 hidden sm:inline">{label}</span>
      </button>
    </div>
  );
};
