// React
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Libraries
import { useForm } from "react-hook-form";
import { toast, ToastContainer, TypeOptions } from 'react-toastify';

// CSS
import styles from "./Booking.module.css"
import 'react-toastify/dist/ReactToastify.css';

// Componets
import People from "../../select/people/People";
import SelectBookingDate from "../../../../globals/select/selectBookingDate/SelectBookingDate";

// Helpers

// Types
import { RoomType } from "../../../../../types/RoomType";
import { Booking, PeopleBooking } from "../../../../../types/Booking"
import BtnSubmit from "../../../../admin/buttons/submit/BtnSubmit";

export default function Booking2({ stepText, showMessage, redirectToStep }: any) {

    // Variables
    const router = useRouter()
    const { register, getValues, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm<Booking>();
    const onSubmit = (data: any) => { console.log(data); setData(data); /* setIsBookingData(true) */ }
    const initialBookingModalValues = { bookingDate: false, bookingPeople: false }

    // Use State
    const [data, setData] = useState<any>(null)
    const [isEnable, setIsEnable] = useState<boolean>(false)
    const [promotion, setPromotion] = useState<any>(false)
    const [showBookingModal, setShowBookingModal] = useState(initialBookingModalValues)

    // Use Ref

    // Functions
    const sendDataToShowMessage = (text: string, duration: number, typeOptions: TypeOptions) => {
        showMessage(text, duration, typeOptions)
    }

    const fillBookingDate = (dateSelected: any) => {
        handleBookingDateModal()
        setValue('checkDate.iDate.dateMx', dateSelected.iDate.dateMx || '')
        setValue('checkDate.iDate.day', dateSelected.iDate.day)
        setValue('checkDate.iDate.month', dateSelected.iDate.month)
        setValue('checkDate.iDate.monthText', dateSelected.iDate.monthText)
        setValue('checkDate.iDate.year', dateSelected.iDate.year)
        setValue('checkDate.eDate.dateMx', dateSelected.eDate.dateMx)
        setValue('checkDate.eDate.day', dateSelected.eDate.day)
        setValue('checkDate.eDate.month', dateSelected.eDate.month)
        setValue('checkDate.eDate.monthText', dateSelected.eDate.monthText)
        setValue('checkDate.eDate.year', dateSelected.eDate.year)
        setValue('checkDate.totalDays', dateSelected.totalDays)
        setValue('checkDate.isBreakfast', dateSelected.isBreakFast)
        clearErrors('checkDate')
    }

    const fillBookingPeople = (peopleSelected: PeopleBooking) => {
        const message = 'La cantidad de personas en una reservación por defecto es 1 adulto '
        if (!peopleSelected.adults && !peopleSelected.children) {
            return toast(message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                type: 'error'
            })
        }

        setValue('people', peopleSelected)
        setValue('people.adults', peopleSelected.adults)
        setValue('people.children', peopleSelected.children)
        clearErrors('people')
    }

    // const getPeopleValues = () => {
    //     if (getValues('people')) {
    //         if (getValues('people').adults || getValues('people').children) {
    //             return `${getValues('people').adults} Adultos | ${getValues('people').children} Niños`
    //         }
    //     }

    //     return '1 Adulto | 0 Niños'
    // }

    const handleBookingDateModal = () => {
        setShowBookingModal({
            ...showBookingModal,
            bookingDate: !showBookingModal.bookingDate
        })
    }

    const handleBookingPeopleModal = () => {
        setShowBookingModal({
            ...showBookingModal,
            bookingPeople: !showBookingModal.bookingPeople
        })
    }

    const redirectToPayment = () => {
        const json = JSON.stringify(data)
        router.push({
            pathname: '/demo-1/payment/hoteles-plaza',
            query: { data: json }
        })
    }

    /* Animations */

    // Use Effect

    return (
        <div className={styles.content}>

            <ToastContainer />

            <div className={styles.content_position}>

                <p className={styles.main_text}>{stepText}</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.input_group}>
                        <label htmlFor="check-in">Check In:</label>
                        <br />
                        <input
                            type="text"
                            id="check-in"
                            {...register("checkDate.iDate.dateMx", { required: {
                                value: true,
                                message: 'Debe seleccionar una fecha para el CHECK IN de su reservación'
                            } })}
                            className={errors.checkDate ? `${styles.input_date} ${styles.input_error}` : styles.input_date}
                            placeholder="DD/MM/AAAA"
                            onClick={handleBookingDateModal}
                        />
                        <br />
                            {errors.checkDate?.iDate ? (<small>{errors.checkDate?.iDate.dateMx?.message}</small>) : null}
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="check-out">Check Out:</label>
                        <br />
                        <input
                            type="text"
                            id="check-out"
                            {...register("checkDate.eDate.dateMx", { required: {
                                value: true,
                                message: 'Debe seleccionar una fecha para el CHECK OUT de su reservación'
                            } })}
                            className={errors.checkDate ? `${styles.input_date} ${styles.input_error}` : styles.input_date}
                            placeholder="DD/MM/AAAA"
                            onClick={handleBookingDateModal}
                        />
                        {errors.checkDate?.eDate ? (<small>{errors.checkDate?.eDate.dateMx?.message}</small>) : null}
                    </div>

                    <div className={`${styles.input_group} ${styles.input_people_group}`}>
                        <label htmlFor="persons">Número de personas:</label>
                        <br />
                        <input
                            type="text"
                            id="persons"
                            {...register("people", { required: true })}
                            className={errors.people ? `${styles.input_people} ${styles.input_error}` : styles.input_people}
                            // value={getPeopleValues()}
                            onClick={handleBookingPeopleModal}
                        />
                        <br />
                        {errors.people ? (<small>Debe ingresar la cantidad de personas que entrarán en el hotel para poder continuar</small>) : null}

                        {/* {
                            showBookingModal.bookingPeople ? (
                                <People
                                    OnClose={handleBookingPeopleModal}
                                    showMessage={(text: string, duration: number, typeOptions: TypeOptions) => sendDataToShowMessage(text, duration, typeOptions)}
                                    PeopleSelected={(peopleData: any) => fillBookingPeople(peopleData)}
                                />
                            ) : null
                        } */}
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.input_group}>
                            <label htmlFor="name"></label>
                            <input
                                type="text"
                                id="name"
                                {...register("fullName", {
                                    required: {
                                        value: true,
                                        message: 'El campo NOMBRE es obligatorio'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z]+$/,
                                        message: 'No se permiten caracteres especiles'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Ingrese como mínimo 3 caracteres'
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Solo se permiten como máximo 30 caracteres'
                                    }
                                })}
                                className={errors.fullName ? `${styles.input} ${styles.input_error}` : styles.input}
                                placeholder="Nombre (*)"
                            />
                            <br />
                            {errors.fullName ? (<small>{errors.fullName.message}</small>) : null}
                        </div>

                        <div className={styles.input_group}>
                            <label htmlFor="lastname"></label>
                            <input
                                type="text"
                                id="lastname"
                                {...register("lastName", {
                                    required: {
                                        value: true,
                                        message: 'El campo APELIIDO es obligatorio'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z]+$/,
                                        message: 'No se permiten caracteres especiles'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Ingrese como mínimo 6 caracteres'
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Solo se permiten como máximo 30 caracteres'
                                    }
                                })}
                                className={errors.lastName ? `${styles.input} ${styles.input_error}` : styles.input}
                                placeholder="Apellido (*)"
                            />
                            <br />
                            {errors.lastName ? (<small>{errors.lastName.message}</small>) : null}
                        </div>

                        <div className={styles.input_group}>
                            <label htmlFor="phone"></label>
                            <input
                                type="text"
                                id="phone"
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message: 'El campo TELÉFONO es obligatorio'
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Solo puede ingresar números del 0 al 9'
                                    },
                                    minLength: {
                                        value: 10,
                                        message: 'Ingrese como mínimo 10 caracteres'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Solo se permiten como máximo 10 caracteres'
                                    }
                                })}
                                className={errors.phone ? `${styles.input} ${styles.input_error}` : styles.input}
                                placeholder="Teléfono (*)"
                            />
                            <br />
                            {errors.phone ? (<small>{errors.phone.message}</small>) : null}
                        </div>

                        <div className={styles.input_group}>
                            <label htmlFor="email"></label>
                            <input
                                type="text"
                                id="email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'El campo CORREO ELECTRÓNICO es obligatorio'
                                    },
                                    pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: 'Ingrese un correo electrónico válido'
                                    }
                                })}
                                className={errors.email ? `${styles.input} ${styles.input_error}` : styles.input}
                                placeholder="Correo (*)"
                            />
                            <br />
                            {errors.email ? (<small>{errors.email.message}</small>) : null}
                        </div>

                        <div className={styles.input_group}>
                            <label htmlFor="comments"></label>
                            <input
                                type="text"
                                id="comments"
                                {...register("comments", {
                                    required: false,
                                    pattern: {
                                        value: /^[a-zA-Z]+$/,
                                        message: 'No se permiten caracteres especiles'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Ingrese como mínimo 6 caracteres'
                                    },
                                    maxLength: {
                                        value: 60,
                                        message: 'Solo se permiten como máximo 60 caracteres'
                                    }
                                })}
                                className={errors.comments ? `${styles.input_textarea} ${styles.input_error}` : styles.input_textarea}
                                placeholder="Comentarios (opcional)"
                            />
                            <br />
                            {errors.comments ? (<small>{errors.comments.message}</small>) : null}
                        </div>
                    </div>

                    <div className={styles.btns_container}>
                        <button
                            className={styles.btn_submit}
                            type="button"
                            onClick={() => redirectToStep(1)}
                        >
                            REGRESAR
                        </button>
                        <BtnSubmit title="CONTINUAR" onClick={() => redirectToStep(3)} loading={isEnable} />
                    </div>
                </form>
            </div>

            {
                showBookingModal.bookingDate ? (
                    <div className={styles.overlay}>
                        <div className={styles.date_content}>
                            <SelectBookingDate
                                showBtn={true}
                                OnClick={handleBookingDateModal}
                                breakfastText={'¿Desea incluir en su reservación desayuno?'}
                                description={'La reservación que está seleccionado es del día'}
                                DateSelected={(date: any) => fillBookingDate(date)}
                            />
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}