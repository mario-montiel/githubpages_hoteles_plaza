// React

// CSS
import styles from "../../../../../styles/Demo1CatedralHome.module.css"

// Componets
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1"
import RoomsCatedral from "../../../../../components/website/demo1/rooms/Rooms"

// Libraries

// Helpers
import { endpoint } from "../../../../../config/endpoint"

// Types

RoomsCatedralDemo1.getInitialProps = async () => {
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

export default function RoomsCatedralDemo1({ weather }: any) {

    return (
        <LayoutDemo1
            title="Habitaciones - Demostración 1"
            description="Habitaciones de los hoteles plaza"
            weather={weather}
            currentHotel="catedral"
        >

            <img
                className={styles.hotel_face}
                src="/hotels/rooms/catedral/room_face.webp"
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




            <RoomsCatedral
                roomUrl={`${endpoint}/hotels/rooms/catedral/`}
            />

        </LayoutDemo1>
    )
}