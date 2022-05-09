// React

// CSS
import { endpoint } from "../../../../config/endpoint"
import styles from "./Services.module.css"

// Componets

// Libraries

// Helpers

// Types

const ServicesDemo1 = () => {

    // Variables

    // Use State

    // Use Ref

    // Functions

    return (
        <section className={styles.services}>
            <h2>Servicios</h2>

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

            <div className={styles.services_container_1}>
                <div className={styles.service_content}>
                    <img src="/hotels/services/icons/icono_-1.png" alt="imágen de servicio" />
                </div>

                <div className={styles.service_content}>
                    <img src="/hotels/services/icons/icono_-2.png" alt="imágen de servicio" />
                </div>

                <div className={styles.service_content}>
                    <img src="/hotels/services/icons/icono_-3.png" alt="imágen de servicio" />
                </div>
            </div>

            <div className={styles.services_container_2}>

                <div className={styles.service_content}>
                    <img src="/hotels/services/icons/icono_-4.png" alt="imágen de servicio" />
                </div>

                <div className={styles.service_content}>
                    <img src="/hotels/services/icons/icono_-5.png" alt="imágen de servicio" />
                </div>
            </div>

        </section>
    )
}

export default ServicesDemo1