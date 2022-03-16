// React
import Layout from "../../../../components/globals/Layout"
import LayoutDemo1 from "../../../../components/globals/LayoutDemo1"
import WhoWeAreDemo1 from "../../../../components/website/demo1/plaza-catedral/whoWeAre/WhoWeAre"

// CSS
import styles from "../../../../styles/Demo1CatedralHome.module.css"

// Componets

// Libraries

// Helpers

// Types

const HotelCatedralDemo1 = () => {

    return (
        <LayoutDemo1
            title="Home - Demostración 1"
            description="Inicio de la página principal de los hoteles plaza"
        >

            <img
                className={styles.hotel_face}
                src="/hotels/main/fachada-catedral-480x400.png"
                alt="First Image"
                srcSet="/hotels/main/fachada-catedral-480x400.png 240w,
                    /hotels/main/fachada-catedral-960x900.png 530w,
                    /hotels/main/fachada-catedral-1440x1040.png 720w,
                    /hotels/main/fachada-catedral-1920x1201.png 910w"
                sizes="(max-width: 480px) 120px,
                    (max-width: 960px) 240px,
                    (max-width: 1440px) 530px,
                    910px
                "
            />

            {/* ¿Quienes Somos? */}

            <WhoWeAreDemo1 />

        </LayoutDemo1>
    )
}

export default HotelCatedralDemo1