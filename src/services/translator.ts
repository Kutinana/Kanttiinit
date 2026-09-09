import pretranslatedData from '../data/translations-zh.json';
import type { CourseType } from '../types';

const STORAGE_KEY = 'kanttiinit_translations_zh_v2';
const MAX_CACHE_SIZE = 2000;

// Curated dictionary for Finnish cafeteria categories
export const categoryTranslationsZh: Record<string, string> = {
  Kasvislounas: '素食午餐',
  Lounas: '经典午餐',
  'Lounas 1': '午餐 1',
  'Lounas 2': '午餐 2',
  'Lounas I': '午餐 I',
  'Lounas  II': '午餐 II',
  Lounasannos: '午餐套餐',
  'Wicked Rabbit Buffet 11-13.30': 'Wicked Rabbit 自助 (11:00-13:30)',
  'Wicked rabbit buffet 11-13.30': 'Wicked Rabbit 自助 (11:00-13:30)',
  'Chef´s Kitchen': '主厨厨房 (Chef’s Kitchen)',
  "Chef's Kitchen": '主厨厨房 (Chef’s Kitchen)',
  Pizzat: '现烤披萨 (Pizzat)',
  'Pizzaa tarjolla klo': '披萨供应时间',
  Pizzaperjantai: '周五披萨特惠',
  'Vegaaninen kasvislounas': '纯素午餐',
  'Vegaaninen Kasvislounas': '纯素午餐',
  'Vegaaninen lounas': '纯素午餐',
  'Vegaaninen kasviskeitto': '纯素蔬菜汤',
  'Vegaaninen keittolounas': '纯素热汤午餐',
  Keittolounas: '每日热汤',
  Kasviskeitto: '蔬菜热汤',
  Erikoisannos: '特色特选套餐',
  Erikoislounas: '特选午餐',
  'Special dish (Silinteri, Alvari)': '特色特选套餐 (Silinteri/Alvari)',
  Jälkiruoka: '餐后甜点',
  'Grillistä Klo 11.00-14.00': '铁板炙烤 (11:00-14:00)',
  'Grillistä  Klo 11.00-14.00': '铁板炙烤 (11:00-14:00)',
  Aamupala: '元气早餐',
  Salaattibuffet: '沙拉自助',
  'Täffän leike': 'Täffä 经典肉排',
  'Cafe Civis': 'Civis 咖啡厅',
  'TIEDOTE Muuttunut lounasaika': '公告：午餐时间变动',
};

// Curated subtag translations (dietary tags inside dishes)
export const subTagTranslationsZh: Record<string, string> = {
  VEGAN: '纯素',
  'VEGAN Bowl': '纯素暖碗',
  VEG: '素食',
  GL: '无麸质',
  L: '无乳糖',
  M: '无奶',
  G: '无麸质',
};

// High-accuracy curated food overrides
const curatedDishOverrides: Record<string, string> = {
  Puolukkahilloa: '越橘果酱',
  Pinaattiohukaisia: '菠菜小薄饼',
  'Pinaattiohukaisia 8 kpl': '菠菜小薄饼 (8个)',
  'Paahdettua perunaa': '烤土豆',
  'Kana Vindaloo': '文达卢咖喱鸡',
  'Tummaa riisiä': '黑米/糙米饭',
  'Mausteista kasvislientä': '风味蔬菜汤底',
  'Aasialaisittain marinoitua nyhtökauraa': '亚式腌制手撕燕麦',
  'Chilillä maustettua hernesuikaletta': '辣椒风味豌豆蛋白条',
  'Pepperonipizza, sipulia ja paprikaa': '意大利辣香肠披萨（配洋葱与彩椒）',
  'Feta-päärynäpizza ja cashewpähkinää': '羊乳酪梨披萨（配腰果）',
  'The Bloc hampurilainen ja ranskalaiset perunat A': 'The Bloc 汉堡配薯条',
  // Tietotekniikantalo curated dishes
  'Juures-PapuPyttipannu klo 10.30-18.00':
    '根茎蔬菜豆类炒杂烩 (10:30-18:00)',
  'Paneroitu Porsaanleike (1kpl), ChiliMajoneesia & Paahdettuja Perunoita 10.30-14.00':
    '香脆炸猪排 (1块) 配辣椒蛋黄酱与烤土豆 (10:30-14:00)',
  'Mausteinen KinkkuKiusaus klo 10.30-18.00':
    '风味火腿烤土豆焗煲 (10:30-18:00)',
  'Täytetyt Subit Opiskelijahinnoin, Subway Otaniemi klo 10.30 - 19.00':
    'Subway 奥塔涅米店学生特惠潜水艇三明治 (10:30-19:00)',
  'Mausteinen Broileri/ ja nautaKiusaus klo 14.00/18.00':
    '风味鸡肉与牛肉烤土豆焗煲 (14:00-18:00)',
  'Vegaanista KasvisLasagnea klo 10.30-18.00':
    '纯素蔬菜千层面 (10:30-18:00)',
  'Uunimakkaraa Juustokuorrutteella (1kpl) & Perunaa 10.30-18.00':
    '芝士焗烤香肠 (1根) 配土豆 (10:30-18:00)',
  'SalviaKalkkunaPataa & Riisiä klo 10.30-18.00':
    '鼠尾草火鸡肉炖煲配米饭 (10:30-18:00)',
  'Hernekeittoa, Pannukakku (1kpl), Hilloa & Kermavaahtoa klo 10.30 - 14.00':
    '传统芬兰豌豆汤、厚烤松饼 (1块) 配果酱及鲜奶油 (10:30-14:00)',
  'Kasvishernekeittoa, Pannukakku (1kpl), Hilloa & Kermavaahtoa klo 10.30 - 14.00':
    '蔬菜素豌豆汤、厚烤松饼 (1块) 配果酱及鲜奶油 (10:30-14:00)',
  'Pannukakku (1kpl), Hilloa & Kermavaahtoa klo 10.30 - 14.00':
    '厚烤松饼 (1块) 配果酱及鲜奶油 (10:30-14:00)',
  'Chili-Suklaa-MustapapuPata, Riisiä, Kermaviilikastiketta HUOM! klo 10.30-15.00':
    '辣椒黑巧黑豆炖菜配米饭及酸奶油酱 (注意! 10:30-15:00)',
  'Paneroidut Kalapuikot (5kpl) TilliKermaviilikastiketta, Perunaa HUOM! klo 10.30-15.00':
    '香酥鱼柳棒 (5条) 配莳萝酸奶油酱与土豆 (注意! 10:30-15:00)',
  'Omenapiirakkaa & Kanelikermavaahtoa HUOM! klo 10.30-15.00':
    '苹果派配肉桂鲜奶油 (注意! 10:30-15:00)',
  'Täytetyt Subit Opiskelijahinnoin, Subway Otaniemi HUOM! klo 10.30 - 17.00 ':
    'Subway 奥塔涅米店学生特惠潜水艇三明治 (注意! 10:30-17:00)',
};

