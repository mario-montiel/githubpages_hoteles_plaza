// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Database
import prismaDB from '../../../../prisma/Instance'

export default async function getRoomsTypeWebsite(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = JSON.parse(req.body)
    console.log(response);
    
    const roomType = await prismaDB.roomType.findMany({
        select: {
            id: true,
            name: true,
            smoke: true,
            title: true,
            keyWord: true,
            maxPeople: true,
            description: true,
            costPerNight: true,
            RoomTypeImages: {
                where: {hotel: { name: response}},
                include: { hotel: true }
            },
            ServicesOnRoom: {
                select: {
                    service: {
                        select: {
                            icon: true,
                            name: true,
                            description: true,
                            mainInformation: true
                        }
                    }
                }
            }
        },
    })
    console.log(roomType);
    

    if (!roomType.length) { return res.status(200).json([]) }

    res.json(roomType)
}