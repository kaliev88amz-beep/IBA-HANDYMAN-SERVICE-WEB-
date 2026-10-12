import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IbaHandymanLogo, IbaTvMountingIcon } from './Logos';
import {
  Phone,
  Menu,
  X,
  Globe,
  LayoutDashboard,
  Calculator,
  CalendarCheck,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, activeView, setActiveView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'tv-mounting', label: t.nav.tvMounting, isTv: true },
    { id: 'work', label: t.nav.work },
    { id: 'serviceArea', label: t.nav.serviceArea },
    { id: 'faq', label: t.nav.faq },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-[#c9a24b]/20 transition-all shadow-2xl">
      {/* Top micro-bar */}
      <div className="bg-[#080808] text-neutral-400 text-xs py-2 px-4 sm:px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#c9a24b] shadow-[0_0_8px_#c9a24b] animate-pulse" />
            <span className="font-medium text-neutral-300 tracking-wide">{t.locationTag}</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="hidden sm:inline text-neutral-400 tracking-wider text-[11px]">
              RALEIGH • CARY • APEX • DURHAM • CHAPEL HILL
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={t.phoneHref}
              className="flex items-center gap-1.5 font-bold text-[#c9a24b] hover:text-[#e4be65] transition-colors tracking-wide text-xs group"
            >
              <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>{t.phoneDisplay}</span>
            </a>

            <div className="h-3 w-px bg-white/10 hidden sm:block" />

            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                activeView === 'admin'
                  ? 'bg-[#c9a24b] text-black font-bold shadow-[0_0_10px_rgba(201,162,75,0.3)]'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
              title="Owner CRM Demo"
            >
              <LayoutDashboard className="w-3 h-3 text-[#c9a24b]" />
              <span>{t.nav.adminCrm}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-4">
          {/* Logo: Dark Luxury IBA Handyman Services */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-hidden group"
          >
            <IbaHandymanLogo size="md" theme="dark" />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map(item => {
              const isActive = activeView === item.id;
              if (item.isTv) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                      isActive
                        ? 'bg-[#1a1712] text-[#c9a24b] border-[#c9a24b] shadow-[0_0_15px_rgba(201,162,75,0.25)]'
                        : 'text-neutral-300 hover:text-[#c9a24b] hover:bg-white/5 border-transparent hover:border-[#c9a24b]/30'
                    }`}
                  >
                    <IbaTvMountingIcon className="w-4 h-4 shrink-0" houseColor="#c9a24b" toolsColor="#FFFFFF" />
                    <span>{item.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-[#c9a24b] bg-white/5 font-bold border-b-2 border-[#c9a24b]'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switch */}
            <div className="flex items-center bg-[#141414] rounded-lg p-0.5 border border-[#c9a24b]/25">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-[#c9a24b] text-black shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  language === 'ru'
                    ? 'bg-[#c9a24b] text-black shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                RU
              </button>
            </div>

            <button
              onClick={() => handleNavClick('tv-mounting')}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-[#c9a24b] hover:text-white bg-transparent hover:bg-white/5 rounded-xl border border-[#c9a24b]/40 hover:border-[#c9a24b] transition-all"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.nav.getEstimate}</span>
            </button>

            {/* Primary "Записаться" / "Book Service" button with luxury gold shine */}
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-black bg-[#c9a24b] hover:bg-[#d8b359] rounded-xl shadow-[0_0_20px_rgba(201,162,75,0.35)] hover:shadow-[0_0_28px_rgba(201,162,75,0.5)] transition-all active:scale-95"
            >
              <CalendarCheck className="w-4 h-4 text-black" />
              <span>{language === 'ru' ? 'Записаться' : 'Book Service'}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
              className="px-2.5 py-1 text-xs font-bold text-[#c9a24b] bg-white/5 border border-[#c9a24b]/30 rounded-lg flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 border border-white/10 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0f0f0f] border-b border-[#c9a24b]/30 px-5 pt-3 pb-7 space-y-2.5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                  activeView === item.id
                    ? 'bg-[#c9a24b] text-black font-bold'
                    : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.isTv && (
                  <span className="text-[10px] bg-black/40 text-[#c9a24b] px-2 py-0.5 rounded font-bold border border-[#c9a24b]/40">
                    Specialty
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between mt-2 bg-black/60 border border-[#c9a24b]/30 text-[#c9a24b]"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-[#c9a24b]" />
                <span>{t.nav.adminCrm}</span>
              </div>
              <span className="text-[10px] bg-[#c9a24b] text-black font-bold px-1.5 py-0.5 rounded">Owner Demo</span>
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleNavClick('tv-mounting')}
              className="w-full py-3 px-3 bg-white/5 hover:bg-white/10 border border-[#c9a24b]/30 rounded-xl text-xs font-bold text-[#c9a24b] flex items-center justify-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>{t.nav.getEstimate}</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 px-3 bg-[#c9a24b] hover:bg-[#d8b359] rounded-xl text-xs font-black uppercase tracking-wider text-black flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(201,162,75,0.4)]"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{language === 'ru' ? 'Записаться' : 'Book Service'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
