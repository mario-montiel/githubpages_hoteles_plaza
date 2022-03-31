// React
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'

// CSS
import styles from '../../../styles/RoomQuery.module.css'

// Types
import { RoomType } from '../../../types/RoomType'
import { Room } from '../../../types/Room';
import RoomDetails from '../../mainPage/rooms/details/RoomDetails';

// Helpers

// Components

const RoomQuery = (props: any) => {

    // Variables
    const initialRoomDetailsValue = {
        isShow: false,
        roomType: {}
    }

    // Use State
    const [showAllRooms, setShowAllRooms] = useState(true)
    const [query, setQuery] = useState([])
    const [isQuery, setIsQuery] = useState<boolean>(false)
    const [queryRooms, setQueryRooms] = useState<number>(0)
    const [showRoomDetails, setShowRoomDetails] = useState(initialRoomDetailsValue)

    // Functions
    const showQueryBooking = () => {
        let i = 0
        let showRooms: any = []
        let rooms: any = []
        let roomsCount: number = 0

        props.roomsType.map((roomType: RoomType, index: number) => {
            const roomTypeName = roomType.name

            i = 0
            rooms = []

            showRooms.push({
                roomTypeName,
                roomType,
                rooms: [],
                show: false
            })

            props.query && props.query.length ? (
                props.query.map((query: Room) => {
                    if (parseInt(roomType.id!.toString()) == query.roomTypeId) {
                        rooms.push(query)
                        i++
                        roomsCount++
                    }
                })
            ) : null

            showRooms[index].rooms = rooms

            if (rooms.length) {
                showRooms[index].show = true
            }
        })

        if (!query.length) {
            setQueryRooms(roomsCount)
            setQuery(showRooms)
            console.log(showRooms);
            
            setIsQuery(true)
        }
        else { return; }
    }

    const countRooms = (roomTypeId: number, roomTypeIndex: number, hotels: any) => {
        let i = 0
        let roomTypeCount: any = {}

        hotels.rooms.map((room: any, index: number) => {
            if (roomTypeId == room.roomTypeId && !room.booking) {
                i++
                roomTypeCount[`roomtype${roomTypeIndex}`] = i
            }
        })

        if (!roomTypeCount[`roomtype${roomTypeIndex}`]) {
            roomTypeCount[`roomtype${roomTypeIndex}`] = 0
        }

        return (
            <p>{roomTypeCount[`roomtype${roomTypeIndex}`] === 0 ? 'No hay habitaciones disponibles' : roomTypeCount[`roomtype${roomTypeIndex}`]}</p>
        )
    }

    const generateIconsPerPerson = (maxPeople: number) => {
        let html: any = []
        for (let index = 0; index < maxPeople; index++) {
            html.push(
                <svg id="max-people" className={styles.svg_icon} viewBox="0 0 24 24" key={index}>
                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
            )
        }

        return html
    }

    const generateImages = (index: number) => {
        return (
            <Image src={`/rooms/catedral_${index + 1}.jpeg`} width={1000} height={300} layout='responsive' objectFit='cover' />
        )
    }

    const showRooms = () => {
        setShowAllRooms(true)
        setQuery([])
        setIsQuery(false)
        showRoomsContainer()
    }

    const showRoomsContainer = () => {
        const rooms = document.querySelector('.rooms-container')

        if (rooms) {
            setTimeout(() => {
                rooms.scrollIntoView({ block: "start", behavior: "smooth" });
            }, 300);
        }
    }

    const showComponentRoomDetails = (roomType: RoomType) => {
        setShowRoomDetails({ ...showRoomDetails, isShow: true, roomType })
    }

    const handleRoomDetails = (isShow: boolean) => {
        setShowRoomDetails({ ...showRoomDetails, isShow })
    }

    // Use Effect
    useEffect(() => {
        console.log(props);
        
        if (props.query && props.query.length) {
            setQuery(props.query)
            setIsQuery(true)
            setShowAllRooms(false)
            showRoomsContainer()
        }
    }, [props.query])

    return (
        <section className={styles.roomquery_section}>
            {
                showRoomDetails.isShow ? (
                    <RoomDetails
                        roomDetails={showRoomDetails.roomType}
                        handleRoomDetails={(isShow: boolean) => handleRoomDetails(isShow)}
                    />
                ) : null
            }
            {
                query.length && isQuery ? (
                    <div className={styles.card_result_text}>
                        <svg className={styles.svg_icon} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 3V21H13V17.5H11V21H5V3H19M15 7H17V5H15V7M11 7H13V5H11V7M7 7H9V5H7V7M15 11H17V9H15V11M11 11H13V9H11V11M7 11H9V9H7V11M15 15H17V13H15V15M11 15H13V13H11V15M7 15H9V13H7V15M15 19H17V17H15V19M7 19H9V17H7V19M21 1H3V23H21V1Z" />
                        </svg>
                        <p>Se encontraron <strong>{queryRooms}</strong> habitaciones</p>
                    </div>
                ) : null
            }

            {
                isQuery && !query.length ? (
                    <div className={styles.card_result_text}>
                        <svg className={styles.svg_icon} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 3V21H13V17.5H11V21H5V3H19M15 7H17V5H15V7M11 7H13V5H11V7M7 7H9V5H7V7M15 11H17V9H15V11M11 11H13V9H11V11M7 11H9V9H7V11M15 15H17V13H15V15M11 15H13V13H11V15M7 15H9V13H7V15M15 19H17V17H15V19M7 19H9V17H7V19M21 1H3V23H21V1Z" />
                        </svg>
                        <p>Lo sentimos, no fue posible encontrar habitaciones disponibles en esta fecha, por favor seleccione otra fecha.</p>
                    </div>
                ) : null
            }
            <div className={`${styles.rooms_container} rooms-container`}>
                {
                    props.roomsType.length && showAllRooms ? (
                        props.roomsType.map((roomType: RoomType, index: number) =>
                            <div className={styles.room_card} key={index}>
                                <p className={styles.roomtype_name}>
                                    {roomType.name}
                                </p>
                                <div className={styles.image_container}>
                                    {
                                        generateImages(index)
                                    }
                                </div>
                                <p className={styles.roomtype_title}>
                                    {roomType.title} (con o sin desayuno incluido)
                                    <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M2,6L9,13H2V16H12L19,23L20.25,21.75L3.25,4.75L2,6M20.5,13H22V16H20.5V13M18,13H19.5V16H18V13M18.85,4.88C19.47,4.27 19.85,3.43 19.85,2.5H18.35C18.35,3.5 17.5,4.35 16.5,4.35V5.85C18.74,5.85 20.5,7.68 20.5,9.92V12H22V9.92C22,7.69 20.72,5.77 18.85,4.88M14.5,8.7H16.03C17.08,8.7 18,9.44 18,10.75V12H19.5V10.41C19.5,8.61 17.9,7.25 16.03,7.25H14.5C13.5,7.25 12.65,6.27 12.65,5.25C12.65,4.23 13.5,3.5 14.5,3.5V2A3.35,3.35 0 0,0 11.15,5.35A3.35,3.35 0 0,0 14.5,8.7M17,15.93V13H14.07L17,15.93Z" />
                                    </svg>
                                </p>
                                <div className={styles.room_container_grid}>
                                    <div className={styles.roomtype_text_container}>
                                        <p className={styles.roomtype_description}>{roomType.description}</p>
                                        <div className={styles.rooms_available_container}>
                                            <p>Habitaciones disponibles: </p>
                                            {countRooms(parseInt(roomType.id!.toString()), index, props.hotelSelected)}
                                        </div>
                                        <div className={styles.maxpersons_container}>
                                            <label htmlFor="">Capacidad</label>
                                            {
                                                generateIconsPerPerson(roomType.maxPeople)
                                            }
                                        </div>
                                        {/* <p>Más noches - Paga menos (solo alojamiento</p> */}
                                        <small onClick={() => showComponentRoomDetails(roomType)}>Ver más detalles...</small>
                                    </div>
                                    <div className={styles.roomtype_cost_container}>
                                        <p className={styles.roomtype_usd}>Desde $51.00 USD</p>
                                        <p className={styles.roomtype_mxm}>${roomType.costPerNight} MXM</p>
                                        <small className={styles.small}>Costo aproximado</small>
                                    </div>
                                </div>

                            </div>
                        )
                    ) : (showQueryBooking())
                }

                {
                    query.length && !showAllRooms ? (
                        query.map((data: any, index: number) =>
                            data.show ? (
                                <div className={styles.room_card} key={index}>
                                    <p className={styles.roomtype_name}>{data.roomType.name}</p>
                                    <div className={styles.image_container}>
                                        {
                                            generateImages(index)
                                        }
                                        {console.log(query)}
                                    </div>
                                    <p className={styles.roomtype_title}>{data.name} (con o sin desayuno incluido)</p>
                                    <div className={styles.room_container_grid}>
                                        <div className={styles.roomtype_text_container}>
                                            <p className={styles.roomtype_description}>{data.description}</p>
                                            <div className={styles.rooms_available_container}>
                                                <p>Habitaciones disponibles: </p>
                                                <p>{data.rooms.length}</p>
                                            </div>
                                            <div className={styles.maxpersons_container}>
                                                <label htmlFor="">Capacidad</label>
                                                {
                                                    generateIconsPerPerson(data.roomType.maxPeople)
                                                }
                                            </div>
                                            {/* <p>Más noches - Paga menos (solo alojamiento</p> */}
                                            <small onClick={() => showComponentRoomDetails(data.roomType)}>Ver más detalles...</small>
                                        </div>
                                        <div className={styles.roomtype_cost_container}>
                                            <p className={styles.roomtype_usd}>Desde $51.00 USD</p>
                                            <p className={styles.roomtype_mxm}>${data.roomType.costPerNight} MXM</p>
                                            <small className={styles.small}>Costo aproximado</small>
                                        </div>
                                    </div>

                                </div>
                            ) : null
                        )
                    ) : null
                }

                {
                    !showAllRooms ? (
                        <button className={styles.btn_show_rooms} onClick={showRooms}>Ver todo</button>
                    ) : null
                }
            </div>
        </section >
    )
}

export default RoomQuery