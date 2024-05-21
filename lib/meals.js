import sql from 'better-sqlite3'
import { resol } from 'path';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resol) => setTimeout(resol, 2000));

    // throw new Error('Loading Meals Failed');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);    //Video Number 113
}