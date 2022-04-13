// React
import Router from 'next/router'
import { NextPageContext } from 'next'

// Styles
import styles from './../../../../../styles/admin/restaurant/RoomsHasBreakfast.module.css'

// Components
import { Room } from '../../../../../types/Room'
import { endpoint } from '../../../../../api/url'
import { useEffect, useRef, useState } from 'react'
import Layout from "../../../../../components/Layout"

// Helpers
import { unauthorized } from "../../../../../helpers/notification401";
import ModalBeakfast from '../../../../../components/admin/modal/restaurant/breakfast/breakfast'
import ModalBeakfastRecord from '../../../../../components/admin/modal/restaurant/record/record'

RoomsHasBreakfast.getInitialProps = async (ctx: NextPageContext) => {
    let roomsStatusJson: any = []
    let userJson: any = []

    roomsStatusJson = await getFetchData(endpoint + '/api/admin/rooms/roomsStatus/showRoomsStatus', ctx)
    userJson = await getFetchData(endpoint + '/api/admin/users/showRooms', ctx)

    return {
        roomsStatus: roomsStatusJson,
        user: userJson,
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

export default function RoomsHasBreakfast(props: any) {

    // Variables
    const initialRoomModalValues = {
        isShow: false,
        room: {} as Room
    }
    const initialRecordModalValues = {
        isShow: false,
        room: {} as Room
    }

    // Use State
    const [roomText, setRoomText] = useState<any>()
    const [rooms, setRooms] = useState<any>([])
    const [roomModal, setRoomModal] = useState(initialRoomModalValues)
    const [recordModal, setRecordModal] = useState(initialRecordModalValues)

    // Use Ref
    const overlayRef = useRef<HTMLDivElement>(null)
    const modalOverlayRef = useRef<HTMLDivElement>(null)
    const modalRecordOverlayRef = useRef<HTMLDivElement>(null)

    // Functions
    const handleRoomCard = (roomIndex: number) => {
        const settings = document.querySelectorAll('.settings') as NodeListOf<HTMLUListElement>
        overlayRef.current?.classList.add(styles.show_overlay)
        settings[roomIndex].classList.add(styles.show_settings)
        settings[roomIndex].focus()
    }

    const handleBreakfrastRoom = async (room: Room, roomIndex: number) => {
        const settings = await document.querySelectorAll('.settings') as NodeListOf<HTMLUListElement>
        settings[roomIndex].classList.remove(styles.show_settings)
        overlayRef.current?.classList.remove(styles.show_overlay)
        modalOverlayRef.current?.classList.add(styles.show_room_modal)
        // modalOverlayRef.current!.style.background = 'rgba(0, 0, 0, 0.2)'

        setRoomModal({ ...roomModal, isShow: true, room })
    }

    const handleRecordRoom = async (roomIndex: number) => {
        const settings = await document.querySelectorAll('.settings') as NodeListOf<HTMLUListElement>
        settings[roomIndex].classList.remove(styles.show_settings)
        modalRecordOverlayRef.current?.classList.add(styles.show_room_modal)

        setRecordModal({ ...recordModal, isShow: true })
    }

    const hiddenRoomCardSettings = async (roomIndex: number) => {
        window.onclick = (e: any) => {
            if (e.target === overlayRef.current) {
                const settings = document.querySelectorAll('.settings') as NodeListOf<HTMLUListElement>
                settings[roomIndex].classList.remove(styles.show_settings)
                overlayRef.current?.classList.remove(styles.show_overlay)
            }
        }
    }

    const hiddenRoomBreakfast = () => {
        window.onclick = (e: any) => {
            if (e.target == modalOverlayRef.current) {
                setRoomModal({ ...roomModal, isShow: false })
                modalOverlayRef.current?.classList.remove(styles.show_room_modal)
            }
        }
    }

    const hiddenBreakfastRecord = () => {
        console.log(modalRecordOverlayRef);

        window.onclick = (e: any) => {
            if (e.target == modalRecordOverlayRef.current) {
                setRecordModal({ ...recordModal, isShow: false })
                modalRecordOverlayRef.current?.classList.remove(styles.show_room_modal)
            }
        }
    }

    const generateRoomCards = () => {
        const roomsLength: number = props.user.preferences.rooms.length;

        setRooms([])

        for (let roomIndex = 0; roomIndex < roomsLength; roomIndex++) {
            const room = props.user.preferences.rooms[roomIndex];

            setRooms((oldValue: any) => [...oldValue,
            <div
                className={room.roomStatus.border ? `${styles.room_card} ${styles.room_card_border}` : styles.room_card}
                onClick={() => handleRoomCard(roomIndex)}
                key={roomIndex}
                tabIndex={0}
                onBlur={() => hiddenRoomCardSettings(roomIndex)}
            >
                <div className={styles.room_text_container}>
                    <p>
                        {room.floor}
                        {room.roomNumber < 10 ? '0' : null}
                        {room.roomNumber}</p>
                    <p> {room.roomType.keyWord} </p>
                </div>

                <div className={`${styles.settings} settings`}>
                    <ul>
                        <li onClick={() => handleRecordRoom(roomIndex)}>
                            <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3" />
                            </svg>
                            <p>Hitorial</p>
                        </li>
                        <li onClick={() => handleBreakfrastRoom(room, roomIndex)}>
                            <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" />
                            </svg>
                            <p>Agregar</p>
                        </li>
                    </ul>
                </div>
            </div>
            ])
        }
    }

    useEffect(() => {
        if (props.user && props.user.length && props.user.preferences.rooms.length) {
            generateRoomCards()
        }
    }, [props.user])

    useEffect(() => {
        setRoomText(rooms.length ?
            <h5
                className={styles.data_in_subtitle}
            >
                Total de Habitaciones con desayuno <b>{
                    rooms.length ? rooms.length
                        : 'No hay ninguna habitación con desayuno'
                }</b>
            </h5>
            : 'Cargando...')

    }, [rooms])

    return (
        <Layout
            title="Restaurante - Habitaciones"
            description="Restaurante de los hoteles plaza"
        >
            <h2 className={styles.title}>Usuarios</h2>

            <div ref={overlayRef} className={styles.overlay} />
            <div ref={modalOverlayRef} className={styles.modal_overlay} />
            <div ref={modalRecordOverlayRef} className={styles.modal_overlay} />

            <ModalBeakfast
                isShow={roomModal.isShow}
                room={roomModal.room}
                close={hiddenRoomBreakfast}
                hotel={roomModal.room.hotelId}
            />

            <ModalBeakfastRecord
                isShow={recordModal.isShow}
                close={hiddenBreakfastRecord}
                hotel={roomModal.room.hotelId}
            />

            <section>
                {roomText}

                <div className={styles.room_cards_container}>
                    {rooms}
                </div>
            </section>
        </Layout>
    )
}