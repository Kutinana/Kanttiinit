import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../public/data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export async function fetchStaticData() {
  console.log('Fetching Kanttiinit static API data for offline / GitHub Pages fallback...');

  try {
    // 1. Areas
    const areasRes = await fetch('https://kitchen.kanttiinit.fi/areas?idsOnly=1&lang=fi');
    const areas = await areasRes.json();
    fs.writeFileSync(path.join(DATA_DIR, 'areas.json'), JSON.stringify(areas, null, 2));
    console.log(`Saved ${areas.length} areas.`);

    const allRestaurantIds = Array.from(new Set(areas.flatMap(a => a.restaurants)));
    console.log(`Discovered ${allRestaurantIds.length} restaurants across areas.`);

    // 2. Updates
    const updatesRes = await fetch('https://kitchen.kanttiinit.fi/updates');
    const updates = await updatesRes.json();
    fs.writeFileSync(path.join(DATA_DIR, 'updates.json'), JSON.stringify(updates, null, 2));
    console.log(`Saved ${updates.length} updates.`);

    // 3. Favorites (FI & EN)
    const [favFiRes, favEnRes] = await Promise.all([
      fetch('https://kitchen.kanttiinit.fi/favorites?lang=fi'),
      fetch('https://kitchen.kanttiinit.fi/favorites?lang=en'),
    ]);
    const favFi = await favFiRes.json();
    const favEn = await favEnRes.json();
    fs.writeFileSync(path.join(DATA_DIR, 'favorites.json'), JSON.stringify(favFi, null, 2));
    fs.writeFileSync(path.join(DATA_DIR, 'favorites-en.json'), JSON.stringify(favEn, null, 2));
    console.log(`Saved ${favFi.length} favorites.`);

    // 4. Restaurants (full details)
    const restRes = await fetch(
      `https://kitchen.kanttiinit.fi/restaurants?lang=fi&ids=${allRestaurantIds.join(
        ',',
      )}&priceCategories=student,studentPremium,regular`,
    );
    const restaurants = await restRes.json();
    fs.writeFileSync(path.join(DATA_DIR, 'restaurants.json'), JSON.stringify(restaurants, null, 2));
    console.log(`Saved ${restaurants.length} restaurant profiles.`);

    // 5. Menus for next 10 days
    const days = [];
    for (let i = 0; i < 10; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d.toISOString().slice(0, 10));
    }

    const menuRes = await fetch(
      `https://kitchen.kanttiinit.fi/menus?lang=fi&restaurants=${allRestaurantIds.join(
        ',',
      )}&days=${days.join(',')}`,
    );
    const menus = await menuRes.json();
    fs.writeFileSync(path.join(DATA_DIR, 'menus.json'), JSON.stringify(menus, null, 2));
    console.log(`Saved menus for ${Object.keys(menus).length} restaurants.`);

    console.log('Static API data successfully written to public/data/');
  } catch (err) {
    console.warn('Warning: Failed to fetch fresh static data from kitchen.kanttiinit.fi:', err.message);
    if (fs.existsSync(path.join(DATA_DIR, 'areas.json'))) {
      console.log('Using existing cached static files in public/data/');
    } else {
      throw err;
    }
  }
}

// Execute if run directly
if (process.argv[1] === __filename) {
  fetchStaticData().catch(err => {
    console.error('Error fetching static data:', err);
    process.exit(1);
  });
}
