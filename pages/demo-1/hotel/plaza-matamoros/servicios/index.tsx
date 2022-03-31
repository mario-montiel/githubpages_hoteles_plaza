// React
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// CSS
import styles from "../../../../../styles/Demo1CatedralHome.module.css"

// Componets
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1"
import ServicesDemo1 from "../../../../../components/website/demo1/services/Services"

// Libraries

// Helpers

// Types

const ServicesCatedralDemo1 = () => {

    // Variables
    const router = useRouter()

    // Use State
    const [url, setUrl] = useState<string>('')

    // Functions

    // Use Effect
    useEffect(() => {
        if (router.pathname == '/demo-1/hotel/plaza-matamoros/servicios') {
            setUrl('/hotels/services/matamoros/')
        }
    }, [])

    return (
        <LayoutDemo1
            title="Servicios - Demostración 1"
            description="Servicios de los hoteles plaza"
        >

            <img
                className={styles.hotel_face}
                src={`${url}service_face.webp`}
                alt="First Image"
            // srcSet="/hotels/main/fachada-catedral-480x400.webp 240w,
            //     /hotels/main/fachada-catedral-960x900.webp 530w,
            //     /hotels/main/fachada-catedral-1440x1040.webp 720w,
            //     /hotels/main/fachada-catedral-1920x1201.webp 910w"
            // sizes="(max-width: 480px) 120px,
            //     (max-width: 960px) 240px,
            //     (max-width: 1440px) 530px,
            //     910px
            // "
            />

            <ServicesDemo1 />

        </LayoutDemo1>
    )
}

export default ServicesCatedralDemo1