// React
import { NextPageContext } from "next"
import Router, { useRouter } from "next/router"
import { RefObject, useEffect, useRef } from "react"

// Libraries
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"

// CSS
import styles from "../../../../../../../styles/admin/system/rooms/roomStatus/CreateRoomStatus.module.css"

// Components
import Loading from "../../../../../../../components/admin/loading/Loader"
import BtnActions from "../../../../../../../components/admin/buttons/actions/BtnActions"
import BtnSubmit from "../../../../../../../components/admin/buttons/submit/BtnSubmit"
import DialogConfirm from "../../../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import { endpoint } from "../../../../../../../config/endpoint"
import RoomStatusFunction from "../../../../../../../helpers/functions/admin/roomsStatus/roomsStatusFunction"

// Types
import { RoomStatus } from "../../../../../../../types/RoomStatus"
import Layout from "../../../../../../../components/globals/Layout"

EditCategory.getInitialProps = async (ctx: NextPageContext) => {
    const roomStatusJson = await getFetch(endpoint + '/api/admin/rooms/roomsStatus/showEditRoomStatus', ctx)
    return { roomStatus: roomStatusJson }
}

async function getFetch(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, {
        method: 'POST',
        headers: { cookie: cookie! },
        body: ctx.query.id as string
    })

    if (resp.status === 500 && ctx.req) {
        Router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_status/rooms_status')
    }

    if (resp.status === 401 && !ctx.req) {
        Router.replace('/aG90ZWxlc19wbGF6YQ0K/authentication/login')
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
            Location: 'http://localhost:3000/aG90ZWxlc19wbGF6YQ0K/authentication/login'
        })
        ctx.res?.end()
        return;
    }

    return await resp.json()
}

export default function EditCategory(props: any) {
    
    // Variables
    const {
        showDialogConfirm,
        showLoading,
        sendUseRefData,
        changeCheckBox,
        errorsMessages,
        showEditDialog,
    } = RoomStatusFunction()
    const router = useRouter()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<RoomStatus>();
    const onSubmit = (data: any) => { showEditDialog(data) }

    // States

    // Use Effect

    // Functions
    // Use Ref
    const checkBoxRef = useRef<HTMLDivElement>(null)
    const roomContainerRef = useRef<HTMLDivElement>(null)

    // States

    // Use Efffect
    useEffect(() => {
        sendUseRefData(checkBoxRef, roomContainerRef)
        fillStyleData(roomContainerRef)
        
        setValue('id', props.roomStatus.data.id)
        setValue('name', props.roomStatus.data.name)
        setValue('backgroundColor', props.roomStatus.data.backgroundColor)
        setValue('textColor', props.roomStatus.data.textColor)
        setValue('border', props.roomStatus.data.border)
        
    }, [checkBoxRef, roomContainerRef])

    // Functions
    const fillStyleData = (roomContainerRef: RefObject<HTMLDivElement>) => {
        if (roomContainerRef.current && roomContainerRef.current!.querySelectorAll('p').length) {
            const textsColor = roomContainerRef.current!.querySelectorAll('p') as NodeListOf<HTMLElement>
            roomContainerRef.current!.style.backgroundColor = props.roomStatus.data.backgroundColor

            textsColor.forEach(textColor => {
                textColor.style.color = props.roomStatus.data.textColor
            });
        }
    }
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
            title="Editar estatus de habitación"
            description="Actulización del estatus de habitación de los hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Editar estatus de la habitación {props.roomStatus && props.roomStatus.data ? props.roomStatus.data.name : 'No se pudieron cargar los datos!'}</h2>

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