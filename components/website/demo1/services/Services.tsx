// React

// CSS
import { useEffect, useRef } from "react"
import { endpoint } from "../../../../config/endpoint"
import styles from "./Services.module.css"

// Componets

// Libraries

// Helpers

// Types

const ServicesDemo1 = () => {

    // Variables

    // Use Ref
    const ServiceCarParkRef = useRef<HTMLDivElement>(null)
    const ServiceLaundryRef = useRef<HTMLDivElement>(null)
    const ServiceWiFiRef = useRef<HTMLDivElement>(null)
    const ServiceTVRef = useRef<HTMLDivElement>(null)
    const ServiceRoomRef = useRef<HTMLDivElement>(null)

    // Use State

    // Functions

    const functionObserver = (entries: IntersectionObserverEntry[], observe: IntersectionObserver) => {
        entries.forEach((entry: IntersectionObserverEntry, index: number) => {
            const i = selectClassToRemove(entry.target)

            if (entry.isIntersecting) { entry.target.classList.remove(`is-hidden_${i}`) }
            else { entry.target.classList.add(`is-hidden_${i}`); }
        });
    }

    const selectClassToRemove = (elementTarget: Element) => {
        if (elementTarget == ServiceCarParkRef.current) { return 'right' }
        if (elementTarget == ServiceLaundryRef.current) { return 'left' }
        if (elementTarget == ServiceWiFiRef.current) { return 'right' }
        if (elementTarget == ServiceTVRef.current) { return 'left' }
        if (elementTarget == ServiceRoomRef.current) { return 'right' }
    }

    // Use Effect

    useEffect(() => {
        let observer = new IntersectionObserver((entries: any, observe) => {
            functionObserver(entries, observe)
        });

        if (ServiceCarParkRef.current) { observer.observe(ServiceCarParkRef.current) }
        if (ServiceLaundryRef.current) { observer.observe(ServiceLaundryRef.current) }
        if (ServiceWiFiRef.current) { observer.observe(ServiceWiFiRef.current) }
        if (ServiceTVRef.current) { observer.observe(ServiceTVRef.current) }
        if (ServiceRoomRef.current) { observer.observe(ServiceRoomRef.current) }

        return () => {
            if (ServiceCarParkRef.current) { observer.unobserve(ServiceCarParkRef.current) }
            if (ServiceLaundryRef.current) { observer.unobserve(ServiceLaundryRef.current) }
            if (ServiceWiFiRef.current) { observer.unobserve(ServiceWiFiRef.current) }
            if (ServiceTVRef.current) { observer.unobserve(ServiceTVRef.current) }
            if (ServiceRoomRef.current) { observer.unobserve(ServiceRoomRef.current) }
        }
    }, [ServiceCarParkRef.current, ServiceLaundryRef.current, ServiceWiFiRef.current, ServiceTVRef.current, ServiceRoomRef.current])

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

            <div>
                <div className={styles.services_container_1}>
                    <div ref={ServiceCarParkRef} className={styles.service_content}>
                        <img src="/hotels/services/icons/icono_-1.png" alt="imágen de servicio" />
                    </div>

                    <div ref={ServiceLaundryRef} className={styles.service_content}>
                        <img src="/hotels/services/icons/icono_-2.png" alt="imágen de servicio" />
                    </div>

                    <div ref={ServiceWiFiRef} className={styles.service_content}>
                        <img src="/hotels/services/icons/icono_-3.png" alt="imágen de servicio" />
                    </div>
                </div>

                <div className={styles.services_container_2}>
                    <div ref={ServiceTVRef} className={styles.service_content}>
                        <img src="/hotels/services/icons/icono_-4.png" alt="imágen de servicio" />
                    </div>

                    <div ref={ServiceRoomRef} className={styles.service_content}>
                        <img src="/hotels/services/icons/icono_-5.png" alt="imágen de servicio" />
                    </div>
                </div>
            </div>


        </section>
    )
}

export default ServicesDemo1