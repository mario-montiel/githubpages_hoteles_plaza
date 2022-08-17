// React
import { useRouter } from "next/router"

// CSS
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../../../styles/BookingPayment.module.css"

// Variables

// Componets

// Libraries
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from 'react-toastify';

// Helpers
import { endpoint } from "../../../../../config/endpoint"

// Types
import { Booking } from "../../../../../types/Booking"

const Booking3 = ({ redirectToStep }: any) => {
    console.log('redirectToStep: ', redirectToStep);
    

    // Variables
    const router = useRouter()
    const { register, getValues, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm<Booking>();
    const onSubmit = (data: any) => { console.log(data); }

    // Use Ref

    // Use State

    // Functions
    const redirectTo = (url: string) => { router.push(url) }

    const saveBookingData = async () => {
        // const getResponse = await fetch(endpoint + '/api/landingPage/booking/bookingStep1', {
        //     method: 'POST',
        //     headers: { 'Content-type': 'application/json' },
        //     body: JSON.stringify({ step: 1, bookingStepData })
        // })
        // const response = await getResponse.json()

        // if (!response.res) { return showMessage(response.message, 6000, 'error') }

        // redirectToStep(2, bookingStepData)
    }

    // Use Effect

    return (
        <section className={styles.paypment_container}>
            
        </section>
    )
}

export default Booking3