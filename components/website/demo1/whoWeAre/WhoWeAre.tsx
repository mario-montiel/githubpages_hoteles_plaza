// React

// CSS
import { useEffect, useState } from "react"
import { endpoint } from "../../../../config/endpoint"
import styles from "./WhoWeAre.module.css"

// Componets

// Libraries

// Helpers

// Types

const WhoWeAreDemo1 = ({ url, description, vision }: any) => {

    // Variables

    // Use State
    const [size, setSize] = useState<any>([])

    // Functions

    // Use Effect
    useEffect(() => {
        console.log(size);
        const handleResize = () => {
            setSize([window.innerHeight, window.innerWidth])
        }
        window.addEventListener('resize', handleResize)
    }, [])

    return (
        <section className={styles.who_we_are}>
            <h2>¿Quiénes somos?</h2>

            <img
                className={styles.texture_top_image}
                src={`${endpoint}/hotels/symbols/frame_texture_top_right.webp`}
                alt="texture_image"
            />

            <img
                className={styles.symbol}
                src={`${endpoint}/hotels/symbols/frame.webp`}
                alt="Símbolo"
            />

            <p>{description}</p>

            {/* === MISION AND VISION === */}
            {/* MISION */}

            <div className={styles.mision_container}>
                <div className={styles.text_container}>
                    <h5>Misión</h5>
                    <div className={styles.line} />
                    <p className={styles.text}>Ser una marca líder en el país,
                        brindando las mejores experiencias de confort,
                        seguridad y hospitalidad a nuestros huéspedes
                        por medio de nuestro servicio y eficiencia.</p>
                </div>
                <img
                    className={styles.lobby}
                    src={`${endpoint}${url}lobby.webp`}
                    alt="Recepción"
                />
            </div>

            {/* === MISION AND VISION === */}
            {/* VISION */}

            <div className={styles.vision_container}>
                <div />
                <img
                    className={styles.lobby}
                    src={`${endpoint}${url}lobby2.webp`}
                    alt="Recepción"
                />
                <div className={styles.text_container}>
                    <div className={styles.text_subcontainer}>
                        <h5>Visión</h5>
                        <div className={styles.line} />
                        <p className={styles.text}>{vision}</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default WhoWeAreDemo1