// React
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form";

// CSS
import styles from "../../../../../styles/admin/system/users/CreateUser.module.css"

// Components
import BtnSubmit from "../../../../../components/admin/buttons/submit/BtnSubmit";

// Types
import { PasswordForm } from "../../../../../types/User";

const ChangePassword = (props: any) => {
    
    // Variables
    const initialPasswordFormValue = {
        user: {},
        password: '',
        confirmPassword: ''
    }
    const { register, setError, clearErrors, handleSubmit, formState: { errors } } = useForm<PasswordForm>();
    const onSubmit = (data: any) => {
        sendRequest(passwordForm)
    }

    // Use Ref
    const overlayRef = useRef<HTMLDivElement>(null)

    // Use State
    const [passwordForm, setPasswordForm] = useState(initialPasswordFormValue)

    // Functions
    const closePopUp = (e: any) => {
        if (e.target === overlayRef.current) {
            props.handleChangePassword()
        }
    }

    const handlePasswordForm = (e: any) => {
        const { name, value } = e.target
        setPasswordForm({ ...passwordForm, [name]: value })
    }

    function errorMessagesPassword(errors: string, fieldName: string) {
        switch (errors) {
            case 'required':
                return (<small>El campo {fieldName} está vacio!</small>)
                break;
            case 'minLength':
                return (<small>La contraseña debe contener mínimo 6 caracteres</small>)
                break;
            case 'pattern':
                return (
                    <small>
                        La contraseña debe contener una letra mayuscula, minúscula, un número y un caracter especial (%, _, #, etc). Ej. C°ntr4seña y deben concidir
                    </small>)
                break;
        }
    }

    const sendRequest = async (dataForm: PasswordForm) => {
        const resp = await fetch('/api/admin/users/changePassword', {
            method: 'POST',
            body: JSON.stringify(dataForm)
        })
        const response = await resp.json()

        if (response.res) {
            props.passwordChangedSucessfull()
        }
    }

    // Use Effect
    useEffect(() => {
        if (passwordForm.password == passwordForm.confirmPassword) {
            clearErrors('password')
            clearErrors('confirmPassword')
        } else {
            setError('password', {
                type: "pattern",
                message: "Campo contraseña vacío",
            })
            setError('confirmPassword', {
                type: "pattern",
                message: "Campo confirmar contraseña vacío",
            })
        }
    }, [passwordForm])

    useEffect(() => {
        if (props.user) {
            setPasswordForm({
                ...passwordForm,
                user: props.user
            })
        }
    }, [props.user])

    return (
        <div ref={overlayRef} className={styles.overlay} onClick={(e: any) => closePopUp(e)}>
            <div className={styles.content}>

                <form encType="multipart/form-data" className={styles.hotel_form} onSubmit={handleSubmit(onSubmit)}>
                    <h5 className={styles.subtitle}>Cambiar contraseña</h5>

                    <div className="input-container">
                        <label htmlFor="password">Contraseña</label>
                        <br />
                        <input
                            className={errors.password ? 'input input_error_text' : 'input'}
                            {...register("password", {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/
                            })}
                            id="password"
                            name="password"
                            autoComplete="off"
                            autoFocus={true}
                            onChange={(e) => handlePasswordForm(e)}
                        // onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value})}
                        />
                        <br />
                        {errors.password && <>{errorMessagesPassword(errors.password.type, 'contraseña')}</>}
                    </div>

                    <div className="input-container">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <br />
                        <input
                            className={errors.confirmPassword ? 'input input_error_text' : 'input'}
                            {...register("confirmPassword", {
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/
                            })}
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={(e) => handlePasswordForm(e)}
                        />
                        <br />
                        {errors.confirmPassword && <>{errorMessagesPassword(errors.confirmPassword.type, 'confirmar contraseña')}</>}
                    </div>

                    {!Object.values(errors).length ? (
                        <BtnSubmit title="Registrar" loading={false} />
                    ) : (
                        <p className="submit-error-text mt-3">Se encontraron algunos errores!.</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ChangePassword