// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { Authenticated } from '../../../../api/authentication'

// Types
import { Room } from '../../../../types/Room'

export default Authenticated(async function EditRoom(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = req.body
    console.log('response: ', response);

    switch (response.type) {
        case 'status':
            await checkRoomStatus(response.roomData, res)
            res.status(200).json({ res: true, message: 'Room status updated successful' })
            break;
        case 'room':
            await editRoom(response.roomData, res)
            res.status(200).json({ res: true, message: 'Room updated successful' })
            break;
    }
})

const checkRoomStatus = async (roomData: any, res: NextApiResponse) => {
    // the room status id 3 == 'Reservación'
    if (roomData.lastRoomStatusId === 3) {
        await removeRoomBooking(roomData, res)
    }

    await editRoomStatus(roomData, roomData.roomStatusId === 3 ? true : false, res)

    res.status(200).json({ res: true, message: 'El estado de la habitacón se cambió con éxito' })
}

const removeRoomBooking = async (roomData: any, res: NextApiResponse) => {
    if (roomData && roomData.isBooking && roomData.RoomBookings.length) {
        const changeLastRoomBooking = await prismaDB.roomBookings.update({
            where: {id: roomData.RoomBookings[0].id},
            data: { status: 'Eliminado' }
        })

        console.log('changeLastRoomBooking: ', changeLastRoomBooking);
        

        if (!changeLastRoomBooking) {
            return res.status(200).json({ res: false, message: 'No se pudo eliminar el estado de la habitación' })
        }

        const changeRoomData = await prismaDB.rooms.update({
            where: { id: roomData.id },
            data: { isBooking: false, bookedAt: null }
        })

        console.log('changeRoomData: ', changeRoomData);
        

        if (!changeRoomData) {
            return res.status(200).json({ res: false, message: 'No se pudo eliminar el estado de la habitación' })
        }
    }
}

const editRoomStatus = async (roomData: any, isBooking: boolean, res: NextApiResponse) => {
    console.log('roomData: ', roomData);
    console.log('isBooking: ', isBooking);
    
    
    const roomEdited = await prismaDB.rooms.update({
        where: { id: roomData.id },
        data: {
            roomStatusId: roomData.roomStatusId,
            lastRoomStatusId: roomData.lastRoomStatusId,
            isBooking: isBooking ? true : false
        }
    })

    console.log('roomEdited: ', roomEdited);
    

    if (!roomEdited) {
        return res.status(200).json({ res: false, message: 'No se pudo editar el estado de la habitación' })
    }
}

const editRoom = async (roomData: Room, res: NextApiResponse) => {
    await prismaDB.rooms.update({
        where: { id: roomData.id },
        data: {
            roomTypeId: parseInt(roomData.roomTypeId.toString()),
            roomDetails: roomData.observations
        }
    }).catch((error: any) => { console.log(error); res.status(200).json({ res: false, message: 'No se pudo actualizar el estado de la habitación' }) })
}