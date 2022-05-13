// React and Next

// Libraries
import { ToastContainer } from "react-toastify"

// CSS
import styles from "../../../../../styles/admin/system/users/AttachUsersToHotels.module.css"

// Components
import Layout from "../../../../../components/globals/Layout"
import Loading from "../../../../../components/admin/loading/Loader"
import { NextPageContext } from "next"
import { endpoint } from "../../../../../config/endpoint"
import Router, { useRouter } from "next/router"
import { User } from "../../../../../types/User"
import { Hotel } from "../../../../../types/Hotel"
import { useRef } from "react"

// Helpers

// Types

AttachUsersToHotels.getInitialProps = async (ctx: NextPageContext) => {

    const isAdmin = await getFetch(endpoint + '/api/admin/auth/isAdmin', ctx)
    const UsersJson = await getFetch(endpoint + '/api/admin/users/showUsers', ctx)
    const hotelsJson = await getFetch(endpoint + '/api/admin/hotels/showHotels', ctx)

    if (!isAdmin.res) {
        ctx.res?.writeHead(302, { Location: '/aG90ZWxlc19wbGF6YQ0K/admin/system/users/users' })
        ctx.res?.end()
        return { props: {} }
    }

    return { isAdmin, users: UsersJson, hotels: hotelsJson }
}

async function getFetch(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })

    if (resp.status === 401 && !ctx.req) {
        Router.replace(endpoint + '/aG90ZWxlc19wbGF6YQ0K/authentication/login')
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
            Location: endpoint + '/aG90ZWxlc19wbGF6YQ0K/authentication/login'
        })
        ctx.res?.end()
        return;
    }

    return await resp.json()
}

export default function AttachUsersToHotels({ isAdmin, users, hotels }: any) {

    // Variables

    // Use Ref
    const hotelContainerRef = useRef<HTMLDivElement>(null)

    // Use State

    // Functions
    const addCardDragStyles = (e: any) => {
        console.log('11');
        e.target.classList.add(styles.dragEl)
    }

    const removeCardDragStyles = (e: any) => {
        e.target.classList.remove(styles.dragEl)
    }

    const appendElement = (e: any) => {
        console.log(hotelContainerRef);
        
        console.log(hotelContainerRef.current);
        
        // hotelContainerRef.current?.appendChild(e.target)
    }

    // Use State
    
    return (
        <Layout
            title="Adjuntar empleados a hoteles"
            description="Adjuntar empleados a los hoteles plaza"
        >
            <h2 className={styles.title}>Adjuntar empleados a los hoteles</h2>

            {/* <Loading isOpen={showLoading.show} text={showLoading.title} /> */}


            <ToastContainer />

            <section className={styles.attach_user_hotel_section}>
                <form encType="multipart/form-data" className={styles.attach_user_hotel_form}>
                    <h5 className={styles.subtitle}>Datos del usuario</h5>

                    <div className={`${styles.users_container} input-container`}>
                        <ul>
                            {
                                users.map((user: User, index: number) =>
                                    <li
                                        key={index}
                                        draggable={true}
                                        onDrag={(e: any) => addCardDragStyles(e)}
                                        onDragEnd={(e: any) => removeCardDragStyles(e)}
                                        onDragOver={(e: any) => appendElement(e)}
                                    >{user.fullName} {user.lastName}</li>
                                )
                            }
                        </ul>
                    </div>

                    <div className={styles.attach_user_hotel_grid}>
                        {
                            hotels.map((hotel: Hotel, index: number) =>
                                <div key={index} ref={hotelContainerRef}>
                                    <h5>{hotel.name}</h5>
                                    <ul className={styles.user_into_hotel}>
                                        <li className={styles.user}>Mario Montiel</li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>

                </form>

            </section>
        </Layout>
    )
}