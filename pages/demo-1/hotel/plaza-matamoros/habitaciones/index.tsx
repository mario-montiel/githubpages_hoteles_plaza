// React
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1"

// CSS
import styles from "../../../../../styles/Demo1CatedralHome.module.css"

// Componets
import RoomsCatedral from "../../../../../components/website/demo1/rooms/Rooms"

// Libraries

// Helpers
import { endpoint } from "../../../../../config/endpoint"
import { useEffect, useState } from "react"

// Types

RoomsMatamorosDemo1.getInitialProps = async () => {
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

export default function RoomsMatamorosDemo1({ weather }: any) {

    // Variables

    // Use Ref

    // Use State
    const [width, setWidth] = useState<any>()

    // Functions
    const getCurrentSize = () => { setWidth(window.innerWidth) }

    // Use Effect
    useEffect(() => { setWidth(window.innerWidth) }, [])
    useEffect(() => {
        window.addEventListener('resize', getCurrentSize)
        return () => { window.removeEventListener('resize', getCurrentSize) }
    })

    return (
        <LayoutDemo1
            title="Habitaciones - Demostración 1"
            description="Habitaciones de los hoteles plaza"
            weather={weather}
            currentHotel="matamoros"
        >
            
            <div className={styles.main_image_container}>
                <img
                    className={styles.hotel_face}
                    src="/hotels/rooms/matamoros/room_face.webp"
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
            </div>

            <RoomsCatedral
                width={width}
                roomUrl={`${endpoint}/hotels/rooms/matamoros/`}
            />

        </LayoutDemo1>
    )
}