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

const FacilitiesCatedraDemo1 = () => {

    return (
        <LayoutDemo1
            title="Habitaciones - Demostración 1"
            description="Habitaciones de los hoteles plaza"
        >

            <img
                className={styles.hotel_face}
                src="/hotels/facilities/catedral/facilitie_face.png"
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

            <FacilitiesCatedralDemo1 url={`${endpoint}/hotels/facilities/catedral/facilitie`} />

        </LayoutDemo1>
    )
}

export default FacilitiesCatedraDemo1