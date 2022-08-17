export type Room = {
    id?: number
    name: string
    floor: number
    createdAt: Date
    hotelId: number
    editedBy: string
    bookedAt: string
    updatedAt?: Date
    RoomBookings: Array<any>
    roomNumber: number
    roomTypeId: number
    isBooking: boolean
    roomStatusId: number
    observations: string
    registredBy: string
    lastRoomStatusId: number
    roomTypeEmergency: number
}

export type RoomForm = {
    id?: number
    name: string
    floor: number
    createdAt: Date
    hotelId: number
    editedBy: string
    bookedAt: string
    updatedAt?: Date
    roomNumber: number
    roomTypeId: number
    isBooking: boolean
    roomStatusId: number
    observations: string
    registredBy: string
    lastRoomStatusId: number
    roomTypeEmergency: number
}