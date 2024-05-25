import fs from 'node:fs'
import sql from 'better-sqlite3'
import { resol } from 'path';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resol) => setTimeout(resol, 2000));

    // throw new Error('Loading Meals Failed');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);    //Video Number 113
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title,{lower: true});
    meal.instruction = xss(meal.instruction);
    
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error){
            throw new Error('Saving Image Failed!');
        }
    });
    meal.image = `/images/${fileName}`

    db.prepare(`
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
    )
    `).run(meal);
}