// React
import router from "next/router"

// CSS
import styles from "../../styles/Demo1Home.module.css"

// Componets

// Libraries

// Helpers

// Types

const Demo1 = () => {

    // Variables

    // Functions
    const redirectTo = (url: string) => {
        router.push(url)
    }

    return (
        <div className={styles.container}>
            <div className={styles.image_left}>
                <img
                    className={styles.hotel_face}
                    src="/hotels/main/fachada-catedral-480x400.png"
                    alt="First Image"
                    srcSet="/hotels/main/fachada-catedral-480x400.png 240w,
                    /hotels/main/fachada-catedral-960x900.png 530w,
                    /hotels/main/fachada-catedral-1440x1040.png 720w,
                    /hotels/main/fachada-catedral-1920x1201.png 910w"
                    sizes="(max-width: 480px) 120px,
                    (max-width: 960px) 240px,
                    (max-width: 1440px) 530px,
                    910px
                "
                />

                <div className={styles.logo_container}>
                    <img
                        className={styles.logo}
                        src="/hotels/logos/catedral_logo_white.png"
                        alt="Hotel Plaza Catedral"
                    />

                    <button
                        className={styles.btn_hotel}
                        onClick={() => redirectTo('/demo-1/hotel/plaza-catedral')}
                    >
                        <span>
                            ENTRAR
                        </span>
                    </button>
                </div>
            </div>

            <div className={styles.image_right}>
                <img
                    className={styles.hotel_face}
                    src="/hotels/main/fachada-matamoros-480x400.png"
                    alt="First Image"
                    srcSet="/hotels/main/fachada-matamoros-480x400.png 240w,
                    /hotels/main/fachada-matamoros-960x900.png 530w,
                    /hotels/main/fachada-matamoros-1440x1040.png 720w,
                    /hotels/main/fachada-matamoros-1920x1600.png 910w"
                    sizes="(max-width: 480px) 120px,
                    (max-width: 960px) 240px,
                    (max-width: 1440px) 530px,
                    910px
                "
                />

                <div
                    className={styles.logo_container}
                    onClick={() => redirectTo('/demo-1/hotel/plaza-matamoros')}
                >
                    <img
                        className={styles.logo}
                        src="/hotels/logos/matamoros_logo_white.png"
                        alt="Hotel Plaza Matamoros"
                    />

                    <button className={styles.btn_hotel}>
                        <span>
                            ENTRAR
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Demo1