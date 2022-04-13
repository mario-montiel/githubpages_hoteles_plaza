
// Components and CSS
import styles from './ModalCreate.module.css'

const ModalCreate = (props: any) => {
    
    // Variables

    // Use State

    // Functions

    return (
        <div className="overlay create-modal">
            <div className={styles.modal_create_content}>
                {props.children}
            </div>
        </div>
    )
}

export default ModalCreate