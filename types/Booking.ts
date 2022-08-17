import { BookingDate } from "./BookingDate"
import { Room } from "./Room"
import { RoomType } from "./RoomType"

export type PeopleBooking = {
    adults: number
    children: number
}

export type SelectDate = {
    dateMx: string,
    day: number,
    elIndex: number,
    element: object,
    month: number,
    monthText: string,
    year: number
}

export type BookingData = {
    iDate: SelectDate
    eDate: SelectDate
    isBreakfast: boolean
    totalDays: number
}

export type Booking = {
    room: Room
    hotel: number
    phone: number
    code?: string
    email: string
    diffDays: number
    fullName: string
    lastName: string
    comments: string
    totalDays: number
    roomType: RoomType
    isBreakfast: boolean
    // checkIn: BookingDate
    // checkOut: BookingDate
    people: PeopleBooking
    checkDate: BookingData
}