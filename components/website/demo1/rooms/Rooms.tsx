// React
import { useEffect, useRef, useState } from "react"

// CSS
import styles from "./Rooms.module.css"

// Componets

// Libraries

// Helpers
import { endpoint } from "../../../../config/endpoint"

// Types

const RoomsCatedralDemo1 = ({ roomUrl, width }: any) => {
    
    // Variables

    // Use State
    const [currentIndexImage, setCurrentIndexImage] = useState<number>(2)

    // Use Ref
    /* Gallery */
    const currentImageRef = useRef<any>(null)
    const smallImageRef = useRef<any>(null)
    /* Animations */
    const SimpleRoomRef = useRef<HTMLImageElement>(null)
    const DoubleRoomRef = useRef<HTMLImageElement>(null)
    const SimpleRoomTextRef = useRef<HTMLDivElement>(null)
    const DoubleRoomTextRef = useRef<HTMLDivElement>(null)

    // Functions
    /* Gallery */
    const generateSuiteRooms = () => {
        const html: any = []
        const siuteImages: number = 6
        for (let index = 1; index < siuteImages; index++) {
            html.push(
                <img
                    key={index}
                    className={styles.small_image}
                    src={`${roomUrl}suite_room${index}.webp`}
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
                    src={`${roomUrl}suite_room${index}.webp`}
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
                currentImageRef.current!.style.transform = width > 800 ? 'translate(15%)' : 'translate(0%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index - 1].classList.add(styles.selected)
                break;
            case 2:
                currentImageRef.current!.style.transform = width > 800 ? 'translate(-5%)' : 'translate(0%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index - 1].classList.add(styles.selected)
                break;
            case 3:
                currentImageRef.current!.style.transform = width > 800 ? 'translate(-25%)' : 'translate(0%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index - 1].classList.add(styles.selected)
                break;
            case 4:
                currentImageRef.current!.style.transform = width > 800 ? 'translate(-45%)' : 'translate(0%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index - 1].classList.add(styles.selected)
                break;
            case 5:
                currentImageRef.current!.style.transform = width > 800 ? 'translate(-65%)' : 'translate(0%)'
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

    /* Animations */
    const functionObserver = (entries: IntersectionObserverEntry[], observe: IntersectionObserver) => {
        entries.forEach((entry: IntersectionObserverEntry, index: number) => {
            const i = selectClassToRemove(entry.target)

            if (entry.isIntersecting) { entry.target.classList.remove(`is-hidden_${i}`) }
            else { entry.target.classList.add(`is-hidden_${i}`); }
        });
    }

    const selectClassToRemove = (elementTarget: Element) => {
        if (elementTarget == SimpleRoomRef.current) { return 'right' }
        if (elementTarget == DoubleRoomRef.current) { return 'left' }
        if (elementTarget == SimpleRoomTextRef.current) { return 'left' }
        if (elementTarget == DoubleRoomTextRef.current) { return 'right' }
    }

    // Use Effect
    /* Gallery */
    useEffect(() => {
        showSuiteImageSelected(currentIndexImage)
    }, [])

    /* Animations */
    useEffect(() => {
        let observer = new IntersectionObserver((entries: any, observe) => {
            functionObserver(entries, observe)
        });

        if (SimpleRoomRef.current) { observer.observe(SimpleRoomRef.current) }
        if (DoubleRoomRef.current) { observer.observe(DoubleRoomRef.current) }
        if (SimpleRoomTextRef.current) { observer.observe(SimpleRoomTextRef.current) }
        if (DoubleRoomTextRef.current) { observer.observe(DoubleRoomTextRef.current) }

        return () => {
            if (SimpleRoomRef.current) { observer.unobserve(SimpleRoomRef.current) }
            if (DoubleRoomRef.current) { observer.unobserve(DoubleRoomRef.current) }
            if (SimpleRoomTextRef.current) { observer.unobserve(SimpleRoomTextRef.current) }
            if (DoubleRoomTextRef.current) { observer.unobserve(DoubleRoomTextRef.current) }
        }
    }, [SimpleRoomRef.current, DoubleRoomRef.current, SimpleRoomTextRef.current, DoubleRoomTextRef.current])

    return (
        <section className={styles.rooms}>
            <h2>Habitaciones</h2>

            <img
                className={styles.texture_top_image}
                src={`${endpoint}/hotels/symbols/frame_texture_top_right.webp`}
                alt="texture_image"
            />

            <img
                className={styles.symbol}
                src={`${endpoint}/hotels/symbols/frame.webp`}
                alt="Símbolo"
            />

            {/* === ROOMS === */}
            {/* SIMPLE ROOM */}

            <div className={styles.simple_room_container}>
                <div ref={SimpleRoomTextRef} className={styles.text_container}>
                    <div className={styles.text}>
                        <h5>Habitación</h5>
                        <h5>Sencilla</h5>
                    </div>
                    <div className={styles.line} />
                </div>

                <img
                    ref={SimpleRoomRef}
                    className={styles.simple_room_image}
                    src={`${roomUrl}simple_room.webp`}
                    alt="Recepción"
                />
            </div>

            {/* DOUBLE ROOM */}

            <div className={styles.double_room_container}>
                <div />
                <img
                    ref={DoubleRoomRef}
                    className={styles.double_room_image}
                    src={`${roomUrl}double_room.webp`}
                    alt="Recepción"
                />
                <div ref={DoubleRoomTextRef} className={styles.text_container}>
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

            <div>
                <h2>Suite</h2>

                <img
                    className={styles.symbol}
                    src={`${endpoint}/hotels/symbols/frame.webp`}
                    alt="Símbolo"
                />
                <div className={styles.suite_room_container}>


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
            </div>

        </section>
    )
}

export default RoomsCatedralDemo1