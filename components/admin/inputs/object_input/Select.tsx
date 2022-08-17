
// CSS
import { useEffect, useRef, useState } from 'react';
import styles from './Select.module.css'

// Components

const SelectObjectData = ({ isError, textError, placeholder, show, data, onClick }: any) => {

    // Variables
    const initialErrorValues = {
        isError: true,
        count: 0,
        text: ''
    }

    // Use Ref
    const ulRef = useRef<HTMLUListElement>(null)

    // Use State
    // const [showError, setShowError] = useState<boolean>(false)
    const [objectSelected, setObjectSelected] = useState()
    const [error, setError] = useState(initialErrorValues)

    // Functions
    const handleSelectItems = () => { ulRef.current?.classList.add(styles.active) }

    const handleSelectItemsOnBlur = () => {
        setTimeout(() => {
            if (ulRef.current?.classList.contains(styles.active) && ulRef.current.localName != 'UL') {
                ulRef.current?.classList.remove(styles.active)
            }
        }, 150);
    }

    const selectItem = (item: any) => {
        setError({
            ...error,
            isError: false,
            count: 0,
            text: ''
        })
        onClick(item)
        setObjectSelected(item)
    }

    useEffect(() => {
        if (isError) {
            setError({
                ...error,
                isError: true,
                count: 1,
                text: textError
            })
        }
    }, [isError])

    return (
        <div className={styles.select_container}>
            <div className={styles.input_container} onFocus={handleSelectItems}>
                <label htmlFor="selectValue"></label>
                <input
                    className={isError ? `input ${styles.input_rouded_error}` : 'input'}
                    type="text"
                    name="selectValue"
                    placeholder={placeholder}
                    onBlur={handleSelectItemsOnBlur}
                    value={objectSelected ? objectSelected[show] : ''}
                    readOnly
                />
                <svg className={styles.svg_icon} viewBox="0 0 24 24" >
                    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
            </div>

            {
                error.count && error.isError ? (
                    <small>{error.text}</small>
                ) : null
            }

            <ul ref={ulRef}>
                {
                    data.map((data: string, index: number) =>
                        <li onClick={() => selectItem(data)} key={index}>{data[show]}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default SelectObjectData