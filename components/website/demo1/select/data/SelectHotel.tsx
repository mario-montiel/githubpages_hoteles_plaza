// React and Next
import { useEffect, useRef, useState } from 'react';

// CSS
import styles from './SelectHotel.module.css'

// Types
import { Hotel } from '../../../../../types/Hotel';

type Data = {
    hotels: Hotel[],
    hotelSelected?: any,
    sendData: (hotel: Hotel) => void
}

export default function SelectHotel({ hotels, hotelSelected, sendData }: Data) {

    // Variables

    // Use Ref
    const itemsContainer = useRef<HTMLUListElement>(null)
    const overlay = useRef<HTMLDivElement>(null)

    // Use State
    const [hotelData, setHotelData] = useState(hotels[0])

    // Functions
    const handleStyles = () => {
        itemsContainer.current?.classList.toggle(styles.hidden)
        overlay.current?.classList.toggle(styles.hidden)
    }

    const convertToCapitalLetter = (hotelName: String): String => {
        const lowerCase = hotelName.toLowerCase()
        const subString = lowerCase.substring(1)

        return "H" + subString
    }

    const chooseHotel =(hotel: Hotel) => {
        setHotelData(hotel)
        sendData(hotel)
        handleStyles()
    }

    const findHotel = (hotelName: string) => {
        const hotel = hotels.filter((hotel: Hotel) => hotel.name == hotelName )
        if (hotel.length) {
            setHotelData(hotel[0])
            sendData(hotel[0])
        }
    }

    // Use Effect
    useEffect(() => { if (hotelSelected) { findHotel(hotelSelected) } }, [hotelSelected])

    return (
        <div className={styles.select_hotel}>
            <div ref={overlay} className={styles.overlay} onClick={handleStyles} />
            <ul className={styles.show_data} onClick={handleStyles}>
                <li>
                    <img src={`/hotels/logos/${hotelData.pathImageName}logo.webp`} alt="hotel_logo" />
                    {convertToCapitalLetter(hotelData.name)}
                </li>
            </ul>
            <ul ref={itemsContainer} className={styles.items_container}>
                {
                    hotels.length ? (
                        hotels.map((hotel: Hotel, index: number) =>
                            <li key={index} onClick={() => chooseHotel(hotel)}>
                                <img src={`/hotels/logos/${hotel.pathImageName}logo.webp`} alt="hotel_logo" />
                                {convertToCapitalLetter(hotel.name)}
                            </li>)
                    ) : null
                }
            </ul>
        </div>
    )
}