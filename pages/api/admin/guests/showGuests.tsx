// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'

export default async function getGuests(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    
    const guests = await prismaDB.guest.findMany({
        orderBy: {fullName: 'asc'}
    })

    if (guests) { return res.json(guests) }

    res.json([])
}