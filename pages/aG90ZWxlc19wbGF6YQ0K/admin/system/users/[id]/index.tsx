// React
import { NextPageContext } from "next"
import { useForm } from "react-hook-form"
import Router, { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

// Libraries
import { toast, ToastContainer } from 'react-toastify';

// CSS
import styles from "../../../../../../styles/admin/system/users/CreateUser.module.css"

// Components
import ChangePassword from "../changePassword";
import Layout from "../../../../../../components/globals/Layout";
import Loading from "../../../../../../components/admin/loading/Loader"
import BtnSubmit from "../../../../../../components/admin/buttons/submit/BtnSubmit"
import BtnActions from "../../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../../components/admin/dialogs/confirm/DialogConfirm"
import DialogWarning from "../../../../../../components/admin/dialogs/warning/DialogWarning"

// Helpers
import { endpoint } from "../../../../../../config/endpoint";
import UsersFunctions from "../../../../../../helpers/functions/admin/users/usersFunctions";

// Types
import { UserForm } from "../../../../../../types/User"
import { TypeUser } from "../../../../../../types/TypeUser"
import { Department } from "../../../../../../types/Department"

EditUser.getInitialProps = async (ctx: NextPageContext) => {
    const isAdmin = await getFetchData(endpoint + '/api/admin/auth/isAdmin', ctx)
    const departmentsJson = await getFetchData(endpoint + '/api/admin/departments/showDepartments', ctx)
    const typeUsersJson = await getFetchData(endpoint + '/api/admin/users/showTypeUsers', ctx)
    const hotelsJson = await getFetchData(endpoint + '/api/admin/hotels/showHotels', ctx)
    const userJson = await getFetchData(endpoint + '/api/admin/users/showEditUser', ctx, ctx.query)

    return { isAdmin, departments: departmentsJson, typeUsers: typeUsersJson, hotels: hotelsJson, user: userJson }
}

async function getFetchData(url: string, ctx: NextPageContext, routeQuery?: any) {
    const cookie = ctx.req?.headers.cookie
    const userId = parseInt(ctx.query.id!.toString())
    if (routeQuery) {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                cookie: cookie!
            },
            body: routeQuery ? JSON.stringify(userId) : null
        })

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

