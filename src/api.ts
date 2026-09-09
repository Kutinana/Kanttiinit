import { format } from 'date-fns';
import http from './http';
import { translateCourses } from './services/translator';

import {
  type AreaType,
  type CourseType,
  type FavoriteType,
  Lang,
  type MenuType,
  PriceCategory,
  type RestaurantType,
  type Update,
} from './types';

const coursesCache = new Map<string, CourseType[]>();

const coursesCacheKey = (
  restaurantId: number | string,
  dateStr: string,
  lang: string,
) => `${restaurantId}-${dateStr}-${lang}`;

export const getCourses = async (
  restaurantId: number,
  day: Date,
  lang: Lang,
): Promise<CourseType[]> => {
  const dateStr = format(day, 'y-MM-dd');
  const key = coursesCacheKey(restaurantId, dateStr, lang);
  if (coursesCache.has(key)) {
    return coursesCache.get(key) as CourseType[];
  }
  const apiLang = lang === Lang.ZH ? Lang.FI : lang;
  const restaurant = await http.get(
    `/restaurants/${restaurantId}/menu?day=${dateStr}&lang=${apiLang}`,
  );
  let courses: CourseType[] = restaurant.menus.length
    ? restaurant.menus[0].courses
    : [];

  if (lang === Lang.ZH && courses.length) {
    courses = await translateCourses(courses, 'zh-CN');
  }

  coursesCache.set(key, courses);
  return courses;
};

export const getMenus = async (
  restaurantIds: number[],
  days: Date[],
  lang: string,
): Promise<MenuType> => {
  const apiLang = lang === Lang.ZH ? Lang.FI : lang;
  const result: MenuType = await http.get(
    `/menus?lang=${apiLang}&restaurants=${restaurantIds.join(
      ',',
    )}&days=${days.map(day => format(day, 'y-MM-dd')).join(',')}`,
  );

  if (lang === Lang.ZH) {
    for (const [restaurantId, dates] of Object.entries(result)) {
      for (const [dateStr, courses] of Object.entries(dates)) {
        if (courses && courses.length) {
          result[restaurantId][dateStr] = await translateCourses(
            courses,
            'zh-CN',
          );
        }
      }
    }
  }

  for (const [restaurantId, dates] of Object.entries(result)) {
    for (const [dateStr, courses] of Object.entries(dates)) {
      coursesCache.set(coursesCacheKey(restaurantId, dateStr, lang), courses);
    }
  }
  return result;
};

