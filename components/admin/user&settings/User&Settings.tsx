// React
import Image from 'next/image'
import router from "next/router"
import { useEffect, useRef, useState } from "react"

// Libraries
import { toast } from 'react-toastify';

// CSS
import styles from './User&Settings.module.css'

// Components

// Helpers
import { endpoint } from "../../../config/endpoint";

// Types

export default function UserAndSettings(props: any) {

    // Variables
    const ulDetailsRef = useRef<HTMLUListElement>(null)

    // States
    const [user, setUser] = useState<string>('')
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    // Use Effect
    useEffect(() => {
        // getCurrentUser()
        if (props) {
            setUser(props.user)
            setIsAdmin(props.admin)
        }
    }, [props && props.user ? props.user : null])

    // Functions
    // const getCurrentUser = async () => {
    //     await fetch(props.url)
    //         .then((responsePromis) => {
    //             responsePromis.json().then(responseApi => {
    //                 setUser(responseApi)
    //             })
    //         }).catch((err) => { console.log(err); })
    // }

    const openDetails = () => {
        ulDetailsRef.current?.classList.toggle(styles.active_user_menu)
    }

    const loggout = async () => {
        const url = isAdmin ? '/api/admin/auth/removeAuth' : '/api/landingPage/auth/removeGuestAuth'
        const resp = await fetch(endpoint + url, {
            method: "POST"
        })
        const response = await resp.json()

        if (response.res) {
            setTimeout(() => {
                toast(`Su sesión se cerró con éxito!`, {
                    position: "top-right",
                    autoClose: 2000,
                    closeOnClick: true,
                    type: 'success'
                })
            }, 300);

            isAdmin ? (
                router.push('/aG90ZWxlc19wbGF6YQ0K/authentication/login')
            ) : router.reload()
            // router.replace(props.admin ? '/aG90ZWxlc19wbGF6YQ0K/authentication/login' : '/')
        }

    }

    return (
        <div className={isAdmin ? `${styles.user_and_settings} ${styles.isAdmin}` : `${styles.user_and_settings} ${styles.landing_page}`}>
            <ul onClick={openDetails}>
                <li>{user ? user : 'Cargando'}</li>
                <li>
                    <Image src={'/hotels/profile/profile.webp'} width={45} height={45} />
                    <svg className={styles.svg_menu_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                    </svg>
                </li>
            </ul>

            <ul ref={ulDetailsRef}>
                <li onClick={() => router.push('/aG90ZWxlc19wbGF6YQ0K/profile')}>Ver Perfil</li>
                <li onClick={() => loggout()}>Cerrar Sesión</li>
            </ul>
        </div>
    )
}