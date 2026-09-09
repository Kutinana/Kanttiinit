import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SRC_DATA_FILE = path.join(rootDir, 'src', 'data', 'translations-zh.json');
const PUBLIC_DATA_FILE = path.join(rootDir, 'public', 'translations-zh.json');

// Standard category translations in Finnish cafeterias
export const categoryTranslationsZh = {
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

// Subtag translations
export const subTagTranslationsZh = {
  VEGAN: '纯素',
  'VEGAN Bowl': '纯素暖碗',
  VEG: '素食',
  GL: '无麸质',
  L: '无乳糖',
  M: '无奶',
  G: '无麸质',
};

export function parseCourseTitle(rawTitle) {
  let category = '';
  let dish = rawTitle.trim();

  const match = rawTitle.match(/^([^:：]+)[:：]\s*(.+)$/);
  if (match) {
    category = match[1].trim();
    dish = match[2].trim();
  }

  let subTag = '';
  const subMatch = dish.match(/^(VEG|VEGAN|VEGAN Bowl|GL|L|M|G)[:：]\s*(.+)$/i);
  if (subMatch) {
    subTag = subMatch[1].trim();
    dish = subMatch[2].trim();
  }

  return { category, subTag, dish, rawTitle };
}

// Translate batch via Google Translate free API
async function translateBatch(items, targetLang = 'zh-CN') {
  if (!items.length) return new Map();

  const joined = items.join('\n');
  const url = `https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
    joined,
  )}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Google Translate error: ${res.status}`);
  }
  const data = await res.json();
  const result = new Map();

  if (Array.isArray(data) && Array.isArray(data[0])) {
    const full = data[0].map(s => (s && s[0] ? s[0] : '')).join('');
    const lines = full.split('\n');
    if (lines.length === items.length) {
      for (let i = 0; i < items.length; i++) {
        result.set(items[i], lines[i].trim() || items[i]);
      }
      return result;
    }
  }

  // Fallback: individual queries if lines don't align
  for (const item of items) {
    try {
      const singleUrl = `https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        item,
      )}`;
      const sRes = await fetch(singleUrl);
      const sData = await sRes.json();
      if (Array.isArray(sData) && Array.isArray(sData[0])) {
        const trans = sData[0].map(s => (s && s[0] ? s[0] : '')).join('').trim();
        result.set(item, trans || item);
      } else {
        result.set(item, item);
      }
    } catch {
      result.set(item, item);
    }
  }

  return result;
}

async function main() {
  console.log('--- Fetching all areas and restaurant menus from Kanttiinit ---');
  const areasRes = await fetch('https://kitchen.kanttiinit.fi/areas?idsOnly=1&lang=fi');
  const areas = await areasRes.json();
  const allRestaurantIds = Array.from(new Set(areas.flatMap(a => a.restaurants)));
  console.log(`Found ${allRestaurantIds.length} restaurants across ${areas.length} areas.`);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().slice(0, 10));
  }

  console.log(`Fetching menus for dates: ${days[0]} to ${days[days.length - 1]}...`);
  const menuRes = await fetch(
    `https://kitchen.kanttiinit.fi/menus?lang=fi&restaurants=${allRestaurantIds.join(
      ',',
    )}&days=${days.join(',')}`,
  );
  const menuJson = await menuRes.json();

  // Load existing dictionary if available
  let existingDict = { categories: {}, dishes: {} };
  if (fs.existsSync(SRC_DATA_FILE)) {
    try {
      existingDict = JSON.parse(fs.readFileSync(SRC_DATA_FILE, 'utf-8'));
    } catch (e) {
      console.warn('Could not read existing src data file, starting fresh.');
    }
  }

  // Pre-seed standard categories
  existingDict.categories = {
    ...categoryTranslationsZh,
    ...(existingDict.categories || {}),
  };
  existingDict.dishes = existingDict.dishes || {};

  const neededCategories = new Set();
  const neededDishes = new Set();
  let totalCoursesFound = 0;

  for (const dates of Object.values(menuJson)) {
    for (const courses of Object.values(dates)) {
      for (const course of courses) {
        if (!course.title) continue;
        totalCoursesFound++;
        const parsed = parseCourseTitle(course.title);
        if (parsed.category && !existingDict.categories[parsed.category]) {
          neededCategories.add(parsed.category);
        }
        if (parsed.dish && !existingDict.dishes[parsed.dish]) {
          neededDishes.add(parsed.dish);
        }
      }
    }
  }

  console.log(`Found ${totalCoursesFound} courses.`);
  console.log(`Categories needing translation: ${neededCategories.size}`);
  console.log(`Dishes needing translation: ${neededDishes.size}`);

  // Translate missing categories
  if (neededCategories.size > 0) {
    const catList = Array.from(neededCategories);
    console.log(`Translating ${catList.length} categories...`);
    const catTrans = await translateBatch(catList);
    for (const [k, v] of catTrans.entries()) {
      existingDict.categories[k] = v;
    }
  }

  // Translate missing dishes in chunks
  if (neededDishes.size > 0) {
    const dishList = Array.from(neededDishes);
    const CHUNK_SIZE = 15;
    console.log(`Translating ${dishList.length} dishes in batches of ${CHUNK_SIZE}...`);

    for (let i = 0; i < dishList.length; i += CHUNK_SIZE) {
      const chunk = dishList.slice(i, i + CHUNK_SIZE);
      process.stdout.write(`Translating ${i + 1}-${Math.min(i + CHUNK_SIZE, dishList.length)} of ${dishList.length}... `);
      try {
        const batchRes = await translateBatch(chunk);
        for (const [k, v] of batchRes.entries()) {
          existingDict.dishes[k] = v;
        }
        console.log('✓');
      } catch (err) {
        console.log('Error, retrying individual items...');
        for (const item of chunk) {
          try {
            const single = await translateBatch([item]);
            existingDict.dishes[item] = single.get(item) || item;
          } catch {
            existingDict.dishes[item] = item;
          }
        }
      }
      // Small pause to be polite
      await new Promise(r => setTimeout(r, 100));
    }
  }

  // Save to src/data and public
  fs.mkdirSync(path.dirname(SRC_DATA_FILE), { recursive: true });
  fs.mkdirSync(path.dirname(PUBLIC_DATA_FILE), { recursive: true });

  const jsonStr = JSON.stringify(existingDict, null, 2);
  fs.writeFileSync(SRC_DATA_FILE, jsonStr, 'utf-8');
  fs.writeFileSync(PUBLIC_DATA_FILE, jsonStr, 'utf-8');

  console.log('----------------------------------------------------');
  console.log(`✓ Translations saved to:`);
  console.log(`  - ${SRC_DATA_FILE}`);
  console.log(`  - ${PUBLIC_DATA_FILE}`);
  console.log(`Total categories in dictionary: ${Object.keys(existingDict.categories).length}`);
  console.log(`Total dishes in dictionary: ${Object.keys(existingDict.dishes).length}`);
  console.log('Done! All current menus are now pre-translated and persistent.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(err => {
    console.error('Update translations script failed:', err);
    process.exit(1);
  });
}
