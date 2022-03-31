// Components and CSS
import { Loader } from '../../../types/Loader'
import styles from './LoaderData.module.css'

const LoaderData = (props: Loader) => {

    return props.isOpen ? (
        (
            <div className={styles.loader} />
        )
    ) : null
}

export default LoaderData