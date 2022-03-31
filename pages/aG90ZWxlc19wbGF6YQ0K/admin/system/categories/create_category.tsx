// React

// Libraries

// Components and CSS
import BtnSubmit from "../../../../../components/admin/buttons/submit/BtnSubmit"
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"
import Layout from "../../../../../components/Layout"
import styles from "../../../../../styles/admin/system/categories/CreateCategory.module.css"
import Loading from "../../../../../components/admin/loading/Loader"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions"
import { CategoryForm } from '../../../../../types/Category'
import { useForm } from "react-hook-form";
import CategoriesFunctions from "./categoriesFunctions"
import { useEffect } from "react"
import { useRouter } from "next/router"
import 'react-toastify/dist/ReactToastify.css';

export default function CreateCategory() {

    // Variables
    const router = useRouter()
    const {
        category,
        showDialogConfirm,
        showLoading,
        successConfirm,
        showDialog,
        handleDialogConfirm

    } = CategoriesFunctions()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<CategoryForm>();
    const onSubmit = (data: any) => { showDialog(data) }

    // States

    // Use Efffect
    useEffect(() => {
        setValue('type', 'create')
    }, [])

    return (
        <Layout
            title="Crear categoria"
            description="Creación de las categorias para los hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Crear categoria de hotel</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text="Guardando datos" />
            ) : null}

            {showDialogConfirm.show ? (
                <DialogConfirm
                    title="Crear categoría"
                    description={`¿Desea crear la categoría ${category.name}?`}
                    btnConfirm="Crear"
                    btnCancel="Cancelar"
                    onConfirm={successConfirm}
                    onClose={handleDialogConfirm}
                />
            ) : (null)}

            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className={styles.subtitle}>Categoría hotelera</h5>

                    <div className={styles.user_grid}>

                        <div className="input-container">
                            <label htmlFor="name">Categoria</label>
                            <br />
                            <input
                                className={errors.name ? 'input input_error_text' : 'input'}
                                {...register("name", { required: true })}
                                id="name"
                                autoComplete="off"
                                autoFocus={true}
                            />
                            <br />
                            {errors.name && <small>El campo categoría está vacio!</small>}
                        </div>
                        <div className="input-hidden">
                            <input
                                className={errors.name ? 'input input_error_text' : 'input'}
                                {...register("type", { required: true })}
                                id="type"
                                autoComplete="off"
                                autoFocus={true}
                                hidden
                            />
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