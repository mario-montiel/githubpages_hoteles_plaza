// React
import router from "next/router"
import { useRef } from "react"

// CSS
import styles from "../../styles/Demo3Home.module.css"

// Componets

// Libraries

// Helpers

// Types

const Demo3 = () => {

    // Variables

    // Use Ref
    const MatamorosImageRef = useRef<HTMLDivElement>(null)
    const CatedralImageRef = useRef<HTMLDivElement>(null)

    // Functions
    const redirectTo = (url: string) => {
        router.push(url)
    }

    const handleStylesMainImage = () => {
        console.log('ENTRO');
        
        if (!MatamorosImageRef.current?.classList.contains(styles.zoom)) {
            MatamorosImageRef.current?.classList.add(styles.zoom)
        } else {
            MatamorosImageRef.current?.classList.remove(styles.zoom)
        }
    }

    return (
        <div className={styles.container}>

            <div
                className={styles.right}
            >
                {/* <div className={styles.main_blur} /> */}

                <div ref={MatamorosImageRef} className={styles.image_right}>
                    <img
                        className={styles.hotel_face}
                        src="/hotels/main/fachada-matamoros-480x400.webp"
                        alt="First Image"
                        srcSet="/hotels/main/fachada-matamoros-480x400.webp 240w,
                            /hotels/main/fachada-matamoros-960x900.webp 530w,
                            /hotels/main/fachada-matamoros-1440x1040.webp 720w,
                            /hotels/main/fachada-matamoros-1920x1600.webp 910w"
                        sizes="(max-width: 480px) 120px,
                            (max-width: 960px) 240px,
                            (max-width: 1440px) 530px,
                            910px
                        "
                    />

                    <div className={styles.blur} />

                    <div className={styles.logo_container}>
                        <div className={styles.logo_content}>
                            <img
                                className={styles.logo}
                                src="/hotels/logos/matamoros_logo.webp"
                                alt="Hotel Plaza Matamoros"
                            />

                            <button
                                className={styles.btn_hotel}
                                onClick={() => redirectTo('/demo-1/hotel/plaza-matamoros')}
                            >
                                <span>
                                    ENTRAR
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.left}>
                <div className={styles.image_left}>
                    <img
                        className={styles.hotel_face}
                        src="/hotels/main/fachada-catedral-480x400.webp"
                        alt="First Image"
                        srcSet="/hotels/main/fachada-catedral-480x400.webp 240w,
                    /hotels/main/fachada-catedral-960x900.webp 530w,
                    /hotels/main/fachada-catedral-1440x1040.webp 720w,
                    /hotels/main/fachada-catedral-1920x1201.webp 910w"
                        sizes="(max-width: 480px) 120px,
                    (max-width: 960px) 240px,
                    (max-width: 1440px) 530px,
                    910px
                "
                    />

                    <div className={styles.blur} />

                    <div className={styles.logo_container}>
                        <div className={styles.logo_content}>
                            <img
                                className={styles.logo}
                                src="/hotels/logos/catedral_logo.webp"
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
                </div>
            </div>
        </div>
    )
}

export default Demo3