export default function EditUser(props: any) {
    // console.log('EditUser: ', props);

    // Variables
    const router = useRouter()
    const {
        isChangePassword,
        showDialogConfirm,
        showDialogWarning,
        showLoading,
        // handleChangeImage,
        handleChangePassword,
        showEditDialog,
    } = UsersFunctions(props.isAdmin.res)
    const checkBoxs = useRef<HTMLDivElement>(null)
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, setValue, setError, clearErrors, handleSubmit, formState: { errors } } = useForm<UserForm>();
    const onSubmit = (data: any) => {
        console.log(hotelSelected)
        console.log(data);
        showEditDialog(data)
    }

    // States
    const [hotelSelected, setHotelSelected] = useState<any>([])

    // Use Effect
    useEffect(() => {
        checkboxHotelForm()
        loadHotelData()
        fillDataOfUser()
    }, [])

    useEffect(() => {
        if (!hotelSelected.length) {
            setError("hotel", { type: 'custom', message: 'Seleccione un hotel para poder continuar!' })
        }
        
        if (hotelSelected.length) { clearErrors('hotel'); setValue('hotel', hotelSelected) }
    }, [hotelSelected])

    // Functions
    const fillDataOfUser = () => {
        setValue('id', props.user.data.id)
        setValue('email', props.user.data.email)
        setValue('password', props.user.data.password)
        setValue('fullName', props.user.data.fullName)
        setValue('lastName', props.user.data.lastName)
        setValue('phone', props.user.data.phone)
        setValue('departmentId', props.user.data.departmentId)
        setValue('typeUserId', props.user.data.typeUserId)
        // setError("hotel", { type: 'custom', message: 'Seleccione un hotel para poder continuar!' })
    }

    const loadHotelData = () => {
        let aHotels: any = []
        props.user.data.hotels.forEach((hotel: any) => {
            aHotels.push(hotel.hotel)
            setHotelSelected((oldValue: any) => [...oldValue, hotel.hotel])
        });

        clearErrors('hotel')
        setHotelSelected(aHotels);
    }

    const checkHotelErrors = (index: number) => {
        !index ? (
            setError("hotel", { type: 'custom', message: 'Seleccione un hotel para poder continuar!' })
        ) : (
            <>
                {clearErrors('hotel')}
            </>
        )
    }

    const passwordChanged = () => {
        toast(`Su contraseña fue actualizada con éxito`, {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            type: 'success'
        })
        handleChangePassword()
    }

    const addHotelToDataForm = async (hotel: any) => {
        const index = hotelSelected.findIndex((hotelFilter: any) => { console.log(hotelFilter); return hotelFilter.name == hotel.name })
        
        if (index > -1) {
            return setHotelSelected(hotelSelected.filter((hotelFilter: any) => hotelFilter.name != hotel.name))
        }

        setHotelSelected((oldValue: any) => [...oldValue, hotel])
        checkHotelErrors(index)
    }

    const getCheckboxHotels = () => {
        let html: any = []

        props.hotels.map((hotelEl: any, index: number) =>
            html.push(
                <div key={index}>
                    <input
                        className={errors.hotel ? `${styles.checkbox_error} checkbox input_error_text` : 'checkbox checkbox-read-only'}
                        // {...register(`${hotel}.id`, { required: false })}
                        value={hotelEl.id}
                        hidden
                        readOnly
                    />
                    <div className="input-container">
                        <label htmlFor="hotel">{hotelEl.name}</label>
                        <br />
                        <input
                            className={errors.hotel ? `${styles.checkbox_error} checkbox input_error_text checkbox-user` : 'checkbox checkbox-user'}
                            // {...register(`${hotel}.checked`, { required: false })}
                            type="checkbox"
                            onClick={() => addHotelToDataForm(hotelEl)}
                        />
                        <br />
                    </div>
                </div>
            )
        )

        return html
    }

    const checkboxHotelForm = () => {
        const checkbox_validate = document.querySelector('.checkbox-validate') as HTMLInputElement
        const checkboxs = document.querySelectorAll('.checkbox-user') as NodeListOf<HTMLInputElement>

        checkboxs[0].checked = true
        checkbox_validate.checked = true

        props.user.data.hotels.forEach((hotel: any, index: number) => {
            checkboxs[index].checked = true
        });
    }

    return (
        <Layout
            title="Editar usuario"
            description="Creación de usuarios"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>
            <h2 className={styles.title}>Editar usuario</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text={showDialogConfirm.title} />
            ) : null}

            {showDialogConfirm.show ? (
                <DialogConfirm
                    image={showDialogConfirm.image}
                    alt={showDialogConfirm.alt}
                    title={showDialogConfirm.title}
                    description={showDialogConfirm.description}
                    btnConfirm={showDialogConfirm.btnConfirm}
                    btnCancel={showDialogConfirm.btnCancel}
                    onConfirm={showDialogConfirm.onConfirm}
                    onClose={showDialogConfirm.onClose}
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
                        onConfirm={showDialogWarning.onConfirm}
                        onClose={showDialogWarning.onClose} />
                ) : null
            }

            {
                isChangePassword ? (
                    <ChangePassword
                        handleChangePassword={() => handleChangePassword()}
                        passwordChangedSucessfull={() => passwordChanged()}
                        user={props.user.data}
                    />
                ) : null
            }

            <ToastContainer />

            <section className={styles.create_user_section}>
                <form encType="multipart/form-data" className={styles.hotel_form} onSubmit={handleSubmit(onSubmit)}>
                    <h5 className={styles.subtitle}>Datos del usuario</h5>

                    <div className={styles.user_grid}>
                        <div className="input-container">
                            <label htmlFor="email">Correo electrónico</label>
                            <br />
                            <input
                                className={errors.email ? 'input input_error_text' : 'input'}
                                {...register("email", {
                                    required: true,
                                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                                })}
                                id="email"
                                autoComplete="off"
                                autoFocus={true}
                            />
                            <br />
                            {errors.email && <small>El campo Correo Electrónico está vacio!</small>}
                        </div>
                        {/* <div className="input-container">
                            <label htmlFor="password">Contraseña</label>
                            <br />
                            <input
                                className={errors.password ? 'input_error_text input' : 'input'}
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/
                                })}
                                id="password"
                                autoComplete="off"
                                type="password"
                            />
                            <br />
                            {errors.password && <>{errorMessagesPassword(errors.password.type)}</>}
                        </div> */}
                        <div className="input-container">
                            <label htmlFor="fullName">Nombre</label>
                            <br />
                            <input
                                className={errors.fullName ? 'input input_error_text' : 'input'}
                                {...register("fullName", { required: true })}
                                id="fullName"
                                autoComplete="off"
                            />
                            <br />
                            {errors.fullName && <small>El campo Nombre está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="lastName">Apellidos</label>
                            <br />
                            <input
                                className={errors.lastName ? 'input input_error_text' : 'input'}
                                {...register("lastName", { required: true })}
                                id="lastName"
                                autoComplete="off"
                            />
                            <br />
                            {errors.lastName && <small>El campo Apellidos está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="phone">Teléfono</label>
                            <br />
                            <input
                                className={errors.phone ? 'input_error_text input' : 'input'}
                                {...register("phone", { required: true })}
                                id="phone"
                                autoComplete="off"
                            />
                            <br />
                            {errors.phone && <small>El campo Teléfono está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="departmentId_select">Área laboral</label>
                            <br />
                            <select
                                className={errors.departmentId ? 'input_error_text select' : 'select'}
                                {...register("departmentId", { required: true })}
                                id="departmentId_select"
                                autoComplete="off"
                            >
                                {
                                    props.departments.map((department: Department, index: number) =>
                                        <option key={index} value={department.id}>{department.name}</option>
                                    )
                                }
                            </select>
                            <br />
                            {errors.departmentId && <small>El campo Categoria está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <div className={styles.info}>?</div>
                            <div className={styles.info_data}>
                                <h5>Detalles de los niveles de privilegios de la cuenta</h5>
                                <p>1 - Administrador (todos los permisos)</p>
                                <p>2 - Empleado (permisos a determinados módulos dentro del sistema)</p>
                                <p>3 - Solo lectura (solo lectura de datos)</p>
                            </div>
                            <label htmlFor="typeUserId_select">Tipo de usuario</label>
                            <br />
                            <select
                                className={errors.typeUserId ? 'input_error_text select' : 'select'}
                                {...register("typeUserId", { required: true })}
                                id="typeUserId_select"
                                autoComplete="off"
                            >
                                {
                                    props.typeUsers.map((typeUser: TypeUser, index: number) =>
                                        <option key={index} value={typeUser.id}>{typeUser.name}</option>
                                    )
                                }
                            </select>
                            <br />
                            {errors.typeUserId && <small>El campo Tipo de usuario está vacio!</small>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="status_select">Estado del usuario</label>
                            <br />
                            <select
                                className={errors.typeUserId ? 'input_error_text select' : 'select'}
                                {...register("status", { required: true })}
                                id="status_select"
                                defaultValue={props.user.data.status}
                            >
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                            </select>
                            <br />
                            {errors.status && <small>El campo Estado del usuario está vacio!</small>}
                        </div>
                    </div>

                    <input
                        className={errors.hotel ? `${styles.checkbox_error} checkbox input_error_text checkbox-validate` : 'checkbox checkbox-validate'}
                        {...register('hotel', { required: true })}
                        type="checkbox"
                        hidden
                    />

                    <h5 className={styles.subtitle}>Contraseña</h5>

                    <div className={styles.user_grid} onClick={handleChangePassword}>
                        <button className={styles.btn_change_password} type="button">
                            Cambiar contraseña
                        </button>
                    </div>

                    <h5 className={styles.subtitle}>Selecione los hoteles al que pertenecerá el usuario</h5>

                    <div className={styles.user_grid_checkbox}>
                        {/* {
                            hotels.length ? (
                                hotels
                            ) : null
                        } */}
                        {/* {
                            props.hotels.forEach((hotelEl: any, index: number) => {
                                return (
                                    
                                )
                            })
                        } */}

                        {
                            props.hotels && props.hotels.length ? (
                                getCheckboxHotels()
                            ) : null
                        }
                    </div>

                    <div className={styles.error_text}>{errors.hotel && <small>El usuario debe ser asignado a un hotel</small>}</div>

                    {!Object.values(errors).length ? (
                        <BtnSubmit title="Registrar" loading={showLoading.show} />
                    ) : (
                        <p className="submit-error-text mt-3">Se encontraron algunos errores!.</p>
                    )}

                </form>
            </section>
        </Layout>
    )
}