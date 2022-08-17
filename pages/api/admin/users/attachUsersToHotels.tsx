// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { hash } from 'bcrypt'
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'
import { Authenticated } from '../../../../api/authentication'

type Hotels = {
    id: number,
    checked: boolean
}

type UsersOnHotes = {
    hotelId: number,
    userId: number,
    assignedBy: string
}

export default Authenticated(async function AttachUsersToHotels(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = verify(cookie, secret);
    const response = JSON.parse(req.body)
    console.log(response);

    response.forEach((user: any) => {
        attachUsersIntoHotels(user, res, currentUser)
    });

    res.status(200).json({ res: true, message: 'La asignación de usuarios se creo con éxito!' })
})

const attachUsersIntoHotels = async (user: any, res: NextApiResponse, currentUser: any) => {
    await prismaDB.usersOnHotels
        .createMany({
            data: {
                userId: parseInt(user.id),
                hotelId: user.hotelId,
                assignedBy: currentUser.email,
                updateAt: new Date()
            }
        })
        .catch((err: any) => {
            console.log(err);
            return res.status(200).json({ res: false, message: 'Ocurrió un error y no se pudieron asignar los usuarios a los hoteles' })
        })
}