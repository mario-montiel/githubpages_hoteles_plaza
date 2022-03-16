// React
import { useEffect, useRef, useState } from "react"

// CSS
import styles from "./Rooms.module.css"

// Componets

// Libraries

// Helpers
import { endpoint } from "../../../../../config/endpoint"

// Types

const RoomsCatedralDemo1 = () => {

    // Variables

    // Use State
    const [currentIndexImage, setCurrentIndexImage] = useState<number>(2)

    // Use Ref
    const currentImageRef = useRef<any>(null)
    const smallImageRef = useRef<any>(null)

    // Functions
    const generateSuiteRooms = () => {
        const html: any = []
        const siuteImages: number = 6
        for (let index = 1; index < siuteImages; index++) {
            html.push(
                <img
                    key={index}
                    className={styles.small_image}
                    src={`${endpoint}/hotels/rooms/catedral/suite_room${index}.png`}
                    alt="Imágen de la habitación suite"
                    onMouseEnter={() => selectSuiteImage(index)}
                />
            )
        }

        return html
    }

    const generateCurrentSuiteImageSelected = () => {
        const html: any = []
        const siuteImages: number = 6
        for (let index = 1; index < siuteImages; index++) {
            html.push(
                <img
                    key={index}
                    className={`${styles.current_image_selected} suit-images-to-show`}
                    src={`${endpoint}/hotels/rooms/catedral/suite_room${index}.png`}
                    alt="Imágen de la habitación suite"
                    onClick={() => selectSuiteImage(index)}
                />
            )
        }

        return html
    }

    const showSuiteImageSelected = (index: number) => {
        const images = currentImageRef.current?.children as NodeListOf<HTMLImageElement>
        const smallImages = smallImageRef.current?.children as NodeListOf<HTMLImageElement>
        
        for (let i = 0; i < images.length; i++) {
            images[i].classList.remove(styles.selected)
            smallImages[i].classList.remove(styles.selected)
        }

        switch (index) {
            case 1:
                currentImageRef.current!.style.transform = 'translate(15%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index - 1].classList.add(styles.selected)
                break;
            case 2:
                currentImageRef.current!.style.transform = 'translate(-5%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index - 1].classList.add(styles.selected)
                break;
            case 3:
                currentImageRef.current!.style.transform = 'translate(-25%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index - 1].classList.add(styles.selected)
                break;
            case 4:
                currentImageRef.current!.style.transform = 'translate(-45%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index - 1].classList.add(styles.selected)
                break;
            case 5:
                currentImageRef.current!.style.transform = 'translate(-65%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index - 1].classList.add(styles.selected)
                break;
            default:
                break;
        }
    }

    const selectSuiteImage = (index: number) => {
        setCurrentIndexImage(index)
        showSuiteImageSelected(index)
    }

    useEffect(() => {
        showSuiteImageSelected(currentIndexImage)
    }, [])

    return (
        <section className={styles.who_we_are}>
            <h2>Habitaciones</h2>

            <img
                className={styles.texture_top_image}
                src={`${endpoint}/hotels/symbols/frame_texture_top_right.png`}
                alt="texture_image"
            />

            <img
                className={styles.symbol}
                src={`${endpoint}/hotels/symbols/frame.png`}
                alt="Símbolo"
            />

            {/* === ROOMS === */}
            {/* SIMPLE ROOM */}

            <div className={styles.simple_room_container}>
                <div className={styles.text_container}>
                    <div className={styles.text}>
                        <h5>Habitación</h5>
                        <h5>Sencilla</h5>
                    </div>
                    <div className={styles.line} />
                </div>

                <img
                    className={styles.simple_room_image}
                    src={`${endpoint}/hotels/rooms/catedral/simple_room.png`}
                    alt="Recepción"
                />
            </div>

            {/* DOUBLE ROOM */}

            <div className={styles.double_room_container}>
                <div />
                <img
                    className={styles.double_room_image}
                    src={`${endpoint}/hotels/rooms/catedral/double_room.png`}
                    alt="Recepción"
                />
                <div className={styles.text_container}>
                    <div className={styles.text_subcontainer}>
                        <div className={styles.text}>
                            <h5>Habitación</h5>
                            <h5>Doble</h5>
                        </div>
                        <div className={styles.line} />
                    </div>
                </div>
            </div>

            {/* SUITE ROOM */}

            <div className={styles.suite_room_container}>
                <h2>Suite</h2>

                <img
                    className={styles.symbol}
                    src={`${endpoint}//hotels/symbols/frame.png`}
                    alt="Símbolo"
                />

                <div
                    ref={currentImageRef}
                    className={styles.current_image_container}>
                    {generateCurrentSuiteImageSelected()}
                </div>

                <div
                    ref={smallImageRef}
                    className={styles.small_images}>
                    {generateSuiteRooms()}
                </div>
            </div>

        </section>
    )
}

export default RoomsCatedralDemo1