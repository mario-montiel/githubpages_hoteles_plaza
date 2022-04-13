// React

// Libraries

// Components and CSS
import styles from "./DialogConfirm.module.css"

// Types
type DialogConfirm = {
    image?: string,
    title: string,
    description?: string,
    btnConfirm: string,
    btnCancel: string,
    onConfirm: () => void,
    onClose: () => void
}

export default function DialogConfirm(props: DialogConfirm) {

    return (
        <div className="overlay">
            <div className={styles.overlay_content}>
                <h5>Ingrese su contraseña</h5>
                <p>Para mayor seguidad es necesario que ingrese la contraseña de su usuario</p>
                <form>
                    <input type="password" placeholder="Ingrese su contraseña" />
                </form>
            </div>
        </div>
    )
}