// React

// Libraries

// Components and CSS
import { useForm } from "react-hook-form";
import { mainUrl } from "../../../../api/url"
import styles from "./DialogConfirm.module.css"

// Types
type DialogConfirm = {
    image?: string,
    alt?: string,
    title?: string,
    description?: string,
    btnConfirm: string,
    btnCancel: string,
    onConfirm: () => void,
    onClose: () => void
}

type PasswordConfirm = {
    password: string
}

export default function DialogConfirm(props: DialogConfirm) {
    // console.log(props);
    // // Variables
    // const { register, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm<PasswordConfirm>();
    // const onSubmit = (data: any) => {
    //     console.log(data);
    //     confirmPasswordOfCurrentUser(data.password)
    // }
    // // onClick={props.onConfirm}
    // // Use State

    // // Functions
    // const confirmPasswordOfCurrentUser = async (password: string) => {
    //     console.log(password);

    //     const resp = await fetch(mainUrl + '/api/admin/auth/confirmPassCurrentUser', {
    //         method:"POST",
    //         body: JSON.stringify(password)
    //     })

    //     console.log(resp.json());

    // }

    const changeButtonColor = () => {
        switch (props.btnConfirm) {
            case 'Crear':
                return styles.btn_accept
                break;
            case 'Editar':
                return styles.btn_warning
                break;
            case 'Eliminar':
                return styles.btn_danger
                break;
            default:
                return styles.btn_accept
                break;
        }
    }

    return (
        <div className="overlay">
            <div className={styles.overlay_content}>
                {
                    props.image ? (
                        <img
                            className={styles.image}
                            src={props.image}
                            alt={props.alt} />
                    ) : null
                }
                <p>{props.title}</p>
                <br />
                <p>{props.description}</p>
                <form /* </div>className={styles.hotel_form} onSubmit={handleSubmit(onSubmit)} */>
                    {/* <div className="input-container">
                        <input
                            className={errors.password ? 'input input_error_text' : 'input'}
                            {...register("password", { required: true })}
                            id="password"
                            autoComplete="off"
                            autoFocus={true}
                            placeholder="Ingrese su contraseña"
                            type="password"
                        />
                        <br />
                        {errors.password && <small>El campo Contraseña está vacio!</small>}
                    </div> */}
                    <div className={styles.container}>
                        <button type="button" className={changeButtonColor()} onClick={props.onConfirm}>
                            <p>{props.btnConfirm}</p>
                        </button>
                        <button type="button" className={styles.btn_cancel} onClick={props.onClose}>
                            <p>{props.btnCancel}</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}