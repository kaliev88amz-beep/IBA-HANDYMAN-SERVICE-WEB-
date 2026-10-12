import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  LeadInquiry,
  PricingConfig,
  FaqItem,
  QuoteCalculationResult,
  LeadStatus,
} from '../types';
import { INITIAL_PRICING_CONFIG, DEFAULT_FAQS } from '../config/pricingConfig';
import { INITIAL_MOCK_LEADS } from '../data/mockCrmData';
import { translations, TranslationBundle } from '../config/i18n';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationBundle;
  activeView: string;
  setActiveView: (view: string) => void;
  leads: LeadInquiry[];
  pricing: PricingConfig;
  faqs: FaqItem[];
  currentQuote: QuoteCalculationResult | null;
  setCurrentQuote: (quote: QuoteCalculationResult | null) => void;
  prefilledRequest: Partial<LeadInquiry> | null;
  setPrefilledRequest: (req: Partial<LeadInquiry> | null) => void;
  createLead: (data: Omit<LeadInquiry, 'id' | 'createdAt'>) => LeadInquiry;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  updateLeadAgreedPrice: (id: string, price: number | null) => void;
  confirmLeadSchedule: (id: string, confirmedDateTime: string) => void;
  updatePricing: (newPricing: PricingConfig) => void;
  updateFaqs: (newFaqs: FaqItem[]) => void;
  resetDemoData: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_LEADS = 'iba_demo_leads_v1';
const STORAGE_KEY_PRICING = 'iba_demo_pricing_v1';
const STORAGE_KEY_FAQS = 'iba_demo_faqs_v1';
const STORAGE_KEY_LANG = 'iba_demo_lang_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      return (saved === 'ru' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const [activeView, setActiveView] = useState<string>('home');

  const [leads, setLeads] = useState<LeadInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEADS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MOCK_LEADS;
  });

  const [pricing, setPricing] = useState<PricingConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRICING);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRICING_CONFIG;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAQS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_FAQS;
  });

  const [currentQuote, setCurrentQuote] = useState<QuoteCalculationResult | null>(null);
  const [prefilledRequest, setPrefilledRequest] = useState<Partial<LeadInquiry> | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, language);
    } catch {
      // ignore
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    } catch {
      // ignore
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRICING, JSON.stringify(pricing));
    } catch {
      // ignore
    }
  }, [pricing]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAQS, JSON.stringify(faqs));
    } catch {
      // ignore
    }
  }, [faqs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const createLead = (data: Omit<LeadInquiry, 'id' | 'createdAt'>): LeadInquiry => {
    const newLead: LeadInquiry = {
      ...data,
      id: `lead-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString(),
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, status } : l))
    );
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, ownerNotes: notes } : l))
    );
  };

  const updateLeadAgreedPrice = (id: string, price: number | null) => {
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, agreedPrice: price } : l))
    );
  };

  const confirmLeadSchedule = (id: string, confirmedDateTime: string) => {
    setLeads(prev =>
      prev.map(l =>
        l.id === id
          ? {
              ...l,
              isDateConfirmed: true,
              confirmedDate: confirmedDateTime,
              status: l.status === 'new' || l.status === 'contacted' ? 'scheduled' : l.status,
            }
          : l
      )
    );
  };

  const updatePricing = (newPricing: PricingConfig) => {
    setPricing(newPricing);
    showToast(translations[language].crm.pricingView.successMsg);
  };

  const updateFaqs = (newFaqs: FaqItem[]) => {
    setFaqs(newFaqs);
  };

  const resetDemoData = () => {
    setLeads(INITIAL_MOCK_LEADS);
    setPricing(INITIAL_PRICING_CONFIG);
    setFaqs(DEFAULT_FAQS);
    localStorage.removeItem(STORAGE_KEY_LEADS);
    localStorage.removeItem(STORAGE_KEY_PRICING);
    localStorage.removeItem(STORAGE_KEY_FAQS);
    showToast(translations[language].crm.settingsView.resetSuccess);
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeView,
        setActiveView,
        leads,
        pricing,
        faqs,
        currentQuote,
        setCurrentQuote,
        prefilledRequest,
        setPrefilledRequest,
        createLead,
        updateLeadStatus,
        updateLeadNotes,
        updateLeadAgreedPrice,
        confirmLeadSchedule,
        updatePricing,
        updateFaqs,
        resetDemoData,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
