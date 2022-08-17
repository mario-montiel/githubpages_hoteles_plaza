// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'

export default async function getRoomsTypeWebsite(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = req.body

    const roomType = await prismaDB.hotels.findMany({
        where: { name: 'hotel ' + response },
        select: {
            name: true
        }
    })

    console.log(roomType);

    if (!roomType.length) {
        return res.status(200).json([])
    }
    

    res.json(roomType)
}