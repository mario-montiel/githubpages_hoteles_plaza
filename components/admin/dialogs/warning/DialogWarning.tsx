// React
import Image from "next/image"

// Libraries

// Components and CSS
import styles from "./DialogWarning.module.css"

// Types
type DialogWarning = {
    image?: string,
    alt?: string,
    title?: string,
    description?: string,
    btnConfirm: string,
    btnCancel: string,
    onConfirm?: () => void,
    onClose?: () => void
}

export default function DialogWarning(props: DialogWarning) {
    
    return (
        <div className="overlay">
            <div className={styles.overlay_content}>
                {
                    props.image ? (
                        <img
                            className={styles.image}
                            src={props.image}
                            alt={props.alt}
                        />
                        // <Image
                        //     className={styles.image}
                        //     src={props.image}
                        //     layout="intrinsic"
                        //     width={50}
                        //     height={50}
                        //     alt={props.alt} />
                    ) : null
                }
                <p>{props.title}</p>
                <br />
                <p>{props.description}</p>
                <div className={props.btnConfirm && props.btnCancel ? styles.container : styles.container_alert}>
                    {
                        props.btnConfirm ? (
                            <button className={styles.btn_accept} onClick={props.onConfirm}>
                                <p>{props.btnConfirm}</p>
                            </button>
                        ) : null
                    }
                    {
                        props.btnCancel ? (
                            <button className={styles.btn_cancel} onClick={props.onClose}>
                                <p>{props.btnCancel}</p>
                            </button>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}