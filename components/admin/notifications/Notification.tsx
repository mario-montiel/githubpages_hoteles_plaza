// React

// Libraries

// Components and CSS
import styles from "./Notification.module.css"

// Types
type Notification = {
    title: string,
    description?: string,
    onClick: () => void
}

export default function Notification(props: Notification) {

    return (
        <div className={styles.notification}>
            <div className={styles.notification_info}>
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                <div className="text"> 
                    <p>{props.title}</p>
                    <br />
                    <p>{props.description}</p>
                </div>
            </div>
            <button onClick={props.onClick}>
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
                </svg>
            </button>
        </div>
    )
}