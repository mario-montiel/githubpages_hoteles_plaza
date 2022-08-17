// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'

export default async function getRoomsTypeWebsite(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = req.body
    console.log('response: ', response);
    console.log('HOTEL: ', 'hotel ' + response);

    const hotel = await prismaDB.hotels.findFirst({
        where: { name: 'hotel ' + response},
    })

    console.log('MOTELAZO: ', hotel);
    

    if (!hotel) { console.log('PASO'); return res.status(404).json([]) }
    
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
                where: {hotel: { name: 'hotel ' + response}},
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

    if (!roomType.length) { return res.status(200).json([]) }
    

    res.json(roomType)
}