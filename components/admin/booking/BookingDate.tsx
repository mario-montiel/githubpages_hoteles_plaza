// React
import { useEffect, useRef, useState } from 'react';

// CSS
import styles from './BookingDate.module.css'

// Components
import BookingGuest from '../rooms/guest';
import Loading from "../../../components/admin/loading/Loader"
import SelectBookingDate from '../../globals/select/selectBookingDate/SelectBookingDate';

// Helpers

// Types

const BookingDate = ({ guests, roomSelected, handleBookingDate }: any) => {
    console.log('roomSelected: ', roomSelected);
    
    // Variables
    const initialLoadingValues = {
        show: false,
        title: '',
    }
    const initialStep1Values = {
        totalDays: 0,
        endDate: {
            date: '',
            dateMx: ''
        },
        initialDate: {
            date: '',
            dateMx: ''
        },
        isBreakFast: false
    }

    // Use Ref
    const CalendarStepsRef = useRef<HTMLDivElement>(null)

    // Use State
    const [step, setStep] = useState(1)
    const [showLoading, setShowLoading] = useState(initialLoadingValues)
    const [step1Booking, setStep1Booking] = useState(initialStep1Values)

    // Functions
    const handleStepContainerStyles = () => {
        CalendarStepsRef.current!.style.transform = step == 1 ? 'translateX(0%)' : 'translateX(-50%)'
    }

    const selectStepIntoForm = (step: number, booking?: any) => {
        if (booking) {
            console.log(booking);
            
            setStep1Booking(
                {
                    ...step1Booking,
                    totalDays: booking.totalDays,
                    endDate: {
                        date: `${booking.eDate.day} ${booking.eDate.monthText} ${booking.eDate.year}`, dateMx: booking.eDate.dateMx
                    },
                    initialDate: {
                        date: `${booking.iDate.day} ${booking.iDate.monthText} ${booking.iDate.year}`, dateMx: booking.iDate.dateMx
                    },
                    isBreakFast: booking.isBreakFast
                }
            )

        }
        setStep(step ? step : 1)
    }

    const savingGuestBooking = async (bookingData: any, isNewGuest: boolean) => {
        setShowLoading({
            ...showLoading,
            show: true,
            title: 'Creando huésped...'
        })
        
        const step2Booking = {
            isNewGuest,
            guest: isNewGuest ? (
                {
                    email: bookingData.email,
                    password: '',
                    fullName: bookingData.fullName,
                    lastName: bookingData.lastName,
                    city: bookingData.city,
                    company: bookingData.company,
                    reasonForTrip: bookingData.reasonForTrip
                }
            ) : bookingData
        }
        const booking = { step1Booking, step2Booking, room: roomSelected }
        handleBookingDate(booking)
    }

    // Use Effect
    useEffect(() => { handleStepContainerStyles() }, [step])

    return (
        <div className={styles.calendar_overlay}>
            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text={showLoading.title} />
            ) : null}
            <div className={styles.calendar_content}>
                <button type='button' className={styles.btn_close} onClick={() => handleBookingDate(false)}>
                    <svg className={styles.svg_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </button>
                
                <div ref={CalendarStepsRef} className={styles.calendar_steps}>
                    <SelectBookingDate
                        breakfastText={'¿La reservación incluirá desayuno?'}
                        description={'La reservación que está seleccionado es del día'}
                        NextStep={(step: number, booking?: any) => selectStepIntoForm(step, booking)}
                    />

                    <div className={styles.booking_guest_container}>
                        <BookingGuest
                            guests={guests}
                            GoBackStep={(step: number) => selectStepIntoForm(step)}
                            SavingGuestBooking={(bookingData: any, isNewGuest: boolean) => savingGuestBooking(bookingData, isNewGuest)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDate