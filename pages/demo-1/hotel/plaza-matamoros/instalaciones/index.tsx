// React
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1"

// CSS
import styles from "../../../../../styles/Demo1CatedralHome.module.css"

// Componets
import FacilitiesCatedralDemo1 from "../../../../../components/website/demo1/facilities/Facilities"
import { endpoint } from "../../../../../config/endpoint"

// Libraries

// Helpers

// Types

const FacilitiesMatamorosDemo1 = () => {

    return (
        <LayoutDemo1
            title="Habitaciones - Demostración 1"
            description="Habitaciones de los hoteles plaza"
        >

            <img
                className={styles.hotel_face}
                src="/hotels/facilities/matamoros/facilitie_face.webp"
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

            <FacilitiesCatedralDemo1
                url={`${endpoint}/hotels/facilities/matamoros/facilitie`}
                sections={2}
            />

        </LayoutDemo1>
    )
}

export default FacilitiesMatamorosDemo1