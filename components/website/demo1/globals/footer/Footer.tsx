// React
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

// Libraries

// CSS
import styles from "./Footer.module.css"

// Componets
import BookingModalCatedralDemo1 from "../../booking/Booking"

// Helpers
import { endpoint } from "../../../../../config/endpoint";
import { convertKelvinToCelsius } from "../../../../../helpers/convertTemperature";

// Types

export default function FooterDemo1({ weather, currentHotel }: any) {
    
    // Variables
    const router = useRouter()
    const initialUrlDataValues = {
        logo: '',
        url: '',
        adress: ''
    }
    const websiteUrl = `${endpoint}/demo-1/hotel`

    // Use State
    const [url, setUrl] = useState(initialUrlDataValues)
    const [bookingModal, setBookingModal] = useState<boolean>(false)

    // Functions
    const getCurrentTime = () => {
        const date = new Date()
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        const AMorPM = hour < 12 ? 'AM' : 'PM'
        const time = `${hour}:${minutes} ${AMorPM}`

        return time
    }

    // Use Effect
    useEffect(() => {
        if (router.asPath.startsWith('/demo-1/hotel/plaza-catedral')) {
            setUrl({
                ...url,
                logo: "catedral_logo",
                url: "/demo-1/hotel/plaza-catedral",
                adress: "Av Hidalgo 520 Norte, Primero de Cobián Centro, 35000 Gómez Palacio, Dgo."
            })
        } else {
            setUrl({
                ...url,
                logo: 'matamoros_logo',
                url: "/demo-1/hotel/plaza-matamoros",
                adress: "Blvd. Matamoros Torreón 125 Nte. Fracc. Punta Laguna, C.P. 27448 Matamoros, Coah. México."
            })
        }
    }, [router.asPath])

    return (
        <footer className={styles.footer}>
            <img
                className={styles.texture_image}
                src="/hotels/symbols/frame_texture_bottom_left.webp"
                alt="Logotipo del hotel"
            />

            <div className={styles.menu_container}>
                <ul>
                    <li>VISÍTANOS</li>
                    <li> {url.adress} </li>
                    <li>{currentHotel == 'matamoros' ? '871 108 58 30' : '871 715 61 62'}</li>
                    <li>
                        <span>
                            {/* <svg className={styles.svg_weather_icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z" />
                            </svg> */}
                            <img className={styles.svg_weather_icon} src={`http://openweathermap.org/img/wn/${weather ? weather.data.weather[0].icon : '50d'}.png`} alt="" />
                        </span>
                        <p className={styles.grades}>{convertKelvinToCelsius(weather && weather.data ? weather.data.main.temp : 0)}</p>
                        <div className={styles.timer_container}>
                            <svg className={styles.svg_time_icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M12.5 12.8L7.7 15.6L7 14.2L11 11.9V7H12.5V12.8Z" />
                            </svg>
                            {getCurrentTime()}
                        </div>
                    </li>
                </ul>

                <ul>
                    <li>NAVEGA</li>
                    <li>
                        <Link href={`${websiteUrl}/plaza-${currentHotel}/`}>
                            QUIÉNES SOMOS
                        </Link>
                    </li>
                    <li>
                        <Link href={`${websiteUrl}/plaza-${currentHotel}/habitaciones`}>
                            HABITACIONES
                        </Link>
                    </li>
                    <li>
                        <Link href={`${websiteUrl}/plaza-${currentHotel}/instalaciones`}>
                            INSTALACIONES
                        </Link>
                    </li>
                    <li>
                        <Link href={`${websiteUrl}/plaza-${currentHotel}/servicios`}>
                            SERVICIOS
                        </Link>
                    </li>
                    <li>
                        <Link href={`${websiteUrl}/plaza-${currentHotel}/ubicacion-y-contacto`}>
                            UBICACION Y CONTACTO
                        </Link>
                    </li>
                </ul>

                <ul>
                    <li>RESERVA AHORA</li>
                    <li data-src="/hotels">
                        <button onClick={() => setBookingModal(true)}>RESERVAR</button>
                    </li>
                    <li>
                        <svg className={styles.svg_social_media_icon} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                        </svg>
                        <svg className={styles.svg_social_media_icon} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                        </svg>
                    </li>
                </ul>

                <img
                    className={styles.logo_footer}
                    src={`/hotels/logos/${url.logo}.webp`}
                    alt="Logotipo del hotel"
                />
            </div>

            {
                bookingModal ? (
                    <BookingModalCatedralDemo1 close={() => setBookingModal(false)} />
                ) : null
            }
        </footer>
    )
}