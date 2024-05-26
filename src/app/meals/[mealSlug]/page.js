import Link from "next/link"
import classes from './page.module.css'
import Image from "next/image"
import { getMeal } from "../../../../lib/meals"
import { notFound } from "next/navigation"
import { title } from "node:process"

export async function generateMetadata ({params}) {
    const meal = await getMeal(params.mealSlug);
    if(!meal){
        notFound();         //Closet not found page will be shown
    }
    return{
        title: meal.title,
        description: meal.summary
    };
  };

export default function page({params}) {
    const meal =  getMeal(params.mealSlug)

    if(!meal){
        notFound();         //Closet not found page will be shown
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={`https://kaushik-nextjs-demo-users-image.s3.eu-north-1.amazonaws.com/${meal.image}`} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creater}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main>
                {/*  Video Number 113 */}
                <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions, }}>  
                </p>
            </main>
        </>
    )
}