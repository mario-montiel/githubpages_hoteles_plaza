// React
import { useRouter } from "next/router"

// Libraries
import { useForm } from "react-hook-form"

// CSS
import 'react-toastify/dist/ReactToastify.css'
import styles from "../../../../../styles/admin/system/categories/CreateCategory.module.css"

// Components and CSS
import Layout from "../../../../../components/Layout"
import Loading from "../../../../../components/admin/loading/Loader"
import BtnSubmit from "../../../../../components/admin/buttons/submit/BtnSubmit"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import ReservationsFunctions from "../../../../../helpers/functions/admin/reservations/reservatonsFunctions"

// Types
import { RoomTypeForm } from "../../../../../types/RoomType"

export default function CreateReservations() {

    // Variables
    const router = useRouter()
    const {
        showDialogConfirm,
        showLoading,
        errorsMessages,
        showDialog,
    } = ReservationsFunctions()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, handleSubmit, formState: { errors } } = useForm<RoomTypeForm>();
    const onSubmit = (data: any) => { showDialog(data) }

    // States

    // Use Efffect

    return (
        <Layout
            title="Crear reservaciones"
            description="Creación de las reservaciones para los hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Crear reservación</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text="Guardando datos" />
            ) : null}

            {showDialogConfirm.show ? (
                <DialogConfirm
                    image={showDialogConfirm.image ? showDialogConfirm.image : ''}
                    alt={showDialogConfirm.alt ? showDialogConfirm.alt : ''}
                    description={showDialogConfirm.description ? showDialogConfirm.description : ''}
                    btnConfirm={showDialogConfirm.btnConfirm ? showDialogConfirm.btnConfirm : ''}
                    btnCancel={showDialogConfirm.btnCancel ? showDialogConfirm.btnCancel : ''}
                    onConfirm={showDialogConfirm.onConfirm ? showDialogConfirm.onConfirm : () => {}}
                    onClose={showDialogConfirm.onClose ? showDialogConfirm.onClose : () => {}}
                />
            ) : (null)}

            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className={styles.subtitle}>Tipo de la habitación</h5>

                    <div className='form-grid'>
                        <div className="input-container">
                            <label htmlFor="name">Nombre</label>
                            <br />
                            <input
                                className={errors.name ? 'input input_error_text' : 'input'}
                                {...register("name", { required: true, maxLength: 60 })}
                                id="name"
                                autoComplete="off"
                                autoFocus={true}
                                placeholder="Ej. Sencilla"
                            />
                            <br />
                            {errors.name && errorsMessages(errors.name.type, 'nombre', 60)}
                        </div>

                        <div className="input-container">
                            <label htmlFor="key_word">Palabra clave</label>
                            <br />
                            <input
                                className={errors.keyWord ? 'input input_error_text' : 'input'}
                                {...register("keyWord", { required: true, maxLength: 4 })}
                                id="key_word"
                                placeholder="Ej. S-"
                            />
                            <br />
                            {/* <small>El campo palabra clave está vacio!</small> */}
                            {errors.keyWord && errorsMessages(errors.keyWord.type, 'palabra clave', 4)}
                        </div>
                    </div>

                    {!Object.values(errors).length ? (
                        <BtnSubmit title="Registrar" />
                    ) : (
                        <p className="submit-error-text">Se encontraron algunos errores!.</p>
                    )}
                </form>
            </section>
        </Layout>
    )
}