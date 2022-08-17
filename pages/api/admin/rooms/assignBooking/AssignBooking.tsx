// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prismaDB from '../../../../../prisma/Instance'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../../api/authentication'
import { CalendarDate } from '../../../../../types/CalendarDate'
import { Guest } from '../../../../../types/Guest'

export default Authenticated(async function AssignBooking(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = JSON.parse(req.body)
    const isNewGuest = response.bookingData.step2Booking.isNewGuest
    const guest: Guest = isNewGuest ? ( await createGuest(response, res) ) : response.bookingData.step2Booking.guest
    
    await saveInDB(response, guest, res)

    res.status(200).json({ res: true, message: 'Habitación actualizada con éxito!' })
})

const createGuest = async (response: any, res: NextApiResponse) => {
    const guest = await prismaDB.guest.create({
        data: {
            email: response.bookingData.step2Booking.guest.email,
            password: response.bookingData.step2Booking.guest.password,
            fullName: response.bookingData.step2Booking.guest.fullName,
            lastName: response.bookingData.step2Booking.guest.lastName,
            company: response.bookingData.step2Booking.guest.company,
            city: response.bookingData.step2Booking.guest.city
        }
    })

    if (!guest) {
        res.status(200).json({ res: false, message: 'No se pudo agregar el huésped a la base de datos' })
        return {}
    }

    return guest
}

const saveInDB = async (response: any, guest: Guest, res: NextApiResponse) => {
    const date = new Date()
    const initialDate = response.bookingData.step1Booking.initialDate.dateMx
    const endDate = response.bookingData.step1Booking.endDate.dateMx
    const nowDate = date.toLocaleDateString("es-MX", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const roomId = response.bookingData.room.id
    const roomBookingId = response.bookingData.room.RoomBookings[0].id
    const changeLastRoomBooking = await prismaDB.roomBookings.update({
        where: {id: roomBookingId},
        data: { status: 'Eliminado' }
    })

    if (!changeLastRoomBooking) {
        res.status(200).json({ res: false, message: 'Ocurrió un problema y no se pudo actualizar la reservación' })
        return {}
    }

    const roomBooking = await prismaDB.roomBookings.create({
        data: {
            detailsOfRoom: response.bookingData.room.roomDetails,
            detailsOfBooking: response.reasonToBooking,
            checkIn: initialDate,
            checkOut: endDate,
            isBreakfast: response.bookingData.step1Booking.isBreakFast,
            guestId: guest.id,
            roomsId: roomId,
            createdAt: nowDate
        }
    })
    
    if (!roomBooking) {
        res.status(200).json({ res: false, message: 'Ocurrió un problema y no se pudo crear la reservación' })
        return {}
    }
    
    const room = await prismaDB.rooms.update({
        where: { id: response.bookingData.room.id },
        data: { 
            isBooking: true,
            roomStatusId: 3,
            lastRoomStatusId: response.bookingData.room.roomStatusId,
            bookedAt: initialDate,
        }
    })

    if (!room) {
        res.status(200).json({ res: false, message: 'No se pudo actualizar la fecha de reservación de la habitación' })
        return {}
    }

    return roomBooking
}