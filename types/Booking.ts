import { BookingDate } from "./BookingDate"
import { RoomType } from "./RoomType"

export type Booking = {
    hotel: number
    adults: number
    children: number
    isCheckIn: boolean,
    checkIn: BookingDate
    isCheckOut: boolean,
    checkOut: BookingDate,
    diffDays: number,
    code?: string
    roomType: RoomType
}