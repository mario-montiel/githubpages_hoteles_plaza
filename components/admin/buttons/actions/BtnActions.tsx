// React

// Libraries

// Components and CSS
import styles from "./BtnActions.module.css"

// Types
type btnSubmit = {
    icon: string,
    title?: string,
    onClick: () => void
}

export default function BtnActions(props: btnSubmit) {

    return (
        <button className={styles.btn_action} onClick={props.onClick}>
            <div dangerouslySetInnerHTML={{__html: props.icon}} />
        </button>
    )
}