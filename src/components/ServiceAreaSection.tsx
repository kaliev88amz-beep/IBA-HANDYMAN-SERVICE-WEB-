import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICE_AREAS } from '../config/pricingConfig';
import { MapPin, Navigation, Info, Search, CheckCircle2, AlertCircle } from 'lucide-react';

export const ServiceAreaSection: React.FC = () => {
  const { language, t } = useApp();
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
    <section id="service-area" className="py-20 sm:py-28 bg-[#0d0d0d] border-b border-[#c9a24b]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Editorial Serif */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-[#c9a24b]/30 text-[#c9a24b] text-[11px] font-bold uppercase tracking-widest mb-4">
            <Navigation className="w-3.5 h-3.5 text-[#c9a24b]" />
            <span>{t.serviceAreaSection.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4 font-editorial">
            {t.serviceAreaSection.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a24b] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            {t.serviceAreaSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Covered Municipalities & Travel Policy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="dark-card rounded-3xl p-7 sm:p-8 border border-[#c9a24b]/20">
              <h3 className="font-normal text-white text-xl mb-5 flex items-center gap-2.5 font-editorial">
                <MapPin className="w-5 h-5 text-[#c9a24b]" />
                <span>{t.serviceAreaSection.citiesCovered}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICE_AREAS.map(area => (
                  <div
                    key={area.city}
                    className="p-3.5 bg-[#181818] rounded-2xl border border-white/5 hover:border-[#c9a24b]/40 transition-colors"
                  >
                    <div className="font-bold text-white text-xs">{area.city}</div>
                    <div className="text-[10px] text-neutral-400 font-light mt-0.5">{area.county} County</div>
                    <div className="text-[9px] text-[#c9a24b] font-semibold mt-1 uppercase tracking-wider">
                      {area.primary ? 'Core Triangle' : 'Extended Zone'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Travel Time Notice */}
              <div className="mt-6 p-4 bg-[#181818] border border-[#c9a24b]/30 rounded-2xl text-xs text-[#e4be65] flex items-start gap-3">
                <Info className="w-4 h-4 text-[#c9a24b] shrink-0 mt-0.5" />
                <span className="font-light leading-relaxed">{t.serviceAreaSection.travelNote}</span>
              </div>
            </div>

            {/* Interactive ZIP Verification Tool */}
            <div className="dark-card rounded-3xl p-7 sm:p-8 border border-[#c9a24b]/20">
              <h3 className="font-normal text-white text-lg mb-2 font-editorial">
                {t.serviceAreaSection.checkZipTitle}
              </h3>
              <p className="text-xs text-neutral-400 mb-5 font-light">
                {t.serviceAreaSection.resultPending}
              </p>

              <form onSubmit={handleZipCheck} className="flex gap-2.5">
                <input
                  type="text"
                  value={zipInput}
                  onChange={e => setZipInput(e.target.value.slice(0, 5))}
                  placeholder="e.g. 27601, 27513, 27514"
                  maxLength={5}
                  className="flex-1 px-4 py-3 text-xs rounded-xl border border-white/10 focus:outline-hidden focus:ring-2 focus:ring-[#c9a24b] font-semibold text-white bg-[#181818]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#c9a24b] hover:bg-[#d8b359] text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(201,162,75,0.3)] cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-black" />
                  <span>{t.serviceAreaSection.checkZipBtn}</span>
                </button>
              </form>

              {/* Status Results */}
              {checkResult.status === 'in_triangle' && (
                <div className="mt-5 p-4 bg-[#141414] border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {t.serviceAreaSection.resultTriangle
                      .replace('{city}', checkResult.city || '')
                      .replace('{zip}', checkResult.zip || '')}
                  </span>
                </div>
              )}

              {checkResult.status === 'review_required' && (
                <div className="mt-5 p-4 bg-[#141414] border border-[#c9a24b]/40 rounded-2xl text-xs text-neutral-300 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#c9a24b] shrink-0 mt-0.5" />
                  <span>
                    {t.serviceAreaSection.resultOutside.replace('{zip}', checkResult.zip || '')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Visual Area Diagram with Gold Central Anchor */}
          <div className="lg:col-span-6">
            <div className="bg-[#141414] rounded-3xl p-7 sm:p-8 text-white border border-[#c9a24b]/30 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c9a24b] shadow-[0_0_8px_#c9a24b] animate-ping" />
                  <span className="text-xs font-bold text-[#c9a24b] uppercase tracking-wider">
                    Raleigh Hub Dispatch Zone
                  </span>
                </div>
                <span className="text-[11px] bg-white/5 border border-white/10 text-neutral-300 px-3 py-1 rounded-full font-mono">
                  30–40 Min Road Time
                </span>
              </div>

              {/* Stylized Visual Hub Grid */}
              <div className="relative aspect-4/3 rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Visual highway route markers */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c9a24b_1px,transparent_1px)] [background-size:20px_20px]" />

                {/* Central Hub & Surrounding Towns */}
                <div className="relative z-10 flex flex-col justify-between h-full py-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-3 py-1.5 bg-[#181818] rounded-xl text-[#c9a24b] font-semibold border border-[#c9a24b]/30">
                      Chapel Hill
                    </span>
                    <span className="px-3 py-1.5 bg-[#181818] rounded-xl text-[#c9a24b] font-semibold border border-[#c9a24b]/30">
                      Durham
                    </span>
                    <span className="px-3 py-1.5 bg-[#181818] rounded-xl text-neutral-300 font-semibold border border-white/10">
                      Wake Forest
                    </span>
                  </div>

                  {/* Center Raleigh Anchor */}
                  <div className="self-center text-center my-4">
                    <div className="w-20 h-20 rounded-2xl bg-[#c9a24b] text-black font-black flex flex-col items-center justify-center mx-auto shadow-[0_0_25px_rgba(201,162,75,0.4)] border border-white/30">
                      <MapPin className="w-6 h-6 mb-0.5" />
                      <span className="text-[11px] tracking-wider uppercase font-black">RALEIGH</span>
                    </div>
                    <span className="text-[10px] text-[#c9a24b] font-semibold mt-2 inline-block uppercase tracking-wider">
                      Operations Hub
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="px-3 py-1.5 bg-[#181818] rounded-xl text-[#c9a24b] font-semibold border border-[#c9a24b]/30">
                      Cary & Apex
                    </span>
                    <span className="px-3 py-1.5 bg-[#181818] rounded-xl text-neutral-300 font-semibold border border-white/10">
                      Knightdale
                    </span>
                    <span className="px-3 py-1.5 bg-[#181818] rounded-xl text-neutral-300 font-semibold border border-white/10">
                      Clayton
                    </span>
                  </div>
                </div>
              </div>

              {/* Truthful Map Disclaimer */}
              <div className="mt-5 p-4 bg-[#0d0d0d] border border-white/10 rounded-2xl text-xs text-neutral-400 flex items-start gap-2.5 leading-relaxed font-light">
                <Info className="w-4 h-4 text-[#c9a24b] shrink-0 mt-0.5" />
                <span>{t.serviceAreaSection.mapNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
