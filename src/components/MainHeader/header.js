import Link from "next/link"
import Image from "next/image"
import Logoimg from '../../../assets/logo.png'
import classes from './header.module.css'
import MainHeaderBackground from "./main-header-background"

export default function header() {
    return (
        <>
            <MainHeaderBackground />
            <div className={classes.header}>
                <Link className={classes.logo} href="/" >
                    <Image priority src={Logoimg} alt="A Plate with food on it." />
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <Link href="/meals">Browser Meals</Link>
                        </li>
                        <li>
                            <Link href="/community">Foodies Community</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}