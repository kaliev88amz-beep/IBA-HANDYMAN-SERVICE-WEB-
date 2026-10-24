import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IbaHandymanLogo } from './Logos';
import { SHOW_OWNER_CRM } from '../config/pricingConfig';
import { ThemeToggle } from './ThemeToggle';
import {
  Phone,
  Menu,
  X,
  LayoutDashboard,
  Calculator,
  ClipboardCheck,
  Tv,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, t, activeView, setActiveView } = useApp();
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
    <header className="sticky top-0 z-50 bg-page/95 backdrop-blur-xl border-b border-accent/20 transition-all shadow-2xl">
      {/* Top micro-bar */}
      <div className="bg-page-deep text-ink-400 text-xs py-2 px-4 sm:px-6 border-b border-line/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse" />
            <span className="font-medium text-ink-300 tracking-wide">{t.locationTag}</span>
            <span className="hidden sm:inline text-ink-600">•</span>
            <span className="hidden sm:inline text-ink-400 tracking-wider text-[11px]">
              RALEIGH • CARY • APEX • DURHAM • CHAPEL HILL
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={t.phoneHref}
              className="flex items-center gap-1.5 font-bold text-accent-ink hover:text-accent-soft transition-colors tracking-wide text-xs group"
            >
              <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>{t.phoneDisplay}</span>
            </a>

            {SHOW_OWNER_CRM && (
              <>
                <div className="h-3 w-px bg-line/10 hidden sm:block" />

                <button
                  onClick={() => handleNavClick('admin')}
                  className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    activeView === 'admin'
                      ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgb(var(--accent-rgb)/0.3)]'
                      : 'bg-line/5 text-ink-300 hover:bg-line/10 hover:text-ink border border-line/10'
                  }`}
                  title="Owner CRM Demo"
                >
                  <LayoutDashboard className="w-3 h-3 text-accent-ink" />
                  <span>{t.nav.adminCrm}</span>
                </button>
              </>
            )}
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
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5">
            {navItems.map(item => {
              const isActive = activeView === item.id;
              if (item.isTv) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                      isActive
                        ? 'bg-surface text-accent-ink border-accent shadow-[0_0_15px_rgb(var(--accent-rgb)/0.25)]'
                        : 'text-ink-300 hover:text-accent-ink hover:bg-line/5 border-transparent hover:border-accent/30'
                    }`}
                  >
                    <Tv className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-accent-ink bg-line/5 font-bold border-b-2 border-accent'
                      : 'text-ink-300 hover:text-ink hover:bg-line/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            {/* Primary call to action: opens the request form */}
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider whitespace-nowrap text-black bg-accent hover:bg-accent-hover light:text-white light:bg-[#0288d1] light:hover:bg-[#0277bd] rounded-xl shadow-[0_0_20px_rgb(var(--accent-rgb)/0.35)] hover:shadow-[0_0_28px_rgb(var(--accent-rgb)/0.5)] transition-all active:scale-95"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>{t.nav.freeEstimate}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle className="sm:hidden" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-ink-300 hover:text-ink hover:bg-line/5 border border-line/10 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-page-deep border-b border-accent/30 px-5 pt-3 pb-7 space-y-2.5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                  activeView === item.id
                    ? 'bg-accent text-black font-bold'
                    : 'text-ink-300 hover:bg-line/5 hover:text-ink'
                }`}
              >
                <span>{item.label}</span>
                {item.isTv && (
                  <span className="text-[10px] bg-black/40 text-accent-ink px-2 py-0.5 rounded font-bold border border-accent/40">
                    Specialty
                  </span>
                )}
              </button>
            ))}

            {SHOW_OWNER_CRM && (
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between mt-2 bg-black/60 border border-accent/30 text-accent-ink"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-accent-ink" />
                  <span>{t.nav.adminCrm}</span>
                </div>
                <span className="text-[10px] bg-accent text-black font-bold px-1.5 py-0.5 rounded">Owner Demo</span>
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-line/10 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleNavClick('tv-mounting')}
              className="w-full py-3 px-3 bg-line/5 hover:bg-line/10 border border-accent/30 rounded-xl text-xs font-bold text-accent-ink flex items-center justify-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>{t.nav.getEstimate}</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 px-3 bg-accent hover:bg-accent-hover light:bg-[#0288d1] light:hover:bg-[#0277bd] rounded-xl text-xs font-black uppercase tracking-wider text-black light:text-white flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgb(var(--accent-rgb)/0.4)]"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>{t.nav.freeEstimate}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
