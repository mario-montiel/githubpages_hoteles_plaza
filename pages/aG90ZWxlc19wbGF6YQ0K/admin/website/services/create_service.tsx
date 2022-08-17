// React
import { NextPageContext } from "next";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

// Libraries
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

// CSS
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../../../styles/admin/website/services/CreateServices.module.css"

// Components
import Layout from "../../../../../components/globals/Layout";
import Loading from "../../../../../components/admin/loading/Loader"
import BtnSubmit from "../../../../../components/admin/buttons/submit/BtnSubmit";
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions";
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import { endpoint } from "../../../../../config/endpoint";
import ServicesFunctions from "../../../../../helpers/functions/website/services/serviceFunctions";

// Types
import { Service } from "../../../../../types/Service";
import { RoomType } from "../../../../../types/RoomType";

Bookings.getInitialProps = async (ctx: NextPageContext) => {
    const isAdmin = await getFetch(endpoint + '/api/admin/auth/isAdmin', ctx)
    const roomsTypeJson = await getFetch(endpoint + '/api/admin/rooms/roomsType/showRoomsType', ctx)

    return {
        isAdmin,
        roomsType: roomsTypeJson
    }
}

async function getFetch(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, { headers: { cookie: cookie! } })

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

export default function Bookings({ isAdmin, roomsType }: any) {

    // Variables
    const {
        showDialog,
        showDialogConfirm,
        handleDialogConfirm,
        successConfirm
    } = ServicesFunctions()
    const router = useRouter()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, handleSubmit, formState: { errors } } = useForm<Service>();
    const onSubmit = async (data: any) => { showDialog(data) }

    // Use Ref)
    const htmlIconRef = useRef<HTMLDivElement>(null)
    const groupCheckboxRef = useRef<HTMLDivElement>(null)

    // States
    const [isIcon, setIsIcon] = useState<boolean>(false)
    const [icon, setIcon] = useState<string>('')

    // Functions
    const showRoomTypes = () => {
        let html: any = []

        roomsType.map((roomType: RoomType, index: number) => {
            html.push(
                <fieldset key={index}>
                    <label htmlFor="room_type_select">{roomType.name}</label>
                    <br />
                    <input
                        type="checkbox"
                        value={roomType.id}
                        className={errors.ServicesOnRoom ? `${styles.room_type_checkbox} ${styles.room_type_checkbox_error}` : styles.room_type_checkbox}
                        {...register('ServicesOnRoom', { required: true })}
                    />
                </fieldset>
            )
        })

        return html
    }

    const convertStringToHTML = (e: any) => { setIcon(e.target.value) }

    // UseEffect
    useEffect(() => {
        if (htmlIconRef.current && htmlIconRef.current.childNodes[0].nodeName == 'svg' && htmlIconRef.current.childNodes[0].childNodes.length > 1) {
            setIsIcon(true)
        }
        else { setIsIcon(false) }
    }, [icon])

    return (
        <Layout
            title="Servicios"
            description="Servicios de las habitaciones de los hoteles plaza"
        >

            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Crear servicio</h2>

            {/* <Loading isOpen={showLoading.show} text={showLoading.title} /> */}

            <ToastContainer />

            {showDialogConfirm.show ? (
                <DialogConfirm
                    btnCancel="Cancelar"
                    btnConfirm="Crear"
                    onClose={handleDialogConfirm}
                    title={'Registrar servicio'}
                    description={`Para poder registrar el servicio es necesario que ingrese su contraseña`}
                    onConfirm={successConfirm}
                />
            ) : null}

            <section className={styles.bookings_section}>
                <div className={styles.text_container}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <h5 className={styles.subtitle}>Datos del servicio</h5>

                        <div className={styles.create_service_grid}>

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
                                <label htmlFor="description">Descripción (opcional)</label>
                                <br />
                                <input
                                    className={errors.description ? 'input input_error_text' : 'input'}
                                    {...register("description", { required: false })}
                                    id="description"
                                    autoComplete="off"
                                />
                                <br />
                                {errors.description && <small>El campo descripción está vacio!</small>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="icon">Icono</label>
                                <br />
                                <input
                                    className={errors.icon ? 'input input_error_text' : 'input'}
                                    {...register("icon", { required: true })}
                                    id="icon"
                                    autoComplete="off"
                                    onChange={(e: any) => convertStringToHTML(e)}
                                />
                                <br />
                                {errors.icon && <small>El campo icono está vacio!</small>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="main_information">Hacer información principal</label>
                                <br />
                                <input
                                    className={errors.icon ? `${styles.checkbox} input input_error_text` : `${styles.checkbox} input`}
                                    {...register("mainInformation", { required: false })}
                                    id="main_information"
                                    autoComplete="off"
                                    type={'checkbox'}
                                />
                                <br />
                                {errors.mainInformation && <small>El campo icono está vacio!</small>}
                            </div>
                        </div>

                        <h5 className={styles.subtitle}>Tipos de habitaciones que tendrán este servicio</h5>

                        <div className={`${styles.checkbox_container} input-container`} ref={groupCheckboxRef}>
                            {showRoomTypes()}
                            <br />
                            {errors.ServicesOnRoom && <small>El campo tipo de habitación está vacio!</small>}
                        </div>

                        <h5 className={styles.subtitle}>Visualizar icono del servicio</h5>

                        {
                            icon ? (
                                <div className={styles.icon_container}>
                                    <div ref={htmlIconRef} dangerouslySetInnerHTML={{ __html: icon }} />
                                    {
                                        isIcon ? null : (<p className={styles.error_text}>Ingrese un formato de icono correcto, favor de ingresarlo de la página https://materialdesignicons.com/ (Solo copiar y pegar svg)</p>)
                                    }
                                </div>
                            ) : <p>Ingrese un icono para poder visualizarlo</p>
                        }

                        {isIcon && !Object.values(errors).length ? (
                            <>
                                <BtnSubmit title="Registrar" loading={false} />
                            </>
                        ) : (
                            <p className="submit-error-text mt-3">Se encontraron algunos errores!.</p>
                        )}
                    </form>
                </div>
            </section>
        </Layout>
    )
}