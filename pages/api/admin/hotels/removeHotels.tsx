// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import * as jwt from 'jsonwebtoken'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'
import { Authenticated } from '../../../../api/authentication'

// Types
import { HotelForm } from '../../../../types/Hotel'
import { getModuleUrl } from '../../../../api/getDirModuleUrl'
import { RegisterDataRemoved } from '../../../../api/registerDataRemoved'

export default Authenticated(async function RemoveHotel(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = jwt.verify(cookie, secret);
    const response = req.body
    const dirModuleUrl = await getModuleUrl(req)

    if (!dirModuleUrl) {
        return res.status(200).json({ res: false, message: 'Ocurrió un problema y no se pudo registar el usuario que eliminará la información' })
    }
    
    await RegisterDataRemoved(cookie, response.reasonToDelete, dirModuleUrl)
    
    if (response.hotel.placesOfInterest && response.hotel.placesOfInterest.length > 0) {
        await removeAllPlacesOfInterest(res, response.id)
    }

    if (response.hotel.rooms && response.hotel.rooms.length) {
        removeAllRooms(res, response.id)
    }

    await removeUsers(res, currentUser, response.hotel)
})

const errorMessage = (res: NextApiResponse,  message: string) => {
    res.status(200).json({ res: false, message })
}

const removeAllPlacesOfInterest = async (res: NextApiResponse, id: number) => {
    await prismaDB.placesInterest
        .deleteMany({ where: { hotelId: id } })
        .catch(() => errorMessage(res, 'No se pudieron eliminar los lugares de interés del hotel'))
}

const removeAllRooms = async (res: NextApiResponse, id: number) => {
    await prismaDB.rooms
        .deleteMany({ where: { hotelId: id } })
        .catch(() => errorMessage(res, 'No se pudieron eliminar las habitaciones del hotel'))
}

const removeUsers = async (res: NextApiResponse, authJwt: any, hotel: any) => {
    let users: any = []
    
    await hotel.usersOnHotels.forEach((user: any) => {
        users.push(user.user.id)
    });
    
    await prismaDB.usersOnHotels.deleteMany({
        where: {
            userId: { in: users },
            hotelId: hotel.id
        }
    })
    .then(() => { removeHotel(res, hotel) })
    .catch(() =>  errorMessage(res, 'No se pudieron eliminar los usuarios del hotel'))
}

const removeHotel = async (res: NextApiResponse, hotel: HotelForm) => {
    await prismaDB.hotels
        .delete({ where: { id: hotel.id! } })
        .then(() => { res.status(200).json({ res: true, message: 'El hotel se eliminó con éxito!' }) })
        .catch((err: any) => { console.log(err); errorMessage(res, 'No se pudo eliminar el hotel') })
}