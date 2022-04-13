// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'

export default Authenticated(async function getRooms(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {

    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    let hotels: any = []
    
    // hotels = await prismaDB.rooms.findMany({
    //     include: {
    //         category: true,
    //         placesOfInterest: true,
    //         users: true,
    //         rooms: {
    //             orderBy: {
    //                 id: 'asc'
    //             }
    //         }
    //     },
    //     orderBy: {
    //         name: 'asc'
    //     }
    // })

    res.json(hotels)
})