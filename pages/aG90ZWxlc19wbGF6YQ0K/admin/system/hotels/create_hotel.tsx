// React
import { NextPageContext } from "next"
import { useFieldArray, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import Router, { useRouter } from "next/router"

// Libraries
import { toast, ToastContainer } from "react-toastify";

// CSS
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../../../styles/admin/system/hotels/CreateHotels.module.css"

// Components
import Layout from "../../../../../components/globals/Layout";
import Loading from "../../../../../components/admin/loading/Loader"
import Reviews from "../../../../../components/admin/reviews/Reviews";
import BtnSubmit from "../../../../../components/admin/buttons/submit/BtnSubmit"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"
import DialogWarning from "../../../../../components/admin/dialogs/warning/DialogWarning";

// Helpers
import { endpoint } from "../../../../../config/endpoint";
import googleMaps from "../../../../../helpers/functions/admin/hotels/googleMapsFunctions";
import HotelesFunctions from "../../../../../helpers/functions/admin/hotels/hotelsFunctions";

// Types
import { Review } from "../../../../../types/Review";
import { HotelForm } from "../../../../../types/Hotel"
import { Category } from "../../../../../types/Category"

CreateHotel.getInitialProps = async (ctx: NextPageContext) => {
    const roomsTypeJson = await getFetch(endpoint + '/api/admin/rooms/roomsType/showRoomsType', ctx)
    const roomsStatusJson = await getFetch(endpoint + '/api/admin/rooms/roomsStatus/showRoomsStatus', ctx)
    
    return {
        roomsType: roomsTypeJson,
        roomsStatus: roomsStatusJson
    }
}

async function getFetch(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })

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

