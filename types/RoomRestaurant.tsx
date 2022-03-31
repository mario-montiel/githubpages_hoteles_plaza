import { BookingDate } from "./BookingDate"

export type RoomBreakfastForm = {
    id: string
    name: number,
    room: number,
    hotelId: number
}

export type RoomBreakfast = {
    id: string
    name: number,
    room: number,
    hotelId: number,
    date: BookingDate
}