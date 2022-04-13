// React
import { useEffect } from "react"
import { NextPageContext } from "next"
import { useForm } from "react-hook-form";
import Router, { useRouter } from "next/router"

// Libraries

// CSS
import styles from "../../../../../../styles/admin/system/categories/CreateCategory.module.css"

// Components
import Layout from "../../../../../../components/Layout"
import Loading from "../../../../../../components/admin/loading/Loader"
import BtnSubmit from "../../../../../../components/admin/buttons/submit/BtnSubmit"
import BtnActions from "../../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import { endpoint } from "../../../../../../api/url"
import CategoriesFunctions from "../../../../../../helpers/functions/admin/categories/categoriesFunctions";

// Types
import { CategoryForm } from "../../../../../../types/Category"

EditCategory.getInitialProps = async (ctx: NextPageContext) => {
    let categoryJson: any = []
    categoryJson = await getCategoryToEdit(endpoint + '/api/admin/categories/showEditCategory', ctx)
    return { category: categoryJson }
}

async function getCategoryToEdit(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            cookie: cookie!
        },
        body: ctx.query.id as string
    })

    if (resp.status === 500 && ctx.req) {
        Router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/categories/categories')
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

    return await resp.json()
}

export default function EditCategory(props: any) {

    // Variables
    const {
        editCategory,
        showDialogConfirm,
        showLoading,
        handleDialogConfirm,
        successEditConfirm,
        loadingData,
        showEditDialog,
    } = CategoriesFunctions()
    const router = useRouter()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<CategoryForm>();
    const onSubmit = (data: any) => { showEditDialog(data) }

    // States

    // Use Effect
    useEffect(() => {
        loadingData(props)
        loadingEditData()
    }, [props])

    // Functions
    const loadingEditData = () => {
        setValue('id', props.category.data.id)
        setValue('name', props.category.data.name)
        setValue('type', 'update')
    }

    return (
        <Layout
            title="Editar categoría"
            description="Categorias de los hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Editar categoría</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text="Cargando..." />
            ) : null}

            {showDialogConfirm.show ? (
                <DialogConfirm
                    title="Editar categoría"
                    description={`¿Desea editar la categoría ${props.category.data.name} a ${editCategory.name}?`}
                    btnConfirm="Editar"
                    btnCancel="Cancelar"
                    onConfirm={successEditConfirm}
                    onClose={handleDialogConfirm}
                />
            ) : null}

            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5 className={styles.subtitle}>Datos de la categoría</h5>

                    <div className={styles.user_grid}>
                        {/* <input
                            className={errors.id ? 'input input_error_text' : 'input'}
                            {...register("id", { required: false })}
                            autoComplete="off"
                            autoFocus={true}
                            value={editCategory.id}
                            onChange={(e) => handleChangeInput(e)}
                            hidden
                        /> */}
                        <div className="input-container">
                            <label htmlFor="name">Categoría</label>
                            <br />

                            <input
                                className={errors.name ? 'input input_error_text' : 'input'}
                                {...register("name", { required: true })}
                                id="name"
                                autoComplete="off"
                                autoFocus={true}
                            />
                            <input
                                className={errors.name ? 'input input_error_text' : 'input'}
                                {...register("type", { required: true })}
                                id="type"
                                autoComplete="off"
                                autoFocus={true}
                                hidden
                            />
                            <br />
                            {errors.name && <small>El campo categoría está vacio!</small>}
                        </div>

                    </div>

                    {!Object.values(errors).length ? (
                        <BtnSubmit title="Editar" />
                    ) : (
                        <p className="submit-error-text">Se encontraron algunos errores!.</p>
                    )}
                </form>
            </section>
        </Layout>
    )
}