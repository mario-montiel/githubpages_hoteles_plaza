// React

// CSS
import { useRef } from "react";
import styles from "./Booking.module.css"

// Componets

// Libraries

// Helpers

// Types

const BookingModalCatedralDemo1 = ({ close }: any) => {

    // Variables

    // Use State

    // Use Ref
    const modalRef = useRef<HTMLDivElement>(null)

    // Functions
    const closeModal = () => {
        window.onclick = (e: any) => {
            if (e.target == modalRef.current) {
                close()
            }
        }
    }

    return (
        <div
            ref={modalRef}
            className={styles.overlay}
            onClick={closeModal}
        >
            <div
                className={styles.content}>
                <h2>Reservaciones</h2>

                <img
                    className={styles.texture_top_image}
                    src="/hotels/symbols/frame_texture_top_right.png"
                    alt="texture_image"
                />

                <img
                    className={styles.symbol}
                    src="/hotels/symbols/frame.png"
                    alt="Símbolo"
                />

                <p>Cómodas instalaciones para hacer de su estancia
                    una experiencia única.</p>

                <form>
                    <div className={styles.input_group}>
                        <label htmlFor="check-in">Check In:</label>
                        <br />
                        <input
                            type="text"
                            id="check-in"
                            className={styles.input_date}
                            placeholder="DD/MM/AAAA"
                        />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="check-out">Check Out:</label>
                        <br />
                        <input
                            type="text"
                            id="check-out"
                            className={styles.input_date}
                            placeholder="DD/MM/AAAA"
                        />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="persons">Número de personas:</label>
                        <br />
                        <input
                            type="text"
                            id="persons"
                            className={styles.input_date}
                            placeholder="DD/MM/AAAA"
                        />
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.input_group}>
                            <label htmlFor="name"></label>
                            <input
                                type="text"
                                id="name"
                                className={styles.input}
                                placeholder="Nombre"
                            />
                        </div>

                        <div className={styles.input_group}>
                            <label htmlFor="lastname"></label>
                            <input
                                type="text"
                                id="lastname"
                                className={styles.input}
                                placeholder="Apellido"
                            />
                        </div>

                        <div className={styles.input_group}>
                            <label htmlFor="phone"></label>
                            <input
                                type="text"
                                id="phone"
                                className={styles.input}
                                placeholder="Teléfono"
                            />
                        </div>

                        <div className={styles.input_group}>
                            <label htmlFor="email"></label>
                            <input
                                type="text"
                                id="email"
                                className={styles.input}
                                placeholder="Correo"
                            />
                        </div>
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="comments"></label>
                        <input
                            type="text"
                            id="comments"
                            className={styles.input_textarea}
                            placeholder="DD/MM/AAAA"
                        />
                    </div>

                    <button>
                        RESERVAR
                    </button>
                </form>

                <img
                    className={styles.texture_image}
                    src="/hotels/symbols/frame_texture_bottom_left.png"
                    alt=""
                />
            </div>
        </div>
    )
}

export default BookingModalCatedralDemo1