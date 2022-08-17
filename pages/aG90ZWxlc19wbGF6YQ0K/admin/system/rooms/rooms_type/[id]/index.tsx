// React
import Router, { useRouter } from "next/router"
import { NextPageContext } from "next"
import { useEffect, useRef, useState } from "react"

// Libraries
import { useForm } from "react-hook-form";

// CSS
import styles from "../../../../../../../styles/admin/system/rooms/roomTypes/CreateRoomTypes.module.css"

// Components
import BtnSubmit from "../../../../../../../components/admin/buttons/submit/BtnSubmit"
import DialogConfirm from "../../../../../../../components/admin/dialogs/confirm/DialogConfirm"
import Layout from "../../../../../../../components/globals/Layout";
import Loading from "../../../../../../../components/admin/loading/Loader"
import BtnActions from "../../../../../../../components/admin/buttons/actions/BtnActions"

// Helpers
import { endpoint } from "../../../../../../../config/endpoint";
import TypeRoomsFunctions from "../../../../../../../helpers/functions/admin/roomsType/roomsTypeFunctions";

// Types
import { RoomTypeForm, RoomTypeImages, RoomTypeImagesTable } from "../../../../../../../types/RoomType";

EditCategory.getInitialProps = async (ctx: NextPageContext) => {
    const hotelsJson = await getFetch(endpoint + '/api/admin/hotels/showHotels', ctx)
    const roomTypeJson = await getFetch(endpoint + '/api/admin/rooms/roomsType/showEditRoomType', ctx, ctx.query.id)

    return { hotels: hotelsJson, roomType: roomTypeJson }
}

