import { ServiceOnRoomType } from "./ServiceOnRoomType"

export type RoomType = {
    id?: string
    name: string
    title: string
    smoke: string
    keyWord: string
    RoomTypeImages: RoomTypeImages[]
    maxPeople: number
    description: string
    costPerNight: number
    ServicesOnRoom: Array<ServiceOnRoomType>
}

export type RoomTypeForm = {
    id?: string
    name: string
    title: string
    smoke: string
    keyWord: string
    RoomTypeImages: RoomTypeImages[]
    maxPeople: number
    description: string
    costPerNight: number
}

export type RoomTypeImages = {
    hotelId: number
    imageUrl: string
    hotelName: string
    RoomTypeImages: RoomTypeImagesTable[]
}

export type RoomTypeImagesTable = {
    id: number
    hotelsId: number
    roomTypeId: number
    pathDirect: string
    index: number
    createdAt: Date
    editedAt: Date
    imageUrl: string
}