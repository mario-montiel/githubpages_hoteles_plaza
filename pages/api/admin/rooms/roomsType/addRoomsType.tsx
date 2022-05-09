// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../../api/secret';
import { Authenticated } from '../../../../../api/authentication'

export default Authenticated(async function AddRoomType(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = verify(cookie, secret);
    const response = req.body
    const typeRoomData = {
        name: response.name,
        title: response.title,
        smoke: response.smoke,
        keyWord: response.keyWord,
        editedBy: currentUser.email,
        description: response.description,
        maxPeople: parseInt(response.maxPeople),
        costPerNight: parseFloat(response.costPerNight)
    }

    await prismaDB.roomType
        .create({ data: typeRoomData })
        .then(() => { res.status(200).json({ res: true, message: 'El tipo de habitación se creó con éxito!' }) })
        .catch(() => { res.status(500).json({ res: false, message: 'No se pudo crear el tipo de habitación!' }) })
})