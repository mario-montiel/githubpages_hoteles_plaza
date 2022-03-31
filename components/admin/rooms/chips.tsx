// Components and CSS
import styles from '../../../styles/admin/system/rooms/RoomChips.module.css'

const RoomChips = (props: any) => {

    return (
        <div className={styles.chips_container}>
            <h5>Estatus</h5>
            {
                props.roomsStatus.length ? (
                    props.roomsStatus.map((roomStatus: any, index: number) => {
                        return (
                            <div className={styles.chip_container} key={index}>
                                <div className={styles.chip} style={{ backgroundColor: roomStatus.backgroundColor, color: roomStatus.textColor }}>{roomStatus.name}</div>
                            </div>
                        )
                    })
                ) : ( <p>No hay estatus de habitaciones registrados</p> )
            }

            <h5>Palabra clave</h5>
            {
                props.roomsType.length ? (
                    props.roomsType.map((roomType: any, index: number) => {
                        return (
                            <div className={styles.text_container} key={index}>
                                <p className={styles.text}>{roomType.name} (<b>{roomType.keyWord}</b>)</p>
                            </div>
                        )
                    })
                ) : ( <p>No hay tipos de habitación registrados</p> )
            }
        </div>


    )
}

export default RoomChips