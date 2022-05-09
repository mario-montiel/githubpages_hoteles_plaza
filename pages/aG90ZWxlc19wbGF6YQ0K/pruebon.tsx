import { useEffect, useRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form";
import styles from './pruebon.module.css'

const pruebon = () => {

    const xRef = useRef<HTMLUListElement>(null)

    const x = () => {
        console.log('xxx');
        
        xRef.current?.classList.toggle(styles.active)
    }

    return (
        <>
            <nav className={styles.navbar}>
                <ul>
                    <li>__LOGO__</li>
                    <ul ref={xRef}>
                        <li> Quienes Somos </li>
                        <li>Habitaciones</li>
                        <li>Ubicacion y contacto</li>
                        <li>Instalaciones</li>
                        <li>Servicios</li>
                        <button>
                            RESERVAR
                        </button>
                    </ul>

                    <div className={styles.hamburger} onClick={x}>
                        <div className={styles.line} />
                        <div className={styles.line} />
                        <div className={styles.line} />
                    </div>
                </ul>
            </nav>

            <main className={styles.body}>
                <h5>CONTENIDO</h5>
            </main>
        </>
    )
}

export default pruebon