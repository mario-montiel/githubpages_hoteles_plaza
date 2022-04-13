// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../../prisma/Instance'
import { Authenticated, AuthenticatedAdmin } from '../../../../../api/authentication'

export default async function AddRoomStatus(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    
    const response = req.body
    const statusRoomData = {
        name: response.name,
        backgroundColor: response.backgroundColor,
        textColor: response.textColor,
        border: response.border,
        registredBy: ''
    }

    prismaDB.roomStatus
    .create({data: statusRoomData})
    .then(() => { res.status(200).json({ res: true, message: 'El estatus de la habitación se creó con éxito!' }) })
    .catch(() => { res.status(500).json({ res: false, message: 'No se pudo crear el estatus de la habitación!' }) })
}