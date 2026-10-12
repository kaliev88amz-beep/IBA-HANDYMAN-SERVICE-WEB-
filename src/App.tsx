import React from 'react';
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
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-amber-300 border border-amber-400/40 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-150">
          {toastMessage}
        </div>
      )}

      <Navbar />

      <main className="flex-1">
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
