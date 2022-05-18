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
        if (router.pathname == '/demo-1/hotel/plaza-matamoros/ubicacion-y-contacto') {
            setiFrame('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.9957968093754!2d-103.22716288401563!3d25.538516924033033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868fdb4cf402e6b1%3A0x363f3d4bbba13922!2sHOTEL%20PLAZA%20MATAMOROS!5e0!3m2!1ses-419!2smx!4v1647455857571!5m2!1ses-419!2smx')
        }
    }, [])

    return (
        <LayoutDemo1
            title="Ubicación y contacto - Demostración 1"
            description="Ubicación y contacto de los hoteles plaza"
            weather={weather}
            currentHotel="matamoros"
        >

            <div className={styles.main_image_container}>
                <img
                    className={`${styles.hotel_face} ${styles.image_ubication_and_contact_matamoros}`}
                    src={`${endpoint}/hotels/ubication_contact/matamoros/ubi_cont.webp`}
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
            </div>

            <UbicationContactDemo1 hotel={"matamoros"} iFrameUrl={iFrame} />

        </LayoutDemo1>
    )
}