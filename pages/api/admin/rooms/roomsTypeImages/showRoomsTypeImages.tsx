// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../../api/authentication'
import prismaDB from '../../../../../prisma/Instance'

export default async function getRoomsTypeImages(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = req.body    
    const roomType = await prismaDB.roomTypeImages.findMany({ orderBy: { id: 'asc' }, where: { roomTypeId: parseInt(response)} })

    if (!roomType.length) { res.json([]) }
    
    res.json(roomType)
}