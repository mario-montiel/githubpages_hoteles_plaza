// React

// CSS
import { endpoint } from "../../../../config/endpoint"
import styles from "./WhoWeAre.module.css"

// Componets

// Libraries

// Helpers

// Types

const WhoWeAreDemo1 = ({ url }: any) => {

    // Variables

    // Functions

    return (
        <section className={styles.who_we_are}>
            <h2>¿Quiénes somos?</h2>

            <img
                className={styles.texture_top_image}
                src={`${endpoint}/hotels/symbols/frame_texture_top_right.png`}
                alt="texture_image"
            />

            <img
                className={styles.symbol}
                src={`${endpoint}/hotels/symbols/frame.png`}
                alt="Símbolo"
            />

            <p>Somos un hotel que ofrece un excelente servicio
                y trato cálido a todos nuestros huéspedes.
                Con una excelente ubicación en Matamoros, Coah.,
                contamos con todas las comodidades requeridas
                para una estancia placentera.</p>

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
                    src={`${endpoint}${url}lobby.png`}
                    alt="Recepción"
                />
            </div>

            {/* === MISION AND VISION === */}
            {/* VISION */}

            <div className={styles.vision_container}>
                <div />
                <img
                    className={styles.lobby}
                    src={`${endpoint}${url}lobby2.png`}
                    alt="Recepción"
                />
                <div className={styles.text_container}>
                    <div className={styles.text_subcontainer}>
                        <h5>Visión</h5>
                        <div className={styles.line} />
                        <p className={styles.text}>Consolidar nuestra marca
                            como la número uno en el país,
                            logrando el crecimiento de la misma
                            por medio de la expansión en nuestra zona,
                            en el resto del país y en el extranjero.</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default WhoWeAreDemo1