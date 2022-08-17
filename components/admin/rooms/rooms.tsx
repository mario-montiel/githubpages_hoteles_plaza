// React
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

// CSS
import styles from '../../../styles/admin/system/rooms/Rooms.module.css'

// Components
import { toast, TypeOptions } from 'react-toastify';
import DialogConfirm from '../dialogs/confirm/DialogConfirm';
import DialogWarning from '../dialogs/warning/DialogWarning';

// Helpers
import BookingDate from '../booking/BookingDate';
import { endpoint } from "../../../config/endpoint";
import { getDateFormat_Dnum_D_M_Y, getMxDate } from '../../../helpers/dateTransform';

// Types
import { Room } from '../../../types/Room';
import { RoomType } from '../../../types/RoomType';
import BtnActions from '../buttons/actions/BtnActions';
import RoomsFloors from './rooms_floor';

export const RoomInfoSelected = () => {
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

const Rooms = ({ guests, user, roomsStatus }: any) => {
    console.log('xxxxfasdf: ', roomsStatus);
    
    // Variables
    const router = useRouter()
    const initialDialogValues = {
        show: false,
        image: '',
        alt: '',
        title: '',
        description: '',
        isBooking: false,
        btnConfirm: '',
        btnCancel: '',
        onConfirm: (reasonToBooking?: string) => { },
        onClose: () => { }
    }
    const initialWarningDialogValues = {
        show: false,
        title: '',
        description: '',
        btnConfirm: '',
        btnCancel: '',
        onConfirm: () => { },
        onClose: () => { }
    }

    // Use Ref
    const roomCardContainerRef = useRef<HTMLDivElement>(null)

    // Use State
    const [room, setRoom] = useState<Room>()
    const [rooms, setRooms] = useState([])
    // const [roomData, setRoomData] = useState<any>()
    const [floors, setFloors] = useState<number>(0)
    // const [roomId, setRoomId] = useState<number>(0)

    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showDialogWarning, setShowDialogWarning] = useState(initialWarningDialogValues)
    const [showBookingDate, setShowBookingDate] = useState<boolean>(false)

    // Use Effect
    useEffect(() => { searchRoomsOfHotelSelected() }, [])

    // Functions
    const showMessage = (text: string, duration: number, type: TypeOptions) => {
        toast(text, {
            position: "top-right",
            autoClose: duration,
            closeOnClick: true,
            type: type
        })
    }

    const showBookingDateData = (isValidate: boolean) => {
        setShowBookingDate(isValidate)
    }

    const redirectTo = (url: string, query?: any) => {
        router.push(url)
    }

    const searchRoomsOfHotelSelected = () => {
        if (user && user.hotels && user.hotels.length) {
            user.hotels.forEach((hotel: any) => {
                if (hotel.hotelId === user.preferencesId) {
                    setRooms(hotel.hotel.rooms)
                    setFloors(hotel.hotel.totalFloors)
                }
            });
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

    const addStyleLiSelected = (roomId: number, roomFormIndex: number, index: number) => {
        const roomFormUl = document.querySelectorAll('.room-settings form ul') as NodeListOf<HTMLElement>
        const lis: HTMLCollectionOf<HTMLElement> = roomFormUl[roomFormIndex].children as HTMLCollectionOf<HTMLElement>

        for (let i = 0; i < lis.length; i++) {
            const li = lis[i];
            li.classList.remove(styles.selected)
        }

        roomFormUl[roomFormIndex].children[index].classList.add(styles.selected)
    }

    const handleBookingDate = (bookingData: any) => {
        setShowBookingDate(false)
        closeStylesRoomCard()
        closeOverlay()
        addStylesAfterSendRequest(1)

        if (bookingData) {
            setShowDialogConfirm({
                ...showDialogConfirm,
                show: true,
                image: '/hotels/dialog/booking.svg',
                alt: 'Agregar reservación',
                title: '¿Desea agregar la reservación?',
                description: `El periodo de reservacion es del ${bookingData.step1Booking.initialDate} al ${bookingData.step1Booking.endDate}, siendo un total de ${bookingData.step1Booking.totalDays} ${bookingData.step1Booking.totalDays === 0 ? 'día' : 'días'}`,
                isBooking: true,
                btnConfirm: 'Agregar',
                btnCancel: 'Cancelar',
                onConfirm: (reasonToBooking?: string) => (
                    saveBooking(
                        bookingData,
                        reasonToBooking ? reasonToBooking : ''
                    )
                ),
                onClose: () => onCloseDialogs()
            })
        }

    }

    const onCloseDialogs = () => {
        setShowBookingDate(false)
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
    }

    const saveBooking = async (bookingData: any, reasonToBooking: string) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })

        const getResponse = await fetch(endpoint + '/api/admin/rooms/assignBooking/AssignBooking', {
            method: 'POST',
            body: JSON.stringify({ bookingData, reasonToBooking })
        })
        const response = await getResponse.json()

        if (!response.res) {
            return showMessage('No se pudo realizar la reservación!', 4000, 'error')
        }

        router.reload()
        setTimeout(() => { showMessage(response.message, 4000, 'success') }, 300);
    }

    const closeOverlay = () => {
        const overlay = document.querySelector('.room-overlay')
        overlay?.classList.remove(styles.overlay_active)
    }

    const handleDialogWarning = (isShow: boolean, room?: Room, data?: any, index?: number, title?: string, description?: string) => {
        {
            isShow && room && data && index && title && description ? (
                setShowDialogWarning({
                    ...showDialogWarning,
                    show: true,
                    title,
                    description,
                    btnConfirm: 'Cambiar',
                    btnCancel: 'Cancelar',
                    onConfirm: () => { handleDialogConfirm(room, index, data) },

                    onClose: () => { closeDialogs(index); setShowDialogWarning({ ...showDialogWarning, show: false }) }
                })
            ) : (
                setShowDialogWarning({
                    ...showDialogWarning,
                    show: false
                })
            )
        }
    }

    const handleDialogConfirm = (room: Room, index: number, data?: any) => {
        console.log(room, index, data);

        handleDialogWarning(false)
        addStylesAfterSendRequest(1, index, 1)
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            // image: '/hotels/dialog/room.svg',
            // alt: 'Editar habitación',
            title: "Cambiar estado de habitación",
            description: `¿Desea cambiar el estatus de habitación de la habitación ${(room.floor)}${room.roomNumber < 10 ? '0' + room.roomNumber : room.roomNumber}?.`,
            btnConfirm: 'Editar',
            btnCancel: 'Cancelar',
            onConfirm: () => editRoom(room),
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

    const editRoom = async (room: Room) => {
        const roomData = { roomData: room, type: 'status' }
        const getResponse = await fetch('/api/admin/rooms/editRooms', {
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(roomData),
        })
        const response = await getResponse.json()
        console.log('RESPONSE: ', response);

        if (!response.res) { showMessage(response.message, 4000, 'error') }

        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        // router.reload()

        // setTimeout(() => {
        //     showMessage(response.message, 4000, 'success')
        // }, 300);
    }

    return (
        <div className={styles.rooms_home_admin}>
            {
                showBookingDate ? (
                    <BookingDate
                        guests={guests}
                        roomSelected={room}
                        handleBookingDate={(
                            bookingData: any
                        ) => handleBookingDate(bookingData)}
                    />
                ) : null
            }

            <BtnActions
                icon='<svg className={styles.svg_icon} viewBox="0 0 24 24">
                <path fill="currentColor" d="M1 2V23H3V21H21V23H23V7C23 4.79 21.21 3 19 3H10V8H3V2M6.5 2A2.5 2.5 0 0 0 4 4.5A2.5 2.5 0 0 0 6.5 7A2.5 2.5 0 0 0 9 4.5A2.5 2.5 0 0 0 6.5 2M3 11H21V13.56C20.41 13.21 19.73 13 19 13H10V18H3M6.5 12A2.5 2.5 0 0 0 4 14.5A2.5 2.5 0 0 0 6.5 17A2.5 2.5 0 0 0 9 14.5A2.5 2.5 0 0 0 6.5 12Z" />
            </svg>'
                onClick={() => router.push('/aG90ZWxlc19wbGF6YQ0K/admin/website/bookings/')}
            />

            {
                showDialogWarning.show ? (
                    <DialogWarning
                        title={showDialogWarning.title}
                        description={showDialogWarning.description}
                        btnConfirm={showDialogWarning.btnConfirm}
                        btnCancel={showDialogWarning.btnCancel}
                        onConfirm={() => showDialogWarning.onConfirm()}
                        onClose={() => showDialogWarning.onClose()}
                    />
                ) : null
            }

            {showDialogConfirm.show ? (
                <DialogConfirm
                    isBooking={showDialogConfirm.isBooking}
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
                <div ref={roomCardContainerRef} className={styles.room_card_container}>
                    {
                        floors > 0 && roomsStatus.length ? (
                            <RoomsFloors
                                floors={floors}
                                rooms={rooms}
                                roomStatus={roomsStatus}
                                showMessage={
                                    (
                                        text: string,
                                        duration: number,
                                        type: TypeOptions
                                    ) => showMessage(text, duration, type)
                                }
                                handleDialogWarning={
                                    (
                                        isShow: boolean,
                                        room?: Room,
                                        data?: any,
                                        index?: number,
                                        title?: string,
                                        description?: string
                                    ) => handleDialogWarning(
                                        isShow, room, data, index, title, description
                                    )
                                }
                                handleDialogConfirm={
                                    (room: Room, index: number, data?: any) => handleDialogConfirm(
                                        room, index, data
                                    )
                                }
                                setShowDialogWarning={
                                    (
                                        show?: boolean,
                                        title?: string,
                                        description?: string,
                                        btnConfirm?: string,
                                        btnCancel?: string,
                                        onConfirm?: () => void,
                                        onClose?: () => void
                                    ) => setShowDialogWarning({
                                        ...showDialogWarning,
                                        show: show ? show : showDialogWarning.show,
                                        title: title ? title : showDialogWarning.title,
                                        description: description ? description : showDialogWarning.description,
                                        btnConfirm: btnConfirm ? btnConfirm : showDialogWarning.btnConfirm,
                                        btnCancel: btnCancel ? btnCancel : showDialogWarning.btnCancel,
                                        onConfirm: onConfirm ? onConfirm : showDialogWarning.onConfirm,
                                        onClose: onClose ? onClose : showDialogWarning.onClose
                                    })
                                }
                                setRoom={(room: Room) => setRoom(room)}
                                setShowBookingDate={(isValidate: boolean) => showBookingDateData(isValidate)}
                                redirectTo={(url: string, query?: any) => redirectTo(url, query)}
                            />
                            // generateFloors()
                        ) : null
                    }
                </div>
            </div>
            {
                user && !user.preferencesId ? (
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