// In-memory translation caches
const dishMemoryCache = new Map<string, string>();
const categoryMemoryCache = new Map<string, string>();

// Initialize caches with bundled pretranslated data and localStorage
function initCaches() {
  // 1. Load pretranslated data
  if (pretranslatedData?.categories) {
    for (const [k, v] of Object.entries(pretranslatedData.categories)) {
      categoryMemoryCache.set(k, v);
    }
  }
  if (pretranslatedData?.dishes) {
    for (const [k, v] of Object.entries(pretranslatedData.dishes)) {
      dishMemoryCache.set(k, v);
    }
  }

  // 2. Apply curated overrides
  for (const [k, v] of Object.entries(categoryTranslationsZh)) {
    categoryMemoryCache.set(k, v);
  }
  for (const [k, v] of Object.entries(curatedDishOverrides)) {
    dishMemoryCache.set(k, v);
  }

  // 3. Load user's local overrides/new items from localStorage
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.dishes) {
        for (const [k, v] of Object.entries(parsed.dishes)) {
          dishMemoryCache.set(k, v as string);
        }
      }
      if (parsed.categories) {
        for (const [k, v] of Object.entries(parsed.categories)) {
          categoryMemoryCache.set(k, v as string);
        }
      }
    }
  } catch (e) {
    console.warn('Failed to load localStorage translations cache', e);
  }
}

initCaches();

let saveTimeout: ReturnType<typeof setTimeout> | null = null;
function persistCache() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      const dishEntries = Array.from(dishMemoryCache.entries()).slice(
        -MAX_CACHE_SIZE,
      );
      const catEntries = Array.from(categoryMemoryCache.entries()).slice(-100);
      const data = {
        dishes: Object.fromEntries(dishEntries),
        categories: Object.fromEntries(catEntries),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to persist translations to localStorage', e);
    }
  }, 1000);
}

/**
 * Parses course title into smaller translation units: category, subTag, and dish
 */
export function parseCourseTitle(rawTitle: string): {
  category: string;
  subTag: string;
  dish: string;
  rawTitle: string;
} {
  let category = '';
  let dish = rawTitle.trim();

  // Match: "Category : Dish" or "Category: Dish"
  // Do NOT match time patterns like "klo 10.30" or numbers with colons
  const match = rawTitle.match(/^([^:：]+?)[:：]\s+(.+)$/);
  if (match) {
    const candidate = match[1].trim();
    if (
      categoryTranslationsZh[candidate] ||
      (!candidate.toLowerCase().startsWith('klo') &&
        !candidate.toLowerCase().startsWith('huom') &&
        !/^\d+[:.]\d+/.test(candidate))
    ) {
      category = candidate;
      dish = match[2].trim();
    }
  }

  let subTag = '';
  const subMatch = dish.match(/^(VEG|VEGAN|VEGAN Bowl|GL|L|M|G)[:：]\s*(.+)$/i);
  if (subMatch) {
    subTag = subMatch[1].trim();
    dish = subMatch[2].trim();
  }

  return { category, subTag, dish, rawTitle };
}

