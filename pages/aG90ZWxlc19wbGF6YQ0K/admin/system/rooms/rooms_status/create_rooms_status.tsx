// React

// Libraries

// Components and CSS
import { ToastContainer } from 'react-toastify';
import BtnSubmit from "../../../../../../components/admin/buttons/submit/BtnSubmit"
import DialogConfirm from "../../../../../../components/admin/dialogs/confirm/DialogConfirm"
import Layout from "../../../../../../components/Layout"
import styles from "../../../../../../styles/admin/system/rooms/roomStatus/CreateRoomStatus.module.css"
import Loading from "../../../../../../components/admin/loading/Loader"
import BtnActions from "../../../../../../components/admin/buttons/actions/BtnActions"
import { useForm } from "react-hook-form";
import RoomStatusFunction from "./roomsStatusFunction"
import { useRouter } from "next/router"
import 'react-toastify/dist/ReactToastify.css';
import { RoomStatusForm } from "../../../../../../types/RoomStatus"
import { useEffect, useRef } from "react"

export default function CreateCategory() {

    // Variables
    const router = useRouter()
    const {
        showDialogConfirm,
        showLoading,
        sendUseRefData,
        changeCheckBox,
        errorsMessages,
        showDialog,
    } = RoomStatusFunction()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<RoomStatusForm>();
    const onSubmit = (data: any) => { showDialog(data) }

    // Use Ref
    const checkBoxRef = useRef<HTMLDivElement>(null)
    const roomContainerRef = useRef<HTMLDivElement>(null)

    // States

    // Use Efffect
    useEffect(() => {
        sendUseRefData(checkBoxRef, roomContainerRef)
    }, [checkBoxRef, roomContainerRef])

    // Functions
    const changeStyles = (e: any) => {
        const { name, value } = e.target

        switch (name) {
            case 'background_color':
                roomContainerRef.current!.style.backgroundColor = value
                setValue('backgroundColor', value)
                break;
            case 'text_color':
                const textsColor = roomContainerRef.current!.querySelectorAll('p') as NodeListOf<HTMLElement>
                textsColor.forEach(textColor => {
                    textColor.style.color = value
                    setValue('textColor', value)
                });
                break;
            default:
                break;
        }
    }

    return (
        <Layout
            title="Crear estatus de habitación"
            description="Creación de los estatus de las habitaciones para los hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Crear estatus de las habitaciones</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text="Guardando datos" />
            ) : null}

            <ToastContainer />

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

            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className={styles.subtitle}>Estatus de la habitación</h5>

                    <div className="form-grid">
                        <div className="input-container">
                            <label htmlFor="name">Nombre</label>
                            <br />
                            <input
                                className={errors.name ? 'input input_error_text' : 'input'}
                                {...register("name", { required: true, maxLength: 40 })}
                                id="name"
                                autoComplete="off"
                                autoFocus={true}
                                placeholder="Ej. Libre"
                            />
                            <br />
                            {errors.name && errorsMessages(errors.name.type, 'nombre', 40)}
                        </div>

                        <div className="input-container">
                            <label htmlFor="background_color">Color de fondo del estado de la habitación</label>
                            <br />
                            <input
                                className={errors.backgroundColor ? 'input-color input_error_text' : 'input-color'}
                                {...register("backgroundColor", { required: true, maxLength: 7 })}
                                id="background_color"
                                name="background_color"
                                type="color"
                                defaultValue="#B8EAFF"
                                onChange={(e) => changeStyles(e)}
                            />
                            <br />
                            {errors.backgroundColor && errorsMessages(errors.backgroundColor.type, '', 7)}
                        </div>

                        <div className="input-container">
                            <label htmlFor="text_color_select">Color del texto</label>
                            <br />
                            <select
                                className={errors.textColor ? 'input_error_text select' : 'select'}
                                {...register("textColor", { required: true })}
                                id="text_color_select"
                                name="text_color"
                                autoComplete="off"
                                onChange={(e) => changeStyles(e)}
                            >
                                <option value='#3B444B'>Obscuro</option>
                                <option value='#FFFFFF'>Claro</option>
                            </select>
                            <br />
                            {errors.textColor && <small>El campo color de texto está vacio!</small>}
                        </div>

                        <div ref={checkBoxRef} className="input-container">
                            <label htmlFor="border">Borde</label>
                            <br />
                            <input
                                className={errors.border ? 'checkbox input_error_text' : 'checkbox'}
                                {...register("border")}
                                id="border"
                                name="border"
                                type="checkbox"
                                readOnly
                                onClick={changeCheckBox}
                            />
                            <br />
                            {errors.border && errorsMessages(errors.border.type)}
                        </div>
                    </div>

                    <h5 className={styles.demo}>Vista previa del estado de la habitación</h5>

                    <div className={styles.room_demo_container}>
                        <div ref={roomContainerRef} className={styles.room_primary_color}>
                            <div className={styles.room_secondary_color} />
                            <div className={styles.room_text}>
                                <p>101</p>
                                <p>S-</p>
                            </div>
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