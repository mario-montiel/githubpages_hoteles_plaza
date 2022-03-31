
// CSS
import styles from './LoaderPage.module.css'

// Components
import LoaderData from '../loaderData/loaderData'

const LoaderPage = (props: any) => {
    
    return props && props.isShow ? (
        <div className={styles.loader_container}>
            <div className={styles.loader}>
                <LoaderData isOpen={true} />
            </div>
            <div className={styles.text}>
                <p>Cargando</p>
            </div>
        </div>
    ) : null
}

export default LoaderPage