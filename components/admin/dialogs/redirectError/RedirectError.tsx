// React

// Libraries

// Components and CSS
import styles from "./DialogConfirm.module.css"

// Types
type DialogRedirectError = {
    image?: string,
    title: string,
    description?: string,
    btnConfirm: string,
    onRedirect: () => void
}

export default function DialogRedirectError(props: DialogRedirectError) {

    return (
        <div className="overlay">
            <div className={styles.overlay_content}>
                <p>{props.title}</p>
                <br />
                <p>{props.description}</p>
                <div className={styles.container}>
                    <button className={styles.btn_accept} onClick={props.onRedirect}>
                        <p>{props.btnConfirm}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}