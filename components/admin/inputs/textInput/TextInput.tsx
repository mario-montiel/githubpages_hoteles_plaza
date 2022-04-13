// React

// Libraries
import { useForm } from "react-hook-form";

// Components and CSS
import styles from "./TextInput.module.css"

// Types
type InputText = {
    name: string,
    label: string,
    placeholder: string,
    required: boolean
}

export default function InputText(props: InputText) {

    // Variables
    const loadStyles: boolean = true
    const { register, watch, formState: { errors } } = useForm();
    
    
    return (
        <div className={styles.input}>
        </div>
    )
}