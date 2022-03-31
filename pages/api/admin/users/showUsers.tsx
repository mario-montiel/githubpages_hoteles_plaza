// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'

export default async function getUsers(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const users = await prismaDB.users.findMany({
        orderBy: { fullName: 'asc' },
        include: {
            department: true,
            hotels: {
                include: {
                    hotel: true,
                }
            }
        }
    })

    if (users) {
        return res.json(users)
    }

    res.json([])
}