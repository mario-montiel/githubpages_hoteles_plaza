// React
import { useEffect } from "react"
import { NextPageContext } from "next"
import Router, { useRouter } from "next/router"

// Libraries
import { ToastContainer } from "react-toastify"

// CSS
import 'react-toastify/dist/ReactToastify.css'
import styles from "../../../../../styles/admin/system/users/Users.module.css"

// Components
import Layout from "../../../../../components/globals/Layout"
import Loading from "../../../../../components/admin/loading/Loader"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import { endpoint } from "../../../../../config/endpoint"
import { verifyIfIsAdmin } from "../../../../../api/authentication";
import UsersFunctions from "../../../../../helpers/functions/admin/users/usersFunctions"

// Types

Users.getInitialProps = async (ctx: NextPageContext) => {
    const isAdmin = await getUsers(endpoint + '/api/admin/auth/isAdmin', ctx)
    const departmentsData = await getUsers(endpoint + '/api/admin/departments/showDepartments', ctx)
    const hotelData = await getUsers(endpoint + '/api/admin/hotels/showHotels', ctx)
    const userData = await getUsers(endpoint + '/api/admin/users/showUsers', ctx)
    const currentUser = await getUsers(endpoint + '/api/admin/users/currentUserData', ctx)

    return {
        isAdmin,
        departments: departmentsData,
        hotels: hotelData,
        users: userData,
        currentUser
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

export default function Users(props: any) {

    //Variables
    const router = useRouter()
    const {
        hotelsData,
        showDialogConfirm,
        showLoading,
        loadData,
        generateAreaHTML,
    } = UsersFunctions(props.isAdmin.res)
    const addButton = `<svg  viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>`

    // States

    // UseEffect

    useEffect(() => {
        // showData()
        loadData(props.users, props.hotels, props.departments, props.currentUser)
    }, [props])

    // Functions


    return (
        <Layout
            title="Hoteles"
            description="Todos los hoteles plaza"
        >

            <h2 className={styles.title}>Usuarios</h2>

            <Loading isOpen={showLoading.show} text={showLoading.title} />

            <ToastContainer />

            {showDialogConfirm.show ? (
                <DialogConfirm
                    image={showDialogConfirm.image ? showDialogConfirm.image : ''}
                    alt={showDialogConfirm.alt ? showDialogConfirm.alt : ''}
                    title={showDialogConfirm.title ? showDialogConfirm.title : ''}
                    description={showDialogConfirm.description ? showDialogConfirm.description : ''}
                    btnConfirm={showDialogConfirm.btnConfirm ? showDialogConfirm.btnConfirm : ''}
                    btnCancel={showDialogConfirm.btnCancel ? showDialogConfirm.btnCancel : ''}
                    onConfirm={showDialogConfirm.onConfirm ? showDialogConfirm.onConfirm : () => { }}
                    onClose={showDialogConfirm.onClose ? showDialogConfirm.onClose : () => { }}
                />
            ) : null}

            {/* <UserAndSettings url="/api/admin/users/showCurrentUserData" admin={true} user={cookies.get('currentUser') ? cookies.get('currentUser') : ''} /> */}

            <section className={styles.user_section}>
                <div className={styles.container}>
                    <h5 className={styles.data_in_subtitle}>Total de usuarios: <b>{props.users.length ? props.users.length : 'No hay ningún usuario registrado'}</b></h5>

                    {/* {
                        verifyIfIsAdmin(props.currentUser) || props.currentUser?.typeUserId === 1 ? (
                            <div className={styles.btn_container}>
                                <BtnActions
                                    icon={addButton}
                                    onClick={() => router.push('/aG90ZWxlc19wbGF6YQ0K/admin/system/users/create_user')} />
                            </div>
                        ) : null
                    } */}

                    {
                        props.isAdmin.res ? (
                            <div className={styles.btn_container}>
                                <BtnActions
                                    icon={addButton}
                                    onClick={() => router.push('/aG90ZWxlc19wbGF6YQ0K/admin/system/users/create_user')} />
                            </div>
                        ) : null
                    }

                </div>

                <div className="table-container">
                    {
                        hotelsData.length > 0 ? (
                            hotelsData.map((hotel: any, index: number) =>
                                <div className={`${styles.table_container} table-data`} key={index + 100}>
                                    <div className={styles.table_hotel_data_container}>
                                        <h4>{hotel.name} </h4>
                                        <p>Cantidad de usuarios: <b>{hotel.usersOnHotels.length}</b></p>
                                    </div>
                                    {generateAreaHTML(hotel, index)}
                                </div>
                            )
                        ) : (<p>No hay usuarios registrados</p>)
                    }
                </div>

            </section>
        </Layout >
    )
}