export const sendFeedback = (message: string, email: string) =>
  fetch('https://kitchen.kanttiinit.fi/contact', {
    body: JSON.stringify({
      message,
      email,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

export const getUpdates = (): Promise<Update[]> => {
  return http.get('/updates');
};

const areaTranslationsZh: Record<string, string> = {
  Otaniemi: '奥塔涅米 (Otaniemi)',
  'Helsingin keskusta': '赫尔辛基市中心 (Helsinki Centre)',
  Töölö: '蝶略 (Töölö)',
  Kallio: '卡利奥 (Kallio)',
  'Arabia & Kumpula': '阿拉伯与昆普拉 (Arabia & Kumpula)',
  Viikki: '维基 (Viikki)',
  Meilahti: '梅拉赫蒂 (Meilahti)',
  Vantaa: '万塔 (Vantaa)',
  'Itä-Helsinki': '东赫尔辛基 (Itä-Helsinki)',
  Pasila: '帕西拉 (Pasila)',
};

export const getAreas = async (lang: Lang): Promise<AreaType[]> => {
  const apiLang = lang === Lang.ZH ? Lang.FI : lang;
  const areas: AreaType[] = await http.get(`/areas?idsOnly=1&lang=${apiLang}`);
  if (lang === Lang.ZH) {
    return areas.map(a => ({
      ...a,
      name: areaTranslationsZh[a.name] || a.name,
    }));
  }
  return areas;
};

const favoriteTranslationsZh: Record<string, string> = {
  pizza: '披萨 (pizza)',
  kebab: '烤肉 (kebab)',
  'makaroni casserole': '通心粉牛肉煲 (macaroni casserole)',
  chicken: '鸡肉 (chicken)',
  bolognese: '肉酱面 (bolognese)',
  salad: '沙拉 (salad)',
  'meat balls': '肉丸 (meat balls)',
  hamburger: '汉堡 (hamburger)',
  fish: '鱼肉 (fish)',
  'sausage baked in the oven': '烤香肠 (sausage baked)',
  steak: '牛排/肉排 (steak)',
  vegetarian: '素食 (vegetarian)',
  tofu: '豆腐 (tofu)',
  cutlet: '炸肉排 (cutlet)',
  spaghetti: '意大利面 (spaghetti)',
  salmon: '三文鱼 (salmon)',
  champignon: '双孢蘑菇 (champignon)',
  cheese: '芝士/奶酪 (cheese)',
  soy: '大豆 (soy)',
  bacon: '培根 (bacon)',
  BBQ: '烧烤 (BBQ)',
  grill: '炙烤 (grill)',
  feta: '羊乳酪 (feta)',
  saithe: '绿青鳕 (saithe)',
  'minced meat': '碎牛肉 (minced meat)',
  hash: '炒杂烩 (hash)',
  thai: '泰式风味 (thai)',
  organic: '有机食品 (organic)',
  chili: '辣椒/辣味 (chili)',
  mushroom: '蘑菇 (mushroom)',
  'pea soup': '豌豆汤 (pea soup)',
  indian: '印度风味 (indian)',
  'sweet and sour': '糖醋风味 (sweet and sour)',
  'rainbow trout': '虹鳟鱼 (rainbow trout)',
  soup: '热汤 (soup)',
  chorizo: '西班牙乔里索香肠 (chorizo)',
  halloumi: '哈罗米芝士 (halloumi)',
  chickpea: '鹰嘴豆 (chickpea)',
  quinoa: '藜麦 (quinoa)',
  mexican: '墨西哥风味 (mexican)',
  wok: '中式炒菜/炒锅 (wok)',
  tortillas: '墨西哥薄饼 (tortillas)',
  eggplant: '茄子 (eggplant)',
  'fava bean': '蚕豆 (fava bean)',
  pasta: '意面 (pasta)',
};

export const getFavorites = async (lang: Lang): Promise<FavoriteType[]> => {
  const apiLang = lang === Lang.ZH ? Lang.EN : lang;
  const favs: FavoriteType[] = await http.get(`/favorites?lang=${apiLang}`);
  if (lang === Lang.ZH) {
    return favs.map(f => ({
      ...f,
      name: favoriteTranslationsZh[f.name] || f.name,
    }));
  }
  return favs;
};

export const getRestaurantsByIds = (
  ids: number[],
  lang: Lang,
  maxPriceCategory: PriceCategory = PriceCategory.regular,
): Promise<RestaurantType[]> => {
  const apiLang = lang === Lang.ZH ? Lang.FI : lang;
  const categories = [
    PriceCategory.student,
    PriceCategory.studentPremium,
    PriceCategory.regular,
  ];
  const priceCategories = categories.slice(
    0,
    categories.indexOf(maxPriceCategory) + 1,
  );
  return http.get(
    `/restaurants?lang=${apiLang}&ids=${ids.join(
      ',',
    )}&priceCategories=${priceCategories.join(',')}`,
  );
};

export const getRestaurant = async (id: number, lang: Lang) => {
  const [restaurant] = await getRestaurantsByIds([id], lang);
  return restaurant;
};

export const getRestaurantsByLocation = (
  latitude: number,
  longitude: number,
  lang: Lang,
): Promise<RestaurantType[]> =>
  http.get(
    `/restaurants?lang=${lang === Lang.ZH ? Lang.FI : lang}&location=${latitude},${longitude}`,
  );

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRestaurantChange = (restaurantId: number, change: any) =>
  http.post('/changes', {
    change,
    filter: { id: restaurantId },
    dataType: 'restaurant',
  });

export const getApprovedUpdates = (uuids: string[]) =>
  http.get(`/changes/${uuids.join(',')}`);
