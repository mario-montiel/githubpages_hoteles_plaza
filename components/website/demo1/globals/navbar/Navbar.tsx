// React
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"

// CSS
import styles from "./Navbar.module.css"

// Componets
import BookingModalCatedralDemo1 from "../../plaza-catedral/modal/booking/Booking"

// Libraries

// Helpers
import { hotels } from "../../../../../objectData/hotels"

// Types

const NavbarDemo1 = () => {

    // Variables
    const router = useRouter()

    // Use State
    const [bookingModal, setBookingModal] = useState<boolean>(false)

    // Functions

    return (
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <img
                        style={{ width: hotels[0].subname === 'Catedral' ? '100px' : '0px' }}
                        src="/hotels/logos/catedral_logo.png"
                        alt="Logo"
                    />
                </li>
                <li className={router.asPath == '/demo-1/hotel/plaza-catedral' ? styles.selected : ""}>
                    <Link href="/demo-1/hotel/plaza-catedral/">
                        QUIÉNES SOMOS
                    </Link>
                </li>
                <li className={router.asPath == '/demo-1/hotel/plaza-catedral/habitaciones' ? styles.selected : ""}>
                    <Link href={"/demo-1/hotel/plaza-catedral/habitaciones"}>
                        HABITACIONES
                    </Link>
                </li>
                <li className={router.asPath == '/demo-1/hotel/plaza-catedral/instalaciones' ? styles.selected : ""}>
                    <Link href={"/demo-1/hotel/plaza-catedral/instalaciones"}>
                        INSTALACIONES
                    </Link>
                </li>
                <li className={router.asPath == '/demo-1/hotel/plaza-catedral/servicios' ? styles.selected : ""}>
                    <Link href={"/demo-1/hotel/plaza-catedral/servicios"}>
                        SERVICIOS
                    </Link>
                </li>
                <li className={router.asPath == '/demo-1/hotel/plaza-catedral/ubicacion-y-contacto' ? styles.selected : ""}>
                    <Link href={"/demo-1/hotel/plaza-catedral/ubicacion-y-contacto"}>
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