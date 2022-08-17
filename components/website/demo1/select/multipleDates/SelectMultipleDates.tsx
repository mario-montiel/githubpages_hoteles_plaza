
// // React and Next
import { ReactElement, useEffect, useRef, useState } from 'react';
import { months, totalDaysOfMonth, days } from '../../../../../helpers/dates';

// // CSS
import styles from './SelectMultipleDates.module.css'

// Type
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

type DateData = {
    type: string,
    date: CheckDate,
    clicked: number,
    monthCount: number,
    dateSelected: DateSelected,
    count: (type: string) => void,
    increaseCount: (date?: CheckDate) => void,
    changeDate: (date: CheckDate, clicked: number) => void
}

export default function SelectDateOfMonth({
    date,
    type,
    clicked,
    monthCount,
    dateSelected,
    count,
    changeDate,
    increaseCount
}: DateData) {

    // Variables
    const initialDateValues = {
        html: [],
        date: {
            day: date.day,
            date: date.date,
            month: date.month,
            year: date.year
        },
        calendar: {
            initialMonth: date.month,
            endMonth: date.month > (months.length - 1) ? date.month - (months.length - 1) : date.month
        }
    }

    // Use Ref

    // Use State
    const [monthText, setMonthText] = useState<string>('')
    const [showDate, setShowDate] = useState<any>(initialDateValues)

    // Functions
    const generateNameOfDaysOfMonth = () => {
        const html: ReactElement<HTMLLIElement>[] = []
        days.forEach((day, index) => {
            html.push(
                <li
                    key={index}
                    className={styles.days}
                >{day.substring(0, 2)}</li>
            )
        });
        return html
    }
    const generateNumberDaysOfMonth = () => {
        let html: ReactElement<HTMLLIElement>[] = []
        const monthNumber = type == 'left' ? showDate.calendar.initialMonth + monthCount : showDate.calendar.endMonth + monthCount
        const monthTextValidate = monthNumber > (months.length - 1) ? monthNumber - (months.length - 1) : monthNumber + 1
        const yearValidate = type == 'left' ? showDate.calendar.initialMonth + monthCount : showDate.calendar.initialMonth + monthCount + 1
        const year = yearValidate > (months.length - 1) ? date.year + 1 : date.year
        const tDaysOfMonth = totalDaysOfMonth(year, monthTextValidate - 1)
        const currentMonthDays = new Date(`${year} ${monthTextValidate}`).getDay()
        const lastDaysOfMonth = totalDaysOfMonth(year, monthTextValidate - 2)

        const xmonth = type == 'left' ? showDate.calendar.initialMonth + monthCount : showDate.calendar.endMonth + monthCount
        const xmonthTextValidate = xmonth > (months.length - 1) ? xmonth - 1 - (months.length - 1) : xmonth
        
        for (let index = 0; index < tDaysOfMonth + currentMonthDays; index++) {
            html.push(
                generateCSSInDays(currentMonthDays, xmonthTextValidate, lastDaysOfMonth, index)
            )
        }
        setShowDate({
            ...showDate,
            html: html
        })
        return html
    }

    const generateCSSInDays = (currentMonthDays: number, xmonthTextValidate: number, lastDaysOfMonth: number, index: number) => {
        return currentMonthDays <= index ?
            (<li
                key={index}
                className={
                    months[xmonthTextValidate] == months[dateSelected.checkIn.month] &&
                        dateSelected.checkIn.date == index + 1 - currentMonthDays ||
                        months[xmonthTextValidate] == months[dateSelected.checkOut.month] &&
                        dateSelected.checkOut.date == index + 1 - currentMonthDays
                        ?
                        `${styles.select}`
                        : type == 'left' &&
                        dateSelected.checkIn.month <= dateSelected.checkOut.month &&
                        dateSelected.checkIn.date <= index + 1 - currentMonthDays &&
                        months[xmonthTextValidate] == months[dateSelected.checkIn.month]  ||
                        type == 'left' &&
                        months[xmonthTextValidate] == months[dateSelected.checkIn.month] &&
                        dateSelected.checkIn.date < index + 1 - currentMonthDays &&
                        dateSelected.checkOut.date > index + 1 - currentMonthDays ||
                        type == 'right' &&
                        dateSelected.checkIn.month < dateSelected.checkOut.month &&
                        dateSelected.checkIn.date < index + 1 - currentMonthDays &&
                        months[xmonthTextValidate + 1] == months[dateSelected.checkIn.month + 1] ||
                        type == 'right' &&
                        months[xmonthTextValidate] == months[dateSelected.checkOut.month] &&
                        dateSelected.checkOut.date > index + 1 - currentMonthDays ?
                        `${styles.days_between_date_selected}` : ''

                }
                onClick={() => bookingDate(currentMonthDays, ((index)))}
            >{(index + 1 - currentMonthDays)}</li>) :
            (<li key={index} className={`${styles.days_disabled} days_of_month_container`}>{(lastDaysOfMonth - currentMonthDays) + (index + 1)}</li>)
    }

    const bookingDate = (indexStart: number, dayOfMonth: number) => {
        const monthValidate = type == 'left' ? (showDate.calendar.initialMonth + monthCount) : (showDate.calendar.initialMonth + (monthCount))
        const month = monthValidate > (months.length - 1) ? ((monthValidate - 1) - (months.length - 1)) : monthValidate
        const yearValidate = type == 'left' ? showDate.calendar.initialMonth + monthCount : showDate.calendar.initialMonth + monthCount + 1
        const year = yearValidate > (months.length - 1) ? date.year + 1 : date.year
        const booking = {
            day: indexStart,
            date: (dayOfMonth - indexStart) + 1,
            month: month,
            year: year
        }
        
        clicked == 1 ? increaseCount(booking) : increaseCount()
        
        changeDate(booking, clicked)
    }

    const changeMonth = (type: string) => { count(type) }

    // Use State
    useEffect(() => {
        const month = type == 'left' ? showDate.calendar.initialMonth + monthCount : showDate.calendar.endMonth + monthCount
        const monthTextValidate = month > (months.length - 1) ? month - 1 - (months.length - 1) : month
        // console.log(dateSelected.checkIn.date);
        
        setMonthText(months[monthTextValidate])
        generateNumberDaysOfMonth()
    }, [monthCount, monthText, date])

    useEffect(() => { generateNumberDaysOfMonth() }, [clicked, date])

    return (
        <div className={styles.select_multiple_date_container}>
            <div className={styles.month_container}>
                {
                    type == 'left' && monthCount > 0 ? (
                        <button
                            className={styles.btn_left}
                            onClick={() => changeMonth('-')}
                        >-</button>
                    ) : null
                }
                <p>{monthText}</p>
                {
                    type == 'right' && monthCount < 6 ? (
                        <button
                            className={styles.btn_right}
                            onClick={() => changeMonth('+')}
                        >+</button>
                    ) : null
                }
            </div>
            <ul>
                {generateNameOfDaysOfMonth()}
            </ul>
            <ul>
                {
                    showDate.html.length ? (
                        showDate.html.map((item: any) => item)
                    ) : null
                }
            </ul>
        </div>
    )
}

