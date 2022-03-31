// React
import LayoutDemo1 from "../../../../components/globals/LayoutDemo1"
import WhoWeAreDemo1 from "../../../../components/website/demo1/whoWeAre/WhoWeAre"

// CSS
import styles from "../../../../styles/Demo1CatedralHome.module.css"

// Componets

// Libraries

// Helpers

// Types

const HotelMatamorosDemo1 = () => {

    return (
        <LayoutDemo1
            title="Home - Demostración 1"
            description="Inicio de la página principal de los hoteles plaza"
        >

            <img
                className={styles.hotel_face}
                src="/hotels/main/fachada-matamoros-480x400.webp"
                alt="First Image"
                srcSet="/hotels/main/fachada-matamoros-480x400.webp 240w,
                    /hotels/main/fachada-matamoros-960x900.webp 530w,
                    /hotels/main/fachada-matamoros-1440x1040.webp 720w,
                    /hotels/main/fachada-matamoros-1920x1600.webp 910w"
                sizes="(max-width: 480px) 120px,
                    (max-width: 960px) 240px,
                    (max-width: 1440px) 530px,
                    910px
                "
            />

            {/* ¿Quienes Somos? */}

            <WhoWeAreDemo1
                url={"/hotels/mision_vision/matamoros/"}
                description="
                    Somos un hotel que ofrece un excelente servicio y trato cálido a todos nuestros huéspedes.
                    Situado en una excelente ubicación, en el entronque de la Carretera Torreón -Saltillo, con
                    todas las comodidades requeridas para una estancia placentera."
            />

        </LayoutDemo1>
    )
}

export default HotelMatamorosDemo1