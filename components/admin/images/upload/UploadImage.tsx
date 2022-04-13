// React
import { useEffect, useState } from "react";

// Libraries
// import { storage, Ref, ShowOrDownloadImage } from "../../../../config/firebase/clientApp"

// Components and CSS
import styles from "./UploadImage.module.css"

// Types
type UploadImage = {
    imageLoaded?: string,
    class: string,
    mainText: string,
    text: string,
    label: string,
    onClick?: () => void
    imageClick?: (file: string, imageName: string) => void
}

export default function UploadImage(props: UploadImage) {
    
    // Use State
    const [image, setImage] = useState<string>('')
    const [urlImage, setUrlImage] = useState<string>('')

    // Use Effect
    
    // Functions
    function handleImage(file: any) {
        let reader = new FileReader();
        
        if (reader.readAsDataURL && file[0]) {
            reader.readAsDataURL(file[0]);
            reader.onload = function () {
                if (reader.result) {
                    setImage(reader.result as string)
                     props.imageClick!(file[0], file[0].name)
                    if (props.imageLoaded) {
                        setUrlImage(reader.result as string)
                    }
                }
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }

    function removeImage() {
        setImage('')
        props.imageClick!('', '')
        if (urlImage) {
            setUrlImage('')
        }
    }

    useEffect(() => {
        if (props.imageLoaded) {
            setImage(props.imageLoaded)
            setUrlImage(props.imageLoaded)
        }
    }, [props.imageLoaded])

    return (
        <>
            <div className={styles.input_image}>
                <input
                    id={props.label}
                    type="file"
                    name="image"
                    accept="image/*"
                    className={styles.input}
                    onChange={(event) => handleImage(event?.target.files)}
                />
                <label
                    className={props.class == 'error_text_image' ? styles.input_image_error : ''}
                    htmlFor={props.label}
                >
                    <p>{props.mainText}</p>
                    <svg className={styles.svg_upload} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
                    </svg>
                    <p>{props.text}</p>
                </label>
            </div>
            
            {
                image || props.imageLoaded ? (
                    <div className={styles.image_container}>
                        <img className={styles.image} src={props.imageLoaded ? urlImage : image} alt="" />
                        {/* <Image className={styles.image} src={image} alt="Logo of Hotel" layout="fill" objectFit="cover" /> */}
                        <button type="button" className={styles.btn_remove_image} onClick={removeImage}>
                            <svg className={styles.icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                            </svg>
                        </button>
                    </div>
                ) : (<p className={styles.image_not_found}>No ha seleccionado ninguna imágen</p>)
            }
        </>
    )
}