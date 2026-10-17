import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCards } from './components/ServiceCards';
import { TvMountingHub } from './components/TvMountingHub';
import { OurWork } from './components/OurWork';
import { ProcessSection } from './components/ProcessSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { FaqSection } from './components/FaqSection';
import { ContactFormSection } from './components/ContactFormSection';
import { AdminCRM } from './components/AdminCRM';
import { HelperWidget } from './components/HelperWidget';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView, toastMessage } = useApp();

  // Deep links like /#rates-table: the browser tries to jump before React renders,
  // so scroll to the target once the page content exists. Instant (not smooth) so the
  // long jump isn't cancelled, and repeated after full load to absorb image layout shifts.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const jump = () =>
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
    const timer = window.setTimeout(jump, 100);
    if (document.readyState !== 'complete') window.addEventListener('load', jump, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', jump);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-warm-300 border border-warm-400/40 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-150">
          {toastMessage}
        </div>
      )}

      <Navbar />

      <main className="flex-1 relative">
        {/* Soft light beam behind the first section on inner pages (home and TV hub have their own) */}
        {!['home', 'tv-mounting', 'admin'].includes(activeView) && (
          <div aria-hidden="true" className="page-glow pointer-events-none absolute inset-x-0 top-0 h-[520px] z-10" />
        )}
        {activeView === 'admin' ? (
          <AdminCRM />
        ) : activeView === 'tv-mounting' ? (
          <>
            <TvMountingHub />
            <ContactFormSection />
            <FaqSection />
          </>
        ) : activeView === 'services' ? (
          <>
            <ServiceCards />
            <ContactFormSection />
          </>
        ) : activeView === 'work' ? (
          <>
            <OurWork />
            <ContactFormSection />
          </>
        ) : activeView === 'serviceArea' ? (
          <>
            <ServiceAreaSection />
            <ContactFormSection />
          </>
        ) : activeView === 'faq' ? (
          <>
            <FaqSection />
            <ContactFormSection />
          </>
        ) : activeView === 'contact' ? (
          <ContactFormSection />
        ) : (
          /* Default: Home View */
          <>
            <Hero />
            <ServiceCards />
            <TvMountingHub />
            <OurWork />
            <ProcessSection />
            <ServiceAreaSection />
            <FaqSection />
            <ContactFormSection />
          </>
        )}
      </main>

      <Footer />
      <HelperWidget />
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
