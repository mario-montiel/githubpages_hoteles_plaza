// React
import { useEffect, useRef } from "react"

// CSS
import styles from './Breakfast.module.css'

// Components

// Types

const ModalBeakfast = ({ isShow, room, close }: any) => {
    
    // Variables

    // Use State

    // Use Ref
    const modalRef = useRef<HTMLDivElement>(null)

    // Functions
    const closeRoomBreakfast = () => {
        close()
    }

    const showRoomNumber = (roomNumber: number) => {
        const roomNum = room.roomNumber < 10 ? room.floor + '0' + roomNumber : room.floor + '' + roomNumber

        return (
            roomNum
        )
    }

    const onSubmit = async () => {
        const resp = await fetch('/api/admin/rooms/breakfast/assignBreakfast', {
            method: "POST",
            body: JSON.stringify(room)
        })
        const response = await resp.json()
        console.log(response.message);
        
    }

    useEffect(() => {
        if (isShow) {
            modalRef.current?.focus()
        }
    }, [isShow])

    return isShow ? (
        <div
            className={styles.room_modal}
            onBlur={closeRoomBreakfast}
            tabIndex={0}
            ref={modalRef}
        >
            <h5> Habitación {showRoomNumber(room.roomNumber)}</h5>
            <p>Al darle click en aceptar confirma que el huesped de la habitación {showRoomNumber(room.roomNumber)} consumió su desayuno</p>
            <button className={styles.btn_submit} onClick={onSubmit}>
                Aceptpar
            </button>
        </div>
    ) : null
}

export default ModalBeakfast