import { useRouter } from "next/router";


export default function Item () {
    const router = useRouter()
    const { id } = router.query

    return  <h1> Hello {id}</h1>
}