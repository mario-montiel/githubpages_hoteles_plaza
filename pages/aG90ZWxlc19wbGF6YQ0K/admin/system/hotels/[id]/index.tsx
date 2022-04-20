// React
import { useEffect } from "react"
import { NextPageContext } from "next"
import Router, { useRouter } from "next/router"

// Libraries
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify"

// CSS
import styles from "../../../../../../styles/admin/system/hotels/CreateHotels.module.css"

// Components
import Layout from "../../../../../../components/globals/Layout";
import Loading from "../../../../../../components/admin/loading/Loader"
import LoaderData from "../../../../../../components/globals/loaderData/loaderData"
import BtnSubmit from "../../../../../../components/admin/buttons/submit/BtnSubmit"
import BtnActions from "../../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../../components/admin/dialogs/confirm/DialogConfirm"
import DialogWarning from "../../../../../../components/admin/dialogs/warning/DialogWarning"

// Helpers
import { endpoint } from "../../../../../../config/endpoint";
import googleMaps from "../../../../../../helpers/functions/admin/hotels/googleMapsFunctions";
import HotelesFunctions from "../../../../../../helpers/functions/admin/hotels/hotelsFunctions";

// Types
import { HotelForm } from "../../../../../../types/Hotel"
import { Category } from "../../../../../../types/Category"

EditHotel.getInitialProps = async (ctx: NextPageContext) => {
    let categoriesJson: any = []
    let roomsTypeJson: any = []
    let roomsStatusJson: any = []
    let HotelJson: any = []

    categoriesJson = await getFetchData(endpoint + '/api/admin/categories/showCategories', ctx)
    roomsTypeJson = await getFetchData(endpoint + '/api/admin/rooms/roomsType/showRoomsType', ctx)
    roomsStatusJson = await getFetchData(endpoint + '/api/admin/rooms/roomsStatus/showRoomsStatus', ctx)
    HotelJson = await getFetchData(endpoint + '/api/admin/hotels/showEditHotel', ctx, ctx.query.id)

    return {
        categories: categoriesJson,
        hotel: HotelJson,
        roomsType: roomsTypeJson,
        roomsStatus: roomsStatusJson
    }
}

async function getFetchData(url: string, ctx: NextPageContext, routeQuery?: any) {
    const cookie = ctx.req?.headers.cookie
    if (routeQuery) {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                cookie: cookie!
            },
            body: routeQuery ? JSON.stringify(ctx.query.id) : null
        })

        validations(resp, ctx)

        return resp.json()
    }

    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })

    validations(resp, ctx)

    return resp.json()
}

