import { apiBase, publicAssetPath } from './consts';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const staticCache: Record<string, any> = {};

async function fetchStaticJson(filename: string): Promise<any> {
  if (staticCache[filename]) {
    return staticCache[filename];
  }
  const cleanBase = (publicAssetPath || '/').endsWith('/')
    ? publicAssetPath || '/'
    : `${publicAssetPath || '/'}/`;
  const url = `${cleanBase}data/${filename}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load fallback static data: ${url}`);
  }
  const data = await res.json();
  staticCache[filename] = data;
  return data;
}

export async function resolveStaticFallback(url: string): Promise<any> {
  const urlObj = new URL(url, 'http://dummy.com');
  const pathname = urlObj.pathname;

  if (pathname === '/areas') {
    return fetchStaticJson('areas.json');
  }

  if (pathname === '/updates') {
    return fetchStaticJson('updates.json');
  }

  if (pathname === '/favorites') {
    const lang = urlObj.searchParams.get('lang');
    return lang === 'en'
      ? fetchStaticJson('favorites-en.json')
      : fetchStaticJson('favorites.json');
  }

  if (pathname === '/restaurants') {
    const all = await fetchStaticJson('restaurants.json');
    const idsParam = urlObj.searchParams.get('ids');
    if (idsParam) {
      const idSet = new Set(idsParam.split(',').map(Number));
      return all.filter((r: { id: number }) => idSet.has(r.id));
    }
    return all;
  }

  const singleMenuMatch = pathname.match(/^\/restaurants\/(\d+)\/menu/);
  if (singleMenuMatch) {
    const restId = singleMenuMatch[1];
    const day = urlObj.searchParams.get('day');
    const allMenus = await fetchStaticJson('menus.json');
    const courses = (allMenus[restId] && day && allMenus[restId][day]) || [];
    return {
      menus: courses.length ? [{ day, courses }] : [],
    };
  }

  if (pathname === '/menus') {
    const allMenus = await fetchStaticJson('menus.json');
    const restParam = urlObj.searchParams.get('restaurants');
    if (restParam) {
      const idList = restParam.split(',').filter(Boolean);
      const filtered: Record<string, any> = {};
      for (const id of idList) {
        filtered[id] = allMenus[id] || {};
      }
      return filtered;
    }
    return allMenus;
  }

  if (pathname.startsWith('/changes')) {
    return [];
  }

  return {};
}

export default {
  async fetch(method: Method, url: string, body: unknown, authorize: boolean) {
    // If no apiBase is configured (e.g. GitHub Pages without proxy), directly use static fallback for GET requests
    if (!apiBase && method === 'GET') {
      try {
        return await resolveStaticFallback(url);
      } catch (err) {
        console.warn('Static fallback failed for URL:', url, err);
      }
    }

    const options: RequestInit = {
      body: undefined,
      credentials: undefined,
      headers: [],
      method,
    };
    if (authorize) {
      options.credentials = 'include';
    }
    if (body && Array.isArray(options.headers)) {
      options.headers.push(['Content-Type', 'application/json']);
      options.body = JSON.stringify(body);
    }

    const requestUrl = (apiBase || '') + url;

    try {
      const r = await fetch(requestUrl, options);
      if (r.status >= 400) {
        const json = await r.json();
        return Promise.reject(json);
      }
      return await r.json();
    } catch (networkError) {
      // If network request failed (e.g. CORS error on GitHub Pages, offline, or backend down)
      if (method === 'GET') {
        console.info(
          `API request to ${requestUrl} failed, falling back to static data for ${url}:`,
          networkError,
        );
        return await resolveStaticFallback(url);
      }
      throw networkError;
    }
  },
  get(url: string, authorize = false) {
    return this.fetch('GET', url, undefined, authorize);
  },
  post(url: string, data?: unknown) {
    return this.fetch('POST', url, data, true);
  },
  put(url: string, data?: unknown) {
    return this.fetch('PUT', url, data, true);
  },
  delete(url: string, data?: unknown) {
    return this.fetch('DELETE', url, data, true);
  },
};
