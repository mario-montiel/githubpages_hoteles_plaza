// React
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

// CSS
import styles from "./Navbar.module.css"

// Componets
import BookingModalCatedralDemo1 from "../../booking/Booking"

// Libraries

// Helpers
import { hotels } from "../../../../../objectData/hotels"

// Types

const NavbarDemo1 = () => {

    // Variables
    const router = useRouter()
    const initialUrlDataValues = {
        logo: '',
        url: ''
    }

    // Use State
    const [url, setUrl] = useState(initialUrlDataValues)
    const [bookingModal, setBookingModal] = useState<boolean>(false)

    // Functions

    // Use Effect
    useEffect(() => {
        if (router.asPath.startsWith('/demo-1/hotel/plaza-catedral')) {
            setUrl({ ...url, logo: 'catedral_logo', url: "/demo-1/hotel/plaza-catedral" })
        } else {
            setUrl({ ...url, logo: 'matamoros_logo', url: "/demo-1/hotel/plaza-matamoros" })
        }
    }, [router.asPath])

    return (
        <nav className={styles.navbar}>
            <ul>
                <li onClick={() => router.push('/demo-1/')}>
                    <img
                        style={{ width: url.logo === 'catedral_logo' ? '130px' : '80px', height: url.logo === 'catedral_logo' ? '65px' : '65px' }}
                        src={`/hotels/logos/${url.logo}.webp`}
                        alt="Logo"
                    />
                </li>
                <li className={router.asPath == url.url ? styles.selected : ""}>
                    <Link href={`${url.url}/`}>
                        QUIÉNES SOMOS
                    </Link>
                </li>
                <li className={router.asPath == `${`${url.url}/habitaciones`}` ? styles.selected : ""}>
                    <Link href={`${url.url}/habitaciones`}>
                        HABITACIONES
                    </Link>
                </li>
                <li className={router.asPath == `${`${url.url}/instalaciones`}` ? styles.selected : ""}>
                    <Link href={`${url.url}/instalaciones`}>
                        INSTALACIONES
                    </Link>
                </li>
                <li className={router.asPath == `${`${url.url}/servicios`}` ? styles.selected : ""}>
                    <Link href={`${url.url}/servicios`}>
                        SERVICIOS
                    </Link>
                </li>
                <li className={router.asPath == `${url.url}/ubicacion-y-contacto` ? styles.selected : ""}>
                    <Link href={`${url.url}/ubicacion-y-contacto`}>
                        UBICACIÓN Y CONTACTO
                    </Link>
                </li>
                <button onClick={() => setBookingModal(true)}>
                    RESERVAR
                </button>

                {
                    bookingModal ? (
                        <BookingModalCatedralDemo1 close={() => setBookingModal(false)} />
                    ) : null
                }
            </ul>
        </nav>
    )
}

export default NavbarDemo1