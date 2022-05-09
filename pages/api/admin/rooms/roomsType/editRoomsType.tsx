// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../../api/secret'
import { Authenticated } from '../../../../../api/authentication'

export default Authenticated(async function EditRoomType(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = verify(cookie, secret);
    const response = req.body
    const RoomTypeData = {
        name: response.name,
        keyWord: response.keyWord,
        costPerNight: parseInt(response.costPerNight),
        title: response.title,
        description: response.description,
        maxPeople: parseInt(response.maxPeople),
        smoke: response.smoke,
        editedBy: currentUser.email
    }

    await prismaDB.roomType.update({
        where: {
            id: response.id
        },
        data: RoomTypeData
    })
    .then(() => { res.status(200).json({ res: true, message: 'Tipo de habitación actualizado con éxito!' }) })
    .catch(() => { res.status(500).json({ res: false, message: 'No se pudo editar el tipo de habitación!' }) })
})