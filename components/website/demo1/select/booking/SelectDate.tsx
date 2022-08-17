// React and Next

// CSS
import styles from './SelectDate.module.css'
import 'react-toastify/dist/ReactToastify.css';

// Variables

// Componets

// Libraries
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { days, months, totalDaysOfMonth } from '../../../../../helpers/dates';
// import SelectMultipleDates from '../multipleDates/SelectMultipleDates';
import SelectDateOfMonth from '../multipleDates/SelectMultipleDates';
import { NextRouter } from 'next/router';

// Helpers

// Types
type CheckDate = {
    day: number,
    date: number,
    month: number,
    year: number
}

type DateSelected = {
    checkIn: {
        day: number,
        date: number,
        month: number,
        year: number
    },
    checkOut: {
        day: number,
        date: number,
        month: number,
        year: number
    }
}

type DateSelectedObject = {
    initial: any,
    end: any
}

type DateData = {
    dateSelected?: DateSelectedObject,
    sendData: (date: DateSelected) => void
}

export default function SelectDate({ dateSelected, sendData }: DateData) {

    // Variables
    const date1 = new Date()
    const date2 = new Date(`${date1.getFullYear()} ${date1.getMonth() + 2} ${date1.getDate()}`)
    const initialDateValues = {
        checkIn: {
            day: date1.getDay(),
            date: totalDaysOfMonth(date1.getFullYear(), date1.getMonth()),
            month: date1.getMonth(),
            year: date1.getFullYear()
        },
        checkOut: {
            day: date2.getDay() + 1,
            date: totalDaysOfMonth(date2.getFullYear(), date2.getMonth() + 1),
            month: date2.getMonth(),
            year: date2.getFullYear()
        }
    }
    const dateValues = {
        checkIn: {
            day: date1.getDay(),
            date: date1.getDate(),
            month: date1.getMonth(),
            year: date1.getFullYear()
        },
        checkOut: {
            day: date1.getDay(),
            date: date1.getDate() + 1,
            month: date1.getMonth(),
            year: date1.getFullYear()
        }
    }

    // Use Ref
    const overlayRef = useRef<HTMLDivElement>(null)
    const dateContainerRef = useRef<HTMLDivElement>(null)

    // Use State
    const [dateData, setDateData] = useState(initialDateValues)
    const [bookingDate, setBookingDate] = useState(dateValues)
    const [monthCount, setMonthCount] = useState<number>(0)
    const [clicked, setClicked] = useState<number>(0)
    // const [showDate, setShowDate] = useState<boolean>(false)

    // Functions
    const selectDate = (date: CheckDate, clicked: number) => {
        if (clicked == 0) { fillDateData(date, 'initial') }

        if (clicked == 1) {
            if (
                bookingDate.checkIn.date > date.date &&
                bookingDate.checkIn.month >= date.month
            ) {
                fillDateData(date, 'initial')
                return setClicked(0)
            } else {
                fillDateData(date, 'end')
                showDateContainer()
            }
        }
    }

    const fillDateData = (date: CheckDate, type_date: string) => {
        setBookingDate({
            ...bookingDate,
            checkIn: {
                day: type_date == 'initial' ? date.day : bookingDate.checkIn.day,
                date: type_date == 'initial' ? date.date : bookingDate.checkIn.date,
                month: type_date == 'initial' ? date.month : bookingDate.checkIn.month,
                year: type_date == 'initial' ? date.year : bookingDate.checkIn.year,
            },
            checkOut: {
                day: type_date == 'end' ? date.day : 0,
                date: type_date == 'end' ? date.date : 0,
                month: type_date == 'end' ? date.month : 0,
                year: type_date == 'end' ? date.year : 0,
            }
        })
    }

    const changeCount = (type: string) => {
        if (type == '-' && monthCount > 0) {
            setMonthCount(monthCount - 1)
        }

        if (type == '+' && monthCount < 6) {
            setMonthCount(monthCount + 1)
        }
    }

    const increaseClickedCount = (date?: CheckDate) => {
        if (
            date && bookingDate.checkOut.date > bookingDate.checkIn.date &&
            bookingDate.checkOut.date > 0 &&
            bookingDate.checkOut.year > 0) {
            setClicked(0)

        } else { setClicked(clicked + 1) }
    }

    const showDateContainer = () => {
        overlayRef.current?.classList.toggle(styles.show)
        dateContainerRef.current?.classList.toggle(styles.show_date_container)
    }

    const showDateSelected = (dateSelected: DateSelectedObject) => {
        const initial = dateSelected.initial
        const end = dateSelected.end
        const initialSplit = initial.split('/')
        const endSplit = end.split('/')
        const initialDate = new Date(`${initialSplit[0]} ${initialSplit[1]} ${initialSplit[2]}`)
        const endDate = new Date(`${endSplit[0]} ${endSplit[1]} ${endSplit[2]}`)

        setBookingDate({
            ...dateData,
            checkIn: {
                day: initialDate.getDay(),
                date: initialDate.getDate(),
                month: initialDate.getMonth(),
                year: initialDate.getFullYear()
            },
            checkOut: {
                day: endDate.getDay(),
                date: endDate.getDate(),
                month: endDate.getMonth(),
                year: endDate.getFullYear()
            }
        })
        sendData(bookingDate)
    }

    // Use Effect
    useEffect(() => { if (clicked > 1) { setClicked(0) } sendData(bookingDate) }, [bookingDate])

    useEffect(() => {
        if (dateSelected?.initial && dateSelected.end) { showDateSelected(dateSelected) }
    }, [dateSelected, dateData.checkIn.date, dateData.checkOut.date])

    return (
        <div className={styles.date_container}>
            <div ref={overlayRef} className={styles.overlay} onClick={showDateContainer} />
            <div className={styles.check_date_container} onClick={showDateContainer}>
                <div className={styles.check_date}>
                    <svg className={styles.svg_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z" />
                    </svg>
                    {days[bookingDate?.checkIn.day].substring(0, 3).toLocaleLowerCase()} {bookingDate?.checkIn.date} {months[bookingDate?.checkIn.month].substring(0, 3).toLocaleLowerCase()}
                    <span>−</span>
                    {
                        dateData.checkOut.day > 0 && bookingDate.checkOut.month > 0 && bookingDate.checkOut.year > 0 ? (
                            <>
                                {days[bookingDate?.checkOut.day].substring(0, 3).toLocaleLowerCase()} {bookingDate?.checkOut.date} {months[bookingDate?.checkOut.month].substring(0, 3).toLocaleLowerCase()}
                            </>
                        ) : (null)
                    }
                </div>
            </div>
            <div ref={dateContainerRef} className={styles.select_date_container}>
                <SelectDateOfMonth
                    type={'left'}
                    date={dateData.checkIn}
                    count={(type: string) => changeCount(type)}
                    monthCount={monthCount}
                    clicked={clicked}
                    dateSelected={bookingDate}
                    changeDate={(date: CheckDate, clicked: number) => selectDate(date, clicked)}
                    increaseCount={(date?: CheckDate) => increaseClickedCount(date)}
                />
                <SelectDateOfMonth
                    type={'right'}
                    date={dateData.checkOut}
                    count={(type: string) => changeCount(type)}
                    monthCount={monthCount}
                    clicked={clicked}
                    dateSelected={bookingDate}
                    changeDate={(date: CheckDate, clicked: number) => selectDate(date, clicked)}
                    increaseCount={(date?: CheckDate) => increaseClickedCount(date)}
                />

            </div>
        </div>
    )
}