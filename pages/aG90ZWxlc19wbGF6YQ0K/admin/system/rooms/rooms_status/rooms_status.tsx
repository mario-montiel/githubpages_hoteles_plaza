// React
import { NextPageContext } from "next"
import Router, { useRouter } from "next/router"

// Libraries
import { ToastContainer } from "react-toastify"

// CSS
import 'react-toastify/dist/ReactToastify.css'
import styles from "../../../../../../styles/admin/system/categories/Categories.module.css"

// Components
import Layout from "../../../../../../components/globals/Layout"
import Loading from "../../../../../../components/admin/loading/Loader"
import BtnActions from "../../../../../../components/admin/buttons/actions/BtnActions"
import DialogConfirm from "../../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import { endpoint } from "../../../../../../config/endpoint"
import { RoomStatus } from "../../../../../../types/RoomStatus"
import { unauthorized } from "../../../../../../helpers/notification401"
import RoomStatusFunction from "../../../../../../helpers/functions/admin/roomsStatus/roomsStatusFunction"

// Types

RoomsType.getInitialProps = async (ctx: NextPageContext) => {
    const json = await getFetch(endpoint + '/api/admin/rooms/roomsStatus/showRoomsStatus', ctx)
    return { roomsStatus: json }
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
    } = RoomStatusFunction()
    const addButton = `<svg  viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>`

    // States

    // UseEffect

    // Functions
    const handleStyles = (backgroundColor: string, border: boolean, textColor: string) => {
        const styles = {
            backgroundColor,
            width: 'auto',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '5px',
            padding: '0rem 1rem',
            border: border ? '0.05px solid #CBCBCB' : 'none',
            color: textColor
        }
        return (
            <div style={styles}>{backgroundColor}</div>
        )
    }

    return (
        <Layout
            title="Estatus de las habitaciones"
            description="Estatus de las habitaciones de Hoteles Plaza"
        >
            <h2 className={styles.title}>Estatus de las habitaciones</h2>

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
                    <h5 className={styles.data_in_subtitle}>Total de estatus de habitaciones: <b>{props.roomsStatus.length ? props.roomsStatus.length : 'No se pudieron cargar los datos!'}</b></h5>

                    <div className={styles.btn_container}>
                        {/* <BtnFilter
                            filterData={filterButton}
                            onClick={showFilterData} /> */}

                        <BtnActions
                            icon={addButton}
                            onClick={() => router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_status/create_rooms_status`)} />
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Color de fondo</th>
                            <th>Borde</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.roomsStatus.map((roomStatus: RoomStatus, index: number) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{roomStatus.name}</td>
                                    <td>
                                        
                                        {handleStyles(roomStatus.backgroundColor, roomStatus.border, roomStatus.textColor)}

                                    </td>
                                    <td>{roomStatus.border ? 'Si' : 'No'}</td>
                                    <td>
                                        <div className="container">
                                            <button className="btn_action" onClick={() => router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_status/${roomStatus.id}`)}>
                                                <svg className="svg_table_icon" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                                </svg>
                                            </button>
                                            <button className="btn_action" onClick={() => askIfItShouldRemove(roomStatus)}>
                                                <svg className="svg_table_icon" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </section>
        </Layout>
    )
}