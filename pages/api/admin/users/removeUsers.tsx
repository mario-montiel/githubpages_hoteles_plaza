// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { Authenticated } from '../../../../api/authentication'
import { HotelForm } from '../../../../types/Hotel'

export default Authenticated(async function RemoveUser(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = JSON.parse(req.body)
    console.log(response);

    await removeHotelsOfUser(response.id)
    await removeUser(response.id)
})

const removeHotelsOfUser = async (userId: number) => {
    console.log(userId);

    return await prismaDB.usersOnHotels.deleteMany({
        where: {
            userId
        }
    }).catch((err) => {
        console.log(err);
    })
}

const removeUser = async (userId: number) => {
    return await prismaDB.users.delete({
        where: {
            id: userId
        }
    }).catch((err) => {
        console.log(err);
    })
}