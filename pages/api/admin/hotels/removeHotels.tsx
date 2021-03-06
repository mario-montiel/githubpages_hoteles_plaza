// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { secret } from '../../../../api/secret'
import * as jwt from 'jsonwebtoken'
import { Authenticated } from '../../../../api/authentication'
import { HotelForm } from '../../../../types/Hotel'

export default async function RemoveHotel(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = jwt.verify(cookie, secret);
    const response = req.body
    
    if (response.placesOfInterest && response.placesOfInterest.length > 0) {
        await removeAllPlacesOfInterest(response.id)
    }

    if (response.rooms && response.rooms.length) {
        removeAllRooms(response.id)
    }

    await removeUsers(currentUser, response)
    await removeHotel(response)

    res.status(200).json({ res: true, message: 'El hotel se eliminó con éxito!' })
}

const removeAllPlacesOfInterest = async (id: number) => {
    await prismaDB.placesInterest
        .deleteMany({ where: { hotelId: id } })
        .catch((err) => console.log(err))
}

const removeAllRooms = async (id: number) => {
    await prismaDB.rooms
        .deleteMany({ where: { hotelId: id } })
        .catch((err) => console.log(err))
}

const removeUsers = async (authJwt: any, response: any) => {
    await prismaDB.usersOnHotels.deleteMany({
        where: {
            userId: parseInt(authJwt.sub.toString()),
            hotelId: parseInt(response.id.toString())
        }
    }).catch((err) => console.log('removeUsersERROR: ', err))
}

const removeHotel = async (hotel: HotelForm) => {
    const hotelId: number = hotel.id || 0
    await prismaDB.hotels
        .delete({ where: { id: hotelId } })
        .catch((err) => { console.log(err); })
}