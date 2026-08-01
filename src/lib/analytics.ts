const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const tagManagerId = import.meta.env.VITE_GTM_CONTAINER_ID as string | undefined;

export function initAnalytics() {
  if (tagManagerId && !document.querySelector('script[data-campin-gtm="true"]')) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" } as unknown as unknown[]);
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${tagManagerId}`;
    script.dataset.campinGtm = "true";
    document.head.appendChild(script);
  }

  if (!measurementId || document.querySelector('script[data-campin-ga="true"]')) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.campinGa = "true";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
}

export function trackPageView(path: string) {
  if (measurementId && window.gtag) window.gtag("event", "page_view", { page_path: path });
}

declare global {
  interface Window {
    dataLayer: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}
