// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../../prisma/Instance'
import { AuthenticatedAdmin } from '../../../../../api/authentication'

export default async function AddRoomType(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = req.body
    const typeRoomData = {
        name: response.name,
        keyWord: response.keyWord,
        registredBy: '',
        costPerNight: parseFloat(response.costPerNight),
        title: response.title,
        description: response.description,
        maxPeople: parseInt(response.maxPeople),
        smoke: response.smoke
    }

    prismaDB.roomType
        .create({ data: typeRoomData })
        .then(() => { res.status(200).json({ res: true, message: 'El tipo de habitación se creó con éxito!' }) })
        .catch(() => { res.status(500).json({ res: false, message: 'No se pudo crear el tipo de habitación!' }) })
}