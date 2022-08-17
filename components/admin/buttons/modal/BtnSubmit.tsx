// React

// Libraries

// Components and CSS
import { useEffect, useState } from "react"
import styles from "./BtnSubmit.module.css"

// Types
type btnSubmit = {
    title: string,
    loading?: boolean,
    onClick?: (e?: any) => void
}

export default function BtnSubmit(props: btnSubmit) {

    // Use State
    const [loading, setLoading] = useState<boolean>(false)

    // Use Effect

    useEffect(() => {
        if (props.loading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [props.loading, loading])

    return (
        <button
            type="submit"
            className={styles.btn_modal_submit}
            onClick={props.onClick}
            disabled={loading ? (true) : (false)}
        >
            {
                loading ? (
                    <div className={styles.loader} />
                ) : (<>{props.title}</>)
            }
        </button>
    )
}