// React
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";

// CSS
// import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../../../styles/booking/Booking1.module.css"

// Variables

// Componets

// Libraries

// Helpers
import { endpoint } from "../../../../../config/endpoint";

// Types
import { RoomTypeImages } from "@prisma/client";
import { RoomType, RoomTypeImagesTable } from "../../../../../types/RoomType"

type BookingChoosingTypeRoom = {
    roomTypes: Array<RoomType>,
    roomTypeSelected: any
}

const BookingChoosingTypeRoom = ({ roomTypes, roomTypeSelected }: BookingChoosingTypeRoom) => {

    // Variables
    const router = useRouter()

    // Use Ref
    const roomTypeContainerRef = useRef<HTMLDivElement>(null)

    // Use State
    const [currentTypeRoom, setCurrentTypeRoom] = useState<number>(1)
    // const [bookingStepData, setBookingStepData] = useState<RoomType>(roomTypes[0])

    // Functions
    // const redirectTo = (url: string) => { router.push(url) }

    const selectTypeRoom = (roomType: RoomType, index: number) => {
        // setBookingStepData(roomType)
        setCurrentTypeRoom(index + 1)
    }

    const showRoomImage = (roomTypeImages: Array<RoomTypeImages>) => {
        let html: any = []

        if (roomTypeImages.length) {
            roomTypeImages.forEach((roomTypeImage, index) => {
                html.push(<img key={index} className={styles.room_hotel_image} src={roomTypeImage.imageUrl} alt={`Habitaciones del hotel ${router.query.currentHotel}`} />)
            });
        }

        return html
    }

    const showRoomsType = () => {
        let html: any = []

        roomTypes.forEach((roomType: RoomType, index: number) => {
            html.push(
                <div
                    key={index}
                    className={styles.room_type_card}
                    onClick={() => selectTypeRoom(roomType, index)}
                >
                    <div className={styles.current_room_type}>
                        <p>Tipo de habitación seleccionada</p>
                    </div>
                    <div className={styles.left}>
                        {
                            showRoomImage(roomType.RoomTypeImages as Array<any>)
                        }
                        <h4>Habitación {roomType.name}</h4>
                        <p>{roomType.maxPeople} personas en 1 habitación</p>
                        <div className={styles.services}>
                            {
                                roomType.ServicesOnRoom.map((serviceOnRoom: any, index: number) =>
                                    serviceOnRoom.service.mainInformation ? (
                                        <div key={index} className={styles.service_card}>
                                            <div dangerouslySetInnerHTML={{ __html: serviceOnRoom.service.icon }}></div>
                                            <small>{serviceOnRoom.service.name}</small>
                                        </div>
                                    ) : null
                                )
                            }

                        </div>
                        <div className={styles.show_room_details}>
                            Ver habitación
                            <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h4>Tu habitación</h4>
                        <div className={styles.room_type_details}>
                            <p>Camas</p>
                            <p>{roomType.name == 'Doble' ? '2 camas dobles' : '1 cama doble'}</p>
                        </div>
                        <div className={styles.room_type_details}>
                            <p>Comidas</p>
                            <p>Desayuno buffet y a la carta</p>
                        </div>
                        <div className={styles.room_type_details}>
                            <p>Políticas de cancelación</p>
                            <p>Puedes cancelar hasta las <b>23:59</b></p>
                        </div>
                        <div className={styles.cost_container}>
                            <h3>Costo de la habitación</h3>
                            <p>MXN$ <b>{roomType.costPerNight}</b></p>
                            <p>por noche, {roomType.maxPeople} {roomType.maxPeople == 1 ? 'persona' : 'personas'}</p>
                            <p>Impuestos incluidos</p>
                        </div>
                    </div>
                </div >
            )
        });

        return html
    }

    const showNextStep = async () => {
        // const getResponse = await fetch(endpoint + '/api/landingPage/booking/bookingStep1', {
        //     method: 'POST',
        //     headers: { 'Content-type': 'application/json' },
        //     body: JSON.stringify({ step: 1, bookingStepData })
        // })
        // const response = await getResponse.json()

        // if (!response.res) { return showMessage(response.message, 6000, 'error') }

        // redirectToStep(2, bookingStepData)
    }

    // Use Effect
    useEffect(() => {
        if (roomTypeContainerRef.current) {
            roomTypeContainerRef.current.childNodes.forEach((roomTypeContainer, index) => {
                const roomTypeDiv = roomTypeContainer as HTMLDivElement
                const roomTypeChildDiv = roomTypeDiv.childNodes[0] as HTMLDivElement
                roomTypeDiv.classList.remove(styles.room_selected)
                roomTypeChildDiv.classList.remove(styles.room_type_selected)

                if (currentTypeRoom == (index + 1)) {
                    roomTypeDiv.classList.add(styles.room_selected)
                    roomTypeChildDiv.classList.add(styles.room_type_selected)
                }
            });
        }
    }, [currentTypeRoom])

    useEffect(() => {
        if (roomTypes.length && Object.keys(roomTypeSelected.data).length) {
            const roomTypesIndex: number = roomTypes.findIndex((roomType: RoomType) => {
                return roomType.id == roomTypeSelected.data.id
            })

            selectTypeRoom(roomTypes[roomTypesIndex], roomTypesIndex)
        }
    }, [roomTypeSelected])

    return (
        <section className={styles.booking1_container}>
            <div className={styles.places_near_container}>
                <h3>Lugares de interés cerca del hotel</h3>
            </div>

            <div className={styles.services_container}>
                <h3>Hotel responsable</h3>
                <p>Nuestras habitaciones cumplen con los estándares requeridos para garantizar tu bienestar.</p>
            </div>

            <div className={styles.hotel_condition_container}>
                <h3>Condiciones del hotel</h3>
                <div className={styles.schedule_container}>
                    <p>Horarios:</p>
                    <div className={styles.schedule}>
                        <p>Check In: 15:00</p>
                        <p>Check Out: 12:00</p>
                    </div>
                </div>
                <div className={styles.breakfast}>
                    <p>Desayuno:</p>
                    <p>de 7:00 a 12:00</p>
                </div>
            </div>

            <div className={styles.logging_container}>
                <p>Inicia sesión para poder tener una mejor experiencia al reservar</p>
                <button>Iniciar sesión</button>
            </div>

            <div className={styles.room_types_container}>
                <div ref={roomTypeContainerRef} className={styles.room_types_card_container}>
                    {
                        roomTypes.length ? (
                            showRoomsType()
                        ) : null
                    }
                </div>
            </div>

            <button className={styles.btn_next_step} onClick={showNextStep}>
                Siguiente
            </button>
        </section>
    )
}

export default BookingChoosingTypeRoom