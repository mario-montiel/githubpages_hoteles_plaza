// Libraries
import { useEffect, useState } from "react";
import Image from "next/image"

// Components and CSS
import styles from './Carrousel.module.css'

// Types
type Carrousel = {
    src: String[],
    layout?: string,
    width?: number,
    height?: number,
    alt: string,
    isStop?: boolean
}

export default function Carrousel(props: Carrousel) {

    // Variables

    // States
    const [index, setIndex] = useState(0)
    const [inter, setInter] = useState<any>(null)

    // Use State
    useEffect(() => {
        showActualImage()
    }, [])

    // Functions
    function showActualImage() {
        setInter(setInterval(() => {
            setIndex(oldValue => (oldValue + 1))
        }, 4000))
    }

    function checkValidate() {
        if (props.isStop) {
            clearInterval(inter)
        }
    }

    function checkCarrousel() {
        if (index > (props.src.length - 1)) {
            setIndex(0)
        }
    }

    function decrement() {
        setIndex(oldValue => (oldValue - 1))
        if (index <= 0) {
            setIndex(oldValue => (props.src.length - 1))
        }
    }

    function increment() {
        setIndex(oldValue => (oldValue + 1))
        if (index >= (props.src.length - 1)) {
            setIndex(0)
        }
    }

    return (
        <div>
            {
                props.src.length > 0 ? (
                    <div className={styles.carrousel}>
                        <button className={styles.btn_left} onClick={decrement}>
                            <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                            </svg>
                        </button>

                        {
                            props.isStop ? (
                                checkValidate()
                            ) : null
                        }

                        <Image
                            src={props.src[index] as string}
                            layout="fill"
                            alt={props.alt}
                            objectPosition={'bottom'}
                        />
                        {checkCarrousel()}
                        {/* <img src={props.src[index] as string} alt="" /> */}
                        <button className={styles.btn_right} onClick={increment}>
                            <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </button>
                    </div>

                ) : (<p className={styles.image_not_found_text}>Cargando...</p>)
            }
        </div>
    )
}