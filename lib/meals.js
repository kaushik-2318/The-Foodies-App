import fs from 'node:fs'
import sql from 'better-sqlite3'
import { resol } from 'path';
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
    region: 'us-east-1'
  });

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

    const bufferedImage = await meal.image.arrayBuffer();

    s3.putObject({
        Bucket: 'kaushik-nextjs-demo-users-image',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
      });
    meal.image = fileName;

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