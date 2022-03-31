// React

// CSS
import styles from "../../../../../styles/Demo1CatedralHome.module.css"

// Componets
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1"
import ServicesDemo1 from "../../../../../components/website/demo1/services/Services"
import { endpoint } from "../../../../../config/endpoint"

// Libraries

// Helpers

// Types

ServicesCatedralDemo1.getInitialProps = async () => {
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

export default function ServicesCatedralDemo1({ weather }: any) {

    return (
        <LayoutDemo1
            title="Servicios - Demostración 1"
            description="Servicios de los hoteles plaza"
            weather={weather}
        >

            <img
                className={styles.hotel_face}
                src="/hotels/services/catedral/service_face.webp"
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

            <ServicesDemo1 />

        </LayoutDemo1>
    )
}