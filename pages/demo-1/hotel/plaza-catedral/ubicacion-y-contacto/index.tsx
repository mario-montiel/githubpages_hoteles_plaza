// React
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1"
import UbicationContactDemo1 from "../../../../../components/website/demo1/plaza-catedral/ubication-contact/UbicationContact"

// CSS
import styles from "../../../../../styles/Demo1CatedralHome.module.css"

// Componets

// Libraries

// Helpers

// Types

const UbicationContactCatedralDemo1 = () => {

    return (
        <LayoutDemo1
            title="Ubicación y contacto - Demostración 1"
            description="Ubicación y contacto de los hoteles plaza"
        >

            <img
                className={styles.hotel_face}
                src="/hotels/ubication_contact/catedral/ubi_cont.jpg"
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

            <UbicationContactDemo1 />

        </LayoutDemo1>
    )
}

export default UbicationContactCatedralDemo1