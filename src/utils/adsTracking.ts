import { GOOGLE_ADS } from '../config/pricingConfig';

/**
 * Google Ads conversion tracking (gtag.js). Does nothing until GOOGLE_ADS.id is set.
 * - trackLead(): call after a lead form was sent successfully (quiz, contact form, "Text me back").
 * - Phone link clicks (tel:) are tracked automatically when GOOGLE_ADS.callLabel is set.
 */

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const enabled = () => Boolean(GOOGLE_ADS.id);

const sendConversion = (label: string) => {
  if (!enabled() || !label || !window.gtag) return;
  window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS.id}/${label}` });
};

export const trackLead = () => sendConversion(GOOGLE_ADS.leadLabel);

export const initAdsTracking = () => {
  if (!enabled() || window.gtag) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS.id}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ADS.id);

  if (GOOGLE_ADS.callLabel) {
    document.addEventListener('click', e => {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (link) sendConversion(GOOGLE_ADS.callLabel);
    });
  }
};
