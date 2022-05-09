// React
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";

// CSS
import styles from "../../../../../../styles/admin/system/rooms/roomTypes/CreateRoomTypes.module.css"

// Libraries
import 'react-toastify/dist/ReactToastify.css';

// Components and Functions
import Layout from "../../../../../../components/globals/Layout";
import Loading from "../../../../../../components/admin/loading/Loader"
import BtnSubmit from "../../../../../../components/admin/buttons/submit/BtnSubmit"
import BtnActions from "../../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import TypeRoomsFunctions from "../../../../../../helpers/functions/admin/roomsType/roomsTypeFunctions";

// Types
import { RoomTypeForm } from "../../../../../../types/RoomType"

export default function CreateRoomsType() {

    // Variables
    const router = useRouter()
    const {
        showDialogConfirm,
        showLoading,
        // errorsMessages,
        showDialog,
    } = TypeRoomsFunctions()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, handleSubmit, formState: { errors } } = useForm<RoomTypeForm>();
    const onSubmit = (data: any) => { showDialog(data) }

    // States

    // Use Efffect

    return (
        <Layout
            title="Crear tipo de habitación"
            description="Creación de los tipos de habitación para los hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Crear tipo de habitación</h2>

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
                    onConfirm={showDialogConfirm.onConfirm ? showDialogConfirm.onConfirm : () => { }}
                    onClose={showDialogConfirm.onClose ? showDialogConfirm.onClose : () => { }}
                />
            ) : (null)}

            <section className={styles.roomstype_form}>
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
                            {errors.name && <small>El campo no puede estar vacío y debe tener un máximo de 60 caracteres</small>}
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
                            {errors.keyWord && <small>El campo no puede estar vacío y debe tener un máximo de 4 caracteres</small>}
                        </div>
                    </div>

                    <h5 className={styles.subtitle}>Datos que aparecerán en la página web</h5>

                    <div className='form-grid'>
                        <div className="input-container">
                            <label htmlFor="cost_per_night">Costo por noche</label>
                            <br />
                            <input
                                className={errors.costPerNight ? 'input input_error_text' : 'input'}
                                {...register("costPerNight", { required: true, pattern: /[0-9]$/i })}
                                id="cost_per_night"
                                placeholder="$"
                                type={'number'}
                            />
                            <br />
                            {errors.costPerNight && <small>El campo no puede estar vacío y debe ingresar solo caracteres numéricos</small>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="title">Título</label>
                            <br />
                            <input
                                className={errors.title ? 'input input_error_text' : 'input'}
                                {...register("title", { required: true, maxLength: 50, pattern: /[a-z0-9-_]$/i })}
                                id="title"
                                placeholder="Ej. Habitación doble estándar -No fumar"
                                type={'text'}
                            />
                            <br />
                            {errors.title && <small>El campo no puede estar vacío y debe tener un máximo de 50 caracteres</small>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="description">Descripción</label>
                            <br />
                            <input
                                className={errors.description ? 'input input_error_text' : 'input'}
                                {...register("description", { required: true, maxLength: 50, pattern: /[a-z0-9]$/i })}
                                id="description"
                                placeholder="Ej. Una cama doble grande"
                                type={'text'}
                            />
                            <br />
                            {errors.description && <small>El campo no puede estar vacío y debe tener un máximo de 50 caracteres</small>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="max-people">Máximo de personas</label>
                            <br />
                            <input
                                className={errors.maxPeople ? 'input input_error_text' : 'input'}
                                {...register("maxPeople", { required: true, pattern: /[0-9]$/i })}
                                id="max-people"
                                placeholder="1"
                                type={'number'}
                            />
                            <br />
                            {errors.maxPeople && <small>El campo no puede estar vacío y debe ingresar solo caracteres numéricos</small>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="smoke">Fumar</label>
                            <br />
                            <input
                                className={errors.smoke ? 'input input_error_text' : 'input'}
                                {...register("smoke", { required: false, pattern: /[0-9]$/i })}
                                id="smoke"
                                type={'checkbox'}
                            />
                            <br />
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