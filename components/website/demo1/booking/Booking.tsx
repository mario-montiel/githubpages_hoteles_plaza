// React

// CSS
import { useEffect, useRef } from "react";
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
    const modalContentRef = useRef<HTMLDivElement>(null)
    /* Animations */
    const ImageTopRef = useRef<HTMLImageElement>(null)
    const ImageSmallRef = useRef<HTMLImageElement>(null)
    const ImageBottomRef = useRef<HTMLImageElement>(null)

    // Functions
    const closeModal = () => { window.onclick = (e: any) => { if (e.target == modalRef.current) { close() } } }

    /* Animations */
    const functionObserver = (entries: IntersectionObserverEntry[], observe: IntersectionObserver) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            const i = selectClassToRemove(entry.target)
            
            if (entry.isIntersecting) { entry.target.classList.remove(`is-hidden_${i}`) }
            else { entry.target.classList.add(`is-hidden_${i}`); }
        });
    }

    const selectClassToRemove = (elementTarget: Element) => {
        if (elementTarget == ImageTopRef.current) { return 'appear' }
        if (elementTarget == ImageSmallRef.current) { return 'appear' }
        if (elementTarget == ImageBottomRef.current) { return 'appear' }
    }

    // Use Effect   
    useEffect(() => {
        let observer = new IntersectionObserver((entries: any, observe) => {
            functionObserver(entries, observe)
        });

        if (ImageTopRef.current) { observer.observe(ImageTopRef.current) }
        if (ImageSmallRef.current) { observer.observe(ImageSmallRef.current) }
        if (ImageBottomRef.current) { observer.observe(ImageBottomRef.current) }

        return () => {
            if (ImageTopRef.current) { observer.unobserve(ImageTopRef.current) }
            if (ImageSmallRef.current) { observer.unobserve(ImageSmallRef.current) }
            if (ImageBottomRef.current) { observer.unobserve(ImageBottomRef.current) }
        }
    }, [ImageTopRef.current, ImageSmallRef.current, ImageBottomRef.current])

    useEffect(() => {
        if (modalContentRef.current) { modalContentRef.current.classList.remove(styles.hidden) }
    }, [modalContentRef.current])

    return (
        <div
            ref={modalRef}
            className={styles.overlay}
            onClick={closeModal}
        >
            <div
                ref={modalContentRef}
                className={`${styles.content} ${styles.hidden}`}>
                <button className={styles.btn_close} onClick={() => close()}>
                    <svg className={styles.svg_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </button>

                <h2>Reservaciones</h2>

                <img
                    ref={ImageTopRef}
                    className={styles.texture_top_image}
                    src="/hotels/symbols/frame_texture_top_right.webp"
                    alt="texture_image"
                />

                <img
                    ref={ImageSmallRef}
                    className={styles.symbol}
                    src="/hotels/symbols/frame.webp"
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
                    ref={ImageBottomRef}
                    className={styles.texture_image}
                    src="/hotels/symbols/frame_texture_bottom_left.webp"
                    alt=""
                />
            </div>
        </div>
    )
}

export default BookingModalCatedralDemo1