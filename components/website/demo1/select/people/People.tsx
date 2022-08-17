
// React and Next

// CSS
import { useEffect, useRef, useState } from 'react'
import styles from './People.module.css'

// Type
type People = {
    adults: number,
    children: number
}

type PeopleData = {
    peopleSelected?: any,
    sendData: (people: People) => void
}

export default function PeopleAndChildren({ peopleSelected, sendData } : PeopleData) {
    
    // Variables
    const initialValues = {
        adults: 1,
        children: 0
    }

    // Use Ref
    const btnMoreAdults = useRef<HTMLButtonElement>(null)
    const btnLessAdults = useRef<HTMLButtonElement>(null)
    const btnMoreChildren = useRef<HTMLButtonElement>(null)
    const btnLessChildren = useRef<HTMLButtonElement>(null)
    const peopleSelectDataRef = useRef<HTMLUListElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    // Use State
    const [data, setData] = useState(initialValues)

    // Functions
    const changeData = (type: string, action: string) => {
        if (type == 'adult') {
            if (action == '+') {
                setData({
                    ...data,
                    adults: data.adults + 1,
                    children: data.children
                })
            } else {
                setData({
                    ...data,
                    adults: data.adults - 1,
                    children: data.children
                })
            }
        } else {
            if (action == '+') {
                setData({
                    ...data,
                    adults: data.adults,
                    children: data.children + 1
                })
            } else {
                setData({
                    ...data,
                    adults: data.adults,
                    children: data.children - 1
                })
            }
        }
    }

    const handleStyles = () => {
        peopleSelectDataRef.current?.classList.toggle(styles.show_data)
        overlayRef.current?.classList.toggle(styles.show_data)
    }

    const showPeople = (people: string) => {
        const peopleSplit = people.split('/')
        setData({
            ...data,
            adults: parseInt(peopleSplit[0]),
            children: parseInt(peopleSplit[1])
        })
        sendData(data)
    }

    // Use Effect
    useEffect(() => {
        if (data.adults < 2) { btnLessAdults.current?.classList.add(styles.btn_disabled) }
        else {
            btnLessAdults.current?.classList.remove(styles.btn_disabled)
        }

        if (data.adults >= 10) { btnMoreAdults.current?.classList.add(styles.btn_disabled) }
        else { btnMoreAdults.current?.classList.remove(styles.btn_disabled) }

        if (data.children < 1) { btnLessChildren.current?.classList.add(styles.btn_disabled) }
        else { btnLessChildren.current?.classList.remove(styles.btn_disabled) }

        if (data.children >= 10) { btnMoreChildren.current?.classList.add(styles.btn_disabled) }
        else { btnMoreChildren.current?.classList.remove(styles.btn_disabled) }

        sendData(data)
    }, [data])

    useEffect(() => {
        if (peopleSelected) {
            showPeople(peopleSelected)
        }
    }, [peopleSelected])

    return (
        <div className={styles.people_container}>
            <div className={styles.overlay} ref={overlayRef} onClick={handleStyles} />
            <ul className={styles.people_data} onClick={handleStyles}>
                <li>
                    <svg className={styles.svg_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                    {data.adults} Adultos - {data.children} Niños
                </li>
            </ul>
            <ul ref={peopleSelectDataRef} className={styles.people_select_data}>
                <li>
                    <div className={styles.people_select_data_container}>
                        <div>
                            Adulto
                        </div>
                        <div className={styles.button_container}>
                            <button ref={btnLessAdults} onClick={() => changeData('adult', '-')}>
                                <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                                </svg>
                            </button>
                            {data.adults}
                            <button ref={btnMoreAdults} onClick={() => changeData('adult', '+')}>
                                <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={styles.people_select_data_container}>
                        <div>
                            Niños
                        </div>
                        <div className={styles.button_container}>
                            <button ref={btnLessChildren} onClick={() => changeData('children', '-')}>
                                <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                                </svg>
                            </button>
                            {data.children}
                            <button ref={btnMoreChildren} onClick={() => changeData('children', '+')}>
                                <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}




// // React and Next
// import { useForm } from 'react-hook-form';

// // Libraries

// // CSS
// import styles from './People.module.css'

// // Components

// // Helpers

// // Types
// import { useRef, useState } from 'react';
// import { TypeOptions } from 'react-toastify';

// const People = ({ PeopleSelected, showMessage, OnClose }: any) => {

//     // Variables
//     const initialPeopleValue = {
//         adults: 1,
//         children: 0
//     }

//     // Use Ref
//     const sendDataToShowMessage = (text: string, duration: number, typeOptions: TypeOptions) => {
//         showMessage(text, duration, typeOptions)
//     }

//     const overlayRef = useRef<HTMLDivElement>(null)

//     // Use State}
//     const [peopleData, setPeopleData] = useState(initialPeopleValue)

//     // Functions
//     const validateDataSelected = () => {
//         if (peopleData.adults < 1) {
//             setPeopleData({
//                 ...peopleData,
//                 adults: 1,
//                 children: peopleData.children
//             })

//             return { res: false, message: 'Por favor ingrese como mínimo 1 adulto' }
//         }

//         if (peopleData.children < 0) {
//             setPeopleData({
//                 ...peopleData,
//                 adults: 1,
//                 children: 0
//             })

//             return { res: false, message: 'Por favor ingrese valores correctos' }
//         }

//         return { res: true, message: '' }
//     }

//     const getPeopleData = (e: any) => {
//         const { value, name } = e.target
//         setPeopleData({
//             ...peopleData,
//             [name]: parseInt(value)
//         })
//     }

//     const sendPeopleDta = () => {
//         const validate = validateDataSelected()

//         if (!validate.res) {OnClose(); return sendDataToShowMessage(validate.message, 6000, 'warning') }

//         PeopleSelected(peopleData)
//         OnClose()
//     }

//     // Use Effect

//     return (
//         <>
//             <div ref={overlayRef} className={styles.overlay} onClick={OnClose} />
//             <div className={styles.people_container}>
//                 <div className={styles.select_container}>
//                     <div className={styles.select_group}>
//                         <label htmlFor="adults">Adultos:</label>
//                         <br />
//                         <input
//                             id="adults"
//                             name='adults'
//                             type="number"
//                             defaultValue={1}
//                             className={styles.input_people}
//                             onChange={(e: any) => getPeopleData(e)}
//                         />
//                     </div>

//                     <div className={styles.select_group}>
//                         <label htmlFor="children">Children:</label>
//                         <br />
//                         <input
//                             id="children"
//                             type="number"
//                             name='children'
//                             defaultValue={0}
//                             className={styles.input_people}
//                             onChange={(e: any) => getPeopleData(e)}
//                         />
//                     </div>
//                 </div>
//                 <button onClick={sendPeopleDta}> Aceptar </button>
//             </div>
//         </>
//     )
// }

// export default People