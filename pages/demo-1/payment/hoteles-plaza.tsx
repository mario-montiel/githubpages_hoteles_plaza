// React
import router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { endpoint } from "../../../config/endpoint"

// CSS
import styles from "../../../styles/Payment.module.css"
import { Booking } from "../../../types/Booking"

// Componets

// Libraries

// Helpers

// Types

const HotelesPlazaPayment = () => {

    // Variables
    const router = useRouter()

    // Use State
    const [data, setData] = useState<Booking>()

    // Functions
    const redirectTo = (url: string) => { router.push(url) }

    useEffect(() => {
if (router && router.query) {
    const string = router.query.data
    const routerJson = JSON.parse(string!.toString())
    console.log(routerJson);
    console.log(routerJson.email);
    
    setData(routerJson)        
}
    }, [])

    return (
        <section className={styles.paypment_container}>
            <img
                className={styles.texture_top_image}
                src={`${endpoint}/hotels/symbols/frame_texture_top_right.webp`}
                alt="texture_image"
            />

            <h2>Pago</h2>

            <img
                className={styles.symbol}
                src={`${endpoint}/hotels/symbols/frame.webp`}
                alt="Símbolo"
            />
        </section>
    )
}

export default HotelesPlazaPayment