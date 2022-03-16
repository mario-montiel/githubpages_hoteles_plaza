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
                src={`${endpoint}/hotels/symbols/frame_texture_top_right.png`}
                alt="texture_image"
            />

            <img
                className={styles.symbol}
                src={`${endpoint}/hotels/symbols/frame.png`}
                alt="Símbolo"
            />

            <div className={styles.services_container}>
                <div className={styles.service_content}>
                    <svg className={styles.svg_service_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,5A2,2 0 0,1 14,7C14,7.24 13.96,7.47 13.88,7.69C17.95,8.5 21,11.91 21,16H3C3,11.91 6.05,8.5 10.12,7.69C10.04,7.47 10,7.24 10,7A2,2 0 0,1 12,5M22,19H2V17H22V19M12,9.5C8.89,9.5 6.25,11.39 5.34,14H18.66C17.75,11.39 15.11,9.5 12,9.5Z" />
                    </svg>
                    <p>Room Service</p>
                </div>

                <div></div>

                <div className={styles.service_content}>
                    <svg className={styles.svg_service_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14.83,11.17C16.39,12.73 16.39,15.27 14.83,16.83C13.27,18.39 10.73,18.39 9.17,16.83L14.83,11.17M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M7,4A1,1 0 0,0 6,5A1,1 0 0,0 7,6A1,1 0 0,0 8,5A1,1 0 0,0 7,4M10,4A1,1 0 0,0 9,5A1,1 0 0,0 10,6A1,1 0 0,0 11,5A1,1 0 0,0 10,4M12,8A6,6 0 0,0 6,14A6,6 0 0,0 12,20A6,6 0 0,0 18,14A6,6 0 0,0 12,8Z" />
                    </svg>
                    <p>Lavandería
                        y Tintorería</p>
                </div>

                <div></div>

                <div className={styles.service_content}>
                    <svg className={styles.svg_service_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" />
                    </svg>
                    <p>WiFi</p>
                </div>

                <div></div>

                <div className={styles.service_content}>
                    <svg className={styles.svg_service_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11.86,2L11.34,3.93C15.75,4.78 19.2,8.23 20.05,12.65L22,12.13C20.95,7.03 16.96,3.04 11.86,2M10.82,5.86L10.3,7.81C13.34,8.27 15.72,10.65 16.18,13.68L18.12,13.16C17.46,9.44 14.55,6.5 10.82,5.86M3.72,9.69C3.25,10.73 3,11.86 3,13C3,14.95 3.71,16.82 5,18.28V22H8V20.41C8.95,20.8 9.97,21 11,21C12.14,21 13.27,20.75 14.3,20.28L3.72,9.69M9.79,9.76L9.26,11.72A3,3 0 0,1 12.26,14.72L14.23,14.2C14,11.86 12.13,10 9.79,9.76Z" />
                    </svg>
                    <p>Televisión
                        por Cable</p>
                </div>

                <div></div>

                <div className={styles.service_content}>
                    <svg className={styles.svg_service_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M13.2,11H10V7H13.2A2,2 0 0,1 15.2,9A2,2 0 0,1 13.2,11M13,3H6V21H10V15H13A6,6 0 0,0 19,9C19,5.68 16.31,3 13,3Z" />
                    </svg>
                    <p>Estacionamiento
                        Exclusivo</p>
                </div>
            </div>

        </section>
    )
}

export default ServicesDemo1