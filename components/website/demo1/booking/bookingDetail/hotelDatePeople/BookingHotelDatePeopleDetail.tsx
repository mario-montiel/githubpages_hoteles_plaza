// React
import { useRouter } from "next/router";

// Libraries

// CSS
import styles from "./BookingHotelDatePeopleDetail.module.css"

// Componets
import SelectDate from "../../../select/booking/SelectDate";
import SelectHotel from "../../../select/data/SelectHotel";
import PeopleAndChildren from "../../../select/people/People";

// Helpers
import { endpoint } from "../../../../../../config/endpoint";

// Types
import { Hotel } from "../../../../../../types/Hotel";
import { useEffect, useState } from "react";

type BookingHotelDatePeopleDetail = {
    hotels: Hotel[]
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

type PeopleData = {
    adults: number,
    children: number
}

export default function BookingHotelDatePeopleDetail({ hotels }: BookingHotelDatePeopleDetail) {
    console.log(hotels);

    // Variables
    const router = useRouter()
    const initialValues = {
        hotel: hotels[0],
        people: {
            adults: 1,
            children: 0
        },
        date: {
            checkIn: {
                day: 0,
                date: 0,
                month: 0,
                year: 0
            },
            checkOut: {
                day: 0,
                date: 0,
                month: 0,
                year: 0
            }
        }
    }

    // Use State
    const [data, setDate] = useState(initialValues)

    // Use Ref

    // Functions
    const chooseHotel = (hotel: Hotel) => {
        console.log(hotel);
        setDate({
            ...data,
            hotel,
            people: data.people
        })
    }

    const chooseDate = (date: DateSelected) => {
        console.log(date);
        if (date.checkIn.date > 0) {
            // setDate({
        //     ...data,
        //     hotel: data.hotel,
        //     people: data.people,
        //     date
        // })
        }
        
    }

    const choosePeople = (people: PeopleData) => {
        console.log(people);
        setDate({
            ...data,
            hotel: data.hotel,
            people: people,
            date: data.date
        })
    }

    const submit = () => {
        console.log(data);
        
    }

    /* Animations */

    // Use Effect   
    useEffect(() => {
        // console.log(router.query);

    }, [])

    return (
        <section className={styles.content}>
            <div className={styles.content_grid}>
                <div className={styles.hotel_select_container}>
                    <h5>Hotel de interés</h5>
                    <SelectHotel
                        hotels={hotels}
                        sendData={(hotel: Hotel) => chooseHotel(hotel)}
                        hotelSelected={router.query.currenthotel}
                    />
                </div>
                <div className={styles.date_select_container}>
                    <h5>Fecha seleccionada</h5>
                    <SelectDate
                        dateSelected={{ initial: router.query.initial, end: router.query.end }}
                        sendData={(date: DateSelected) => chooseDate(date)}
                    />
                </div>
                <div className={styles.people_select_container}>
                    <h5>Total de huespedes</h5>
                    <PeopleAndChildren
                        peopleSelected={router.query.people}
                        sendData={(people: PeopleData) => choosePeople(people)}
                    />
                </div>
            </div>
            <button className={styles.btn_submit} onClick={submit}>
                Buscar
            </button>
        </section>
    )
}