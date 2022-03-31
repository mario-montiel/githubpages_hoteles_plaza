// React
import { useEffect, useRef, useState } from "react"

// CSS
import styles from "./Facilities.module.css"

// Componets

// Libraries

// Helpers
import { endpoint } from "../../../../config/endpoint"

// Types

const FacilitiesDemo1 = ({ url, sections }: any) => {

    // Variables
    const initialImageSectionValue = {
        section: 1,
        tPagination: 3,
        start: 1,
        end: 5
    }

    // Use State
    const [imageSection, setImageSection] = useState(initialImageSectionValue)

    // Use Ref
    const currentImageRef = useRef<any>(null)
    const smallImageRef = useRef<any>(null)
    const leftIconRef = useRef<any>(null)
    const rightIconRef = useRef<any>(null)
    const circlesContainerRef = useRef<any>(null)

    // Functions
    const generateFacilitiesRooms = () => {
        const html: any = []
        for (let index = imageSection.start; index < imageSection.end; index++) {
            html.push(
                <img
                    key={index}
                    src={`${url}${index}-400x300.webp`}
                    className={styles.small_image}
                    alt="Imágen de las instalaciones del hotel plaza"
                    onMouseEnter={() => showFacilitiesImageSelected(index)}
                />
            )
        }

        return html
    }

    const generateCurrentFacilityImageSelected = () => {
        const html: any = []
        for (let index = imageSection.start; index < imageSection.end; index++) {
            html.push(
                <img
                    key={index}
                    src={`${url}${index}.webp`}
                    alt="Imágen de la habitación suite"
                    className={`${styles.current_image_selected} suit-images-to-show`}
                />
            )
        }

        return html
    }

    const showFacilitiesImageSelected = (index: number) => {
        const images = currentImageRef.current?.children as NodeListOf<HTMLImageElement>
        const smallImages = smallImageRef.current?.children as NodeListOf<HTMLImageElement>

        for (let i = 0; i < images.length; i++) {
            images[i].classList.remove(styles.selected)
            smallImages[i + 1].classList.remove(styles.selected)
        }

        switch (index) {
            case 1:
                currentImageRef.current!.style.transform = 'translate(15%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index].classList.add(styles.selected)
                break;
            case 2:
                currentImageRef.current!.style.transform = 'translate(-5%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index].classList.add(styles.selected)
                break;
            case 3:
                currentImageRef.current!.style.transform = 'translate(-25%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index].classList.add(styles.selected)
                break;
            case 4:
                currentImageRef.current!.style.transform = 'translate(-45%)'
                currentImageRef.current!.children[index - 1].classList.add(styles.selected)
                smallImageRef.current!.children[index].classList.add(styles.selected)
                break;
            case 5:
                currentImageRef.current!.style.transform = 'translate(15%)' /* -65% */
                currentImageRef.current!.children[index - 5].classList.add(styles.selected)
                smallImageRef.current!.children[index - 4].classList.add(styles.selected)
                break;
            case 6:
                currentImageRef.current!.style.transform = 'translate(-5%)' /* -85% */
                currentImageRef.current!.children[index - 5].classList.add(styles.selected)
                smallImageRef.current!.children[index - 4].classList.add(styles.selected)
                break;
            case 7:
                currentImageRef.current!.style.transform = 'translate(-25%)' /* -105% */
                currentImageRef.current!.children[index - 5].classList.add(styles.selected)
                smallImageRef.current!.children[index - 4].classList.add(styles.selected)
                break;
            case 8:
                currentImageRef.current!.style.transform = 'translate(-45%)' /* -125% */
                currentImageRef.current!.children[index - 5].classList.add(styles.selected)
                smallImageRef.current!.children[index - 4].classList.add(styles.selected)
                break;
            case 9:
                currentImageRef.current!.style.transform = 'translate(-65%)' /* -145% */
                currentImageRef.current!.children[index - 5].classList.add(styles.selected)
                smallImageRef.current!.children[index - 4].classList.add(styles.selected)
                break;
            case 10:
                currentImageRef.current!.style.transform = 'translate(15%)' /* -165% */
                currentImageRef.current!.children[index - 10].classList.add(styles.selected)
                smallImageRef.current!.children[index - 9].classList.add(styles.selected)
                break;
            case 11:
                currentImageRef.current!.style.transform = 'translate(-5%)' /* -185% */
                currentImageRef.current!.children[index - 10].classList.add(styles.selected)
                smallImageRef.current!.children[index - 9].classList.add(styles.selected)
                break;
            case 12:
                currentImageRef.current!.style.transform = 'translate(-25%)' /* -205% */
                currentImageRef.current!.children[index - 10].classList.add(styles.selected)
                smallImageRef.current!.children[index - 9].classList.add(styles.selected)
                break;
            case 13:
                currentImageRef.current!.style.transform = 'translate(-45%)' /* -225% */
                currentImageRef.current!.children[index - 10].classList.add(styles.selected)
                smallImageRef.current!.children[index - 9].classList.add(styles.selected)
                break;
            default:
                break;
        }
    }

    const btnRightIcon = () => {
        const html: any = []

        if (imageSection.section >= 1 && imageSection.section <= (sections - 1)) {
            html.push(
                <svg
                    key={0}
                    ref={rightIconRef}
                    viewBox="0 0 24 24"
                    className={styles.icon_right}
                    onClick={() => setImageSection({
                        ...imageSection,
                        section: imageSection.section + 1
                    })}
                >
                    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
            )
        } else {
            html.push(
                <div />
            )
        }

        return html
    }

    const btnLeftIcon = () => {
        const html: any = []

        if (imageSection.section <= 1) {
            html.push(
                <div />
            )
        } else {
            html.push(
                <svg
                    key={0}
                    ref={leftIconRef}
                    className={styles.icon_left}
                    viewBox="0 0 24 24"
                    onClick={() => setImageSection({
                        ...imageSection,
                        section: imageSection.section - 1
                    })}
                >
                    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                </svg>
            )
        }

        return html
    }

    const showSmallImagesSelected = () => {
        switch (imageSection.section) {
            case 1:
                setImageSection({
                    ...imageSection,
                    start: 1,
                    end: 5
                })
                break;
            case 2:
                setImageSection({
                    ...imageSection,
                    start: 5,
                    end: 9
                })
                break;
            case 3:
                setImageSection({
                    ...imageSection,
                    start: 10,
                    end: 14
                })
                break;
        }

        setTimeout(() => {
            currentImageRef.current!.style.transform = 'translate(-5%)'
            currentImageRef.current!.children[1].classList.add(styles.selected)
            smallImageRef.current!.children[2].classList.add(styles.selected)
        }, 100);
    }

    const generateCircles = () => {
        const html: any = []

        for (let index = 0; index < sections; index++) {
            html.push(
                <div
                    key={index}
                    className={styles.circles}
                    onClick={() => setImageSection({
                        ...imageSection,
                        section: index + 1
                    })}
                />
            )
        }

        if (circlesContainerRef.current) {
            printCircleSelected()
        }

        return html
    }

    const printCircleSelected = () => {
        const aCircles = circlesContainerRef.current!.children
        
        for (let index = 0; index < aCircles.length; index++) {
            const circle: HTMLDivElement = aCircles[index];
            circle.classList.remove(styles.circle_selected)
        }

        circlesContainerRef.current!.children[imageSection.section - 1].classList.add(styles.circle_selected)
    }

    useEffect(() => {
        showSmallImagesSelected()
    }, [imageSection.section])

    return (
        <section className={styles.facilities}>
            <h2>Instalaciones</h2>

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

            <p>Cómodas instalaciones para hacer de su estancia
                una experiencia única.</p>

            <div className={styles.gallery_container}>
                <h2>Galeria</h2>

                <div
                    ref={currentImageRef}
                    className={styles.current_image_container}
                >
                    {generateCurrentFacilityImageSelected()}
                </div>

                <div
                    ref={smallImageRef}
                    className={styles.small_images_container}>

                    {btnLeftIcon()}

                    {generateFacilitiesRooms()}

                    {btnRightIcon()}
                </div>

                <div
                    ref={circlesContainerRef}
                    className={styles.circles_container}
                >
                    {generateCircles()}
                </div>
            </div>

        </section>
    )
}

export default FacilitiesDemo1