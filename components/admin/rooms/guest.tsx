// React and Next

// React
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// CSS
import styles from '../../../components/admin/booking/BookingDate.module.css'

// Components
import BtnSubmit from '../buttons/submit/BtnSubmit';
import BtnActions from '../buttons/actions/BtnActions';

// Helpers

// Types
import { Guest, GuestForm } from '../../../types/Guest';
import SelectObjectData from '../inputs/object_input/Select';

const BookingGuest = ({ guests, GoBackStep, SavingGuestBooking }: any) => {

    // Variables
    const addButton = `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
        </svg>`
    const lessButton = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M1,10V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
    </svg>`
    const backButton = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>`
    const { register, handleSubmit, formState: { errors } } = useForm<GuestForm>();
    const onSubmit = (data: any) => { SavingGuestBooking(data, isNewGuest) }
    const initialValues = {
        guest: {} as Guest,
        isSubmit: false
    }

    // Use State
    const [isNewGuest, setIsNewGuest] = useState<boolean>(false)
    const [guestData, setGuestData] = useState(initialValues)

    // Use Effect

    // Functions
    const showFormToAddNewGuest = () => { setIsNewGuest(!isNewGuest) }

    const handleGuestSelected = (guest: Guest) => {
        setGuestData({
            ...guestData,
            guest,
            isSubmit: guest ? true : false
        })
    }

    const handleBookingData = () => { SavingGuestBooking(guestData.guest, isNewGuest) }

    return (
        <div className={styles.booking_guest}>
            <div className={styles.btn_actions_container}>
                <BtnActions
                    icon={backButton}
                    onClick={() => { GoBackStep(1) }}
                />

                {
                    isNewGuest ? (
                        <BtnActions
                            icon={lessButton}
                            onClick={showFormToAddNewGuest}
                        />
                    ) : (
                        <BtnActions
                            icon={addButton}
                            onClick={showFormToAddNewGuest}
                        />
                    )
                }
            </div>

            {
                guests && guests.length && !isNewGuest ? (
                    <>
                        <SelectObjectData
                            isError={errors.fullName ? true : false}
                            textError={'Debe seleccionar un huésped para poder continuar'}
                            placeholder={'Seleccione un huésped'}
                            show={'fullName'}
                            data={guests}
                            onClick={(guestSelected: Guest) => { handleGuestSelected(guestSelected) }}
                        />

                        {
                            guestData.isSubmit ? (
                                <BtnSubmit title='RESERVAR' loading={false} onClick={handleBookingData} />
                            ) : null
                        }
                    </>
                ) : null
            }

            {
                isNewGuest ? (
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h5 className={styles.subtitle}>Nuevo huésped</h5>

                            <div className='form-grid'>
                                <div className="input-container">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <br />
                                    <input
                                        className={errors.email ? 'input input_error_text' : `${styles.input_guest} input`}
                                        {...register("email", {
                                            required: true,
                                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                                        })}
                                        id="email"
                                        autoComplete="off"
                                        autoFocus={true}
                                        placeholder="@"
                                    />
                                    <br />
                                    {errors.email && <small>El campo no puede estar vacío y debe ser un correo electrónico válido</small>}
                                </div>

                                <div className="input-container">
                                    <label htmlFor="fullName">Nombre</label>
                                    <br />
                                    <input
                                        className={errors.fullName ? 'input input_error_text' : `${styles.input_guest} input`}
                                        {...register("fullName", { required: true, maxLength: 50 })}
                                        id="fullName"
                                        placeholder=''
                                    />
                                    <br />
                                    {errors.fullName && <small>El campo no puede estar vacío y debe tener un máximo de 4 caracteres</small>}
                                </div>

                                <div className="input-container">
                                    <label htmlFor="lastName">Apellido</label>
                                    <br />
                                    <input
                                        className={errors.lastName ? 'input input_error_text' : `${styles.input_guest} input`}
                                        {...register("lastName", { required: true, maxLength: 12 })}
                                        id="lastName"
                                        placeholder=''
                                    />
                                    <br />
                                    {errors.lastName && <small>El campo no puede estar vacío y debe tener un máximo de 4 caracteres</small>}
                                </div>

                                <div className="input-container">
                                    <label htmlFor="company">Compañia</label>
                                    <br />
                                    <input
                                        className={errors.company ? 'input input_error_text' : `${styles.input_guest} input`}
                                        {...register("company", { required: true, maxLength: 20 })}
                                        id="company"
                                        placeholder=""
                                    />
                                    <br />
                                    {errors.company && <small>El campo no puede estar vacío y debe tener un máximo de 20 caracteres</small>}
                                </div>

                                <div className="input-container">
                                    <label htmlFor="city">Ciudad</label>
                                    <br />
                                    <input
                                        className={errors.city ? 'input input_error_text' : `${styles.input_guest} input`}
                                        {...register("city", { required: true, maxLength: 20 })}
                                        id="city"
                                        placeholder=""
                                    />
                                    <br />
                                    {errors.city && <small>El campo no puede estar vacío y debe tener un máximo de 20 caracteres</small>}
                                </div>

                                <div className="input-container">
                                    <label htmlFor="reasonForTrip">Motivo del hospedaje</label>
                                    <br />
                                    <input
                                        className={errors.reasonForTrip ? 'input input_error_text' : `${styles.input_guest} input`}
                                        {...register("reasonForTrip", { required: true, maxLength: 30 })}
                                        id="reasonForTrip"
                                        placeholder=""
                                    />
                                    <br />
                                    {errors.reasonForTrip && <small>El campo no puede estar vacío y debe tener un máximo de 30 caracteres</small>}
                                </div>
                            </div>

                            {!Object.values(errors).length ? (
                                <BtnSubmit title="Registrar" loading={false} />
                            ) : (
                                <p className="submit-error-text mt-3">Se encontraron algunos errores!.</p>
                            )}
                        </form>
                    </div>
                ) : null
            }
        </div>
    )
}

export default BookingGuest