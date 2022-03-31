// React
import { useRef } from "react";

// Libraries

// Components and CSS
import styles from "./BtnFilter.module.css"

// Types
type btnFilter = {
    filterData: FilterButtonData,
    onClick: () => void
}

type FilterButtonData = {
    icon: string,
    title?: string,
    data: { text: string, onClick: () => void }[]
}

export default function BtnFilter(props: btnFilter) {

    const ulItemsRef = useRef<HTMLUListElement>(null)

    function handleStyles() {
        props.onClick
        ulItemsRef.current?.classList.toggle(styles['active'])
    }

    return (
        <div className={styles.btn_filter}>
            <button className={styles.btn_filter} onClick={handleStyles}>
                <div dangerouslySetInnerHTML={{ __html: props.filterData.icon }} />

            </button>
            <div className={styles.show_items}>
                <ul ref={ulItemsRef}>
                    {
                        props.filterData ? (
                            props.filterData.data.map((data: any, index: number) =>
                                <li key={index} onClick={data.onClick}>{data.text}</li>
                            )
                        ) : null
                    }
                </ul>
            </div>
        </div>
    )
}