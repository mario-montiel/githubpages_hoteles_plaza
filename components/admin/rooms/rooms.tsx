// React
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// CSS
import styles from '../../../styles/admin/system/rooms/Rooms.module.css'

// Components
import { toast } from 'react-toastify';
import DialogConfirm from '../dialogs/confirm/DialogConfirm';

// Helpers
import BookingDate from '../booking/BookingDate';
import { endpoint } from "../../../config/endpoint";
import { getDateFormat_Dnum_D_M_Y } from '../../../helpers/dateTransform';

// Types
import { Room } from '../../../types/Room';
import { RoomType } from '../../../types/RoomType';
import { CalendarDate } from '../../../types/CalendarDate';

export const RoomInfoSelected = (userData: any) => {
    return (
        <div className={styles.user_data_container}>
            <h5>Estado de la habitación</h5>
            <div className={styles.user_data}>
                <label htmlFor="">Empresa: </label>
                <input type="text" value="SERVICIO Y VENTA DE INSUMOS MEDICOS ESPECIALIZADOS S.A. DE C.V." />
            </div>
            <div className={styles.user_data}>
                <label htmlFor="">Huésped: </label>
                <input type="text" value="CALDERON  DIEGO (CALDERON  DIEGO)" />
            </div>
            <div className={styles.user_data}>
                <label htmlFor="">Hospedado desde: </label>
                <input type="text" value="14/JULIO /2021" />
            </div>
            <div className={styles.user_data}>
                <label htmlFor="">Días hospedados: </label>
                <input type="text" value="3" />
            </div>
            <div className={styles.user_data}>
                <label htmlFor="">Habitación: </label>
                <input type="text" value={2} />
            </div>
        </div>
    )
}

