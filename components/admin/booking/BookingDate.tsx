// React

// CSS
import styles from './BookingDate.module.css'

// Components
import SelectBooking from '../../website/demo1/select/booking/SelectBooking';

// Helpers

// Types

const BookingDate = (props: any) => {
    console.log(props.isShow);
    
    // Variables

    // Use State

    // Functions
    const saveBookingInDB = async (booking: any) => {
        props.handleBookingDate(
            true,
            booking.iDate,
            booking.eDate,
            `${booking.iDate.day} de ${booking.iDate.monthText} del ${booking.iDate.year}`,
            `${booking.eDate.day} de ${booking.eDate.monthText} del ${booking.eDate.year}`,
            booking.totalDays,
            booking.isBreakFast
        )
    }
    
    // Use Effect

    return (
        <div className={styles.calendar_overlay}>
            <div className={styles.calendar_content}>
                <button className={styles.btn_close} onClick={() => props.handleBookingDate(false)}>
                    <svg className={styles.svg_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </button>
                <SelectBooking
                    SaveBooking={(booking: any) => saveBookingInDB(booking)}
                />
            </div>
        </div>
    )
}

export default BookingDate