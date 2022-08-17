// React
import { NextPageContext } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Router, { useRouter } from "next/router"

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
import { endpoint } from "../../../../../../config/endpoint";
import { unauthorized } from "../../../../../../helpers/notification401";
import TypeRoomsFunctions from "../../../../../../helpers/functions/admin/roomsType/roomsTypeFunctions";

// Types
import { RoomTypeForm, RoomTypeImages } from "../../../../../../types/RoomType"

CreateRoomsType.getInitialProps = async (ctx: NextPageContext) => {
    const isAdmin = await getFetch(endpoint + '/api/admin/auth/isAdmin', ctx)
    const hotelsJson = await getFetch(endpoint + '/api/admin/hotels/showHotels', ctx)

    return { isAdmin, hotels: hotelsJson }
}

async function getFetch(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, { headers: { cookie: cookie! } })

    if (resp.status === 401 && !ctx.req) {
        unauthorized()
        Router.replace('/aG90ZWxlc19wbGF6YQ0K/authentication/login')
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        unauthorized()
        ctx.res?.writeHead(302, {
            Location: 'http://localhost:3000/aG90ZWxlc19wbGF6YQ0K/authentication/login'
        })
        ctx.res?.end()
        return;
    }

    return await resp.json()
}

export default function CreateRoomsType({ hotels }: any) {

    // Variables
    const router = useRouter()
    const {
        imagesUrl,
        showImages,
        roomImageSelected,
        loadHotelsImages,
        showDialogConfirm,
        showLoading,
        showDialog,
    } = TypeRoomsFunctions(hotels)
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm<RoomTypeForm>();
    const onSubmit = (data: any) => { console.log(data); showDialog(data) }

    // UseRef
    const roomImageContainerRef = useRef<HTMLDivElement>(null)

    // States
    const [imagesData, setImagesData] = useState<Array<RoomTypeImages>>([])
    const [imagesSelecteds, setImagesSelecteds] = useState<Array<number>>([])

    // Functions
    const addOrRemoveImages = () => {
        if (roomImageContainerRef.current && roomImageContainerRef.current?.childNodes.length) {
            roomImageContainerRef.current?.childNodes.forEach((element, i) => {
                const htmlElement = element.childNodes[0] as HTMLDivElement

                if (roomImageSelected.type == 'remove' && imagesSelecteds.length && roomImageSelected.imageSelected == i) {
                    htmlElement.classList.remove(styles.room_image_selected)
                    setValue('roomTypeImages', imagesData)
                }

                if (roomImageSelected.type == 'add' && imagesSelecteds.length && imagesSelecteds.includes(i)) {
                    htmlElement.classList.add(styles.room_image_selected)
                    setValue('roomTypeImages', imagesData)
                    clearErrors('roomTypeImages')
                }
            });
        }
    }

    const addImages = () => {
        if (imagesSelecteds.indexOf(roomImageSelected.imageSelected) == -1 && roomImageSelected.imageSelected >= 0) {
            const data= {hotelId: roomImageSelected.hotelId!, imageUrl: roomImageSelected.imageUrl, pathDirect: roomImageSelected.hotelName, index: roomImageSelected.imageSelected}
            
            setImagesSelecteds((oldValue: Array<number>) => [...oldValue, roomImageSelected.imageSelected]);
            setImagesData((oldValue: any) => [...oldValue, data])
        }
    }

    const removeImagesSelected = () => {
        setImagesSelecteds(imagesSelecteds.filter((item: number) => item !== roomImageSelected.imageSelected));
        setImagesData(imagesData.filter((item: RoomTypeImages) => item.imageUrl !== roomImageSelected.imageUrl));
    }

    // Use Efffect
    useEffect(() => { if (!imagesUrl.length) { loadHotelsImages(hotels) } }, [imagesUrl])

    useEffect(() => { addOrRemoveImages() }, [imagesSelecteds])

    useEffect(() => { if (roomImageSelected.type == 'add') { addImages(); } else { removeImagesSelected() } }, [roomImageSelected])

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

                    <h5 className={styles.subtitle}>Seleccione la imágen del tipo de habitación</h5>

                    <div className="input-container">
                        <input hidden type="text" {...register('roomTypeImages', { required: true })} />
                        <div ref={roomImageContainerRef} className='form-grid'>
                            {imagesUrl && imagesUrl.length ? (showImages()) : null}
                        </div>
                        <br />
                        {errors.roomTypeImages && <small>Debe seleccionar una imágen para poder continuar</small>}
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