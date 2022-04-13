// React
import Router from "next/router"
import { useEffect } from "react"
import { NextPageContext } from "next";
import { useRouter } from "next/router";

// Libraries
import { ToastContainer } from "react-toastify";

// CSS
import styles from "../../../../../styles/admin/system/hotels/Hotels.module.css"

// Components
import Layout from "../../../../../components/globals/Layout";
// import Loading from "../../../../../components/admin/loading/Loader"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions";
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"

// Helpers
import { endpoint } from "../../../../../config/endpoint";
import HotelesFunctions from "../../../../../helpers/functions/admin/hotels/hotelsFunctions";

// Types

Hotels.getInitialProps = async (ctx: NextPageContext) => {
    let hotelsJson: any = []
    hotelsJson = await getHotels(endpoint + '/api/admin/hotels/showHotels', ctx)
    return { hotels: hotelsJson }
}

async function getHotels(url: string, ctx: NextPageContext) {
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

export default function Hotels(props: any) {
    console.log(props);
    
    //Variables
    const router = useRouter()
    const {
        hotelsLoaded,
        showLoading,
        showDialogConfirm,
        showData,
        handleDialogConfirm,
        deleteHotel
    } = HotelesFunctions()
    const addButton = `<svg  viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>`

    // UseEffect
    useEffect(() => {
        if (hotelsLoaded.length === 0) {
            showData(props.hotels)
        }
    }, [hotelsLoaded])

    return (
        <Layout
            title="Hoteles"
            description="Todos los hoteles plaza"
        >

            <h2 className={styles.title}>Hoteles</h2>

            {/* <Loading isOpen={showLoading.show} text={showLoading.title} /> */}

            <ToastContainer />

            {showDialogConfirm.show ? (
                <DialogConfirm
                    title={showDialogConfirm.title}
                    description={showDialogConfirm.description}
                    btnConfirm="Eliminar"
                    btnCancel="Cancelar"
                    onConfirm={deleteHotel}
                    onClose={handleDialogConfirm}
                />
            ) : null}

            <section className={styles.hotel_section}>
                <div className={styles.container}>
                    <h5 className={styles.data_in_subtitle}>Total de hoteles: <b>{props.hotels.length ? props.hotels.length : 'No hay hoteles registrados!'}</b></h5>

                    <div className={styles.btn_container}>
                        {/* <BtnFilter
                            filterData={filterButton}
                            onClick={showFilterData} /> */}

                        <BtnActions
                            icon={addButton}
                            onClick={() => router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/hotels/create_hotel`)} />
                    </div>
                </div>

                {
                    props.hotels.length > 0 ? (
                        <table className="table small">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    {/* <th>Imágen</th> */}
                                    <th>Nombre</th>
                                    <th>Ubicación</th>
                                    <th>Teléfono</th>
                                    {/* <th>Categoría</th> */}
                                    <th>Estrellas</th>
                                    <th>Referencias</th>
                                    <th>Lugares de interés</th>
                                    <th>Pisos</th>
                                    <th>Habitaciones</th>
                                    <th>Google Maps</th>
                                    <th>Facebook</th>
                                    <th>Whatsapp</th>
                                    <th>Instagram</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotelsLoaded}
                            </tbody>
                        </table>
                    ) : (<p>No hay hoteles registrados...</p>)
                }

            </section>
        </Layout >
    )
}

