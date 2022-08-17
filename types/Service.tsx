import { RoomType } from "./RoomType"

export type ServiceOnRoomType = {
    id: number
    roomType: RoomType
    roomTypeId: number
    serviceId: number
    service?: Service
}

export type Service = {
    id?: number,
    name: string,
    icon: string,
    ServicesOnRoom: Array<ServiceOnRoomType>,
    description?: string,
    mainInformation: boolean,
    editedBy: string
}