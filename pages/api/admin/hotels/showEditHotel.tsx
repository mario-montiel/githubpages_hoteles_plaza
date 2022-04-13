// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { Authenticated, AuthenticatedAdmin } from '../../../../api/authentication'

export default async function ShowEditHotel(
    req: NextApiRequest,
    res: NextApiResponse<Object>,
    jwt?: string
) { 
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    const response = JSON.parse(req.body)

    prismaDB.hotels.findFirst({
        include: {
            category: true,
            placesOfInterest: true,
            rooms: {
                orderBy: {
                    id: 'asc'
                }
            }
        },
        where: {name: response} 
    })
    .then((responseDB) => { res.status(200).json({ res: true, data: responseDB }) })
    .catch((err) => { res.status(500).json({ res: false, message: 'No se pudo!', messageError: err }) })
}