// React
import { useEffect, useRef } from "react"

// CSS
import styles from './Record.module.css'

// Components

// Types

const ModalBeakfastRecord = ({ isShow, record, close }: any) => {

    // Variables

    // Use State

    // Use Ref
    const modalRef = useRef<HTMLDivElement>(null)

    // Functions
    const closeRoomBreakfast = () => {
        close()
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
            <div>
                <h5>Huesped: Mario Alberto Montiel García</h5>
                <p>Hotel: Plaza Catedral</p>
                <p>Habitación: 101</p>
                <p>Fecha: 19/02/2022</p>
                <p>Consumido</p>
            </div>

            <div>
                <h5>Huesped: Mario Alberto Montiel García</h5>
                <p>Hotel: Plaza Catedral</p>
                <p>Habitación: 101</p>
                <p>Fecha: 20/02/2022</p>
                <p>No consumido</p>
            </div>
        </div>
    ) : null
}

export default ModalBeakfastRecord