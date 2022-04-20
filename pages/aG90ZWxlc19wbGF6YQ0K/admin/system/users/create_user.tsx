// React
import { useEffect } from "react"
import { NextPageContext } from "next"
import Router, { useRouter } from "next/router"

// Libraries
import { useForm } from "react-hook-form"

// CSS
import styles from "../../../../../styles/admin/system/users/CreateUser.module.css"

// Components
import Layout from "../../../../../components/globals/Layout"
import Loading from "../../../../../components/admin/loading/Loader"
import BtnSubmit from "../../../../../components/admin/buttons/submit/BtnSubmit"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"
import DialogWarning from "../../../../../components/admin/dialogs/warning/DialogWarning"

// Helpers
import { endpoint } from "../../../../../config/endpoint"
import UsersFunctions from "../../../../../helpers/functions/admin/users/usersFunctions"

// types
import { UserForm } from "../../../../../types/User"
import { TypeUser } from "../../../../../types/TypeUser"
import { Department } from "../../../../../types/Department"

CreateUser.getInitialProps = async (ctx: NextPageContext) => {
    let departmentsJson: any = []
    let typeUsersJson: any = []
    let hotelsJson: any = []

    departmentsJson = await getDepartmentAndHotels(endpoint + '/api/admin/departments/showDepartments', ctx)
    typeUsersJson = await getDepartmentAndHotels(endpoint + '/api/admin/users/showTypeUsers', ctx)
    hotelsJson = await getDepartmentAndHotels(endpoint + '/api/admin/hotels/showHotels', ctx)

    return { departments: departmentsJson, typeUsers: typeUsersJson, hotels: hotelsJson }
}

async function getDepartmentAndHotels(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })

    if (resp.status === 401 && !ctx.req) {
        Router.replace(endpoint + '/aG90ZWxlc19wbGF6YQ0K/authentication/login')
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
            Location: endpoint + '/aG90ZWxlc19wbGF6YQ0K/authentication/login'
        })
        ctx.res?.end()
        return;
    }

    return await resp.json()
}

export default function CreateUser(props: any) {
    // console.log(props);

    // Variables
    const router = useRouter()
    const {
        showDialogConfirm,
        showDialogWarning,
        showLoading,
        showDialog,
    } = UsersFunctions()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm<UserForm>();
    const onSubmit = (data: any) => {
        showDialog(data)
    }

    // States

    // Use Effect
    useEffect(() => {
        setValue("status", "active")
    }, [])

    // Functions
    const checkHotelErrors = () => {
        let validate = false
        const checkbox = document.querySelectorAll('.checkbox-user')
        const checkbox_validate = document.querySelector('.checkbox-validate') as HTMLInputElement

        // console.log(checkbox);
        checkbox.forEach((checkbox: any) => {
            if (checkbox_validate && checkbox.checked) {
                validate = true
                clearErrors('hotel')
                return checkbox_validate.checked = true
            }
        });

        if (checkbox_validate && !validate) {
            checkbox_validate.checked = false
        }

        return validate
    }

    function errorMessagesPassword(errors: string) {
        switch (errors) {
            case 'required':
                return (<small>El campo Correo Electrónico está vacio!</small>)
                break;
            case 'minLength':
                return (<small>La contraseña debe contener mínimo 6 caracteres</small>)
                break;
            case 'pattern':
                return (
                    <small>
                        La contraseña debe contener una letra mayuscula, minúscula, un número y un caracter especial (%, _, #, etc). Ej. C°ntr4seña
                    </small>)
                break;
        }
    }

    return (
        <Layout
            title="Crear usuario"
            description="Creación de usuarios"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>
            <h2 className={styles.title}>Crear usuario</h2>

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
                        <div className="input-container">
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
                                autoFocus={true}
                            />
                            <br />
                            {errors.password && <>{errorMessagesPassword(errors.password.type)}</>}
                        </div>
                        <div className="input-container">
                            <label htmlFor="fullName">Nombre</label>
                            <br />
                            <input
                                className={errors.fullName ? 'input input_error_text' : 'input'}
                                {...register("fullName", { required: true })}
                                id="fullName"
                                autoComplete="off"
                                autoFocus={true}
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
                                autoFocus={true}
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
                                autoFocus={true}
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
                                <p>1 - Todos los permisos (Ver, crear, editar y eliminar)</p>
                                <p>2 - Ver, crear y editar datos</p>
                                <p>3 - Ver y crear datos</p>
                                <p>4 - Solo ver datos</p>
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
                    </div>

                    <div className={styles.user_grid}>
                        <input
                            className="input"
                            {...register("status", { required: true })}
                            id="status"
                            autoComplete="off"
                            autoFocus={true}
                            hidden
                        />
                    </div>

                    {/* <input
                        className={errors.hotel ? `${styles.checkbox_error} checkbox input_error_text checkbox-validate` : 'checkbox checkbox-validate'}
                        {...register('hotel', { required: true, value: false })}
                        type="checkbox"
                        hidden
                    /> */}

                    <h5 className={styles.subtitle}>Selecione los hoteles al que pertenecerá el usuario</h5>
                    <div className={styles.user_grid_checkbox}>
                        {
                            props.hotels.length ? (
                                props.hotels.map((hotelData: any, index: number) => {
                                    const hotel: any = `hotel[${index}]`;
                                    return (
                                        <div key={index}>
                                            {/* <input
                                                className={errors.hotel ? `${styles.checkbox_error} checkbox input_error_text` : 'checkbox'}
                                                {...register(`${hotel}.id`, { required: false })}
                                                id="hotel"
                                                value={hotelData.id}
                                                hidden
                                                readOnly
                                            />
                                            <div className="input-container">
                                                <label htmlFor="hotel">{hotelData.name}</label>
                                                <br />
                                                <input
                                                    className={errors.hotel ? `${styles.checkbox_error} checkbox input_error_text checkbox-user` : 'checkbox checkbox-user'}
                                                    {...register(`${hotel}.checked`, { required: false })}
                                                    id="hotel"
                                                    type="checkbox"
                                                    onClick={() => checkHotelErrors()}
                                                />
                                                <br />
                                            </div> */}
                                        </div>
                                    )
                                })
                            ) : null}
                    </div>

                    <div className={styles.error_text}>{errors.hotel && <small>El usuario debe ser asignado a un hotel</small>}</div>

                    {/* <h5 className={styles.subtitle}>Imágen del empleado (opcional)</h5>

                    <div className={styles.user_grid}>
                        <UploadImage class={!user.image && Object.values(errors).length ? "error_text_image" : ""} mainText="Logo" text="Seleccionar imágen del empleado" label="Upload_image" imageClick={(file: string, imageName: string) => handleChangeImage(file, imageName, 'create')} />
                        <input {...register("image", { required: false })} name="image" type="text" hidden />
                    </div> */}

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