// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'
import { Room } from '../../../../types/Room'

export default Authenticated(async function EditRoom(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = req.body

    switch (response.type) {
        case 'status':
            await editRoomStatus(response.roomData)
            res.status(200).json({ res: true, message: 'Room status updated successful' })
            break;
        case 'room':
            await editRoom(response.roomData)
            res.status(200).json({ res: true, message: 'Room updated successful' })
        break;
    }
})

const editRoomStatus = async (roomData: any) => {
    await prismaDB.rooms.update({
        where: { id: roomData.id },
        data: {
            checkIn: null,
            checkOut: null,
            roomStatusId: roomData.roomTypeId,
            lastRoomStatusId: roomData.lastRoomTypeId
        }
    }).catch((error: any) => { console.log(error); })
}

const editRoom = async (roomData: Room) => {
    await prismaDB.rooms.update({
        where: { id: roomData.id },
        data: {
            roomTypeId: parseInt(roomData.roomTypeId.toString()),
            observations: roomData.observations
        }
    }).catch((error: any) => { console.log(error); })
}