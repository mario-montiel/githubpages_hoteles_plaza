// React

// CSS
import styles from "../../../../styles/Demo1CatedralHome.module.css"

// Componets
import LayoutDemo1 from "../../../../components/globals/LayoutDemo1"
import WhoWeAreDemo1 from "../../../../components/website/demo1/whoWeAre/WhoWeAre"
import { NextPageContext } from "next"
import { endpoint } from "../../../../config/endpoint"

// Libraries

// Helpers

// Types

HotelCatedralDemo1.getInitialProps = async (ctx: NextPageContext) => {
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

export default function HotelCatedralDemo1({ weather }: any) {

    return (
        <LayoutDemo1
            title="Home - Demostración 1"
            description="Inicio de la página principal de los hoteles plaza"
            weather={weather}
        >
            <img
                className={styles.hotel_face}
                src="/hotels/main/fachada-catedral-480x400.webp"
                alt="First Image"
                srcSet="/hotels/main/fachada-catedral-480x400.webp 240w,
                    /hotels/main/fachada-catedral-960x900.webp 530w,
                    /hotels/main/fachada-catedral-1440x1040.webp 720w,
                    /hotels/main/fachada-catedral-1920x1201.webp 910w"
                sizes="(max-width: 480px) 120px,
                    (max-width: 960px) 240px,
                    (max-width: 1440px) 530px,
                    910px
                "
            />

            {/* ¿Quienes Somos? */}

            <WhoWeAreDemo1
                url={"/hotels/mision_vision/catedral/"}
                description="
                    Somos un hotel que ofrece un excelente servicio
                    y trato cálido a todos nuestros huéspedes.
                    Con una excelente ubicación en Matamoros, Coah.,
                    contamos con todas las comodidades requeridas
                    para una estancia placentera."
            />

        </LayoutDemo1>
    )
}