import Link from "next/link"
export default function page({params}) {
    return (
        <>
            <h1>{params.someSlug}</h1>
            <p><Link href="/">Home</Link></p>
        </>
    )
}