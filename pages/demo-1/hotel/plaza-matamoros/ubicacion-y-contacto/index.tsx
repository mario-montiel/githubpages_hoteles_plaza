// React
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

// CSS
import styles from "../../../../../styles/Demo1CatedralHome.module.css"

// Componets
import UbicationContactDemo1 from "../../../../../components/website/demo1/ubication-contact/UbicationContact"
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1"

// Libraries

// Helpers
import { endpoint } from "../../../../../config/endpoint"

// Types

const UbicationContactCatedralDemo1 = () => {

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
        >

            <img
                className={styles.hotel_face}
                src={`${endpoint}/hotels/ubication_contact/matamoros/ubi_cont.png`}
                alt="First Image"
            // srcSet="/hotels/main/fachada-catedral-480x400.png 240w,
            //     /hotels/main/fachada-catedral-960x900.png 530w,
            //     /hotels/main/fachada-catedral-1440x1040.png 720w,
            //     /hotels/main/fachada-catedral-1920x1201.png 910w"
            // sizes="(max-width: 480px) 120px,
            //     (max-width: 960px) 240px,
            //     (max-width: 1440px) 530px,
            //     910px
            // "
            />

            <UbicationContactDemo1 hotel={"matamoros"} iFrameUrl={iFrame} />

        </LayoutDemo1>
    )
}

export default UbicationContactCatedralDemo1