const Rooms = (props: any) => {

    // Variables
    const router = useRouter()
    const initialDialogValues = {
        show: false,
        image: '',
        alt: '',
        title: '',
        description: '',
        btnConfirm: '',
        btnCancel: '',
        onConfirm: () => { },
        onClose: () => { }
    }

    // Use State
    const [rooms, setRooms] = useState([])
    const [floors, setFloors] = useState<number>(0)
    const [roomId, setRoomId] = useState<number>(0)

    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showBookingDate, setShowBookingDate] = useState<boolean>(false)

    // Use Effect
    useEffect(() => {
        searchRoomsOfHotelSelected()
    }, [props])

    // Functions
    const showRoomName = (room: any) => {
        if (room.hotel.totalFloors === 1) {
            const roomName = (room.roomNumber < 10 ? '0' + room.roomNumber : room.roomNumber)
            return roomName
        }

        const roomName = (room.floor) + '' + (room.roomNumber < 10 ? '0' + room.roomNumber : room.roomNumber)
        return roomName
    }

    const searchRoomsOfHotelSelected = () => {
        if (props.user && props.user.hotels && props.user.hotels.length) {
            props.user.hotels.forEach((hotel: any) => {
                if (hotel.hotelId === props.user.preferencesId) {
                    setRooms(hotel.hotel.rooms)
                    setFloors(hotel.hotel.totalFloors)
                }
            });
        }
    }

    const generateFloors = () => {
        let html: any = []
        for (let index = 0; index < floors!; index++) {
            html.push(
                <div key={index + 500}>
                    <p className={styles.floor_title}>Piso {index + 1}</p>
                    {generateRooms(index + 1)}
                </div>
            )
        }
        return html
    }

    const generteRoomTypes = (actualStatusId: number, lastStatusId: number, roomFormIndex: number) => {
        let html: any = []
        props.roomsStatus.forEach((roomType: RoomType, index: number) => {
            html.push(
                roomType && parseInt(roomType.id!.toString()) == actualStatusId ? (
                    <li className={`${styles.actual_status} li-selected`} style={{ color: styles.actual_status }} key={index} value={roomType.id}>
                        <p>{roomType.name}</p>
                        <p>Actual</p>
                    </li>
                ) : (
                    <li className={`${styles.li_selected} li-selected`} key={index} onClick={() => addStyleLiSelected(roomFormIndex, index)} value={roomType.id}><p>{roomType.name}</p></li>
                ),
            )
        });

        return html
    }

    const openStylesRoomCard = (roomCardIndex: number) => {
        const roomCardDiv = document.querySelectorAll('.room-settings') as NodeListOf<HTMLElement>
        const cardRoomDiv = document.querySelectorAll('.room-card') as NodeListOf<HTMLElement>
        const overlay = document.querySelector('.room-overlay')

        overlay?.classList.add(styles.overlay_active)

        closeStylesRoomCard()

        if (!roomCardDiv[roomCardIndex].classList.contains(styles.room_settings_displayed)) {
            cardRoomDiv[roomCardIndex].classList.add(styles.room_card_selected)
            roomCardDiv[roomCardIndex].classList.add(styles.room_settings_displayed)
            roomCardDiv[roomCardIndex].focus()
        }
    }

    const closeStylesRoomCard = (roomCardIndex?: number) => {
        const index = roomCardIndex ? roomCardIndex : 0
        const roomCardDiv = document.querySelectorAll('.room-settings') as NodeListOf<HTMLElement>
        const cardRoomDiv = document.querySelectorAll('.room-card') as NodeListOf<HTMLElement>

        cardRoomDiv[index].classList.remove(styles.room_card_selected)
        roomCardDiv[index].classList.remove(styles.room_settings_displayed)

        closeOverlay()

        if (!roomCardIndex) {
            roomCardDiv.forEach((card, index) => {
                cardRoomDiv[index].classList.remove(styles.room_card_selected)
                card.classList.remove(styles.room_settings_displayed)
            });
        }
    }

    const addStyleLiSelected = (roomFormIndex: number, index: number) => {
        const roomFormUl = document.querySelectorAll('.room-settings form ul') as NodeListOf<HTMLElement>
        const lis: HTMLCollectionOf<HTMLElement> = roomFormUl[roomFormIndex].children as HTMLCollectionOf<HTMLElement>

        for (let index = 0; index < lis.length; index++) {
            const li = lis[index];
            li.classList.remove(styles.selected)
        }

        roomFormUl[roomFormIndex].children[index].classList.add(styles.selected)
    }

    const showDetailsOfRoom = (roomId: number) => {
        if (roomId) {
            router.push('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/' + roomId)
        }
    }

    const handleBookingDate = (isConfirm: boolean, initialDate: CalendarDate, endDate: CalendarDate, initialDateText: string, endDateText?: string, totalDays?: number, isBreakfast?: boolean) => {
        setShowBookingDate(false)
        closeStylesRoomCard()

        if (isConfirm) {
            closeOverlay()
            setShowDialogConfirm({
                ...showDialogConfirm,
                show: true,
                image: '/dialog/booking.svg',
                alt: 'Agregar reservación',
                title: '¿Desea agregar la reservación?',
                description: `El periodo de reservacion es del ${initialDateText} al ${endDateText}, siendo un total de ${totalDays} ${totalDays === 0 ? 'día' : 'días'}`,
                btnConfirm: 'Agregar',
                btnCancel: 'Cancelar',
                onConfirm: () => saveBooking(initialDate, endDate, isBreakfast ? isBreakfast : false),
                onClose: () => onCloseDialogs()
            })
        }
    }

    const roomSelectedToBooking = (id: number) => {
        setRoomId(id)
        setShowBookingDate(true)
    }

    const onCloseDialogs = () => {
        setShowBookingDate(false)
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
    }

    const saveBooking = async (initialDate: CalendarDate, endDate: CalendarDate, isBreakfast: boolean) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })

        const roomBooking = {
            roomId,
            initialDate: {
                day: initialDate.day,
                month: initialDate.month,
                year: initialDate.year
            },
            endDate: {
                day: endDate.day,
                month: endDate.month,
                year: endDate.year
            },
            roomStatus: props.roomsStatus,
            isBreakfast
        }

        await fetch(endpoint + '/api/admin/rooms/assignBooking/AssignBooking', {
            method: 'POST',
            body: JSON.stringify(roomBooking)
        }).then((resp) => {
            if (resp.ok) {
                toast('Habitación reservada con éxito!', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    type: 'success'
                })
                router.push(endpoint + '/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms')
            }
        }).catch((err) => { console.log(err); })
    }

    const closeRoomSettings = (index: number) => {
        const roomCardDiv = document.querySelectorAll('.room-settings') as NodeListOf<HTMLElement>
        const overlay = document.querySelector('.room-overlay')
        window.onclick = (e: any) => {
            if (e.target == overlay) {
                closeOverlay()
                roomCardDiv[index].classList.remove(styles.room_settings_displayed)
            }
        }
    }

    const closeOverlay = () => {
        const overlay = document.querySelector('.room-overlay')
        overlay?.classList.remove(styles.overlay_active)
    }

    const generateRooms = (floorNumber: number) => {
        let html: any = []
        {
            rooms.length ? (
                rooms.map((room: any, index: number) => {
                    room.floor === floorNumber ? (
                        html.push(
                            <div className={styles.container_room_cards} key={index + room.floor}>
                                <div
                                    className={`${styles.room_card} room-card`}
                                    style={{
                                        border: room.roomStatus.border ? '0.05px solid #CBCBCB' : 'none',
                                        backgroundColor: room.roomStatus.backgroundColor
                                    }}
                                    key={index}
                                    onClick={() => openStylesRoomCard(index)}
                                >
                                    <div className={styles.room_last_status_card} style={{ backgroundColor: room.lastRoomStatus.backgroundColor }} key={index} />

                                    <div className={styles.room_text_container}>
                                        <p style={{ color: room.roomStatus.textColor }}>{showRoomName(room)}</p>
                                        <p style={{ color: room.roomStatus.textColor }}>{room.roomType.keyWord}</p>
                                    </div>
                                </div>
                                <div
                                    className={`${styles.room_settings} room-settings`}
                                    tabIndex={0}
                                    onBlur={() => closeRoomSettings(index)}
                                >
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <button className={styles.btn_close} type="button" onClick={() => closeStylesRoomCard(index)}>
                                            <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                            </svg>
                                        </button>
                                        <h5>Cambiar estatus</h5>
                                        <ul>
                                            {generteRoomTypes(room.roomStatusId, room.lastRoomStatusId, index)}
                                        </ul>
                                        <button className={styles.btn_details} onClick={() => roomSelectedToBooking(room.id)}>
                                            Agregar reservación
                                        </button>
                                        <button className={styles.btn_details} onClick={() => showDetailsOfRoom(room.id)}>
                                            Ver detalles
                                        </button>
                                        <button className={styles.btn_submit} type="button" onClick={() => changeRoomStatus(room, index)}>
                                            Cambiar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )
                    ) : null
                })
            ) : null
        }
        return html
    }

    const changeRoomStatus = async (room: Room, index: number) => {
        let roomTypeId: number = 0
        let lastRoomTypeId: number = 0
        const roomCardDiv = document.querySelectorAll('.room-settings') as NodeListOf<HTMLElement>
        const lis = roomCardDiv[index].children[0].children[2].children as HTMLCollectionOf<HTMLElement>

        for (let index = 0; index < lis.length; index++) {
            const li = lis[index] as HTMLLIElement;
            if (li.classList.contains(styles.selected)) {
                roomTypeId = li.value
            }

            if (li.classList.contains(styles.actual_status)) {
                lastRoomTypeId = li.value
            }
        }

        if (roomTypeId === 0) {
            return toast('Seleccione un estatus para poder continuar!', {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                type: 'warning'
            })
        }

        const data = {
            id: room.id,
            roomTypeId,
            lastRoomTypeId
        };

        // Para poder editar la habitación debe ingresar su contraseña
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/dialog/room.svg',
            alt: 'Editar habitación',
            description: `¿Desea cambiar el estatus de habitación de la habitación ${(room.floor)}${room.roomNumber < 10 ? '0' + room.roomNumber : room.roomNumber}? Si la habitación tiene reservación esta será borrada.`,
            btnConfirm: 'Editar',
            btnCancel: 'Cancelar',
            onConfirm: () => editRoom(data),
            onClose: () => closeDialogs(index)
        })
    }

    const addStylesAfterSendRequest = (valueOfAllItems: number, roomCardIndex?: number, valueOfRoomCard?: number) => {
        const roomCardDiv = document.querySelectorAll('.room-settings') as NodeListOf<HTMLElement>

        roomCardDiv.forEach(roomCard => {
            roomCard.style.zIndex = valueOfAllItems === 0 ? '0' : '1'
            roomCard.style.opacity = valueOfAllItems === 0 ? '0' : '1'
        });

        if (roomCardIndex && valueOfRoomCard) {
            roomCardDiv[roomCardIndex].style.zIndex = valueOfRoomCard.toString()
        }
    }

    const closeDialogs = (roomCardDivIndex: number) => {
        addStylesAfterSendRequest(1, roomCardDivIndex, 1)
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
    }

    const editRoom = async (data: any) => {
        const roomData = {
            roomData: data,
            type: 'status'
        }
        await fetch('/api/admin/rooms/editRooms', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(roomData),
        }).then(() => {
            addStylesAfterSendRequest(1)
            setShowDialogConfirm({ ...showDialogConfirm, show: false })

            toast('Estatus de la habitación actualizado con éxito!', {
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
                type: 'success'
            })

            router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms')
        })
    }

    return (
        <div className={styles.rooms_home_admin}>

            {
                showBookingDate ? (
                    <BookingDate
                        handleBookingDate={(
                            isShow: boolean,
                            initialDate: CalendarDate,
                            endDate: CalendarDate,
                            initialDateText: string,
                            endDateText: string,
                            totalDays: number,
                            isBreakFast: boolean
                        ) => handleBookingDate(isShow, initialDate, endDate, initialDateText, endDateText, totalDays, isBreakFast)}
                    // isBookingDate = {(isShow: boolean) => handleBookingDate(isShow)}
                    />
                ) : null
            }

            {showDialogConfirm.show ? (
                <DialogConfirm
                    image={showDialogConfirm.image}
                    alt={showDialogConfirm.alt}
                    title={showDialogConfirm.title}
                    description={showDialogConfirm.description}
                    btnConfirm={showDialogConfirm.btnConfirm}
                    btnCancel={showDialogConfirm.btnCancel}
                    onConfirm={showDialogConfirm.onConfirm}
                    onClose={showDialogConfirm.onClose}
                />
            ) : null}

            <div className={styles.rooms_container}>
                <div className={styles.text_container}>
                    <p className={styles.rooms_title}>Habitaciones</p>
                    <p className={styles.date}>{getDateFormat_Dnum_D_M_Y()}</p>
                </div>
                <div className={styles.room_card_container}>
                    {
                        floors > 0 ? (
                            generateFloors()
                        ) : null
                    }
                </div>
            </div>
            {
                props.user && !props.user.preferencesId ? (
                    <div className={styles.text_info}>
                        <svg className={styles.svg_icon_arrow} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" />
                        </svg>
                        <p>Debe seleccionar un hotel para poder ver las habitaciones. Vaya a su menú (sidebar) para poder seleccionar un hotel</p>
                    </div>
                ) : (null)
            }
        </div>
    )
}

export default Rooms