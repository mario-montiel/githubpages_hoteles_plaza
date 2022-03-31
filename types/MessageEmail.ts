import { Hotel } from "./Hotel";

export type MessageEmail = {
    name: string,
    email: string,
    message: string,
    bookingType: string,
    bookingDays: number,
    hotelSelected: Hotel
}

export type MessageEmailIncomplete = {
    name: string,
    email: string,
    message: string,
    bookingType: string,
    bookingDays: number,
}