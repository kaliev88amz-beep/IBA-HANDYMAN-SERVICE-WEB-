import React from 'react';
import { useApp } from '../context/AppContext';
import { IbaHandymanLogo, IbaTvMountingLogo } from './Logos';
import { SocialLinks } from './SocialLinks';
import { SHOW_OWNER_CRM } from '../config/pricingConfig';
import {
  Phone,
  Clock,
  MapPin,
  Shield,
  LayoutDashboard,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setActiveView } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 ${SHOW_OWNER_CRM ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8 mb-12`}>
          {/* Brand info */}
          <div className="space-y-4">
            <div className="pt-1">
              <IbaHandymanLogo size="md" theme="on-dark" />
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              {t.footer.aboutText}
            </p>

            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Phone className="w-4 h-4" />
              <a href={t.phoneHref} className="hover:underline">
                {t.phoneDisplay}
              </a>
            </div>

            <SocialLinks />

            {/* Sub-brand teaser */}
            <div className="pt-3 border-t border-slate-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Audio-Video Specialty Division:
              </span>
              <IbaTvMountingLogo size="sm" theme="on-dark" />
            </div>
          </div>

          {/* Service Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-amber-400">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveView('tv-mounting');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left font-medium"
                >
                  • IBA TV MOUNTING Hub
                </button>
              </li>
              <li>• Furniture Assembly (IKEA, Wayfair)</li>
              <li>• Drywall Repair & Patching</li>
              <li>• Interior Painting & Accent Walls</li>
              <li>• Shelves, Mirrors & Blinds</li>
              <li>• Minor Home Repair Projects</li>
            </ul>
          </div>

          {/* Operating hours & dispatch */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{t.footer.operatingHours}</span>
            </h4>
            <div className="space-y-1 text-slate-400 whitespace-pre-line leading-relaxed">
              {t.footer.hoursText}
            </div>
            <div className="pt-2 text-slate-400 flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Raleigh, Cary, Apex, Durham, Wake Forest, Clayton, Knightdale, Hillsborough</span>
            </div>
          </div>

          {/* Owner CRM Demo link & Status */}
          {SHOW_OWNER_CRM && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>Business Controls</span>
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Stage 1 frontend preview mode. Explore the simulated owner workflow and live pricing configuration.
              </p>
              <div>
                <button
                  onClick={() => {
                    setActiveView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl font-bold text-xs border border-slate-700 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{t.footer.adminLink}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-2">
          <p className="leading-relaxed">
            {t.footer.legalDisclaimer.replace('{year}', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};
