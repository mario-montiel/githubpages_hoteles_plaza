// React
import { useState } from "react";
import { useForm } from "react-hook-form";

// Libraries
import { ToastContainer } from "react-toastify";

// CSS
import 'react-toastify/dist/ReactToastify.css'
import styles from "./DialogConfirm.module.css"

// Components

// Helpers
import { endpoint } from "../../../../config/endpoint";
import DepartmentsFunctions from "../../../../helpers/functions/admin/departments/departmentsFunctions";

// Types
type DialogConfirm = {
    alt?: string,
    title?: string,
    image?: string,
    btnCancel: string,
    isDelete?: boolean,
    btnConfirm: string,
    onClose: () => void,
    description?: string,
    onConfirm: (reasonToDelete: string) => void,
}

type PasswordConfirm = {
    password: string,
    reasonToDelete: string
}

export default function DialogConfirm(props: DialogConfirm) {
    
    // Variables
    const {
        showMessage
    } = DepartmentsFunctions()
    const { register, handleSubmit, formState: { errors } } = useForm<PasswordConfirm>();
    const onSubmit = (data: any) => { confirmPasswordOfCurrentUser(data) }

    // Use State

    // Functions


    const confirmPasswordOfCurrentUser = async (dataForm: PasswordConfirm) => {

        const resp = await fetch(endpoint + '/api/admin/auth/confirmPassCurrentUser', {
            method: "POST",
            body: JSON.stringify(dataForm)
        })
        const response = await resp.json()

        if (response.res) { return props.onConfirm(dataForm.reasonToDelete) }

        showMessage(response.message, 'error')
    }

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

            <ToastContainer />

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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container">
                        <input
                            className={errors.password ? 'input input_error_text' : 'input'}
                            {...register("password", { required: true })}
                            id="password"
                            type="password"
                            autoFocus={true}
                            autoSave="off"
                            autoComplete="off"
                            placeholder="Ingrese su contraseña"
                        />
                        <br />
                        {errors.password && <small>El campo Contraseña está vacio!</small>}
                    </div>
                    {
                        props.isDelete ? (
                            <div className="input-container">
                                <input
                                    className={errors.reasonToDelete ? 'input input_error_text' : 'input'}
                                    {...register("reasonToDelete", { required: true })}
                                    id="reason"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Ingrese el motivo por el cual borrará éste dato"
                                />
                                <br />
                                {errors.reasonToDelete && <small>El campo motivo está vacio!</small>}
                            </div>
                        ) : null
                    }
                    <div className={styles.container}>
                        <button type="submit" className={changeButtonColor()}>
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