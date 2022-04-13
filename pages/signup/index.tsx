// React
import Link from 'next/link'
import router from 'next/router';
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from 'react';

// Libraries
import { ToastContainer } from "react-toastify";
import Loader from "../../components/admin/loading/Loader";

// CSS
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/SignUp.module.css'

// Components
import Carrousel from "../../components/admin/carruosel/Carrousel";
import LoginFunctions from "../../components/signin/LoginFunctions";
import BtnSubmit from "../../components/admin/buttons/submit/BtnSubmit";

// Helpers
import { endpoint } from '../../config/endpoint';

// Types
import { SignUp as SignUpForm } from '../../types/SignUp';

type TypeLogin = {
    warningTitle?: string,
    warningText?: string,
    url: string,
    worker: boolean
}

export default function SignUp(props: TypeLogin) {

    // Variables
    const {
        imagesCarrousell, login, validate, loading
    } = LoginFunctions()
    const { setError, clearErrors, register, handleSubmit, formState: { errors } } = useForm<SignUpForm>();
    const onSubmit = async (data: any) => {
        sendRequest(data)
    }

    // States
    const [currentForm, setCurrentForm] = useState<number>(1)

    // Use Ref
    const formsRef = useRef<HTMLDivElement>(null)
    const form2Ref = useRef<HTMLFormElement>(null)
    const btnNextRef = useRef<HTMLButtonElement>(null)

    // Functions
    const moveForm = () => {
        validateToNextForm()
    }

    const formBack = () => {
        formsRef.current!.style.transform = 'translateX(0%)'
        btnNextRef.current!.style.display = 'block'
        setCurrentForm(1)
    }

    // Validations To Next Form
    const validateToNextForm = async () => {
        let error: boolean = false
        const emailInput = document.querySelector('.form1-email') as HTMLInputElement
        const passwordInput = document.querySelector('.form1-password') as HTMLInputElement
        const confirmPaswordInput = document.querySelector('.form1-confirm-password') as HTMLInputElement
        const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i
        const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/

        if (!emailInput.value) {
            error = true
            setError('email', {
                type: "manual",
                message: "Debe ingresar un correo electrónico",
            })
        } else if (!pattern.test(emailInput.value)) {
            error = true
            setError('email', {
                type: "manual",
                message: "Ingrese un correo electrónico válido",
            })
        } else { clearErrors('email') }

        if (!passwordInput.value) {
            error = true
            setError('password', {
                type: "manual",
                message: "Ingrese una contraseña",
            })
        } else if (passwordInput.value.length < 6) {
            error = true
            setError('password', {
                type: "manual",
                message: "La contraseña debe tener tener mínimo 6 caracteres",
            })
        } else if (passwordInput.value.length > 12) {
            error = true
            setError('password', {
                type: "manual",
                message: "La contraseña debe tener tener máximo 12 caracteres",
            })
        } else if (!patternPassword.test(passwordInput.value)) {
            error = true
            setError('password', {
                type: "manual",
                message: "La contraseña debe contener mínimo una letra mayuscula, una minúscula, un número y un caracter especial (%, _, #, etc). Ej. C°ntr4seña",
            })
        }
        else { clearErrors('password') }

        if (!confirmPaswordInput.value) {
            error = true
            setError('confirmPassword', {
                type: "manual",
                message: "Confirme la contraseña que ingresó",
            })
        } else { clearErrors('confirmPassword') }

        if (passwordInput.value !== confirmPaswordInput.value) {
            error = true
            setError('password', {
                type: "manual",
                message: "Las contraseñas no coinciden!",
            })
            setError('confirmPassword', {
                type: "manual",
                message: "Las contraseñas no coinciden!",
            })
        }

        if (!error) {
            form2Ref.current!.style.display = 'block'
            formsRef.current!.style.transform = 'translateX(-50%)'
            btnNextRef.current!.style.display = 'none'
            setCurrentForm(2)
        }
    }

    const sendRequest = async (data: any) => {
        const resp = await fetch('/api/landingPage/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        const response = await resp.json()

        if (response.res) {
            router.push('/')
        }
    }

    useEffect(() => {
        formsRef.current!.style.transform = 'translateX(0%)'
        setCurrentForm(1)
    }, [])

    return (
        <div>

            {loading ? (
                <Loader isOpen={loading} text="Verificando datos" />
            ) : null}

            <ToastContainer />
            {console.log(errors)}
            <div className={styles.container_login}>
                <div className={styles.form_container}>
                    <h2>Hoteles Plaza</h2>
                    <h5>Registrarse</h5>
                    <div className={styles.form_actions}>
                        {
                            currentForm === 2 ? (
                                <button className={styles.btn_back_form} onClick={formBack}>
                                    <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                                    </svg>
                                </button>
                            ) : null
                        }
                        <p className={styles.form_register_text}>Registro {currentForm}/2</p>
                    </div>
                    <div className={styles.forms} ref={formsRef}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {
                                props.warningText || props.warningTitle ? (
                                    <div>
                                        <p className={styles.warning_text}>{props.warningText}</p>
                                    </div>
                                ) : null
                            }
                            <div className="input-container">
                                <label htmlFor="email">Correo electrónico (*)</label>
                                <br />
                                <input
                                    className={errors.email ? 'input input_error_text form1-email' : 'input form1-email'}
                                    {...register("email", { required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })}
                                    id="email"
                                    autoComplete="off"
                                    autoFocus={true}
                                    type="email"
                                />
                                <br />
                                {errors.email && <small>{errors.email.message ? errors.email.message : 'El campo no puede estar vacío y debe contener un correo electrónico válido!'}</small>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="password">Contraseña (*)</label>
                                <br />
                                <input
                                    className={errors.password ? 'input input_error_text form1-password' : 'input form1-password'}
                                    {...register("password", { required: true })}
                                    id="password"
                                    type="text"
                                />
                                <br />
                                {errors.password && <small>{errors.password.message ? errors.password.message : 'El campo no puede estar vacio, debe tener mínimo 6 caracteres, máximo 12 caracteres y usar algún caracter especial!'}</small>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="confirmpassword">Confirmar contraseña (*)</label>
                                <br />
                                <input
                                    className={errors.confirmPassword ? 'input input_error_text form1-confirm-password' : 'input form1-confirm-password'}
                                    {...register("confirmPassword", { required: true })}
                                    id="confirmpassword"
                                    type="text"
                                />
                                <br />
                                {errors.confirmPassword && <small>{errors.confirmPassword.message ? errors.confirmPassword.message : 'El campo no puede estar vacio, debe tener mínimo 6 caracteres, máximo 12 caracteres y usar algún caracter especial!'}</small>}
                            </div>
                            <button
                                className={styles.btn_next}
                                onClick={moveForm}
                                type="button"
                                ref={btnNextRef}
                            >
                                Continuar
                            </button>
                        </form>

                        <form onSubmit={handleSubmit(onSubmit)} ref={form2Ref}>

                            {
                                props.warningText || props.warningTitle ? (
                                    <div>
                                        <p className={styles.warning_text}>{props.warningText}</p>
                                    </div>
                                ) : null
                            }
                            <div className="input-container">
                                <label htmlFor="fullname">Nombre (*)</label>
                                <br />
                                <input
                                    className={errors.fullName ? 'input input_error_text' : 'input'}
                                    {...register("fullName", { required: true, minLength: 2, maxLength: 20 })}
                                    id="fullname"
                                    type="text"
                                />
                                <br />
                                {errors.fullName && <small>El campo nombre está vacio, debe tener como mínimo 2 caracteres y máximo 20!</small>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="lastname">Apellidos (*)</label>
                                <br />
                                <input
                                    className={errors.lastName ? 'input input_error_text' : 'input'}
                                    {...register("lastName", { required: true, minLength: 2, maxLength: 20 })}
                                    id="lastname"
                                    type="text"
                                />
                                <br />
                                {errors.lastName && <small>El campo apellidos está vacio, debe tener como mínimo 2 caracteres y máximo 20!</small>}
                            </div>
                            <div className="input-container">
                                <label htmlFor="company">Compañia (*)</label>
                                <br />
                                <input
                                    className={errors.company ? 'input input_error_text' : 'input'}
                                    {...register("company", { required: true, minLength: 2, maxLength: 20 })}
                                    id="company"
                                    type="company"
                                />
                                <br />
                                {errors.company && <small>El campo empresa está vacio, debe tener como mínimo 2 caracteres y máximo 20!</small>}
                            </div>

                            <div className="input-container">
                                <label htmlFor="city">Ciudad (*)</label>
                                <br />
                                <input
                                    className={errors.company ? 'input input_error_text' : 'input'}
                                    {...register("city", { required: true, minLength: 2, maxLength: 20 })}
                                    id="city"
                                    type="city"
                                />
                                <br />
                                {errors.city && <small>El campo ciudad está vacio, debe tener como mínimo 2 caracteres y máximo 20!</small>}
                            </div>

                            {!Object.values(errors).length && currentForm === 2 ? (
                                <BtnSubmit title="Registrarse" loading={loading} />
                            ) : null}
                        </form>
                    </div>
                    <div className={styles.get_account}>
                        {
                            !props.worker ? (
                                <>
                                    <Link href={endpoint + '/signin'} passHref={true}>
                                        <p>Ya tengo una cuenta. <strong>Iniciar sesión</strong></p>
                                    </Link>
                                </>
                            ) : null
                        }
                    </div>


                    {Object.values(errors).length ? (
                        <p className="submit-error-text">Llene todos los campos para poder continuar!</p>
                    ) : null}
                </div>

                <div className={styles.carrousel}>
                    <Carrousel
                        src={imagesCarrousell}
                        alt="Imágenes de los hoteles plaza"
                        isStop={validate}
                    />
                </div>
            </div>
        </div>
    )
}