/**
 * Single text translation via Google Translate free API
 */
export async function translateText(
  text: string,
  targetLang = 'zh-CN',
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return text;

  if (dishMemoryCache.has(trimmed)) {
    return dishMemoryCache.get(trimmed)!;
  }
  if (categoryMemoryCache.has(trimmed)) {
    return categoryMemoryCache.get(trimmed)!;
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
    trimmed,
  )}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translated = (data[0] as unknown[][])
        .map(seg => (typeof seg?.[0] === 'string' ? seg[0] : ''))
        .join('')
        .trim();

      if (translated) {
        dishMemoryCache.set(trimmed, translated);
        persistCache();
        return translated;
      }
    }
  } catch (err) {
    console.warn(`Translation failed for "${text}":`, err);
  }

  return text;
}

/**
 * Batch translate multiple smaller units
 */
export async function translateTexts(
  texts: string[],
  targetLang = 'zh-CN',
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  const toFetch: string[] = [];

  for (const text of texts) {
    const trimmed = text.trim();
    if (!trimmed) {
      result.set(text, text);
      continue;
    }
    if (dishMemoryCache.has(trimmed)) {
      result.set(trimmed, dishMemoryCache.get(trimmed)!);
    } else if (categoryMemoryCache.has(trimmed)) {
      result.set(trimmed, categoryMemoryCache.get(trimmed)!);
    } else if (!toFetch.includes(trimmed)) {
      toFetch.push(trimmed);
    }
  }

  if (toFetch.length === 0) {
    return result;
  }

  const CHUNK_SIZE = 15;
  for (let i = 0; i < toFetch.length; i += CHUNK_SIZE) {
    const chunk = toFetch.slice(i, i + CHUNK_SIZE);
    const joined = chunk.join('\n');
    const url = `https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      joined,
    )}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const full = (data[0] as unknown[][])
          .map(seg => (typeof seg?.[0] === 'string' ? seg[0] : ''))
          .join('');

        const lines = full.split('\n');
        if (lines.length === chunk.length) {
          for (let j = 0; j < chunk.length; j++) {
            const original = chunk[j];
            const trans = lines[j].trim() || original;
            dishMemoryCache.set(original, trans);
            result.set(original, trans);
          }
          continue;
        }
      }

      // Fallback: individual queries
      await Promise.all(
        chunk.map(async item => {
          const t = await translateText(item, targetLang);
          result.set(item, t);
        }),
      );
    } catch {
      await Promise.all(
        chunk.map(async item => {
          try {
            const t = await translateText(item, targetLang);
            result.set(item, t);
          } catch {
            result.set(item, item);
          }
        }),
      );
    }
  }

  persistCache();
  return result;
}

/**
 * Translates a list of CourseType objects with high-fidelity unit slicing
 */
export async function translateCourses(
  courses: CourseType[],
  targetLang = 'zh-CN',
): Promise<CourseType[]> {
  if (!courses.length) return [];

  // 1. Parse all courses into fine-grained units
  const parsedList = courses.map(c => ({
    course: c,
    parsed: parseCourseTitle(c.title),
  }));

  // 2. Identify missing units to fetch in batch
  const missingUnits: string[] = [];
  for (const { parsed } of parsedList) {
    if (
      parsed.category &&
      !categoryMemoryCache.has(parsed.category) &&
      !categoryTranslationsZh[parsed.category] &&
      !missingUnits.includes(parsed.category)
    ) {
      missingUnits.push(parsed.category);
    }

    if (
      parsed.dish &&
      !dishMemoryCache.has(parsed.dish) &&
      !curatedDishOverrides[parsed.dish] &&
      !missingUnits.includes(parsed.dish)
    ) {
      missingUnits.push(parsed.dish);
    }
  }

  // 3. Batch translate any missing units via Google Translate free API
  if (missingUnits.length > 0) {
    await translateTexts(missingUnits, targetLang);
  }

  // 4. Assemble localized CourseType objects with separated category and dish units
  return parsedList.map(({ course, parsed }) => {
    const transCategory =
      categoryMemoryCache.get(parsed.category) ||
      categoryTranslationsZh[parsed.category] ||
      parsed.category;

    const transDish =
      dishMemoryCache.get(parsed.dish) ||
      curatedDishOverrides[parsed.dish] ||
      parsed.dish;

    const transSubTag = subTagTranslationsZh[parsed.subTag] || parsed.subTag;

    let displayTitle = transDish;
    if (transSubTag) {
      displayTitle = `[${transSubTag}] ${displayTitle}`;
    }

    let origTitle = parsed.dish;
    if (parsed.subTag) {
      origTitle = `[${parsed.subTag}] ${origTitle}`;
    }

    return {
      ...course,
      category: parsed.category ? transCategory || parsed.category : '',
      originalCategory: parsed.category || '',
      title: displayTitle,
      originalTitle: origTitle,
    };
  });
}
