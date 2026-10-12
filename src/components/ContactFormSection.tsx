import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HANDYMAN_SERVICES, WEB3FORMS_ACCESS_KEY, WHATSAPP_NUMBER } from '../config/pricingConfig';
import { SocialLinks } from './SocialLinks';
import {
  Send,
  Calendar,
  Phone,
  Clock,
  Sparkles,
  Camera,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const ContactFormSection: React.FC = () => {
  const {
    language,
    t,
    prefilledRequest,
    currentQuote,
    createLead,
  } = useApp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('27601');
  const [streetAddress, setStreetAddress] = useState('');
  const [serviceId, setServiceId] = useState('tv-mounting');
  const [description, setDescription] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [requestedTimeSlot, setRequestedTimeSlot] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'sms' | 'phone' | 'email'>('sms');
  const [optInSms, setOptInSms] = useState(false);
  const [optInMarketingEmail, setOptInMarketingEmail] = useState(false);
  const [showExtendedFields, setShowExtendedFields] = useState(true);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState(false);

  // Sync pre-filled data if user transferred from calculator or service card
  useEffect(() => {
    if (prefilledRequest) {
      if (prefilledRequest.serviceId) setServiceId(prefilledRequest.serviceId);
      if (prefilledRequest.zip) setZip(prefilledRequest.zip);
      if (prefilledRequest.description) setDescription(prefilledRequest.description);
    }
  }, [prefilledRequest]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      errors.phone = t.contactSection.phoneError;
    }
    if (!zip.trim() || zip.length !== 5) {
      errors.zip = t.contactSection.zipError;
    }
    if (!description.trim()) {
      errors.description = 'Please describe the project briefly';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Emails the request to the owner via Web3Forms; resolves false on any failure
  const sendRequestEmail = async (serviceTitleEn: string) => {
    if (!WEB3FORMS_ACCESS_KEY) return false;
    const timeLabels = { morning: 'Morning (9 AM - 12 PM)', afternoon: 'Afternoon (12 - 4 PM)', evening: 'Late afternoon (4 - 7 PM)' };
    const estimate = currentQuote
      ? [
          ...currentQuote.items.map(i => `- ${i.nameEn}: ${i.price === null ? 'custom quote' : `$${i.price}`}`),
          `Total: $${currentQuote.total}${currentQuote.hasCustomItems ? ' (+ custom-quote items)' : ''}`,
        ].join('\n')
      : 'No calculator estimate';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New request: ${serviceTitleEn} — ${firstName.trim()} (${zip.trim()})`,
          from_name: 'IBA Website',
          ...(email.trim() ? { replyto: email.trim() } : {}),
          Name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          Phone: phone.trim(),
          Email: email.trim() || '—',
          'ZIP code': zip.trim(),
          Address: streetAddress.trim() || '—',
          Service: serviceTitleEn,
          'Project details': description.trim(),
          'Requested date': requestedDate ? `${requestedDate}, ${timeLabels[requestedTimeSlot]}` : '—',
          'Preferred contact': preferredContactMethod,
          'SMS updates OK': optInSms ? 'yes' : 'no',
          'Marketing emails OK': optInMarketingEmail ? 'yes' : 'no',
          'Calculator estimate': estimate,
          'Site language': language,
        }),
      });
      const data = await res.json().catch(() => null);
      return res.ok && data?.success === true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(false);

    const selectedServiceObj = HANDYMAN_SERVICES.find(s => s.id === serviceId);
    const serviceTitle = selectedServiceObj
      ? language === 'ru'
        ? selectedServiceObj.titleRu
        : selectedServiceObj.titleEn
      : 'General Handyman Request';

    const sent = await sendRequestEmail(selectedServiceObj?.titleEn ?? 'General Handyman Request');
    if (!sent) {
      setIsSubmitting(false);
      setSubmitError(true);
      return;
    }

    // Keep a copy in the in-browser CRM preview
    const newLead = createLead({
      source: currentQuote ? 'website_calculator' : 'website_form',
      firstName: firstName.trim(),
      lastName: lastName.trim() || undefined,
      phone: phone.trim(),
      email: email.trim() || undefined,
      zip: zip.trim(),
      streetAddress: streetAddress.trim() || undefined,
      serviceId,
      serviceTitle,
      description: description.trim(),
      calculatedQuote: currentQuote || undefined,
      estimatedPrice: currentQuote?.total ?? null,
      agreedPrice: null,
      requestedDate: requestedDate || undefined,
      requestedTimeSlot: requestedDate ? requestedTimeSlot : undefined,
      isDateConfirmed: false,
      preferredContactMethod,
      optInSms,
      optInMarketingEmail,
      photos: [],
      status: 'new',
      ownerNotes: currentQuote
        ? 'Calculator estimate transferred with order submission.'
        : 'Direct web lead request.',
    });

    setIsSubmitting(false);
    setSubmittedLeadId(newLead.id);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#0d0d0d] border-b border-[#c9a24b]/20 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#141414] text-[#c9a24b] border border-[#c9a24b]/30 text-xs font-bold uppercase tracking-widest mb-4">
            <Send className="w-3.5 h-3.5 text-[#c9a24b]" />
            <span>{t.contactSection.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4 font-editorial">
            {t.contactSection.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a24b] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
            {t.contactSection.subtitle}
          </p>

          {/* Active estimate pill if transferred */}
          {currentQuote && (
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414] border border-[#c9a24b]/50 text-xs font-bold text-[#c9a24b] shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a24b]" />
              <span>Attached Calculator Estimate: ${currentQuote.total}</span>
            </div>
          )}
        </div>

        {/* Form Container */}
        <div className="dark-card rounded-3xl p-6 sm:p-10 border border-[#c9a24b]/30 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1 Short Form Section */}
            <div>
              <div className="border-b border-white/10 pb-3 mb-5">
                <h3 className="font-normal text-white text-lg sm:text-xl font-editorial">
                  {t.contactSection.shortFormHeader}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {t.contactSection.firstName}
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="e.g. Alex"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-[#121212] text-white focus:outline-hidden focus:ring-2 focus:ring-[#c9a24b] font-medium ${
                      formErrors.firstName ? 'border-rose-400 bg-rose-950/20' : 'border-white/15 focus:border-[#c9a24b]'
                    }`}
                  />
                  {formErrors.firstName && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.firstName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {t.contactSection.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="(919) 264-6101"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-[#121212] text-white focus:outline-hidden focus:ring-2 focus:ring-[#c9a24b] font-medium ${
                      formErrors.phone ? 'border-rose-400 bg-rose-950/20' : 'border-white/15 focus:border-[#c9a24b]'
                    }`}
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {t.contactSection.zip}
                  </label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={e => setZip(e.target.value.slice(0, 5))}
                    placeholder="27601"
                    maxLength={5}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-[#121212] text-white focus:outline-hidden focus:ring-2 focus:ring-[#c9a24b] font-medium ${
                      formErrors.zip ? 'border-rose-400 bg-rose-950/20' : 'border-white/15 focus:border-[#c9a24b]'
                    }`}
                  />
                  {formErrors.zip && (
                    <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.zip}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {t.contactSection.serviceType}
                  </label>
                  <select
                    value={serviceId}
                    onChange={e => setServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/15 bg-[#121212] focus:outline-hidden focus:ring-2 focus:ring-[#c9a24b] font-medium text-white"
                  >
                    {HANDYMAN_SERVICES.map(s => (
                      <option key={s.id} value={s.id}>
                        {language === 'ru' ? s.titleRu : s.titleEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    {t.contactSection.description}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder={t.contactSection.descriptionPlaceholder}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-white/15 bg-[#121212] focus:outline-hidden focus:ring-2 focus:ring-[#c9a24b] font-medium text-white resize-y placeholder-neutral-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 Additional Details Toggle */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowExtendedFields(!showExtendedFields)}
                className="w-full py-3 px-4 bg-[#141414] hover:bg-[#1a1a1a] rounded-xl border border-[#c9a24b]/30 flex items-center justify-between text-xs font-bold text-neutral-200 transition-colors cursor-pointer"
              >
                <span>{t.contactSection.expandedFormHeader}</span>
                {showExtendedFields ? <ChevronUp className="w-4 h-4 text-[#c9a24b]" /> : <ChevronDown className="w-4 h-4 text-[#c9a24b]" />}
              </button>

              {showExtendedFields && (
                <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-[#0e0e0e] border border-[#c9a24b]/20 space-y-4 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                        {t.contactSection.lastName}
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="e.g. Miller"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-white/10 bg-[#141414] text-white font-medium focus:border-[#c9a24b] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                        {t.contactSection.email}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-white/10 bg-[#141414] text-white font-medium focus:border-[#c9a24b] focus:outline-hidden"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                        {t.contactSection.address}
                      </label>
                      <input
                        type="text"
                        value={streetAddress}
                        onChange={e => setStreetAddress(e.target.value)}
                        placeholder="123 Main St, Apt 4"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-white/10 bg-[#141414] text-white font-medium focus:border-[#c9a24b] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Scheduling Request */}
                  <div className="p-4 bg-[#141414] rounded-xl border border-white/10 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#c9a24b]" />
                          <span>{t.contactSection.preferredDate}</span>
                        </label>
                        <input
                          type="date"
                          value={requestedDate}
                          onChange={e => setRequestedDate(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-white/10 bg-[#121212] text-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#c9a24b]" />
                          <span>{t.contactSection.preferredTime}</span>
                        </label>
                        <select
                          value={requestedTimeSlot}
                          onChange={e => setRequestedTimeSlot(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-white/10 bg-[#121212] text-white font-medium"
                        >
                          <option value="morning">{t.contactSection.timeMorning}</option>
                          <option value="afternoon">{t.contactSection.timeAfternoon}</option>
                          <option value="evening">{t.contactSection.timeEvening}</option>
                        </select>
                      </div>
                    </div>

                    {/* Explicit Date Disclaimer */}
                    <p className="text-[11px] text-[#e4be65] bg-[#1a1712] p-2.5 rounded-lg font-light border border-[#c9a24b]/20">
                      {t.contactSection.dateDisclaimer}
                    </p>
                  </div>

                  {/* Preferred contact method */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-2">
                      {t.contactSection.contactMethod}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'sms', label: t.contactSection.methodSms },
                        { id: 'phone', label: t.contactSection.methodPhone },
                        { id: 'email', label: t.contactSection.methodEmail },
                      ].map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPreferredContactMethod(m.id as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            preferredContactMethod === m.id
                              ? 'bg-[#c9a24b] text-black border-[#c9a24b] shadow-sm'
                              : 'bg-[#141414] text-neutral-300 border-white/10 hover:border-[#c9a24b]/40'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photos go via WhatsApp (the email service doesn't carry attachments) */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 mb-1">
                      {t.contactSection.photosLabel}
                    </label>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        language === 'ru'
                          ? 'Здравствуйте! Отправляю фото к заявке с сайта.'
                          : 'Hi IBA! Sending photos for my website request.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-dashed border-[#c9a24b]/30 rounded-xl p-4 bg-[#141414] hover:bg-[#181818] transition-colors flex flex-col items-center gap-1.5 text-xs text-neutral-300 font-medium text-center"
                    >
                      <Camera className="w-5 h-5 text-[#c9a24b]" />
                      <span>{t.contactSection.photosUploadHint}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Separate Unchecked Optional Marketing Consents */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-400 select-none font-light">
                <input
                  type="checkbox"
                  checked={optInSms}
                  onChange={e => setOptInSms(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 text-[#c9a24b] focus:ring-[#c9a24b] accent-[#c9a24b]"
                />
                <span>{t.contactSection.smsConsent}</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-400 select-none font-light">
                <input
                  type="checkbox"
                  checked={optInMarketingEmail}
                  onChange={e => setOptInMarketingEmail(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 text-[#c9a24b] focus:ring-[#c9a24b] accent-[#c9a24b]"
                />
                <span>{t.contactSection.emailConsent}</span>
              </label>
            </div>

            {/* Submit Button: «Записаться» / «Submit Booking Request» */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4.5 bg-[#c9a24b] hover:bg-[#d8b359] text-black font-black uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-[0_0_25px_rgba(201,162,75,0.4)] hover:shadow-[0_0_35px_rgba(201,162,75,0.6)] transition-all flex items-center justify-center gap-2 group active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
              <span>
                {isSubmitting
                  ? t.contactSection.submitting
                  : language === 'ru'
                  ? 'Записаться на удобную дату'
                  : 'Submit Booking Request'}
              </span>
            </button>

            {submitError && (
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>
                  {language === 'ru' ? 'Не удалось отправить заявку. Позвоните нам по ' : "Sorry, we couldn't send your request. Please call us at "}
                  <a href={t.phoneHref} className="font-bold underline">{t.phoneDisplay}</a>
                  {language === 'ru' ? ' или напишите в ' : ' or message us on '}
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-bold underline">WhatsApp</a>.
                </span>
              </div>
            )}
          </form>
        </div>

        {/* Social profiles */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-neutral-400">
          <span>
            {language === 'ru'
              ? 'Смотрите наши работы и отзывы в соцсетях:'
              : 'See our latest work and reviews on social media:'}
          </span>
          <SocialLinks />
        </div>

        {/* Submitted confirmation */}
        {submittedLeadId && (
          <div className="mt-8 p-6 sm:p-7 rounded-3xl bg-[#141414] text-white border border-[#c9a24b]/60 shadow-[0_0_30px_rgba(201,162,75,0.2)] animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#c9a24b] flex items-center justify-center text-black shrink-0 shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-2 flex-1">
                <h4 className="text-xl font-normal text-white font-editorial">
                  {t.contactSection.successModalTitle}
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  {t.contactSection.successModalMsg}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() => setSubmittedLeadId(null)}
                    className="px-4 py-2.5 text-xs text-neutral-400 hover:text-white font-medium cursor-pointer"
                  >
                    {t.contactSection.closeBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
