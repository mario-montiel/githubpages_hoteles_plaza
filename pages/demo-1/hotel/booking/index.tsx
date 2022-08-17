// React and Next
import { useState } from "react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";

// CSS
// import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../../styles/booking/BookingCheckDate.module.css'

// Variables

// Componets
import Steps from "../../../../components/website/demo1/steps/Steps";
import People from "../../../../components/website/demo1/select/people/People";
import LayoutBooking from "../../../../components/website/demo1/booking/LayoutBooking";
import SelectHotel from "../../../../components/website/demo1/select/data/SelectHotel";
import SelectDate from "../../../../components/website/demo1/select/booking/SelectDate";

// Libraries
// import { toast, ToastContainer, TypeOptions } from 'react-toastify';

// Helpers
import { endpoint } from "../../../../config/endpoint"
import { totalDaysOfMonth } from "../../../../helpers/dates";

// Types
import { Hotel } from "../../../../types/Hotel";

HotelesPlazaChoosingDate.getInitialProps = async (ctx: NextPageContext) => {
    const hotelsJson = await getFetchData(endpoint + "/api/landingPage/hotels/showHotels", ctx)
    const roomTypeSelectedJson = await getFetchData(endpoint + '/api/landingPage/booking/roomTypeSelected', ctx)
    const roomTypesJson = await getFetchData(endpoint + '/api/landingPage/roomsType/showRoomsType', ctx, ctx.query.currenthotel)
    return { roomTypes: roomTypesJson, roomTypeSelected: roomTypeSelectedJson, hotels: hotelsJson }
}

async function getFetchData(url: string, ctx: NextPageContext, routeQuery?: any) {
    const cookie = ctx.req?.headers.cookie
    if (routeQuery) {
        const getResponse = await fetch(url, {
            method: 'POST',
            headers: { cookie: cookie! },
            body: JSON.stringify(ctx.query.currenthotel)
        })
        const response = await getResponse.json()

        return response
    }
    const getResponse = await fetch(url)
    const response = await getResponse.json()

    return response
}

type PeopleData = {
    adults: number,
    children: number
}

type DateSelected = {
    checkIn: {
        day: number,
        date: number,
        month: number,
        year: number
    },
    checkOut: {
        day: number,
        date: number,
        month: number,
        year: number
    }
}

type BookingLayout = {
    hotels: Hotel[],
    pacoRabon: () => void
}

export default function HotelesPlazaChoosingDate({ hotels }: BookingLayout) {

    // Variables
    const router = useRouter()
    const date = new Date()
    const totalDaysOfDate = totalDaysOfMonth(date.getFullYear(), date.getMonth())
    const date2 = new Date(`${date.getFullYear()} ${date.getDate() + 1 > totalDaysOfDate ? date.getMonth() + 2 : date.getMonth() + 1} ${date.getDate() + 1 > totalDaysOfDate ? 1 : date.getDate() + 1}`)

    const initialValues = {
        hotel: hotels[0],
        people: {
            adults: 1,
            children: 0
        },
        date: {
            checkIn: {
                day: date.getDay(),
                date: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
            },
            checkOut: {
                day: date2.getDay(),
                date: date2.getDate(),
                month: date2.getMonth(),
                year: date2.getFullYear()
            }
        }
    }

    // Use State
    const [data, setDate] = useState(initialValues)

    // Functions
    const redirectTo = (url: string) => {
        const initial = `${data.date.checkIn.year}/${data.date.checkIn.month}/${data.date.checkIn.date}`
        const end = `${data.date.checkOut.year}/${data.date.checkOut.month}/${data.date.checkOut.date}`
        const people = `${data.people.adults}/${data.people.children}`

        router.push({ pathname: url, query: { currenthotel: data.hotel.name, initial, end, people: people } })
    }

    const chooseHotel = (hotel: Hotel) => {
        console.log(hotel);
        
        setDate({
            ...data,
            hotel,
            people: data.people,
            date: data.date
        })
    }

    const chooseDate = (date: DateSelected) => {
        setDate({
            ...data,
            hotel: data.hotel,
            people: data.people,
            date
        })
    }

    const choosePeople = (people: PeopleData) => {
        setDate({
            ...data,
            hotel: data.hotel,
            people: people,
            date: data.date
        })
    }

    // Use Effect

    return (
        <LayoutBooking>
            <Steps
                maxSteps={4}
                currentStep={1}
            >
                <div className={styles.container}>
                    <h3>Busca hospedaje</h3>
                    <br />
                    <div className={styles.checkdate_container}>
                        <SelectHotel
                            hotels={hotels}
                            sendData={(hotel: Hotel) => chooseHotel(hotel)}
                        />
                        <SelectDate
                            sendData={(date: DateSelected) => chooseDate(date)}
                        />
                        <People
                            sendData={(people: PeopleData) => choosePeople(people)}
                        />
                    </div>
                    <button className={styles.btn_submit} onClick={() => redirectTo('/demo-1/hotel/booking/seleccionar-tipo-habitacion')}>
                        Continuar
                    </button>
                </div>
            </Steps>
        </LayoutBooking>
    )
}