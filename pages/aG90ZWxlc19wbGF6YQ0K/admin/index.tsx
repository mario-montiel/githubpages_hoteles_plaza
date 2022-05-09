// React
import Router from "next/router";
import { NextPageContext } from "next";

// Libraries
import { ToastContainer } from "react-toastify";

// CSS
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../styles/admin/system/home/Home.module.css"

// Components
import Layout from "../../../components/globals/Layout";
import Rooms from "../../../components/admin/rooms/rooms";
import RoomChips from "../../../components/admin/rooms/chips";
import UserAndSettings from "../../../components/admin/user&settings/User&Settings";

// Helpers
import { endpoint } from "../../../config/endpoint";

// Types

Home.getInitialProps = async (ctx: NextPageContext) => {
    let userJson: any = []
    let roomsStatusJson: any = []
    let roomsTypeJson: any = []

    roomsStatusJson = await getFetchData(endpoint + '/api/admin/rooms/roomsStatus/showRoomsStatus', ctx)
    roomsTypeJson = await getFetchData(endpoint + '/api/admin/rooms/roomsType/showRoomsType', ctx)
    userJson = await getFetchData(endpoint + '/api/admin/users/showCurrentUserData', ctx)

    return {
        roomsStatus: roomsStatusJson,
        roomsType: roomsTypeJson,
        user: userJson
    }
}

async function getFetchData(url: string, ctx: NextPageContext) {
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

    if (resp.status === 401 && ctx.req || resp.status === 500) {
        ctx.res?.writeHead(302, {
            Location: 'http://localhost:3000/aG90ZWxlc19wbGF6YQ0K/authentication/login'
        })
        ctx.res?.end()
        return;
    }

    return await resp.json()
}

export default function Home(props: any) {
    // console.log('Home: ', props);

    // Variables

    // States

    // Use Effect

    // Functions
    

    return (
        <Layout
            title="Home Admin"
            description="Página de Inicio Administrativo de Hoteles Plaza"
        >
            <ToastContainer />

            {/* <UserAndSettings url="/api/admin/users/showCurrentUserData" admin={true} user={props.user ? props.user.fullName : ''} /> */}

            <h2 className={styles.title}>{props.user && props.user.preferences ? (props.user.preferences.name) : 'No hay hoteles registrados'}</h2>

            <section className={styles.home_section}>
                {/* <h5 className={styles.total_section}>Total de habitaciones: <b>{rooms.length ? rooms.length : 'No hay habitaciones registradas'}</b></h5> */}
                <RoomChips roomsStatus={props.roomsStatus} roomsType={props.roomsType} />
            </section>

            <section>
                {/* <div className={styles.user_data_container} /> */}
                
                {
                    props.user && props.user.length ? (
                        <Rooms user={props.user} roomsStatus={props.roomsStatus} />
                    ) : <p>No hay habitaciones registradas</p>
                }
            </section>
        </Layout>
    )
}