export default function CreateHotel(props: any) {

    // Variables
    const router = useRouter()
    const {
        hotel,
        rooms,
        showDialogConfirm,
        showDialogWarning,
        showLoading,
        roomsError,
        handleDialogConfirm,
        // handleChangeImage,
        handleStylesRoomDiv,
        createFloors,
        generateFloors,
        generateStructureRoomData,
        showDialog,
        successConfirm,
    } = HotelesFunctions()
    const {
        dataOfPlace,
        showGoogleMaps,
        showReferences,
        placesOfInterestList,
        setShowGoogleMaps,
        setShowReferences,
        removeElList
    } = googleMaps()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { control, register, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm<any>();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "placesInterest", // unique name for your Field Array
      });
    const onSubmit = async (data: any) => {
        console.log('DATAAAAAAA: ', data, placesOfInterestList);
        const roomData = await generateStructureRoomData()
        showDialog(data, roomData, placesOfInterestList)
    }
    const initialDialogValues = {
        show: false,
        image: '',
        alt: '',
        title: '',
        description: '',
        btnConfirm: '',
        btnCancel: '',
        onConfirm: () => { },
        onClose: () => { }
    }

    // Use State
    const [reviews, setReviews] = useState<any>([])
    const [showDialogWarningReview, setShowDialogWarningReview] = useState(initialDialogValues)

    useEffect(() => {
        if (dataOfPlace) {
            fillDataOfGoogleMaps()
        }

        setValue("type", "create")
    }, [showGoogleMaps, dataOfPlace])


    useEffect(() => {
        if (rooms.length === 0) {
            generateFloors(props.roomsType, 1, props.roomsStatus)
        }
    }, [])

    useEffect(() => {
        setValue('reviews', reviews)
    }, [reviews])

    function fillDataOfGoogleMaps() {
        setReviews(dataOfPlace[0].reviews)
        setValue('name', dataOfPlace[0].name)
        clearErrors('name')
        setValue('ubication', dataOfPlace[0].formatted_address)
        clearErrors('ubication')
        setValue("phone", dataOfPlace[0].formatted_phone_number)
        clearErrors('phone')
        setValue('references', hotel.references)
        setValue('googleMaps', dataOfPlace[0].url)
        clearErrors('googleMaps')
        setValue('latitude', dataOfPlace[0].geometry.location.lat())
        clearErrors('latitude')
        setValue('longitude', dataOfPlace[0].geometry.location.lng())
        clearErrors('longitude')
        setValue('placeId', dataOfPlace[0].place_id)
        clearErrors('placeId')
        setValue('facebook', hotel.facebook || '')
        setValue('whatsapp', hotel.whatsapp || '')
        setValue('instagram', hotel.instagram || '')
        // setValue('image', hotel.image)
    }

    const confirmToRemoveReview = (isShow: boolean, index: number) => {
        setShowDialogWarningReview({
            ...showDialogWarningReview,
            show: isShow,
            title: 'Eliminar comentario',
            description: 'El comentario no aparecerá en la página web',
            btnConfirm: 'Eliminar',
            btnCancel: 'Cancelar',
            onConfirm: () => removeReview(index),
            onClose: () => setShowDialogWarningReview(initialDialogValues)
        })
    }

    const reloadReviews = () => {
        setReviews(dataOfPlace[0].reviews)
    }

    const removeReview = (index: number) => {
        setReviews(reviews.filter((review: Review, i: number) => i !== index))
        setShowDialogWarningReview(initialDialogValues)
    }

    return (
        <Layout
            title="Crear hotel"
            description="Creación de hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Crear hotel</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text={showLoading.title} />
            ) : null}

            <ToastContainer />

            {showDialogConfirm.show ? (
                <DialogConfirm
                    image={showDialogConfirm.image}
                    alt={showDialogConfirm.alt}
                    title={showDialogConfirm.title}
                    description={showDialogConfirm.description}
                    btnConfirm={showDialogConfirm.btnConfirm}
                    btnCancel={showDialogConfirm.btnCancel}
                    onConfirm={successConfirm}
                    onClose={handleDialogConfirm}
                />
            ) : null}

            {
                showDialogWarning.show ? (
                    <DialogWarning
                        image={showDialogWarning.image}
                        alt={showDialogWarning.alt}
                        title={showDialogWarning.title}
                        description={showDialogWarning.description}
                        btnConfirm={showDialogWarning.btnConfirm}
                        btnCancel={showDialogWarning.btnCancel}
                        onConfirm={showDialogWarning.onConfirm}
                        onClose={showDialogWarning.onClose}
                    />
                ) : null
            }

            {
                showDialogWarningReview.show ? (
                    <DialogWarning
                        image={showDialogWarningReview.image}
                        alt={showDialogWarningReview.alt}
                        title={showDialogWarningReview.title}
                        description={showDialogWarningReview.description}
                        btnConfirm={showDialogWarningReview.btnConfirm}
                        btnCancel={showDialogWarningReview.btnCancel}
                        onConfirm={showDialogWarningReview.onConfirm}
                        onClose={showDialogWarningReview.onClose}
                    />
                ) : null
            }

            <section className={styles.create_hotel_section}>
                <form encType="multipart/form-data" className={styles.hotel_form} onSubmit={handleSubmit(onSubmit)}>

                    <p className={styles.googlemaps_results_text}>Seleccionar la ubicación del hotel</p>

                    <div className={styles.hotel_googlemaps_grid}>
                        <label className={styles.switch}>
                            <input type="checkbox" />
                            <span className={styles.slider} onClick={() => setShowGoogleMaps(!showGoogleMaps)} />
                        </label>
                        {showGoogleMaps ? (<p>Si</p>) : (<p>No</p>)}
                    </div>
                    {
                        showGoogleMaps ? (
                            <div>
                                <div className={styles.google_maps_container}>

                                    <div id="map" className={styles.map} />
                                    {
                                        dataOfPlace ? (
                                            <div className={styles.sidebar_googlemaps} id="sidebar">
                                                <p className={styles.googlemaps_results_text}>Resultados de lugares cercanos</p>
                                                <ul className={styles.places} id="places" />
                                            </div>
                                        ) : (
                                            <p className={styles.googlemaps_results_text}>Seleccione una ubicación.</p>
                                        )
                                    }
                                </div>

                                {
                                    dataOfPlace ? (
                                        <>
                                            <div>
                                                <p className={styles.googlemaps_results_text}>¿Desea agregar los lugares de interés de forma manual?</p>
                                                <div className={styles.hotel_googlemaps_grid}>
                                                    <label className={styles.switch}>
                                                        <input type="checkbox" />
                                                        <span className={styles.slider} onClick={() => setShowReferences(!showReferences)} />
                                                    </label>
                                                    {showReferences ? (<p>Si</p>) : (<p>No</p>)}
                                                </div>
                                            </div>

                                            <div className={styles.references_container}>
                                                {
                                                    showReferences ? (
                                                        <div className={styles.manual_place_container}>
                                                            <div id="custom_map" className={styles.custom_map} />
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        </>
                                    ) : null
                                }
                            </div>
                        ) : null
                    }

                    {
                        placesOfInterestList.length > 0 ? (
                            <div>
                                <h5 className={styles.subtitle}>Total de lugares de interés de {dataOfPlace[0].name}: {placesOfInterestList.length}</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Título</th>
                                            <th>Distancia</th>
                                            <th>Forma de viaje</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            placesOfInterestList.length > 0 ? (
                                                placesOfInterestList.map((data: any, index: number) => {
                                                    // const placesInterest: any = `placesInterest[${index}]`;
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {data.name}
                                                                {/* <input
                                                                    className={errors.placesInterest ? 'input input_error_text' : 'input'}
                                                                    id="placesInterest"
                                                                    type="text"
                                                                    value={data.name}
                                                                    hidden
                                                                /> */}
                                                            </td>
                                                            <td>
                                                                {data.distance != 0 ? data.distance : 'No data'}
                                                                {/* <input
                                                                    className={errors.placesInterest ? 'input input_error_text' : 'input'}
                                                                    id="placesInterest"
                                                                    type="text"
                                                                    value={data.distance}
                                                                    hidden
                                                                /> */}
                                                            </td>
                                                            <td>
                                                                {data.duration != 0 ? data.duration : 'No data'}
                                                                {/* <input
                                                                    className={errors.placesInterest ? 'input input_error_text' : 'input'}
                                                                    {...register(`placesInterest${i}.duration` as const, { required: true })}
                                                                    id="placesInterest"
                                                                    type="text"
                                                                    value={data.duration}
                                                                    hidden
                                                                /> */}
                                                            </td>
                                                            <td>
                                                                <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                                                    <path fill="currentColor" d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z" />
                                                                </svg>
                                                                {/* <input
                                                                    className={errors.placesInterest ? 'input input_error_text' : 'input'}
                                                                    {...register(`placesInterest${i}.travelMode` as const, { required: true })}
                                                                    id="placesInterest"
                                                                    type="text"
                                                                    value={data.travelMode}
                                                                    hidden
                                                                /> */}
                                                            </td>
                                                            <td>
                                                                <button type="button" onClick={() => removeElList(data)}>
                                                                    <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                                                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                                                    </svg>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (null)
                                        }

                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <table className={`table ${styles.references_no_data}`}>
                                <tbody>
                                    <tr>
                                        <td><p className={styles.googlemaps_results_text}>El hotel no tiene ningún lugar de interés seleccionado aún.</p></td>
                                    </tr>
                                </tbody>
                            </table>
                        )
                    }

                    <h5 className={styles.subtitle}>Datos del hotel</h5>

                    <div className={styles.hotel_grid}>

                        <div className="input-container">
                            <label htmlFor="name">Nombre</label>
                            <br />
                            <input
                                className={errors.name ? 'input input_error_text' : 'input'}
                                {...register("name", { required: true })}
                                id="name"
                                autoComplete="off"
                                autoFocus={true}
                            />
                            <br />
                            {errors.name && <small>El campo Nombre está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="ubication">Ubicación</label>
                            <br />
                            <input
                                className={errors.ubication ? 'input input_error_text' : 'input'}
                                {...register("ubication", { required: true })}
                                id="ubication"
                                autoComplete="off"
                            />
                            <br />
                            {errors.ubication && <small>El campo Ubicación está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="phone">Teléfono</label>
                            <br />
                            <input
                                className={errors.phone ? 'input_error_text select' : 'input'}
                                {...register("phone", { required: true })}
                                id="phone"
                                autoComplete="off"
                            />
                            <br />
                            {errors.phone && <small>El campo Teléfono está vacio!</small>}
                        </div>
                        {/* <div className="input-container">
                            <label htmlFor="category_select">Categoria</label>
                            <br />
                            <select
                                className={errors.category_id ? 'input_error_text select' : 'select'}
                                {...register("category_id", { required: true })}
                                id="category_select"
                                autoComplete="off"
                            >
                                {
                                    props.categories.map((category: Category, index: number) =>
                                        <option key={index} value={category.id}>{category.name}</option>
                                    )
                                }
                            </select>
                            <br />
                            {errors.category_id && <small>El campo Categoria está vacio!</small>}
                        </div> */}
                        <div className="input-container">
                            <label htmlFor="stars_select">Estrellas</label>
                            <br />
                            <select
                                className={errors.stars ? 'input_error_text select' : 'select'}
                                {...register("stars", { required: true })}
                                id="stars_select"
                                autoComplete="off"
                            >
                                <option defaultValue={1}>1</option>
                                <option defaultValue={2}>2</option>
                                <option defaultValue={3}>3</option>
                                <option defaultValue={4}>4</option>
                                <option defaultValue={5}>5</option>
                            </select>
                            <br />
                            {errors.stars && <small>El campo Categoria está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="references">Referencias</label>
                            <br />
                            <input
                                className={errors.references ? 'input input_error_text' : 'input'}
                                {...register("references", { required: true })}
                                id="references"
                                autoComplete="off"
                            />
                            <br />
                            {errors.references && <small>El campo Referencias está vacio!</small>}
                        </div>
                    </div>

                    <h5 className={styles.subtitle}>Datos de Google Maps</h5>

                    <div className={styles.hotel_grid}>
                        <div className="input-container">
                            <label htmlFor="googleMaps">Link Google Maps</label>
                            <br />
                            <input
                                className={errors.googleMaps ? 'input input_error_text' : 'input'}
                                {...register("googleMaps", { required: true })}
                                id="googleMaps"
                                autoComplete="off"
                            />
                            <br />
                            {errors.googleMaps && <small>El campo Google Maps está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="latitude">Latitud</label>
                            <br />
                            <input
                                className={errors.latitude ? 'input input_error_text' : 'input'}
                                {...register("latitude", { required: dataOfPlace ? true : false })}
                                id="latitude"
                                autoComplete="off"
                            />
                            <br />
                            {errors.latitude && <small>El campo Latitud está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="longitude">Longitud</label>
                            <br />
                            <input
                                className={errors.longitude ? 'input input_error_text' : 'input'}
                                {...register("longitude", { required: dataOfPlace ? true : false })}
                                id="longitude"
                                autoComplete="off"
                            />
                            <br />
                            {errors.longitude && <small>El campo Longitud está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="placeId">ID del lugar</label>
                            <br />
                            <input
                                className={errors.placeId ? 'input input_error_text' : 'input'}
                                {...register("placeId", { required: dataOfPlace ? true : false })}
                                id="placeId"
                                autoComplete="off"
                            />
                            <br />
                            {errors.placeId && <small>El campo ID del lugar está vacio!</small>}
                        </div>


                    </div>

                    <div>
                        {
                            dataOfPlace && reviews && reviews.length ? (
                                <>
                                    <Reviews
                                        reviews={reviews}
                                        reloadReviews={reloadReviews}
                                        confirmToRemoveReview={(isShow: boolean, index: number) => confirmToRemoveReview(isShow, index)}
                                    />
                                </>
                            ) : null
                        }
                    </div>

                    <h5 className={styles.subtitle}>Redes sociales (links)</h5>

                    <div className={styles.hotel_grid}>
                        <div className="input-container">
                            <label htmlFor="facebook">Facebook</label>
                            <br />
                            <input
                                className={errors.facebook ? 'input input_error_text' : 'input'}
                                {...register("facebook", { required: false })}
                                id="facebook"
                                autoComplete="off"
                            />
                            <br />
                            {errors.facebook && <small>El campo Facebook está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <br />
                            <input
                                className={errors.whatsapp ? 'input input_error_text' : 'input'}
                                {...register("whatsapp", { required: false })}
                                id="whatsapp"
                                autoComplete="off"
                            />
                            <br />
                            {errors.whatsapp && <small>El campo Whatsapp está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="instagram">Instagram</label>
                            <br />
                            <input
                                className={errors.instagram ? 'input input_error_text' : 'input'}
                                {...register("instagram", { required: false })}
                                id="instagram"
                                autoComplete="off"
                            />
                            <br />
                            {errors.instagram && <small>El campo Instagram está vacio!</small>}
                        </div>
                        <div className="input-hidden">
                            <input
                                {...register("type", { required: true })}
                                id="type"
                                autoComplete="off"
                                hidden
                            />
                        </div>
                    </div>

                    <h5 className={styles.subtitle}>Habitaciones y Pisos</h5>

                    <div className={styles.hotel_grid}>
                        <div className="input-container">
                            <label htmlFor="total_floors_select">Cantidad de pisos</label>
                            <br />
                            <select
                                className={errors.totalFloors ? 'input_error_text select' : 'select'}
                                {...register("totalFloors", { required: true })}
                                id="total_floors_select"
                                autoComplete="off"
                                onChange={(e) => generateFloors(props.roomsType, e, props.roomsStatus)}
                            >
                                {createFloors()}
                            </select>
                            <br />
                            {errors.totalFloors && <small>El campo Pisos está vacio!</small>}
                        </div>
                    </div>

                    <br />

                    <div className="rooms-table-container">
                        {rooms}
                        <br />
                        {errors.instagram && <small>El campo Instagram está vacio!</small>}
                    </div>

                    {/* <h5 className={styles.subtitle}>Imágen del hotel</h5>

                    <div className={styles.hotel_grid}>
                        <UploadImage class={!hotel.image && Object.values(errors).length ? "error_text_image" : ""} mainText="Logo" text="Seleccionar imágen del hotel" label="Upload_image" imageClick={(file: string, imageName: string) => handleChangeImage(file, imageName, 'create')} />
                        <input {...register("image", { required: true })} name="image" type="text" hidden />
                        <input {...register("file", { required: true })} name="file" type="text" hidden />
                    </div> */}

                    {!Object.values(errors).length ? (
                        <>
                            <BtnSubmit title="Registrar" loading={showLoading.show} />
                        </>
                    ) : (
                        <p className="submit-error-text mt-3">Se encontraron algunos errores!.</p>
                    )}

                </form>
            </section>
        </Layout>
    )
}