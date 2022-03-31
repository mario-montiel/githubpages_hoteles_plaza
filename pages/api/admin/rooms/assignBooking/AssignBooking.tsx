// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prismaDB from '../../../../../prisma/Instance'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../../api/authentication'
import { CalendarDate } from '../../../../../types/CalendarDate'

export default Authenticated(async function AssignBooking(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    
    const response = JSON.parse(req.body)
    console.log('resonse: ', response);
    
    const data = await  getDataGenerated(response)
    
    saveInDB(data)
    
    res.status(200).json({ res: true, message: 'Room updated successful' })
})

const getDataGenerated = async (response: any) => {
    const date = new Date()
    const endDate = response.endDate as CalendarDate
    const initialDate = response.initialDate as CalendarDate
    // reservationStatusId = Get the ID of status called 'Reservado'
    const reservationStatusId = response.roomStatus.findIndex((status: any) => status.name === 'Reservado')
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const iDate = new Date(initialDate.year, initialDate.month, initialDate.day, hour, minutes, seconds)
    const eDate = new Date(endDate.year, endDate.month, endDate.day, 15, 0)
    const dates = {
        roomId: response.roomId,
        initialDate: iDate,
        endDate: eDate,
        roomStatusId: response.roomStatus[reservationStatusId],
        isBreakfast: response.isBreakfast,
    }
    
    return dates
}

const saveInDB = async (response: any) => {
    await prismaDB.rooms.update({
        where: { id: response.roomId },
        data: {
            checkIn: response.initialDate,
            checkOut: response.endDate,
            isBooking: true,
            isBreakfast: response.isBreakfast,
            roomStatusId: response.roomStatusId.id
        }
    }).catch((err) => console.log(err))
}