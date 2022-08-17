// Next and React

// CSS
import { RoomType } from '@prisma/client'
import { TypeOptions } from 'react-toastify'
import { getMxDate } from '../../../helpers/dateTransform'
import styles from '../../../styles/admin/system/rooms/Rooms.module.css'
import { Room } from '../../../types/Room'
import { RoomStatus } from '../../../types/RoomStatus'

// Libraries

// Components

// Helpers

// Types

type RoomFloor = {
    floors: number,
    rooms: Room[],
    roomStatus: RoomStatus[],
    showMessage: (
        text: string,
        duration: number,
        type: TypeOptions
    ) => void,
    handleDialogWarning: (
        isShow: boolean,
        room?: Room,
        data?: any,
        index?: number,
        title?: string,
        description?: string
    ) => void,
    handleDialogConfirm: (
        room: Room,
        index: number,
        data?: any
    ) => void,
    setShowDialogWarning: (data: Dialog) => void,
    setShowDialogConfirm: (data: Dialog) => void,
    setRoom: (room: Room) => void,
    setShowBookingDate: (isValidate: boolean) => void,
    redirectTo: (url: string, query?: any) => void
}

type Dialog = {
    show?: boolean,
    title?: string,
    description?: string,
    btnConfirm?: string,
    btnCancel?: string,
    onConfirm?: () => void,
    onClose?: () => void
}

