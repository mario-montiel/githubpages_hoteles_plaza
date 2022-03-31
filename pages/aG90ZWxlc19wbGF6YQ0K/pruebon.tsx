// React

// Libraries
import { db, Collection, GetDocs } from "../../config/firebase/clientApp"
// import { Loader } from "@googlemaps/js-api-loader"

// Components and CSS
import { useToasts } from "react-toast-notifications"
import BtnSubmit from "../../components/admin/buttons/submit/BtnSubmit"
import DialogConfirm from "../../components/admin/dialogs/confirm/DialogConfirm"
import Notification from "../../components/admin/notifications/Notification"
import Layout from "../../components/Layout"
import styles from "./pruebon.module.css"
import Loading from "../../components/admin/loading/Loader"
import BtnActions from "../../components/admin/buttons/actions/BtnActions"
import UploadImage from "../../components/admin/images/upload/UploadImage"
import { useForm } from "react-hook-form";
import { HotelForm } from "../../types/Hotel"
import createEditHotelsForm from "../../components/admin/forms/hotels/createEditForm"
import { useContext, useEffect, useRef, useState } from "react"
import { Category } from "../../types/Category"
import AuthContext from "../../contexts/authContext"
import AdminLogin from "./authentication/login"
import { notAuthWarningText, notAuthWarningTitle } from "../../helpers/global_variables/GlobalVariables"
import { QueryDocumentSnapshot } from "@firebase/firestore"
import { apiKey } from "../../config/googleMaps/apiKey"
import googleMaps from "./admin/system/hotels/googleMapsFunctions"

export const getServerSideProps = async () => {
    let data: any = []
    const categories = (await GetDocs(Collection(db, 'categories'))).docs

    categories.forEach((doc: QueryDocumentSnapshot<any>) => {
        data.push({ ...doc.data(), id: doc.id })
    });

    return {
        props: {
            categories: (await data)
        }
    }
};

