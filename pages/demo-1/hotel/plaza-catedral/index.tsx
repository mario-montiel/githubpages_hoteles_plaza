// React and Next
import { NextPageContext } from "next"
import { useEffect, useState } from "react"

// CSS
import styles from "../../../../styles/Demo1CatedralHome.module.css"

// Componets
import LayoutDemo1 from "../../../../components/globals/LayoutDemo1"
import WhoWeAreDemo1 from "../../../../components/website/demo1/whoWeAre/WhoWeAre"

// Libraries

// Helpers
import { endpoint } from "../../../../config/endpoint"

// Types

HotelCatedralDemo1.getInitialProps = async (ctx: NextPageContext) => {
    const weatherJson = await getFetchData(endpoint + '/api/weather', ctx)
    return { weather: weatherJson }
}

async function getFetchData(url: string, ctx: NextPageContext) {
    const resp = await fetch(url)
    return await resp.json()
}

export default function HotelCatedralDemo1({ weather }: any) {

    // Variables

    // Use Staet

    // Functions

    // Use Effect

    return (
        <LayoutDemo1
            title="Home - Demostración 1"
            description="Inicio de la página principal de los hoteles plaza"
            weather={weather}
            currentHotel="catedral"
        >
            <div className={styles.main_image_container}>
                <img
                    className={`${styles.hotel_face} ${styles.image_who_we_are_catedral}`}
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
            </div>

            {/* ¿Quienes Somos? */}

            <WhoWeAreDemo1
                url={"/hotels/mision_vision/catedral/"}
                description="
                    Somos un hotel que ofrece un excelente servicio y trato cálido a todos
                    nuestros huéspedes. Ubicado en la zona más céntrica de Gómez Palacio, Dgo.,
                    con todas las comodidades requeridas para una estancia placentera. "
                vision="
                    Consolidar nuestra marca como la número uno, logrando el crecimiento
                    de la misma por medio de la expansión en nuestra zona, en el resto
                    del país y en el extranjero."
            />

        </LayoutDemo1>
    )
}