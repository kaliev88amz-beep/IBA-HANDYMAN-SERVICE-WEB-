import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICE_AREAS, BUSINESS_LOCATION } from '../config/pricingConfig';
import { MapPin, Navigation, Info, Search, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

export const ServiceAreaSection: React.FC = () => {
  const { language, t } = useApp();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const hasOffice = BUSINESS_LOCATION.officeAddress.trim() !== '';
  // Selected city wins; otherwise show the office (once set) or the whole Raleigh area
  const mapQuery = selectedCity
    ? `${selectedCity}, NC`
    : hasOffice
    ? BUSINESS_LOCATION.officeAddress
    : BUSINESS_LOCATION.serviceAreaCenter;
  const mapZoom = selectedCity ? 12 : hasOffice ? 13 : 9;
  const [zipInput, setZipInput] = useState('');
  const [checkResult, setCheckResult] = useState<{
    status: 'idle' | 'in_triangle' | 'review_required';
    city?: string;
    zip?: string;
  }>({ status: 'idle' });

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip || cleanZip.length < 5) return;

    // Check if zip matches known sample list in triangle
    const matchedArea = SERVICE_AREAS.find(area =>
      area.sampleZips.some(z => z === cleanZip)
    );

    if (matchedArea) {
      setCheckResult({
        status: 'in_triangle',
        city: matchedArea.city,
        zip: cleanZip,
      });
    } else {
      setCheckResult({
        status: 'review_required',
        zip: cleanZip,
      });
    }
  };

  return (
    <section id="service-area" className="py-20 sm:py-28 bg-page border-b border-accent/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Editorial Serif */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-accent/30 text-accent-ink text-[11px] font-bold uppercase tracking-widest mb-4">
            <Navigation className="w-3.5 h-3.5 text-accent-ink" />
            <span>{t.serviceAreaSection.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-ink tracking-tight mb-4 font-editorial">
            {t.serviceAreaSection.title}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-5" />
          <p className="text-sm sm:text-base text-ink-400 font-light leading-relaxed">
            {t.serviceAreaSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Covered Municipalities & Travel Policy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="dark-card rounded-3xl p-7 sm:p-8 border border-accent/20">
              <h3 className="font-normal text-ink text-xl mb-5 flex items-center gap-2.5 font-editorial">
                <MapPin className="w-5 h-5 text-accent-ink" />
                <span>{t.serviceAreaSection.citiesCovered}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICE_AREAS.map(area => (
                  <button
                    key={area.city}
                    type="button"
                    onClick={() => setSelectedCity(area.city)}
                    className={`p-3.5 bg-surface-2 rounded-2xl border text-left transition-colors cursor-pointer ${
                      selectedCity === area.city ? 'border-accent' : 'border-line/5 hover:border-accent/40'
                    }`}
                  >
                    <div className="font-bold text-ink text-xs">{area.city}</div>
                    <div className="text-[10px] text-ink-400 font-light mt-0.5">{area.county} County</div>
                    <div className="text-[9px] text-accent-ink font-semibold mt-1 uppercase tracking-wider">
                      {area.primary ? 'Core Triangle' : 'Extended Zone'}
                    </div>
                  </button>
                ))}
              </div>

              {/* Travel Time Notice */}
              <div className="mt-6 p-4 bg-surface-2 border border-accent/30 rounded-2xl text-xs text-accent-soft flex items-start gap-3">
                <Info className="w-4 h-4 text-accent-ink shrink-0 mt-0.5" />
                <span className="font-light leading-relaxed">{t.serviceAreaSection.travelNote}</span>
              </div>
            </div>

            {/* Interactive ZIP Verification Tool */}
            <div className="dark-card rounded-3xl p-7 sm:p-8 border border-accent/20">
              <h3 className="font-normal text-ink text-lg mb-2 font-editorial">
                {t.serviceAreaSection.checkZipTitle}
              </h3>
              <p className="text-xs text-ink-400 mb-5 font-light">
                {t.serviceAreaSection.resultPending}
              </p>

              <form onSubmit={handleZipCheck} className="flex gap-2.5">
                <input
                  type="text"
                  value={zipInput}
                  onChange={e => setZipInput(e.target.value.slice(0, 5))}
                  placeholder="e.g. 27601, 27513, 27514"
                  maxLength={5}
                  className="flex-1 px-4 py-3 text-xs rounded-xl border border-line/10 focus:outline-hidden focus:ring-2 focus:ring-accent font-semibold text-ink bg-surface-2"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-accent hover:bg-accent-hover text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgb(var(--accent-rgb)/0.3)] cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-black" />
                  <span>{t.serviceAreaSection.checkZipBtn}</span>
                </button>
              </form>

              {/* Status Results */}
              {checkResult.status === 'in_triangle' && (
                <div className="mt-5 p-4 bg-surface border border-emerald-500/40 rounded-2xl text-xs text-ok flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-ok-strong shrink-0 mt-0.5" />
                  <span>
                    {t.serviceAreaSection.resultTriangle
                      .replace('{city}', checkResult.city || '')
                      .replace('{zip}', checkResult.zip || '')}
                  </span>
                </div>
              )}

              {checkResult.status === 'review_required' && (
                <div className="mt-5 p-4 bg-surface border border-accent/40 rounded-2xl text-xs text-ink-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-accent-ink shrink-0 mt-0.5" />
                  <span>
                    {t.serviceAreaSection.resultOutside.replace('{zip}', checkResult.zip || '')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Visual Area Diagram with Gold Central Anchor */}
          <div className="lg:col-span-6">
            <div className="bg-surface rounded-3xl p-7 sm:p-8 text-ink border border-accent/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-ping" />
                  <span className="text-xs font-bold text-accent-ink uppercase tracking-wider">
                    Raleigh Hub Dispatch Zone
                  </span>
                </div>
                <span className="text-[11px] bg-line/5 border border-line/10 text-ink-300 px-3 py-1 rounded-full font-mono">
                  30–40 Min Road Time
                </span>
              </div>

              {/* Live Google Map (keyless embed) */}
              <div className="relative aspect-4/3 rounded-2xl bg-page-deep border border-line/10 overflow-hidden shadow-inner">
                <iframe
                  key={mapQuery}
                  title={language === 'ru' ? 'Карта зоны обслуживания' : 'Service area map'}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=${mapZoom}&hl=${language}&output=embed`}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* City shortcuts: re-center the map */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[null, ...SERVICE_AREAS.map(a => a.city)].map(city => {
                  const active = selectedCity === city;
                  return (
                    <button
                      key={city ?? 'all'}
                      type="button"
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        active
                          ? 'bg-accent text-black border-accent'
                          : 'bg-surface-2 text-ink-300 border-line/10 hover:border-accent/40'
                      }`}
                    >
                      {city ?? (language === 'ru' ? 'Вся зона' : 'Whole Area')}
                    </button>
                  );
                })}
              </div>

              {/* Map actions */}
              <div className="mt-4 flex flex-wrap gap-2.5">
                {hasOffice && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS_LOCATION.officeAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-accent hover:bg-accent-hover text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{language === 'ru' ? 'Проложить маршрут' : 'Get Directions'}</span>
                  </a>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-surface-2 hover:border-accent/50 border border-line/10 text-ink-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{language === 'ru' ? 'Открыть в Google Maps' : 'Open in Google Maps'}</span>
                </a>
              </div>

              {/* Truthful Map Disclaimer */}
              <div className="mt-5 p-4 bg-page border border-line/10 rounded-2xl text-xs text-ink-400 flex items-start gap-2.5 leading-relaxed font-light">
                <Info className="w-4 h-4 text-accent-ink shrink-0 mt-0.5" />
                <span>{t.serviceAreaSection.mapNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
