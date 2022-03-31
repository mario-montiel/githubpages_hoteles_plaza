// React

// Libraries

// Components and CSS
import { Loader as Loading } from "../../../types/Loader"
import styles from "./Loader.module.css"

// Types

export default function Loader(props: Loading) {

    return props.isOpen ? (
        (
            <div className="overlay">
                <div className={styles.loader_content}>
                    <div className={styles.loader} />
                    <p>{props.text}<b className={styles.period}>...</b></p>
                </div>
            </div>
        )
    ) : null
}