// React
import { NextPageContext } from "next"
import Router, { useRouter } from "next/router"

// Libraries
import { ToastContainer } from "react-toastify"

// CSS
import 'react-toastify/dist/ReactToastify.css'
import styles from "../../../../../../styles/admin/system/categories/Categories.module.css"

// Components
import Layout from "../../../../../../components/globals/Layout";
import Loading from "../../../../../../components/admin/loading/Loader"
import BtnActions from "../../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import { endpoint } from "../../../../../../config/endpoint"
import { unauthorized } from "../../../../../../helpers/notification401"
import TypeRoomsFunctions from "../../../../../../helpers/functions/admin/roomsType/roomsTypeFunctions"

// Types
import { RoomType } from "../../../../../../types/RoomType"

RoomsType.getInitialProps = async (ctx: NextPageContext) => {
    const isAdmin = await getFetch(endpoint + '/api/admin/auth/isAdmin', ctx)
    const json = await getFetch(endpoint + '/api/admin/rooms/roomsType/showRoomsType', ctx)

    return {
        isAdmin,
        roomsType: json
    }
}

async function getFetch(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })

    if (resp.status === 401 && !ctx.req) {
        unauthorized()
        Router.replace('/aG90ZWxlc19wbGF6YQ0K/authentication/login')
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        unauthorized()
        ctx.res?.writeHead(302, {
            Location: 'http://localhost:3000/aG90ZWxlc19wbGF6YQ0K/authentication/login'
        })
        ctx.res?.end()
        return;
    }

    return await resp.json()
}

export default function RoomsType(props: any) {

    // Variables
    const router = useRouter()
    const {
        showDialogConfirm,
        showLoading,
        askIfItShouldRemove,
    } = TypeRoomsFunctions()
    const addButton = `<svg  viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>`

    // States

    // UseEffect

    // Functions

    return (
        <Layout
            title="Tipos de habitaciones"
            description="Tipos de habitaciones de los hoteles plaza"
        >
            <h2 className={styles.title}>Tipos de habitaciones</h2>

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

            <section className={styles.category_section}>
                <div className={styles.container}>
                    <h5 className={styles.data_in_subtitle}>Total de tipos de habitaciones: <b>{props.roomsType.length ? props.roomsType.length : 'No se pudieron cargar los datos!'}</b></h5>

                    {
                        props.isAdmin.res ? (
                            <div className={styles.btn_container}>
                                {/* <BtnFilter
                            filterData={filterButton}
                            onClick={showFilterData} /> */}

                                <BtnActions
                                    icon={addButton}
                                    onClick={() => router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/create_rooms_type`)} />
                            </div>
                        ) : null
                    }
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Palabra clave</th>
                            <th>Costo por noche</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Personas máximas</th>
                            <th>Fumar</th>
                            {
                                props.isAdmin.res ? (
                                    <th>Acciones</th>
                                ) : null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.roomsType.map((roomType: RoomType, index: number) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{roomType.name}</td>
                                    <td>{roomType.keyWord}</td>
                                    <td>${roomType.costPerNight}</td>
                                    <td>{roomType.title}</td>
                                    <td>{roomType.description}</td>
                                    <td>{roomType.maxPeople}</td>
                                    <td>{roomType.smoke ? 'Si' : 'No'}</td>
                                    {
                                        props.isAdmin.res ? (
                                            <td>
                                                <div className="container">
                                                    <button className="btn_action" onClick={() => router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/${roomType.id}`)}>
                                                        <svg className="svg_table_icon" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                                        </svg>
                                                    </button>
                                                    <button className="btn_action" onClick={() => askIfItShouldRemove(roomType)}>
                                                        <svg className="svg_table_icon" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        ) : null
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </section>
        </Layout>
    )
}