export default function RoomsFloors({ floors, rooms, roomStatus, setRoom, handleDialogConfirm, handleDialogWarning, setShowDialogWarning, setShowDialogConfirm, showMessage, setShowBookingDate, redirectTo }: RoomFloor) {
    console.log('roomsStatus: ', roomStatus);
    
    // Variables

    // Use Ref

    // Use State

    // Functions
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
                                    onMouseEnter={() => showRoomInfo(index)}
                                    onMouseLeave={() => hiddenRoomInfo(index)}
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
                                            {generteRoomTypes(room.id, room.roomStatusId, index)}
                                        </ul>
                                        <button className={styles.btn_details} onClick={() => roomSelectedToBooking(room, index)}>
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

                                <div className={`${styles.card_info} room-card-info`} >
                                    <h5>Reservación</h5>
                                    {changeDateFormat(room)}
                                </div>
                            </div>
                        )
                    ) : null
                })
            ) : null
        }
        return html
    }

    const changeDateFormat = (room: any) => {
        return (
            room.RoomBookings.length ? (
                <>
                    <p><b>Check In:</b> {room.RoomBookings.length ? getMxDate(room.RoomBookings[0].checkIn).dateTime : 'No tiene reservación'}</p>
                    <p><b>Check On:</b> {room.RoomBookings.length ? getMxDate(room.RoomBookings[0].checkOut).dateTime : 'No tiene reservación'}</p>
                    <p><b>Huesped:</b> {room.RoomBookings.length ? room.RoomBookings[0].guest.fullName + ' ' + room.RoomBookings[0].guest.lastName : 'No tiene reservación'}</p>
                    <p><b>Desayuno</b>: {room.RoomBookings.length ? (room.RoomBookings[0].isBreakfast ? 'Si' : 'No') : 'No tiene reservación'}</p>
                </>
            ) : <p>No tiene reservación</p>

        )
    }

    const changeRoomStatus = async (room: Room, index: number) => {
        let roomStatusId: number = 0
        let lastRoomStatusId: number = 0
        const roomCardDiv = document.querySelectorAll('.room-settings') as NodeListOf<HTMLElement>
        const lis = roomCardDiv[index].children[0].children[2].children as HTMLCollectionOf<HTMLElement>

        for (let index = 0; index < lis.length; index++) {
            const li = lis[index] as HTMLLIElement;
            if (li.classList.contains(styles.selected)) {
                roomStatusId = li.value
            }

            if (li.classList.contains(styles.actual_status)) {
                lastRoomStatusId = li.value
            }
        }

        if (roomStatusId === 0) {
            return showMessage('Seleccione un estatus para poder continuar!', 4000, 'warning')
        }

        const data = {
            id: room.id,
            roomStatusId,
            lastRoomStatusId
        };

        addStylesAfterSendRequest(0, index, 0)

        if (room && room.RoomBookings.length && roomStatusId === 3 && room.isBooking) {
            return handleDialogWarning(
                true,
                room,
                data,
                index,
                '¡Advertencia!',
                `Esta habitación tiene una reservación para el ${room.RoomBookings[0].checkIn}, al cambiar el estado de la habitación esta se borrará.`
            )
        }

        if (lastRoomStatusId === 3) {
            return handleDialogWarning(
                true,
                room,
                data,
                index,
                '¡Advertencia!',
                'Esta habitación tiene una reservación activa, al cambiar el estado de la habitación esta se borrará.'
            )
        }

        handleDialogConfirm(room, index, data)
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

    const roomSelectedToBooking = (room: Room, index: number) => {
        setRoom(room)
        addStylesAfterSendRequest(0, index, 0)

        if (room && room.isBooking && room.RoomBookings.length) {
            return setShowDialogWarning({
                show: true,
                title: '¡Advertencia!',
                description: `Esta habitación tiene una reservación para el ${getMxDate(room.RoomBookings[0].checkIn).date}, al cambiar el estado de la habitación la reservación se borrará.`,
                btnConfirm: 'Cambiar',
                btnCancel: 'Cancelar',
                onConfirm: () => {
                    setShowDialogWarning({ show: false }); setShowBookingDate(true) /* handleDialogConfirm(room, index) */
                },

                onClose: () => { closeDialogs(index); setShowDialogWarning({ show: false }) }
            })
        }
        setShowBookingDate(true)
    }

    const showDetailsOfRoom = (roomId: number) => {
        if (roomId) { redirectTo('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/' + roomId) }
    }

    const closeDialogs = (roomCardDivIndex: number) => {
        addStylesAfterSendRequest(1, roomCardDivIndex, 1)
        setShowDialogConfirm({ show: false })
    }

    const generteRoomTypes = (roomId: number, actualStatusId: number, roomFormIndex: number) => {
        let html: any = []
        roomStatus.forEach((roomType: RoomStatus, index: number) => {
            html.push(
                roomType && parseInt(roomType.id!.toString()) == actualStatusId ? (
                    <li className={`${styles.actual_status} li-selected`} style={{ color: styles.actual_status }} key={index} value={roomType.id}>
                        <p>{roomType.name}</p>
                        <p>Actual</p>
                    </li>
                ) : (
                    <li className={`${styles.li_selected} li-selected`} key={index} onClick={() => addStyleLiSelected(roomId, roomFormIndex, index)} value={roomType.id}><p>{roomType.name}</p></li>
                ),
            )
        });

        return html
    }

    const addStyleLiSelected = (roomId: number, roomFormIndex: number, index: number) => {
        const roomFormUl = document.querySelectorAll('.room-settings form ul') as NodeListOf<HTMLElement>
        const lis: HTMLCollectionOf<HTMLElement> = roomFormUl[roomFormIndex].children as HTMLCollectionOf<HTMLElement>

        for (let i = 0; i < lis.length; i++) {
            const li = lis[i];
            li.classList.remove(styles.selected)
        }

        roomFormUl[roomFormIndex].children[index].classList.add(styles.selected)
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

    const closeOverlay = () => {
        const overlay = document.querySelector('.room-overlay')
        overlay?.classList.remove(styles.overlay_active)
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

    const showRoomInfo = (index: number) => {
        const roomCardsInfo = document.querySelectorAll('.room-card-info')
        roomCardsInfo[index].classList.add(styles.card_info_show)
    }

    const hiddenRoomInfo = (index: number) => {
        const roomCardsInfo = document.querySelectorAll('.room-card-info')
        roomCardsInfo[index].classList.remove(styles.card_info_show)
    }

    const showRoomName = (room: any) => {
        if (room.hotel.totalFloors === 1) {
            const roomName = (room.roomNumber < 10 ? '0' + room.roomNumber : room.roomNumber)
            return roomName
        }

        const roomName = (room.floor) + '' + (room.roomNumber < 10 ? '0' + room.roomNumber : room.roomNumber)
        return roomName
    }

    // Use Effect

    return (
        <div>
            {generateFloors()}
        </div>
    )
}