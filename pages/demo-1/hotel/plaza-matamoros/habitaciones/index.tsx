// React
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1"

// CSS
import styles from "../../../../../styles/Demo1CatedralHome.module.css"

// Componets
import RoomsCatedral from "../../../../../components/website/demo1/rooms/Rooms"
import { endpoint } from "../../../../../config/endpoint"

// Libraries

// Helpers

// Types

const RoomsMatamorosDemo1 = () => {

    return (
        <LayoutDemo1
            title="Habitaciones - Demostración 1"
            description="Habitaciones de los hoteles plaza"
        >

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

            <RoomsCatedral
                roomUrl={`${endpoint}/hotels/rooms/matamoros/`}
            />

        </LayoutDemo1>
    )
}

export default RoomsMatamorosDemo1