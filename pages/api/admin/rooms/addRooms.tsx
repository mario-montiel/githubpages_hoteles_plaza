// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'
import { Room } from '../../../../types/Room'

export default async function AddRooms(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    const authorization: string = req.cookies.auth || ''
    const response = req.body
    
    if (!response.rooms) {
        return await prepareData(response.roomData, response)
    }

    await structureData(response)

    res.status(200).json({ res: true, message: 'Room added successful' })
}

const structureData = async (response: any) => {
    let index: number = 0
    response.rooms.forEach((room: Room) => {
        if (room.floor === response.floor) {
            index += 1
        }
    });

    prepareData(response.roomData, response, index)

}

const prepareData = async (roomData: any, response: any, lastRoomNumber?: number) => {
    let x: any = []
    let aux: number = 0
    roomData.forEach((data: any) => {
        for (let index = 0; index < data.quantity; index++) {
            aux += (1)
            const room = {
                floor: response.floor,
                roomNumber: lastRoomNumber ? (aux + lastRoomNumber) : (aux + response.totalRoomsOfHotel),
                roomTypeId: data.typeRoomId,
                registredBy: '',
                hotelId: response.hotelId,
                roomStatusId: response.roomStatusId,
                observations: '',
                lastRoomStatusId: response.lastRoomStatusId
            }

            x.push(room)
        }
    });
    
    await addRooms(x)
    await updateTotalRoomsOfHotel(response, aux)
}

const addRooms = async (roomData: Array<Room>) => {
    console.log(roomData);
    
    await prismaDB.rooms.createMany({
        data: roomData
    }).catch((error: any) => { console.log(error); })
}

const updateTotalRoomsOfHotel = async (response: any, currentRooms: number) => {
    const totalRooms = response.totalRoomsOfHotel + currentRooms
    
    await prismaDB.hotels.update({
        where: {id: response.hotelId},
        data: {
            totalRooms
        }
    }).catch((err: any) => { console.log(err); })
}