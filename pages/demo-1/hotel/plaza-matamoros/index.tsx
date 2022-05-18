// React
import { NextPageContext } from "next"

// CSS
import styles from "../../../../styles/Demo1CatedralHome.module.css"

// Componets
import LayoutDemo1 from "../../../../components/globals/LayoutDemo1"
import WhoWeAreDemo1 from "../../../../components/website/demo1/whoWeAre/WhoWeAre"

// Libraries

// Helpers
import { endpoint } from "../../../../config/endpoint"

// Types

HotelMatamorosDemo1.getInitialProps = async (ctx: NextPageContext) => {
    let weatherJson: any = []
    weatherJson = await getFetchData(endpoint + '/api/weather', ctx)

    return {
        weather: weatherJson,
    }
}

async function getFetchData(url: string, ctx: NextPageContext) {
    const resp = await fetch(url)
    return await resp.json()
}

export default function HotelMatamorosDemo1({ weather }: any) {

    return (
        <LayoutDemo1
            title="Home - Demostración 1"
            description="Inicio de la página principal de los hoteles plaza"
            weather={weather}
            currentHotel="matamoros"
        >

            <div className={styles.main_image_container}>
                <img
                    className={`${styles.hotel_face} ${styles.image_who_we_are_matamoros}`}
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
            </div>

            {/* ¿Quienes Somos? */}

            <WhoWeAreDemo1
                url={"/hotels/mision_vision/matamoros/"}
                description="
                    Somos un hotel que ofrece un excelente servicio y trato cálido a todos nuestros
                    huéspedes. Situado en una excelente ubicación, en el entronque de la Carretera Torreón -
                    Saltillo, con todas las comodidades requeridas para una estancia placentera."
                vision="
                    Consolidar nuestra marca como la número uno, logrando el crecimiento de la misma por medio
                    de la expansión en nuestra zona, en el resto del país y en el extranjero."
            />

        </LayoutDemo1>
    )
}