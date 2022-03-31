
// CSS
import { useRef } from 'react';
import { RoomType } from '../../../../../types/RoomType';
import styles from './Select.module.css'

// Components

const SelectRoom = (props: any) => {

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

    const selectItem = (item: RoomType) => {
        const input = document.querySelector('.input') as HTMLInputElement;
        input.value = item.name
        props.selectRoomType(item)
    }

    return (
        <div className={styles.select_container}>
            <div className={styles.input_container}>
                <label htmlFor="selectValue"></label>
                <input
                    className={props.error ? 'input_error_text select' : 'input'}
                    type="text"
                    name="selectValue"
                    placeholder='Seleccone uno'
                    onFocus={handleSelectItems}
                    onBlur={handleSelectItemsOnBlur}
                    defaultValue={props.defaultValue ? props.defaultValue.name : 0}
                    readOnly
                />
                <svg className={styles.svg_icon} viewBox="0 0 24 24" >
                    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
            </div>
            <ul ref={ulRef}>
                {
                    props.data.map((optionData: RoomType, index: number) =>
                        <li value={optionData.id} onClick={() => selectItem(optionData)} key={index}>{optionData.name}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default SelectRoom