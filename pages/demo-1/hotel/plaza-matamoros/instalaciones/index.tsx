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

FacilitiesMatamorosDemo1.getInitialProps = async () => {
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

export default function FacilitiesMatamorosDemo1({ weather }: any) {

    return (
        <LayoutDemo1
            title="Habitaciones - Demostración 1"
            description="Habitaciones de los hoteles plaza"
            weather={weather}
            currentHotel="matamoros"
        >

            <img
                className={styles.hotel_face_top}
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
                sections={3}
                limit={12}
            />

        </LayoutDemo1>
    )
}