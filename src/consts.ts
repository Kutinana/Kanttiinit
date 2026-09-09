declare const IS_PRODUCTION: boolean;
declare const API_BASE: string;
declare const VERSION: string;
declare const PUBLIC_ASSET_PATH: string;

export const isProduction = import.meta.env.PROD;

export const getApiBase = (): string => {
  if (typeof window !== 'undefined') {
    // 1. Check custom proxy configured by user in localStorage or window
    const customProxy =
      localStorage.getItem('apiProxy') ||
      (window as any).KANTTIINIT_API_PROXY;
    if (customProxy) return customProxy.replace(/\/$/, '');

    // 2. Vercel deployment: use Vercel reverse proxy rewrite
    if (window.location.hostname.endsWith('vercel.app')) {
      return '/api/kitchen';
    }

    // 3. Localhost development: use /api/kitchen if proxied, or direct
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      return '/api/kitchen';
    }

    // 4. GitHub Pages (or third-party host):
    // Since kitchen.kanttiinit.fi blocks CORS from third-party origins,
    // return '' to directly trigger static pre-translated fallback
    if (window.location.hostname.endsWith('github.io')) {
      return '';
    }
  }

  return typeof API_BASE !== 'undefined'
    ? API_BASE
    : 'https://kitchen.kanttiinit.fi';
};

export const apiBase = getApiBase();
export const version = VERSION;
export const publicAssetPath = PUBLIC_ASSET_PATH;
