// React
import Link from 'next/link'
import Image from "next/image"
import { useRouter } from 'next/router'
import { Ref, useEffect, useRef, useState } from 'react';

// Libraries
import cookies from 'js-cookie'

// CSS
import styles from './Sidebar.module.css'

// Components
import UserAndSettings from '../user&settings/User&Settings';

// Helpers
import { endpoint } from "../../../config/endpoint";

// Types
import { Hotel } from '../../../types/Hotel';

type Sidebar = {
    title?: string,
    svgStyles?: string,
    color: string,
    rightIcon?: string,
    leftIcon?: string,
    ref?: Ref<any>,
    routerPathName?: string,
    onClick?: () => void,
    liArray?: SidebarLi[]
}

type SidebarLi = {
    titles: SidebarLiTitles[]
}

type SidebarLiTitles = {
    title: string,
    url: string
}

// type CurrentUserSidebar = {
//     id?: number,
//     email: string
//     password: string
//     fullName: string
//     lastName: string
//     phone: string
//     hotel: []
//     departmentId: number
//     typeUserId: number
//     preferencesId?: string
//     status: string
//     image?: string
//     type?: string
//     registredBy?: string,
//     department: Department
// }

export default function Sidebar() {

    // States
    const [dropwdown, setDropdown] = useState({
        sidebar: false,
        dropdown1: false,
        dropdown2: false,
        dropdown3: false,
        dropdown4: false
    })

    // Variables
    const router = useRouter()
    const sidebarRef = useRef<HTMLDivElement>(null)
    // const liS = useRef<HTMLUListElement>(null)
    const hotelTextRef = useRef<any>(null)
    const hotelElementsRef = useRef<HTMLUListElement>(null)
    const liSidebarSystemRef = useRef<HTMLLIElement>(null)
    const liSidebarWebsiteRef = useRef<HTMLLIElement>(null)
    const liSidebarRestaurantRef = useRef<HTMLLIElement>(null)
    const liSidebarHousekeeperRef = useRef<HTMLLIElement>(null)
    const ulSidebarSecondSystemRef = useRef<HTMLUListElement>(null)

    const [user, setUser] = useState<any>()
    const [hotels, setHotels] = useState([])
    const [hotelTitleSelected, setHotelTitleSelected] = useState('')

    // Use Effect
    useEffect(() => {
        getHotelsAndCurrentUser()
    }, [])

    const getHotelsAndCurrentUser = async () => {
        await fetch('/api/admin/users/showCurrentUserData')
            .then((responsePromis) => {
                responsePromis.json().then(responseApi => {
                    if (responseApi || responseApi.length > 0) {
                        setUser(responseApi)
                        setHotels(responseApi.hotels)
                        if (responseApi.preferences && responseApi.preferences.name) {
                            const index = getHTMLIndex(responseApi.hotels, responseApi.preferencesId)
                            hotelSelected(responseApi.hotels[0].hotel, index)
                            return setHotelTitleSelected(responseApi.preferences.name)
                        }

                        if (responseApi.length && responseApi.hotels.length) {
                            setHotelTitleSelected(responseApi.hotels[0].hotel.name)
                            hotelSelected(responseApi.hotels[0].hotel, 0)
                        }
                    }
                })
            }).catch((err) => { console.log(err); })
    }

    const getHTMLIndex = (hotels: any, hotelSelected: number) => {
        let i = 0
        hotels.forEach((hotel: any, index: number) => {
            if (hotel.hotel.id == hotelSelected) {
                i = index
            }
        });
        return i
    }

    function showSidebar() {
        setDropdown({ ...dropwdown, sidebar: !dropwdown.sidebar })
        const body = document.querySelector('.admin_grid')
        body?.classList.toggle('active')
        hotelElementsRef.current?.classList.toggle('remove')
        hotelTextRef.current.classList.toggle('remove')
    }

    function sidebarSystemDropDown() {
        setDropdown({ ...dropwdown, dropdown1: !dropwdown.dropdown1 })
        const newStyle = styles["li_sidebar_system_selected"]
        liSidebarSystemRef.current!.classList.toggle(newStyle)
        handleStylesLiElements(liSidebarSystemRef)
    }

    function sidebarWebsiteDropDown() {
        setDropdown({ ...dropwdown, dropdown2: !dropwdown.dropdown2 })
        const newStyle = styles["li_sidebar_website_selected"]
        liSidebarWebsiteRef.current!.classList.toggle(newStyle)
    }

    function sidebarRestaurantDropDown() {
        setDropdown({ ...dropwdown, dropdown3: !dropwdown.dropdown3 })
        const newStyle = styles["li_sidebar_restaurant_selected"]
        liSidebarRestaurantRef.current!.classList.toggle(newStyle)
    }

    function sidebarHousekeeperDropDown() {
        setDropdown({ ...dropwdown, dropdown4: !dropwdown.dropdown4 })
        const newStyle = styles["li_sidebar_housekeeper_selected"]
        liSidebarHousekeeperRef.current!.classList.toggle(newStyle)
    }

    function handleStylesLiElements(LiElement: any) {
        const newStyle = styles["li_sidebar_system_selected"]
        if (!LiElement['current'].classList.contains(newStyle)) {
            LiElement['current'].classList.add(newStyle)
        } else {
            LiElement['current'].classList.remove(newStyle)
        }
    }

    function showHotels() {
        let html: any = []

        {
            hotels && hotels.length > 0 ? (
                hotels.map((hotel: any, index: number) => {
                    html.push(
                        <li
                            className={user?.preferencesId === hotel.name ? (`${styles.hotel_selected_sidebar} sidebar-active`) : styles.hotel_selected_sidebar}
                            key={index}
                            onClick={() => hotelSelected(hotel.hotel, index, 'save')}
                        >
                            {console.log(hotel)  }
                            <Image src={'/logos/' + hotel.hotel.pathImageName + 'logo.png'} width={70} height={50} objectFit={'cover'} />
                        </li>
                    )
                })
            ) : (null)
        }

        return html
    }

    async function hotelSelected(hotel: Hotel, index: number, type?: string) {
        // Remove css of all li
        hotelElementsRef.current?.querySelectorAll('li').forEach((li) => {
            li.classList.remove('sidebar-active')
        })
        hotelElementsRef.current?.querySelectorAll('li')[index].classList.add('sidebar-active')

        if (type && type === 'save') {
            changePreferencesOFHotel(hotel)
            setHotelTitleSelected(hotel.name)
        }
    }

    async function changePreferencesOFHotel(hotelSelected: any) {
        await fetch('/api/admin/users/readOrChangePreferencesHotel', {
            method: "POST",
            body: JSON.stringify(hotelSelected.id)
        }).then((responseJson) => {
            responseJson.json()
                .then(() => {
                    const getCurrentUrl = router.pathname
                    router.replace(getCurrentUrl)
                })
                .catch((err) => { console.log(err); })
        })
    }

    const verifyPropertiesOfUser = (user: any) => {
        if (user && !user.department && !user.typeUserId && user.typeUser === 'Superadmin') {
            return true
        }

        return false
    }

    function system() {
        return /* verifyPropertiesOfUser(user) || user && user.department && user.department.name === 'Recepción' || user?.typeUserId === 1 ? */ (
            <ul className={styles.ul_sidebar_system}>
                <li ref={liSidebarSystemRef} className={router.asPath.indexOf(`/aG90ZWxlc19wbGF6YQ0K/admin/`) === 0 ? `${styles.li_sidebar_system} ${styles.li_sidebar_system_selected}` : styles.li_sidebar_system} onClick={sidebarSystemDropDown}>
                    <svg className={styles.svg_sidebar_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6,2C4.89,2 4,2.89 4,4V12C4,13.11 4.89,14 6,14H18C19.11,14 20,13.11 20,12V4C20,2.89 19.11,2 18,2H6M6,4H18V12H6V4M4,15C2.89,15 2,15.89 2,17V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V17C22,15.89 21.11,15 20,15H4M8,17H20V20H8V17M9,17.75V19.25H13V17.75H9M15,17.75V19.25H19V17.75H15Z" />
                    </svg>
                    <p>Sistema</p>
                    <svg className={!dropwdown.dropdown1 ? styles.svg_sidebar_icon : styles.svg_sidebar_icon_active} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                </li>
                <ul className={dropwdown.dropdown1 && !dropwdown.sidebar ? styles.ul_sidebar_system_dropdown_active : styles.ul_sidebar_system_dropdown} >
                    <li className={styles.li_sidebar_line_dropdown} />
                    <li className={styles.li_sidebar_system_dropdown}>
                        <div className={styles.chip}>
                            <p>Reservaciones</p>
                        </div>
                    </li>
                    <Link href={`/aG90ZWxlc19wbGF6YQ0K/admin/system/hotels/hotels`}>
                        <li className={styles.li_sidebar_system_dropdown}>
                            <div className={router.asPath.startsWith(`/aG90ZWxlc19wbGF6YQ0K/admin/system/hotels`) ? `${styles.li_sidebar_system_selected} ${styles.chip}` : styles.chip}>
                                <p>Hoteles</p>
                            </div>
                        </li>
                    </Link>
                    <Link href="/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms">
                        <li className={styles.li_sidebar_system_dropdown}>
                            <div className={styles.chip}>
                                <p>Habitaciones</p>
                            </div>
                        </li>
                    </Link>
                    <Link href="/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_status/rooms_status">
                        <li className={styles.li_sidebar_system_dropdown}>
                            <div className={styles.chip}>
                                <p>Estatus habitación</p>
                            </div>
                        </li>
                    </Link>
                    <Link href="/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type">
                        <li className={styles.li_sidebar_system_dropdown}>
                            <div className={styles.chip}>
                                <p>Tipos de habitación</p>
                            </div>
                        </li>
                    </Link>
                    <Link href="/aG90ZWxlc19wbGF6YQ0K/admin/system/users/users">
                        <li className={styles.li_sidebar_system_dropdown}>
                            <div className={router.asPath.startsWith(`/aG90ZWxlc19wbGF6YQ0K/admin/system/users`) ? `${styles.li_sidebar_system_selected} ${styles.chip}` : styles.chip}>
                                <p>Usuarios</p>
                            </div>
                        </li>
                    </Link>
                    {/* <li className={styles.li_sidebar_system_dropdown}>
                        <div className={styles.chip}>
                            <p>Pisos</p>
                        </div>
                    </li> */}
                    <Link href={`/aG90ZWxlc19wbGF6YQ0K/admin/system/departments/departments`}>
                        <li className={styles.li_sidebar_system_dropdown}>
                            <div className={router.asPath.startsWith(`/aG90ZWxlc19wbGF6YQ0K/admin/system/departments`) ? `${styles.li_sidebar_system_selected} ${styles.chip}` : styles.chip}>
                                <p>Departamento</p>
                            </div>
                        </li>
                    </Link>
                    {/* <Link href={`/aG90ZWxlc19wbGF6YQ0K/admin/system/categories/categories`}>
                        <li className={styles.li_sidebar_system_dropdown}>
                            <div className={router.asPath.startsWith(`/aG90ZWxlc19wbGF6YQ0K/admin/system/categories`) ? `${styles.li_sidebar_system_selected} ${styles.chip}` : styles.chip}>
                                <p>Categoría</p>
                            </div>
                        </li>
                    </Link> */}
                </ul>
            </ul>
        ) /* : null */
    }

    function website() {
        return verifyPropertiesOfUser(user) || user && /* user.length */ user.department && user?.department.name === 'Recepción' || user?.typeUserId === 1 ? (
            <ul className={styles.ul_sidebar_website}>
                <li ref={liSidebarWebsiteRef} className={styles.li_sidebar_website} onClick={sidebarWebsiteDropDown}>
                    <svg className={styles.svg_sidebar_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                    <p>Sitio web</p>
                    <svg className={!dropwdown.dropdown2 ? styles.svg_sidebar_icon : styles.svg_sidebar_icon_active} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                </li>
                <ul className={dropwdown.dropdown2 && !dropwdown.sidebar ? styles.ul_sidebar_website_dropdown_active : styles.ul_sidebar_website_dropdown} >
                    <li className={styles.li_sidebar_line_dropdown} />
                    <li className={styles.li_sidebar_website_dropdown}>
                        <div className={styles.chip}>
                            <p>Ver reservaciones</p>
                        </div>
                    </li>
                    <li className={styles.li_sidebar_website_dropdown}>
                        <div className={styles.chip}>
                            <p>Facturas</p>
                        </div>
                    </li>
                    <li className={styles.li_sidebar_website_dropdown}>
                        <div className={styles.chip}>
                            <p>Habitaciones</p>
                        </div>
                    </li>
                    <li className={styles.li_sidebar_website_dropdown}>
                        <div className={styles.chip}>
                            <p>Promociones</p>
                        </div>
                    </li>
                </ul>
            </ul>
        ) : null
    }

    function restaurant() {

        return verifyPropertiesOfUser(user) || user && user.department && user.department.name === 'Restaurante' || user?.typeUserId === 1 ? (
            <ul className={styles.ul_sidebar_restaurant}>
                <li ref={liSidebarRestaurantRef} className={router.asPath.indexOf(`/aG90ZWxlc19wbGF6YQ0K/admin/`) === 0 ? `${styles.li_sidebar_restaurant} ${styles.li_sidebar_restaurant_selected}` : styles.li_sidebar_restaurant} onClick={sidebarRestaurantDropDown}>
                    <svg className={styles.svg_sidebar_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z" />
                    </svg>
                    <p>Restaurante</p>
                    <svg className={!dropwdown.dropdown3 ? styles.svg_sidebar_icon : styles.svg_sidebar_icon_active} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                </li>
                <ul className={dropwdown.dropdown3 && !dropwdown.sidebar ? styles.ul_sidebar_restaurant_dropdown_active : styles.ul_sidebar_restaurant_dropdown} >
                    <li className={styles.li_sidebar_line_dropdown} />
                    <li className={styles.li_sidebar_restaurant_dropdown}>
                        <div className={styles.chip} onClick={() => router.push(endpoint + '/aG90ZWxlc19wbGF6YQ0K/admin/restaurant/rooms')}>
                            <p>Habitaciones</p>
                        </div>
                    </li>
                    <li className={styles.li_sidebar_restaurant_dropdown}>
                        <div className={styles.chip} onClick={() => router.push(endpoint + '/aG90ZWxlc19wbGF6YQ0K/admin/restaurant/rooms')}>
                            <p>Historial de habitaciones</p>
                        </div>
                    </li>
                    <li className={styles.li_sidebar_restaurant_dropdown}>
                        <div className={styles.chip}>
                            <p>Encuestas</p>
                        </div>
                    </li>
                    <li className={styles.li_sidebar_restaurant_dropdown}>
                        <div className={styles.chip}>
                            <p>Evaluación del personal</p>
                        </div>
                    </li>
                </ul>
            </ul>
        ) : null
    }

    function housekeeper() {

        return verifyPropertiesOfUser(user) || user && user.department && user.department.name === 'Mantenimiento' || user?.typeUserId === 1 ? (
            <ul className={styles.ul_sidebar_housekeeper}>
                <li ref={liSidebarHousekeeperRef} className={styles.li_sidebar_housekeeper} onClick={sidebarHousekeeperDropDown}>
                    <svg className={styles.svg_sidebar_icon} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22,19H16V15H13.32C12.18,17.42 9.72,19 7,19C3.14,19 0,15.86 0,12C0,8.14 3.14,5 7,5C9.72,5 12.17,6.58 13.32,9H24V15H22V19M18,17H20V13H22V11H11.94L11.71,10.33C11,8.34 9.11,7 7,7A5,5 0 0,0 2,12A5,5 0 0,0 7,17C9.11,17 11,15.66 11.71,13.67L11.94,13H18V17M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15M7,11A1,1 0 0,0 6,12A1,1 0 0,0 7,13A1,1 0 0,0 8,12A1,1 0 0,0 7,11Z" />
                    </svg>
                    <p>Ama de llaves</p>
                    <svg className={!dropwdown.dropdown4 ? styles.svg_sidebar_icon : styles.svg_sidebar_icon_active} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                </li>
                <ul className={dropwdown.dropdown4 && !dropwdown.sidebar ? styles.ul_sidebar_housekeeper_dropdown_active : styles.ul_sidebar_housekeeper_dropdown} >
                    <li className={styles.li_sidebar_line_dropdown} />
                    <li className={styles.li_sidebar_housekeeper_dropdown}>
                        <div className={styles.chip}>
                            <p>Ver reservaciones</p>
                        </div>
                    </li>
                </ul>
            </ul>
        ) : null
    }

    return (
        <div ref={sidebarRef} className={!dropwdown.sidebar ? styles.sidebar_active : styles.sidebar}>

            <UserAndSettings url="/api/admin/users/showCurrentUserData" admin={true} user={cookies.get('currentUser') ? cookies.get('currentUser') : ''} />

            <button className={styles.btn_sidebar_menu} onClick={showSidebar}>
                <svg className={styles.svg_sidebar_icon}>
                    <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                </svg>
            </button>

            <div className={styles.elements}>
                {
                    hotelTitleSelected ? (
                        <p ref={hotelTextRef} className={styles.hotel_title_selected}>{hotelTitleSelected}</p>
                    ) : (<p ref={hotelTextRef} className={styles.hotel_title_not_selected}>Seleccione un hotel</p>)
                }

                <ul ref={hotelElementsRef} className={styles.hotels_sidebar}>
                    {showHotels()}
                </ul>

                <ul className={styles.ul_sidebar_home}>
                    <Link href="/aG90ZWxlc19wbGF6YQ0K/admin">
                        <li className={router.pathname === '/aG90ZWxlc19wbGF6YQ0K/admin' ? `${styles.li_sidebar_home} ${styles.ul_sidebar_home_active}` : styles.li_sidebar_home}>
                            <svg className={styles.svg_sidebar_icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                            </svg>
                            <p>Home</p>
                        </li>
                    </Link>
                </ul>

                {system()}

                {website()}

                {restaurant()}

                {housekeeper()}
            </div>



        </div>
    )
}