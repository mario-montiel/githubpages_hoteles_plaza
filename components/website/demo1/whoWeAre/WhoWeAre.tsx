// React

// CSS
// import { EntryType } from "perf_hooks"
import { useEffect, useRef, useState } from "react"
import { endpoint } from "../../../../config/endpoint"
// import { appearToLeftAfterScrollDown, appearToRightAfterScrollDown } from "../../../../helpers/animations/images/appear"
import styles from "./WhoWeAre.module.css"

// Componets

// Libraries

// Helpers

// Types

const WhoWeAreDemo1 = ({ url, description, vision }: any) => {

    // Variables

    // Use Ref
    const misionRef = useRef<HTMLImageElement>(null)
    const visionRef = useRef<HTMLImageElement>(null)
    const misionTextRef = useRef<HTMLDivElement>(null)
    const visionTextRef = useRef<HTMLDivElement>(null)

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
        if (elementTarget == misionRef.current) { return 'right' }
        if (elementTarget == visionRef.current) { return 'left' }
        if (elementTarget == misionTextRef.current) { return 'bottom' }
        if (elementTarget == visionTextRef.current) { return 'bottom' }
    }

    // Use Effect
    useEffect(() => {
        let observer = new IntersectionObserver((entries: any, observe) => {
            functionObserver(entries, observe)
        });

        if (misionRef.current) { observer.observe(misionRef.current) }
        if (visionRef.current) { observer.observe(visionRef.current) }
        if (misionTextRef.current) { observer.observe(misionTextRef.current) }
        if (visionTextRef.current) { observer.observe(visionTextRef.current) }

        return () => {
            if (misionRef.current) { observer.unobserve(misionRef.current) }
            if (visionRef.current) { observer.unobserve(visionRef.current) }
            if (misionTextRef.current) { observer.unobserve(misionTextRef.current) }
            if (visionTextRef.current) { observer.unobserve(visionTextRef.current) }
        }
    }, [misionRef.current, visionRef.current, misionTextRef.current, visionTextRef.current])

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

            <div>
                <div className={styles.mision_container}> {/* `${styles.mision_container} is-hidden_right` */}
                    <div ref={misionTextRef} className={styles.text_container}>
                        <h5>Misión</h5>
                        <div className={styles.line} />
                        <p className={styles.text}>Ser una marca líder en el país,
                            brindando las mejores experiencias de confort,
                            seguridad y hospitalidad a nuestros huéspedes
                            por medio de nuestro servicio y eficiencia.</p>
                    </div>
                    <img
                        ref={misionRef}
                        className={styles.lobby}
                        src={`${endpoint}${url}lobby.webp`}
                        alt="Recepción"
                    />
                </div>

                {/* === MISION AND VISION === */}
                {/* VISION */}

                <div className={styles.vision_container}> {/* {`${styles.vision_container} is-hidden_left`} */}
                    <img
                        ref={visionRef}
                        className={styles.lobby}
                        src={`${endpoint}${url}lobby2.webp`}
                        alt="Recepción"
                    />
                    <div ref={visionTextRef} className={styles.text_container}>
                        <div className={styles.text_subcontainer}>
                            <h5>Visión</h5>
                            <div className={styles.line} />
                            <p className={styles.text}>{vision}</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default WhoWeAreDemo1