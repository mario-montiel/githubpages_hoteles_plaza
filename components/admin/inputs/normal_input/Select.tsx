
// CSS
import { useRef } from 'react';
import styles from './Select.module.css'

// Components

const SelectData = ({defaultValue, data, error, onClick}: any) => {
    console.log(data);
    
    // Variables

    // Use Ref
    const ulRef = useRef<HTMLUListElement>(null)

    // Use State

    // Functions
    const handleSelectItems = () => {
        ulRef.current?.classList.add(styles.active)
    }

    const handleSelectItemsOnBlur = () => {
        setTimeout(() => {
            if (ulRef.current?.classList.contains(styles.active) && ulRef.current.localName != 'UL') {
                ulRef.current?.classList.remove(styles.active)
            }
        }, 150);
    }

    const selectItem = (item: any) => {
        console.log(item);
    }

    const savingGuestBooking = () => {
        console.log('aqui andmoa');
        
    }

    return (
        <div className={styles.select_container}>
            <div className={styles.input_container}>
                <label htmlFor="selectValue"></label>
                <input
                    className={error ? 'input_error_text select' : 'input'}
                    type="text"
                    name="selectValue"
                    placeholder='Seleccone uno'
                    onFocus={handleSelectItems}
                    onBlur={handleSelectItemsOnBlur}
                    defaultValue={defaultValue ? defaultValue.name : 'Seleccione un huésped'}
                    readOnly
                    onClick={() => savingGuestBooking()}
                />
                <svg className={styles.svg_icon} viewBox="0 0 24 24" >
                    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
            </div>
            <ul ref={ulRef}>
                {
                    data.map((data: string, index: number) =>
                        <li onClick={() => selectItem(data)} key={index}>{'optionData.name'}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default SelectData