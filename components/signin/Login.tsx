// React
import Link from 'next/link'

// Libraries
import { useForm } from "react-hook-form";
import Loader from "../admin/loading/Loader";

// CSS
import styles from './Login.module.css'
import 'react-toastify/dist/ReactToastify.css';

// Components
import { ToastContainer } from "react-toastify";
import Carrousel from "../admin/carruosel/Carrousel";
import BtnSubmit from "../admin/buttons/submit/BtnSubmit";

// Helpers
import LoginFunctions from "./LoginFunctions";
import { endpoint } from '../../config/endpoint';

// Types
import { Login as LoginForm } from "../../types/Login";

type TypeLogin = {
    warningTitle?: string,
    warningText?: string,
    url: string,
    worker: boolean
}

export default function Login(props: TypeLogin) {

    // Variables
    const {
        imagesCarrousell, login, validate, loading
    } = LoginFunctions()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const onSubmit = async (data: any) => { login(data, props.url, props.worker) }

    // States

    // Functions

    return (
        <div>

            {loading ? (
                <Loader isOpen={loading} text="Verificando datos" />
            ) : null}

            <ToastContainer />

            <div className={styles.container_login}>
                <div className={styles.form_container}>
                    <form onSubmit={handleSubmit(onSubmit)} method="POST">
                        <h2>Hoteles Plaza</h2>
                        <h5>Inicio de sesión</h5>
                        {
                            props.warningText || props.warningTitle ? (
                                <div>
                                    <p className={styles.warning_text}>{props.warningText}</p>
                                </div>
                            ) : null
                        }
                        <div className="input-container">
                            <label htmlFor="email">Correo electrónico</label>
                            <br />
                            <input
                                className={errors.email ? 'input input_error_text' : 'input'}
                                {...register("email", { required: true })}
                                id="email"
                                autoComplete="off"
                                autoFocus={true}
                                type="email"
                            />
                            <br />
                            {errors.email && <small>El campo correo electrónico está vacio!</small>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="password">Contraseña</label>
                            <br />
                            <input
                                className={errors.password ? 'input input_error_text' : 'input'}
                                {...register("password", { required: true })}
                                id="password"
                                autoComplete="off"
                                autoFocus={true}
                                type="password"
                            />
                            <br />
                            {errors.password && <small>El campo contraseña está vacio!</small>}
                        </div>
                        <div className={styles.get_account}>
                            {
                                !props.worker ? (
                                    <>
                                        <p>¿Aún no tiene una cuenta?
                                            <Link href={endpoint + '/signup'} passHref={true}>
                                                <strong> Registrarse</strong>
                                            </Link>
                                        </p>
                                        <Link href={endpoint + '/signup'} passHref={true}>
                                            <strong>Registrarse</strong>
                                        </Link>
                                    </>
                                ) : null
                            }
                        </div>
                        {!Object.values(errors).length ? (
                            <BtnSubmit title="Acceder" loading={loading} />
                        ) : (
                            <p className="submit-error-text">Llene todos los campos para poder continuar!</p>
                        )}
                    </form>
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