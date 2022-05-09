// React
import { useForm } from "react-hook-form";
import { useRouter } from "next/router"

// Libraries

// CSS
import styles from "../../../../../styles/admin/system/departments/CreateDepartment.module.css"

// Components
import { btnBack } from "../../../../../helpers/svg/btnBack";
import Layout from "../../../../../components/globals/Layout";
import Loading from "../../../../../components/admin/loading/Loader"
import BtnSubmit from "../../../../../components/admin/buttons/submit/BtnSubmit"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import DepartmentsFunctions from "../../../../../helpers/functions/admin/departments/departmentsFunctions"

// Types
import { DepartmentForm } from '../../../../../types/Department'

export default function Department() {

    // Variables
    const {
        department,
        showDialogConfirm,
        showLoading,
        handleDialogConfirm,
        showDialog,
        successConfirm
    } = DepartmentsFunctions()
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<DepartmentForm>();
    const onSubmit = (data: any) => { showDialog(data) }

    // States

    // Use Effect

    return (
        <Layout
            title="Crear departamento"
            description="Creación de los departamentos de hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Crear departamento</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text="Guardando datos" />
            ) : null}

            {showDialogConfirm.show ? (
                <DialogConfirm
                    // title="Crear departamento"
                    image="/hotels/dialog/data.svg"
                    description={`Para poder registrar el departamento ${department.name} debe ingresar su contraseña`}
                    btnConfirm="Registrar"
                    btnCancel="Cancelar"
                    onConfirm={successConfirm}
                    onClose={handleDialogConfirm}
                />
            ) : null}

            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className={styles.subtitle}>Datos del área laboral</h5>

                    <div className={styles.user_grid}>

                        <div className="input-container">
                            <label htmlFor="name">Área laboral</label>
                            <br />
                            <input
                                className={errors.name ? 'input input_error_text' : 'input'}
                                {...register("name", { required: true })}
                                id="name"
                                autoComplete="off"
                                autoFocus={true}
                            />
                            <br />
                            {errors.name && <small>El campo área laboral está vacio!</small>}
                        </div>
                    </div>

                    {!Object.values(errors).length ? (
                        <BtnSubmit title="Registrar" />
                    ) : (
                        <p className="submit-error-text">Se encontraron algunos errores!.</p>
                    )}
                </form>
            </section>
        </Layout>
    )
}