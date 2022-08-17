import { RoomType } from "./RoomType"
import { Service } from "./Service"

export type ServiceOnRoomType = {
    id?: number
    roomTypeId: number
    roomType: RoomType
    serviceId: number
    service: Service
}