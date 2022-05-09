
// CSS
import { useEffect, useRef, useState } from 'react'
import styles from './SelectBooking.module.css'

const SelectBooking = (props: any) => {

    // Variables
    const aMonths =
        ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const initialDatesValue = {
        iDate: {
            elIndex: 0,
            element: {} as HTMLButtonElement,
            day: 0,
            month: 0,
            year: 0,
            monthText: ''
        },
        eDate: {
            elIndex: 0,
            element: {} as HTMLButtonElement,
            day: 0,
            month: 0,
            year: 0,
            monthText: ''
        },
        isBreakFast: false,
        totalDays: 0
    }

    const initialDateValue = {
        elIndex: 0,
        element: {},
        date: {
            day: 0,
            month: 0,
            year: 0
        },
        monthText: ''
    }

    // Use State
    const [months, setMonths] = useState<any>([])
    const [currentMonths, setCurrentMonths] = useState<number>(0)

    const [date, setDate] = useState(initialDatesValue)
    const [dateSelected, setDateSelected] = useState<any>(initialDateValue)

    const [dateCounts, setDateCounts] = useState<number>(0)
    const [isBookingValidated, setIsBookingValidated] = useState(false)

    // Use Ref
    const overlayRef = useRef<HTMLDivElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)

    // Functions
    const generateMonths = () => {
        let monthData: any = []
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth()

        for (let index = currentMonth; index < 14; index++) {
            const date = new Date(currentDate.getFullYear(), index)
            const initialsMonthDays = date.getDay()
            const totalDaysInMonth = new Date(currentDate.getFullYear(), (index + 1), 0).getDate()
            let dateObj: any = {}
            dateObj.monthText = aMonths[date.getMonth()]
            dateObj.monthNumber = date.getMonth()
            dateObj.yearMonth = date.getFullYear()
            dateObj.initialDay = initialsMonthDays
            dateObj.dates = []
            for (let i = 0; i < totalDaysInMonth; i++) {
                dateObj.dates.push(i + 1)
            }
            monthData.push(dateObj)
        }

        setMonths(monthData)
    }

    const showMonth = () => {
        const html: any = []

        for (let index = currentMonths; index < currentMonths + 2; index++) {
            html.push(
                <div key={index}>
                    <p>{months[index].monthText} {months[index].yearMonth}</p>
                    <div className={styles.days_content}>
                        {
                            currentMonths > 0 ? (
                                <button className={styles.btn_add} onClick={restMonths}>-</button>
                            ) : null
                        }

                        {
                            currentMonths < 10 ? (
                                <button className={styles.btn_rest} onClick={addMonths}>+</button>
                            ) : null
                        }

                        <ul>
                            <li>do</li>
                            <li>lu</li>
                            <li>ma</li>
                            <li>mi</li>
                            <li>ju</li>
                            <li>vi</li>
                            <li>sa</li>
                        </ul>
                    </div>
                    <div className={styles.days_of_month_content}>
                        {
                            generateDisableDays(months[index].initialDay, months[index - 1] ? months[index - 1] : null)
                        }
                        {
                            months[index].dates.map((day: number, i: number) =>
                                <button
                                    className={`${styles.btn_date} btn-date`}
                                    onClick={() => selectItem(day, months[index].monthNumber, months[index].yearMonth, index % 2 === 0 ? (day - 1) : months[index - 1].dates.length + (day - 1))}
                                    key={i}
                                    value={(i + 1) + months[index].monthText + ' ' + months[index].yearMonth}
                                >
                                    {day}
                                </button>
                            )
                        }
                    </div>
                </div>
            )
        }

        return html
    }

    const generateDisableDays = (currentInitialDay: number, lastMonths: any) => {
        const html: any = []

        for (let i = 0; i < currentInitialDay; i++) {
            html.push(
                <button className={styles.btn_disabled} disabled key={i}>
                    {lastMonths ? (lastMonths.dates.length + (i + 1)) - (currentInitialDay) : null}
                </button>
            )
        }

        return html
    }

    const selectItem = (day: number, month: number, year: number, index: number) => {
        const btns = document.querySelectorAll('.btn-date')
        const monthCorrect = month > 11 ? month - 12 : month
        const dateClicked = {
            day,
            month: monthCorrect,
            year,
        }
        
        setDateSelected({
            ...dateSelected,
            elIndex: index,
            element: btns[index],
            date: dateClicked,
            monthText: aMonths[month]
        })
        setDateCounts((oldValue: number) => oldValue + 1)
    }

    const addMonths = () => {
        if (currentMonths < 12) {
            setCurrentMonths((oldValue: any) => oldValue + 2)
        }
    }

    const restMonths = () => {
        if (currentMonths >= 2) {
            setCurrentMonths((oldValue: any) => oldValue - 2)
        }
    }

    const showCalendar = () => {
        overlayRef.current?.classList.add(styles.overlay_active)
        calendarRef.current?.classList.add(styles.active)
        calendarRef.current?.focus()
    }

    const closeCalendar = () => {
        window.onclick = (e: any) => {
            if (e.target === overlayRef.current) {
                overlayRef.current?.classList.remove(styles.overlay_active)
                calendarRef.current?.classList.remove(styles.active)
            }
        }
    }

    const checkDatesClicked = async () => {
        const btns = document.querySelectorAll('.btn-date') as NodeListOf<HTMLButtonElement>

        if (dateCounts == 1) {
            removeAllStylesBtnDates()
            setDate({
                ...date,
                iDate: {
                    elIndex: dateSelected.elIndex,
                    element: dateSelected.element,
                    day: dateSelected.date.day,
                    month: dateSelected.date.month,
                    year: dateSelected.date.year,
                    monthText: dateSelected.monthText
                },
                eDate: initialDatesValue.eDate
            })
            verifyBtnDates()
            btns[dateSelected.elIndex].classList.add(styles.selected)
        }

        if (dateCounts == 2) {
            removeAllStylesBtnDates()
            setDateCounts(0)
            const diffDaysNumbers = diffDays(dateSelected, btns)
            diffDaysNumbers ? verifyBtnDates() : null
        }
    }

    const verifyBtnDates = () => {
        const btns = document.querySelectorAll(`.${styles.btn_date}`) as NodeListOf<HTMLButtonElement>
        removeAllStylesBtnDates()
        btns.forEach(btn => {
            if (date.iDate.element && Object.keys(date.iDate.element).length && btn.value == date.iDate.element.value) {
                btn.classList.add(styles.selected)
            }

            if (date.eDate.element && Object.keys(date.eDate.element).length && btn.value == date.eDate.element.value) {
                btn.classList.add(styles.selected)
            }
        });
    }

    const removeAllStylesBtnDates = () => {
        const btns = document.querySelectorAll(`.${styles.btn_date}`) as NodeListOf<HTMLButtonElement>
        btns.forEach(btn => {
            btn.classList.remove(styles.selected)
        });
    }

    const diffDays = (dateSelected: any, btns: NodeListOf<HTMLButtonElement>) => {
        const checkIn = new Date(date.iDate.year, date.iDate.month, date.iDate.day)
        const checkOut = new Date(dateSelected.date.year, dateSelected.date.month, dateSelected.date.day)
        const diff = checkIn.getTime() - checkOut.getTime();
        const diffDays = Math.round(diff / (1000 * 60 * 60 * 24))
        const diffValidate = diffDays < 0 ? true : false;

        if (!diffValidate) {
            removeAllStylesBtnDates()
            setDateCounts(1)
        }

        if (diffDays) {
            btns[dateSelected.elIndex].classList.add(styles.selected)
            setDate({
                ...date,
                eDate: {
                    elIndex: dateSelected.elIndex,
                    element: dateSelected.element,
                    day: dateSelected.date.day,
                    month: dateSelected.date.month,
                    year: dateSelected.date.year,
                    monthText: dateSelected.monthText
                },
                totalDays: Math.abs(diffDays)
                
            })
            return diffDays
        }

        return false
    }

    const generateIDate = () => {
        const iDate = date.iDate.day + '-' + aMonths[date.iDate.month] + ' ' + date.iDate.year
        return (
            iDate
        )
    }

    const generateEDate = () => {
        const eDate = date.eDate.day + '-' + aMonths[date.eDate.month] + ' ' + date.eDate.year
        return (
            eDate
        )
    }

    const sendBookingRequest = () => {
        props.SaveBooking(date)
    }

    // Use Effect
    useEffect(() => {
        checkDatesClicked()
        verifyBtnDates()
    }, [dateCounts, dateSelected.element, date.iDate.day, date.eDate.day, currentMonths])

    useEffect(() => {
        generateMonths()
    }, [])

    useEffect(() => {
        if (date.iDate.day > 0 && date.eDate.day > 0 && dateCounts == 0) {
            setIsBookingValidated(true)
        } else {
            setIsBookingValidated(false)
        }
    }, [date.iDate.day, date.eDate.day])

    return (
        <div className={styles.select_date} onClick={showCalendar}>
            <div ref={overlayRef} className={styles.overlay} />
            <div className={styles.text_data}>
                <p>{date.iDate.day > 0 ? generateIDate() : 'Check In'}</p>
                <p>{date.eDate.day > 0 ? generateEDate() : 'Check Out'}</p>
            </div>
            <div
                ref={calendarRef}
                className={styles.select_date_content}
                tabIndex={0}
                onBlur={closeCalendar}
            >

                <div className={styles.date_content}>
                    {
                        months.length ? (
                            showMonth()
                        ) : null
                    }
                </div>
            </div>

            {
                isBookingValidated ? (
                    <div>
                        <div className={styles.breakfast_container}>
                            <input id="breakfast" type="checkbox" onChange={() => setDate({...date, isBreakFast: !date.isBreakFast})} />
                            <label htmlFor="breakfast">¿La reservación incluirá desayuno?</label>
                        </div>
                        <p className={styles.booking_text}>
                            La reservación que está seleccionado
                            es del día <strong>
                            {date.iDate.day} de {aMonths[date.iDate.month + 1]} del {date.iDate.year}
                            </strong> al <strong>
                            {date.eDate.day} de {aMonths[date.eDate.month + 1]} del {date.eDate.year}
                            </strong>
                        </p>
                        <button className={styles.btn_booking} onClick={sendBookingRequest}>
                            Reservar
                        </button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default SelectBooking