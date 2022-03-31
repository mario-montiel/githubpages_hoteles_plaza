// React
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

// CSS
import styles from "../../../../../styles/Demo1CatedralHome.module.css"

// Componets
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1"
import UbicationContactDemo1 from "../../../../../components/website/demo1/ubication-contact/UbicationContact"

// Libraries

// Helpers
import { endpoint } from "../../../../../config/endpoint"

// Types

UbicationContactCatedralDemo1.getInitialProps = async () => {
    let weatherJson: any = []
    weatherJson = await getFetchData(endpoint + '/api/weather')

    return {
        weather: weatherJson,
    }
}

async function getFetchData(url: string) {
    const resp = await fetch(url)
    return await resp.json()
}

export default function UbicationContactCatedralDemo1({ weather }: any) {

    // Variables
    const router = useRouter()

    // Use State
    const [iFrame, setiFrame] = useState<string>('')

    // Use Ref

    // Functions

    // Use Effect
    useEffect(() => {
        if (router.pathname == '/demo-1/hotel/plaza-catedral/ubicacion-y-contacto') {
            setiFrame('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.069050578939!2d-103.50312758503061!3d25.56936938372454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868fd84c65bfef23%3A0x4d89466893c4175!2sHotel%20Plaza%20Catedral!5e0!3m2!1ses-419!2smx!4v1647393486062!5m2!1ses-419!2smx')
        }
    }, [])

    return (
        <LayoutDemo1
            title="Ubicación y contacto - Demostración 1"
            description="Ubicación y contacto de los hoteles plaza"
            weather={weather}
        >

            <img
                className={styles.hotel_face}
                src={`${endpoint}/hotels/ubication_contact/catedral/ubi_cont.webp`}
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

            <UbicationContactDemo1 hotel={"catedral"} iFrameUrl={iFrame} />

        </LayoutDemo1>
    )
}