async function getFetch(url: string, ctx: NextPageContext, routeQuery?: any) {
    const cookie = ctx.req?.headers.cookie
    if (routeQuery) {
        const resp = await fetch(url, {
            method: 'POST',
            headers: { cookie: cookie! },
            body: ctx.query.id as string
        })

        return await resp.json()
    }
    const resp = await fetch(url, {
        method: 'GET',
        headers: { cookie: cookie! }
    })

    if (resp.status === 500 && ctx.req) {
        Router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/categories/categories')
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

export default function EditCategory({ hotels, roomType, roomTypeImages }: any) {

    // Variables
    const {
        imagesUrl,
        showImages,
        roomImageSelected,
        loadHotelsImages,
        showDialogConfirm,
        showLoading,
        loadingData,
        showEditDialog,
    } = TypeRoomsFunctions(hotels)
    const router = useRouter()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm<RoomTypeForm>();
    const onSubmit = (data: any) => {
        showEditDialog(data)
    }

    // Use Ref
    const roomImageContainerRef = useRef<HTMLDivElement>(null)

    // States
    const [imagesData, setImagesData] = useState<Array<RoomTypeImages>>([])
    const [imagesSelecteds, setImagesSelecteds] = useState<Array<number>>([])

    // Functions
    const loadingEditData = () => {
        setValue('id', roomType.data.id)
        setValue('name', roomType.data.name)
        setValue('keyWord', roomType.data.keyWord)
        setValue('costPerNight', roomType.data.costPerNight)
        setValue('title', roomType.data.title)
        setValue('description', roomType.data.description)
        setValue('maxPeople', roomType.data.maxPeople)
        setValue('smoke', roomType.data.smoke)
        setValue('RoomTypeImages', roomType.data.RoomTypeImages)
        
        roomType.data.RoomTypeImages.forEach((data: any) => {
            setImagesSelecteds((oldValue: Array<number>) => [...oldValue, data.index]);
            const imageData = {
                id: data.id,
                hotelId: data.hotelId,
                imageUrl: data.imageUrl,
                pathDirect: data.pathDirect,
                index: data.index
            }

            setImagesData((oldValue: any) => [...oldValue, imageData])
        });
    }

    const addOrRemoveImages = () => {
        if (roomImageContainerRef.current && roomImageContainerRef.current?.childNodes.length) {
            roomImageContainerRef.current?.childNodes.forEach((element, i) => {
                const htmlElement = element.childNodes[0] as HTMLDivElement
                
                if (roomImageSelected.type == 'remove' && imagesSelecteds.length && roomImageSelected.imageSelected == i) {
                    htmlElement.classList.remove(styles.room_image_selected)
                    setValue('RoomTypeImages', imagesData)
                }

                if (roomImageSelected.type == 'add' && imagesSelecteds.length && imagesSelecteds.includes(i)) {
                    htmlElement.classList.add(styles.room_image_selected)
                    setValue('RoomTypeImages', imagesData)
                    clearErrors('RoomTypeImages')
                }
            });
        }
    }

    const addImages = () => {
        if (imagesSelecteds.indexOf(roomImageSelected.imageSelected) == -1 || !imagesSelecteds.length) {
            const data = { hotelId: roomImageSelected.hotelId!, imageUrl: roomImageSelected.imageUrl, pathDirect: roomImageSelected.hotelName, index: roomImageSelected.imageSelected }
            
            if (imagesSelecteds.indexOf(data.index) == -1) {
                setImagesSelecteds((oldValue: Array<number>) => [...oldValue, roomImageSelected.imageSelected]);
                setImagesData((oldValue: any) => [...oldValue, data])
            }
        }
    }

    const removeImagesSelected = () => {
        setImagesSelecteds(imagesSelecteds.filter((item: number) => item !== roomImageSelected.imageSelected));
        setImagesData(imagesData.filter((item: RoomTypeImages) => item.imageUrl !== roomImageSelected.imageUrl));
    }

    // Use Effect
    useEffect(() => { if (!imagesSelecteds.length) { loadingData(roomType); loadingEditData() } }, [roomType])

    useEffect(() => { if (!imagesUrl.length) { loadHotelsImages(hotels) } }, [imagesUrl])

    useEffect(() => { addOrRemoveImages(); }, [imagesSelecteds])

    useEffect(() => { if (roomImageSelected.type == 'add') { addImages(); } else { removeImagesSelected() } }, [roomImageSelected])

    return (
        <Layout
            title="Editar categoría"
            description="Categorias de los hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Editar tipo de habitación {roomType.data.name ? roomType.data.name : ''}</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text="Cargando..." />
            ) : null}

            {showDialogConfirm.show ? (
                <DialogConfirm
                    image={showDialogConfirm.image ? showDialogConfirm.image : ''}
                    alt={showDialogConfirm.alt ? showDialogConfirm.alt : ''}
                    title={showDialogConfirm.title ? showDialogConfirm.title : ''}
                    description={showDialogConfirm.description ? showDialogConfirm.description : ''}
                    btnConfirm={showDialogConfirm.btnConfirm ? showDialogConfirm.btnConfirm : ''}
                    btnCancel={showDialogConfirm.btnCancel ? showDialogConfirm.btnCancel : ''}
                    onConfirm={showDialogConfirm.onConfirm ? showDialogConfirm.onConfirm : () => { }}
                    onClose={showDialogConfirm.onClose ? showDialogConfirm.onClose : () => { }}
                />
            ) : null}

            <section className={styles.roomstype_form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className={styles.subtitle}>Datos del tipo de habitación</h5>

                    <div className='form-grid'>
                        <div className="input-container">
                            <label htmlFor="name">Tipo de habitación</label>
                            <br />
                            <input
                                className={errors.name ? 'input input_error_text' : 'input'}
                                {...register("name", { required: true, maxLength: 30 })}
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
                        <input hidden type="text" {...register('RoomTypeImages', { required: true })} />
                        <div ref={roomImageContainerRef} className='form-grid'>
                            {imagesUrl && imagesUrl.length ? (showImages()) : null}
                        </div>
                        <br />
                        {errors.RoomTypeImages && <small>Debe seleccionar una imágen para poder continuar</small>}
                    </div>

                    {!Object.values(errors).length ? (
                        <BtnSubmit title="Editar" />
                    ) : (
                        <p className="submit-error-text">Se encontraron algunos errores!.</p>
                    )}
                </form>
            </section>
        </Layout>
    )
}