const validations = (resp: any, ctx: NextPageContext) => {
    if (resp.status === 500 && ctx.req) {
        Router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/hotels/hotels')
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
}

export default function EditHotel(props: any) {

    // Variables
    const router = useRouter()
    const {
        editHotel,
        rooms,
        roomsError,
        showLoading,
        showDialogConfirm,
        showDialogWarning,
        // handleChangeImage,
        handleDialogConfirm,
        hotelNotHaveLatAndLng,
        handleStylesRoomDiv,
        createFloors,
        generateFloors,
        generateRoomDataInInputs,
        // loadEditImage,
        generateStructureRoomData,
        showEditDialog,
        redirectToDivMapGoogleMaps
    } = HotelesFunctions()
    const {
        dataOfPlace,
        showGoogleMaps,
        googleMapsLoaded,
        showReferences,
        placesOfInterestList,
        activeCustomMap,
        sendLatLngEditHotel,
        showNearPlaces,
        setShowGoogleMaps,
        fillDataOfPlacesOfInterest,
        removeElList,
    } = googleMaps()
    const { register, setValue, setError, clearErrors, handleSubmit, formState: { errors } } = useForm<HotelForm>();
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const onSubmit = async (data: any) => {
        const roomData: any = await generateStructureRoomData()
        const roomsDiv = document.querySelector('.rooms-table') as HTMLElement

        if (roomsError || !roomData) {
            toast('Asegurece de llenar todos los campos de las habitacones', {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                type: "error"
            });
            handleStylesRoomDiv()
            roomsDiv.scrollIntoView({ block: 'start', behavior: 'smooth' });
            return false
        } else { showEditDialog(data, roomData) }
    }

    // States

    // Use Effect
    useEffect(() => {
        // compareExistingData()
        // if (editHotel.image) {
        //     setTimeout(() => {
        //         setValue("image", "image", { shouldValidate: false })
        //         setValue("file", editHotel.file)
        //     }, 500);
        // }

        if (props.hotel) {
            fillDataOfHotel()
        }

        if (props) {
            generateFloors(props.roomsType, props.hotel.data.totalFloors, props.roomsStatus)
        }

        if (dataOfPlace) {
            fillDataOfGoogleMaps()
            const toastText = `${dataOfPlace[0].name} seleccionado`
            toast(toastText.toLocaleLowerCase(), {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                type: "success"
            });
        }

        if (errors.latitude || errors.longitude) {
            hotelNotHaveLatAndLng()
            clearErrors('latitude')
            clearErrors('longitude')
        }
    }, [props, props.hotel, showGoogleMaps, /* editHotel.image, */ dataOfPlace, errors])

    useEffect(() => {
        if (rooms.length) {
            generateRoomDataInInputs(props.hotel.data.rooms, props.roomsType, props.hotel.data.totalFloors)
        }
    }, [rooms])

    // Functions
    const fillDataOfHotel = () => {
        const latitude = props.hotel.data.latitude ? props.hotel.data.latitude : 25.5428443
        const longitude = props.hotel.data.longitude ? props.hotel.data.longitude : -103.4067861

        setValue('id', props.hotel.data.id)
        setValue('name', props.hotel.data.name)
        setValue('ubication', props.hotel.data.ubication)
        setValue("phone", props.hotel.data.phone)
        setValue('references', props.hotel.data.references)
        setValue('googleMaps', props.hotel.data.googleMaps)
        setValue('latitude', props.hotel.data.latitude)
        setValue('longitude', props.hotel.data.longitude)
        setValue('facebook', props.hotel.data.facebook || '')
        setValue('whatsapp', props.hotel.data.whatsapp || '')
        setValue('instagram', props.hotel.data.instagram || '')
        setValue('totalFloors', props.hotel.data.totalFloors)
        // loadEditImage(props.hotel.data.url)
        // activeCustomMap()

        // if (props.hotel.data.url) {
        //     setValue('image', props.hotel.data.image)
        // }

        sendLatLngEditHotel(parseFloat(latitude), parseFloat(longitude))
        setShowGoogleMaps(true)
        showNearPlaces({
            center: {
                lat: parseFloat(latitude),
                lng: parseFloat(longitude)
            },
            zoom: 16
        })

        if (placesOfInterestList.length === 0) {
            fillDataOfPlacesOfInterest(props.hotel.data.placesOfInterest)
        }

    }

    function fillDataOfGoogleMaps() {
        setValue('name', dataOfPlace[0].name)
        setValue('ubication', dataOfPlace[0].formatted_address)
        setValue("phone", dataOfPlace[0].formatted_phone_number)
        setValue('references', editHotel.references)
        setValue('googleMaps', dataOfPlace[0].url)
        setValue('latitude', dataOfPlace[0].geometry.location.lat())
        setValue('longitude', dataOfPlace[0].geometry.location.lng())
        setValue('facebook', editHotel.facebook || '')
        setValue('whatsapp', editHotel.whatsapp || '')
        setValue('instagram', editHotel.instagram || '')
        // setValue('image', editHotel.image)
    }

    return (
        <Layout
            title="Editar departamento"
            description="Área laboral de los hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Editar hotel {props.hotel.data.name}</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text="Cargando..." />
            ) : null}

            <ToastContainer />

            {showDialogConfirm.show ? (
                <DialogConfirm
                    // title="Editar hotel"
                    image={showDialogConfirm.image}
                    alt={showDialogConfirm.alt}
                    description={showDialogConfirm.description}
                    btnConfirm={showDialogConfirm.btnConfirm}
                    btnCancel={showDialogConfirm.btnCancel}
                    onConfirm={showDialogConfirm.onConfirm}
                    onClose={() => handleDialogConfirm()}
                />
            ) : null}

            {
                showDialogWarning.show ? (
                    <DialogWarning
                        image={showDialogWarning.image}
                        alt={showDialogWarning.alt}
                        description={showDialogWarning.description}
                        btnConfirm={showDialogWarning.btnConfirm}
                        btnCancel={showDialogWarning.btnCancel}
                        onConfirm={redirectToDivMapGoogleMaps}
                        onClose={hotelNotHaveLatAndLng} />
                ) : null
            }

            <section className={styles.create_hotel_section}>
                <form encType="multipart/form-data" className={styles.hotel_form} onSubmit={handleSubmit(onSubmit)}>
                    {console.log(googleMapsLoaded)}
                    {console.log(dataOfPlace)}
                    <div className={styles.google_maps_container}>
                        <div id="map" className={styles.map} />
                        {
                            !googleMapsLoaded ? (<LoaderData isOpen={true} />) : (
                                <div>
                                    {
                                        props.hotel.data.placesOfInterest ? (
                                            <div className={styles.sidebar_googlemaps} id="sidebar">
                                                <p className={styles.googlemaps_results_text}>Resultados de lugares cercanos</p>
                                                <ul className={styles.places} id="places" />
                                            </div>
                                        ) : (
                                            <p className={styles.googlemaps_results_text}>Seleccione una ubicación.</p>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <p className={styles.googlemaps_results_text}>¿Desea agregar los lugares de interés de forma manual?</p>
                        <div className={styles.hotel_googlemaps_grid}>
                            {
                                googleMapsLoaded && dataOfPlace ? (
                                    <>
                                        <label className={styles.switch}>
                                            <input type="checkbox" />
                                            <span className={styles.slider} onClick={() => activeCustomMap()} />
                                        </label>
                                        {showReferences ? (<p className={styles.switch_text}>Si</p>) : (<p className={styles.switch_text}>No</p>)}
                                    </>
                                ) : (
                                    <>
                                        <p className={styles.switch_not_selected_text}>Debe seleccionar un lugar en el mapa</p>
                                        <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
                                        </svg>
                                    </>
                                )
                            }
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

                    <h5 className={styles.subtitle}>Lugares de interés seleccionados:</h5>
                    {console.log(errors)}
                    <div className={styles.places_of_inteerst_container}>
                        {
                            !googleMapsLoaded ? (
                                <LoaderData isOpen={true} />
                            ) : (
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
                                                    const placesInterest: any = `placesInterest[${index}]`;
                                                    return (
                                                        <tr key={index}>
                                                            {/* <td>
                                                                {data.name}
                                                                <input
                                                                    className={errors.placesInterest ? 'input input_error_text' : 'input'}
                                                                    {...register(`${placesInterest}.name`, { required: true })}
                                                                    id="placesInterest"
                                                                    type="text"
                                                                    value={data.name}
                                                                    hidden
                                                                />
                                                            </td>
                                                            <td>
                                                                {data.distance != 0 ? data.distance : 'No data'}
                                                                <input
                                                                    className={errors.placesInterest ? 'input input_error_text' : 'input'}
                                                                    {...register(`${placesInterest}.distance`, { required: true })}
                                                                    id="placesInterest"
                                                                    type="text"
                                                                    value={data.distance}
                                                                    hidden
                                                                />
                                                            </td>
                                                            <td>
                                                                {data.duration != 0 ? data.duration : 'No data'}
                                                                <input
                                                                    className={errors.placesInterest ? 'input input_error_text' : 'input'}
                                                                    {...register(`${placesInterest}.duration`, { required: true })}
                                                                    id="placesInterest"
                                                                    type="text"
                                                                    value={data.duration}
                                                                    hidden
                                                                />
                                                            </td>
                                                            <td>
                                                                <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                                                    <path fill="currentColor" d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z" />
                                                                </svg>
                                                                <input
                                                                    className={errors.placesInterest ? 'input input_error_text' : 'input'}
                                                                    {...register(`${placesInterest}.travelMode`, { required: true })}
                                                                    id="placesInterest"
                                                                    type="text"
                                                                    value={data.travelMode}
                                                                    hidden
                                                                />
                                                            </td> */}
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
                                            ) : (
                                                <tr>
                                                    <td>
                                                        <p className={styles.references_no_selected}>No hay lugares de interés seleccionados</p>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            )
                                        }
                                        {

                                        }
                                    </tbody>
                                </table>
                            )
                        }
                    </div>

                    <h5 className={styles.subtitle}>Datos del hotel</h5>

                    <div className={styles.hotel_grid}>
                        <input
                            {...register("id", { required: true })}
                            id="id"
                            hidden
                        />
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
                        <div className="input-container">
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
                        </div>
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
                                {...register("latitude", { required: true })}
                                id="latitude"
                                autoComplete="off"
                                disabled
                            />
                            <br />
                            {errors.latitude && <small>El campo Latitud está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="longitude">Longitud</label>
                            <br />
                            <input
                                className={errors.longitude ? 'input input_error_text' : 'input'}
                                {...register("longitude", { required: true })}
                                id="longitude"
                                autoComplete="off"
                                disabled
                            />
                            <br />
                            {errors.longitude && <small>El campo Longitud está vacio!</small>}
                        </div>
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
                        {/* <div className="input-hidden">
                            <input
                                {...register("type", { required: true })}
                                id="type"
                                autoComplete="off"
                                hidden
                            />
                        </div> */}
                    </div>

                    <h5 className={styles.subtitle}>Habitaciones y Pisos</h5>

                    <div className={styles.hotel_grid}>
                        <div className="input-container">
                            <label htmlFor="total_floors_select">Pisos</label>
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

                    <div>
                        {
                            rooms.length ? (
                                rooms
                            ) : null
                        }
                        <br />
                        {errors.instagram && <small>El campo Instagram está vacio!</small>}
                    </div>

                    {/* <h5 className={styles.subtitle}>Imágen del hotel</h5>

                    <div className={styles.hotel_grid}>
                        <UploadImage
                            imageLoaded={props.hotel.data.url}
                            class={!editHotel.image && Object.values(errors).length ? "error_text_image" : ""}
                            mainText="Logo"
                            text="Seleccionar imágen del hotel"
                            label="Upload_image"
                            imageClick={(file: string, imageName: string) => handleChangeImage(file, imageName, 'update')} />
                        <input {...register("image", { required: true })} name="image" type="text" hidden />
                        <input {...register("file", { required: false })} name="file" type="text" hidden />
                    </div> */}

                    {!Object.values(errors).length ? (
                        <BtnSubmit title="Registrar" />
                    ) : (
                        <p className="submit-error-text mt-3">Se encontraron algunos campos vacíos, llene todos los campos para poder continuar!.</p>
                    )}
                </form>
            </section>
        </Layout>
    )
}