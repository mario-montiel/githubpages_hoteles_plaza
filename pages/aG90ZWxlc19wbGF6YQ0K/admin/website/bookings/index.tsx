// React
import { NextPageContext } from "next";
import Router, { useRouter } from "next/router";

// Libraries
import { ToastContainer } from "react-toastify";

// CSS
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../../../styles/admin/website/bookings/Bookings.module.css"

// Components
import Layout from "../../../../../components/globals/Layout";
import Loading from "../../../../../components/admin/loading/Loader"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions";
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import { endpoint } from "../../../../../config/endpoint";
import DepartmentsFunctions from "../../../../../helpers/functions/admin/departments/departmentsFunctions";

// Types
import { Department } from "../../../../../types/Department";

Bookings.getInitialProps = async (ctx: NextPageContext) => {
    const isAdmin = await getUsers(endpoint + '/api/admin/auth/isAdmin', ctx)
    const departmentsJson = await getUsers(endpoint + '/api/admin/departments/showDepartments', ctx)

    return {
        isAdmin,
        departments: departmentsJson
    }
}

async function getUsers(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })

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

export default function Bookings(props: any) {

    // Variables
    const router = useRouter()
    const addButton = `<svg  viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>`

    // States

    // UseEffect

    // Functions

    return (
        <Layout
            title="Departamentos"
            description="Departamentos de los hoteles plaza"
        >

            <h2 className={styles.title}>Reservaciones</h2>

            {/* <Loading isOpen={showLoading.show} text={showLoading.title} /> */}

            <ToastContainer />

            {/* {showDialogConfirm.show ? (
                <DialogConfirm
                    isDelete={true}
                    btnCancel="Cancelar"
                    btnConfirm="Eliminar"
                    onClose={handleDialogConfirm}
                    title={showDialogConfirm.title}
                    description={showDialogConfirm.description}
                    onConfirm={(reasonToDelete: string) => deleteDepartment(reasonToDelete)}
                />
            ) : null} */}

            <section className={styles.bookings_section}>
                <div className={styles.text_container}>
                    <p className={styles.rooms_title}>Reservaciones</p>
                    <p className={styles.date}></p>
                </div>
            </section>
        </Layout>
    )
}