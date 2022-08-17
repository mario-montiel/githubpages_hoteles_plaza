// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'

export default async function getHotels(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const hotels = await prismaDB.hotels.findMany({
        select: {
            id: true,
            name: true,
            ubication: true,
            pathImageName: true
        }
    })

    console.log(hotels);
    

    if (!hotels.length) { return res.status(200).json([]) }
    

    res.json(hotels)
}