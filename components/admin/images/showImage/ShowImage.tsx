// React

// Libraries

// Components and CSS
import Image from "next/image"
import { useEffect, useRef } from "react";
// import styles from "./ShowImage.module.css"

// Types
type ShowImage = {
    loader?: () => void,
    src: string,
    width: number,
    height: number,
    unoptimized?: boolean,
    alt?: string,
    onClick?: boolean
    // array: Array<Object>

    // Recorrer el array
}

export default function ShowImage(props: ShowImage) {

    // Variables
    const showImageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        closeImage()
    }, [props.onClick])

    // Functions
    function closeImage() {
        if (!showImageRef.current?.classList.contains('active')) {
            showImageRef.current?.classList.add('active')
        } else {
            showImageRef.current.classList.remove('active')
        }
    }

    return (
        <div>
            <Image className="image-table"
                {
                ...props.loader ? () => props.src : null
                }
                src={props.src!}
                unoptimized={true}
                width={props.width}
                height={props.height}
                alt={props.alt}
                onClick={(closeImage)}
            />
            <div className="show-image active" ref={showImageRef}>
                <button className="btn-image"
                    onClick={closeImage}>
                    <svg className="svg-icon" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </button>
                <img src={props.src} />
            </div>
        </div>
    )
}