export default function CreateHotel(props: any) {

    // Variables
    const { addToast } = useToasts();
    let map: google.maps.Map;
    const { currentUser }: any = useContext(AuthContext)
    const {
        hotel,
        showNotification,
        setShowNotification,
        showDialogConfirm,
        setShowDialogConfirm,
        showLoading,
        setShowLoading,
        handleChangeImage,
        showDialog,
        successConfirm,
        router
    } = createEditHotelsForm()
    const {
        dataOfPlace,
        showGoogleMaps,
        showReferences,
        referencesList,
        setShowGoogleMaps,
        setShowReferences,
        handleSearchInput,
        searchingPlace,
        initGoogleMaps,
        removeElList,
        removeAllPlacesOfUbicationSelected
    } = googleMaps()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, setValue, setError, clearErrors, handleSubmit, formState: { errors } } = useForm<HotelForm>();
    const onSubmit = (data: any) => {
        let validate: boolean = false
        const placesList = document.getElementById("places") as HTMLElement;
        for (let index = 0; index < placesList.children.length; index++) {
            const element: any = placesList.children[index];

            if (element.children[1].checked) {
                validate = true
            }

            if (element.children[1].checked) {
                console.log(element);
                console.log(element.children[0].innerText);
            }
        }

        // if (!validate) {
        //     setHasRerefences(true)
        //     return setError('references', { type: "focus" }, { shouldFocus: true })
        // }

        clearErrors('references')
        // showDialog(data) 
    }

    return currentUser && currentUser.username ? (
        <div>
            <h5 className={styles.subtitle}>¿El hotel se encuentra registrado en Google Maps?</h5>

            <div className={styles.hotel_googlemaps_grid}>
                <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={styles.slider} onClick={() => setShowGoogleMaps(!showGoogleMaps)} />
                </label>
                {showGoogleMaps ? (<p>Si</p>) : (<p>No</p>)}
            </div>
            {
                showGoogleMaps ? (
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
                ) : null
            }
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

                {
                    referencesList.length > 0 ? (
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
                                    referencesList.length > 0 ? (
                                        referencesList.map((data: any, index: number) =>
                                            <tr key={index}>
                                                <td>{data.title}</td>
                                                <td>{data.distance.text != 0 ? data.distance.text : 'No data'}</td>
                                                <td>{data.duration.text != 0 ? data.duration.text : 'No data'}</td>
                                                <td>
                                                    <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z" />
                                                    </svg>
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
                                    ) : (null)
                                }

                            </tbody>
                        </table>
                    ) : (null)
                }
            </div>


            {
                dataOfPlace && referencesList.length > 0 ? (null) : (
                    <table className={`table ${styles.references_no_data}`}>
                        <tbody>
                            <tr>
                                <td><p className={styles.googlemaps_results_text}>No ha seleccionado ningún lugar en específico.</p></td>
                            </tr>
                        </tbody>
                    </table>
                )
            }
        </div>
    ) : (null)
    //     <Layout
    //         title="Crear hotel"
    //         description="Creación de hoteles plaza"
    //     >
    //         <div className={styles.btn_back_container}>
    //             <BtnActions icon={btnIconBack} onClick={() => router.back()} />
    //         </div>

    //         <h2 className={styles.title}>Crear hotel</h2>

    //         {showLoading ? (
    //             <Loading isOpen={showLoading} text="Guardando datos" />
    //         ) : null}

    //         {showNotification ? (
    //             <Notification
    //                 title="Campos vacíos!"
    //                 description="Asegurece de llenar todos los campos para poder continuar"
    //                 onClick={() => setShowNotification(false)}
    //             />
    //         ) : null}

    //         {showDialogConfirm ? (
    //             <DialogConfirm
    //                 title="Crear hotel"
    //                 description={`¿Desea crear el hotel ${hotel.name}?`}
    //                 btnConfirm="Crear"
    //                 btnCancel="Cancelar"
    //                 onConfirm={() => successConfirm('create')}
    //                 onClose={() => setShowDialogConfirm(false)}
    //             />
    //         ) : null}

    //         <section className={styles.create_hotel_section}>
    //             <form encType="multipart/form-data" className={styles.hotel_form} onSubmit={handleSubmit(onSubmit)}>

    //                 <h5 className={styles.subtitle}>¿El hotel se encuentra registrado en Google Maps?</h5>

    //                 <div className={styles.hotel_googlemaps_grid}>
    //                     <label className={styles.switch}>
    //                         <input type="checkbox" />
    //                         <span className={styles.slider} onClick={() => setShowGoogleMaps(!showGoogleMaps)} />
    //                     </label>
    //                     {showGoogleMaps ? (<p>Si</p>) : (<p>No</p>)}
    //                 </div>

    //                 {
    //                     showGoogleMaps ? (
    //                         <div className={showFullWidthGoogleMaps ? styles.google_maps_container : styles.google_maps_container_full_width}>
    //                             <div id="map" className={styles.map} />
    //                             {
    //                                 dataOfPlace ? (
    //                                     <div className={styles.sidebar_googlemaps} id="sidebar">
    //                                         <p className={styles.googlemaps_results_text}>Resultados de lugares cercanos</p>
    //                                         <ul ref={referencesListRef} className={styles.places} id="places" />
    //                                     </div>
    //                                 ) : (
    //                                     <p className={styles.googlemaps_results_text}>Seleccione una ubicación.</p>
    //                                 )
    //                             }

    //                         </div>
    //                     ) : null
    //                 }

    //                 <div>
    //                     <p className={styles.googlemaps_results_text}>¿Desea agregar los lugares de interés de forma manual?</p>
    //                     <div className={styles.hotel_googlemaps_grid}>
    //                         <label className={styles.switch}>
    //                             <input type="checkbox" />
    //                             <span className={styles.slider} onClick={() => setShowReferences(!showReferenes)} />
    //                         </label>
    //                         {showReferenes ? (<p>Si</p>) : (<p>No</p>)}
    //                     </div>
    //                 </div>

    //                 {
    //                     showGoogleMaps ? (
    //                         <div className={styles.references_container}>
    //                             {
    //                                 showReferenes ? (
    //                                     <div className={styles.manual_place_container}>
    //                                         <p className={styles.googlemaps_results_text}>Agregar lugar de forma manual</p>
    //                                         <div className={styles.manual_place_data}>
    //                                             <input className={styles.input_google_maps_css} type="text" placeholder="Ingrese el nombre de la ubicación" />
    //                                             <button>
    //                                                 <svg className={styles.svg_icon} viewBox="0 0 24 24">
    //                                                     <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    //                                                 </svg>
    //                                             </button>
    //                                         </div>
    //                                     </div>
    //                                 ) : null
    //                             }

    //                             {
    //                                 referencesList.length > 0 ? (
    //                                     <table ref={referencesTableRef} className="table">
    //                                         <thead>
    //                                             <tr>
    //                                                 <th>Título</th>
    //                                                 <th>Distancia</th>
    //                                                 <th>Forma de viaje</th>
    //                                             </tr>
    //                                         </thead>
    //                                         <tbody>

    //                                             {
    //                                                 referencesList.length > 0 ? (
    //                                                     referencesList.map((data: any, index: number) =>
    //                                                         <tr>
    //                                                             <td>{data.title}</td>
    //                                                             <td>{data.distance.text != 0 ? data.distance.text : 'No data'}</td>
    //                                                             <td>{data.duration.text != 0 ? data.duration.text : 'No data'}</td>
    //                                                             <td>
    //                                                                 <svg className={styles.svg_icon} viewBox="0 0 24 24">
    //                                                                     <path fill="currentColor" d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z" />
    //                                                                 </svg>
    //                                                             </td>
    //                                                             <td>
    //                                                                 <button type="button" onClick={() => removeElList(data)}>
    //                                                                     <svg className={styles.svg_icon} viewBox="0 0 24 24">
    //                                                                         <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    //                                                                     </svg>
    //                                                                 </button>
    //                                                             </td>
    //                                                         </tr>
    //                                                     )
    //                                                 ) : (null)
    //                                             }

    //                                         </tbody>
    //                                     </table>
    //                                 ) : (null)
    //                             }
    //                         </div>
    //                     ) : (null)
    //                 }

    //                 {
    //                     dataOfPlace && referencesList.length > 0 ? (null) : (
    //                         <table className={`table ${styles.references_no_data}`}>
    //                             <tbody>
    //                                 <tr>
    //                                     <td><p className={styles.googlemaps_results_text}>No ha seleccionado ningún lugar en específico.</p></td>
    //                                 </tr>
    //                             </tbody>
    //                         </table>
    //                     )
    //                 }

    //                 <h5 className={styles.subtitle}>Datos del hotel</h5>

    //                 <div className={styles.hotel_grid}>

    //                     <div className="input-container">
    //                         <label htmlFor="name">Nombre</label>
    //                         <br />
    //                         <input
    //                             className={errors.name ? 'input input_error_text' : 'input'}
    //                             {...register("name", { required: true })}
    //                             id="name"
    //                             autoComplete="off"
    //                             autoFocus={true}
    //                         />
    //                         <br />
    //                         {errors.name && <small>El campo Nombre está vacio!</small>}
    //                     </div>
    //                     <div className="input-container">
    //                         <label htmlFor="ubication">Ubicación</label>
    //                         <br />
    //                         <input
    //                             className={errors.ubication ? 'input input_error_text' : 'input'}
    //                             {...register("ubication", { required: true })}
    //                             id="ubication"
    //                             autoComplete="off"
    //                         />
    //                         <br />
    //                         {errors.ubication && <small>El campo Ubicación está vacio!</small>}
    //                     </div>
    //                     <div className="input-container">
    //                         <label htmlFor="phone">Teléfono</label>
    //                         <br />
    //                         <input
    //                             className={errors.phone ? 'input_error_text select' : 'input'}
    //                             {...register("phone", { required: true })}
    //                             id="phone"
    //                             autoComplete="off"
    //                         />
    //                         <br />
    //                         {errors.phone && <small>El campo Teléfono está vacio!</small>}
    //                     </div>
    //                     <div className="input-container">
    //                         <label htmlFor="category_select">Categoria</label>
    //                         <br />
    //                         <select
    //                             className={errors.category_id ? 'input_error_text select' : 'select'}
    //                             {...register("category_id", { required: true })}
    //                             id="category_select"
    //                             autoComplete="off"
    //                         >
    //                             {
    //                                 props.categories.map((category: Category, index: number) =>
    //                                     <option key={index} value={category.name}>{category.name}</option>
    //                                 )
    //                             }
    //                         </select>
    //                         <br />
    //                         {errors.category_id && <small>El campo Categoria está vacio!</small>}
    //                     </div>
    //                     <div className="input-container">
    //                         <label htmlFor="stars_select">Estrellas</label>
    //                         <br />
    //                         <select
    //                             className={errors.stars ? 'input_error_text select' : 'select'}
    //                             {...register("stars", { required: true })}
    //                             id="stars_select"
    //                             autoComplete="off"
    //                         >
    //                             <option defaultValue={1}>1</option>
    //                             <option defaultValue={2}>2</option>
    //                             <option defaultValue={3}>3</option>
    //                             <option defaultValue={4}>4</option>
    //                             <option defaultValue={5}>5</option>
    //                         </select>
    //                         <br />
    //                         {errors.stars && <small>El campo Categoria está vacio!</small>}
    //                     </div>
    //                 </div>

    //                 <h5 className={styles.subtitle}>Datos de Google Maps</h5>

    //                 <div className={styles.hotel_grid}>
    //                     <div className="input-container">
    //                         <label htmlFor="googleMaps">Link Google Maps</label>
    //                         <br />
    //                         <input
    //                             className={errors.googleMaps ? 'input input_error_text' : 'input'}
    //                             {...register("googleMaps", { required: true })}
    //                             id="googleMaps"
    //                             autoComplete="off"
    //                         />
    //                         <br />
    //                         {errors.googleMaps && <small>El campo Google Maps está vacio!</small>}
    //                     </div>
    //                     <div className="input-container">
    //                         <label htmlFor="latitude">Latitud</label>
    //                         <br />
    //                         <input
    //                             className={errors.latitude ? 'input input_error_text' : 'input'}
    //                             {...register("latitude", { required: dataOfPlace ? true : false })}
    //                             id="latitude"
    //                             autoComplete="off"
    //                         />
    //                         <br />
    //                         {errors.latitude && <small>El campo Latitud está vacio!</small>}
    //                     </div>
    //                     <div className="input-container">
    //                         <label htmlFor="longitude">Longitud</label>
    //                         <br />
    //                         <input
    //                             className={errors.longitude ? 'input input_error_text' : 'input'}
    //                             {...register("longitude", { required: dataOfPlace ? true : false })}
    //                             id="longitude"
    //                             autoComplete="off"
    //                         />
    //                         <br />
    //                         {errors.longitude && <small>El campo Longitud está vacio!</small>}
    //                     </div>
    //                 </div>

    //                 <h5 className={styles.subtitle}>Redes sociales (links)</h5>

    //                 <div className={styles.hotel_grid}>
    //                     <div className="input-container">
    //                         <label htmlFor="facebook">Facebook</label>
    //                         <br />
    //                         <input
    //                             className={errors.facebook ? 'input input_error_text' : 'input'}
    //                             {...register("facebook", { required: false })}
    //                             id="facebook"
    //                             autoComplete="off"
    //                         />
    //                         <br />
    //                         {errors.facebook && <small>El campo Facebook está vacio!</small>}
    //                     </div>
    //                     <div className="input-container">
    //                         <label htmlFor="whatsapp">Whatsapp</label>
    //                         <br />
    //                         <input
    //                             className={errors.whatsapp ? 'input input_error_text' : 'input'}
    //                             {...register("whatsapp", { required: false })}
    //                             id="whatsapp"
    //                             autoComplete="off"
    //                         />
    //                         <br />
    //                         {errors.whatsapp && <small>El campo Whatsapp está vacio!</small>}
    //                     </div>
    //                     <div className="input-container">
    //                         <label htmlFor="instagram">Instagram</label>
    //                         <br />
    //                         <input
    //                             className={errors.instagram ? 'input input_error_text' : 'input'}
    //                             {...register("instagram", { required: false })}
    //                             id="instagram"
    //                             autoComplete="off"
    //                         />
    //                         <br />
    //                         {errors.instagram && <small>El campo Instagram está vacio!</small>}
    //                     </div>
    //                     <div className="input-hidden">
    //                         <input
    //                             {...register("type", { required: true })}
    //                             id="type"
    //                             autoComplete="off"
    //                             hidden
    //                         />
    //                     </div>
    //                 </div>

    //                 <h5 className={styles.subtitle}>Imágen del hotel</h5>

    //                 <div className={styles.hotel_grid}>
    //                     <UploadImage class={!hotel.image && Object.values(errors).length ? "error_text_image" : ""} mainText="Logo" text="Seleccionar imágen del hotel" label="Upload_image" imageClick={(file: string, imageName: string) => handleChangeImage(file, imageName, 'create')} />
    //                     <input {...register("image", { required: true })} name="image" type="text" hidden />
    //                 </div>

    //                 {!Object.values(errors).length ? (
    //                     <BtnSubmit title="Registrar" loading={showLoading} />
    //                 ) : (
    //                     <p className="submit-error-text mt-3">Se encontraron algunos errores!.</p>
    //                 )}
    //             </form>
    //         </section>
    //     </Layout>
    // ) : (
    //     <AdminLogin warningTitle={notAuthWarningTitle} warningText={notAuthWarningText} />
    // )
}