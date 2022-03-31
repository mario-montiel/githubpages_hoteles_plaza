// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'

export default async function getDepartments(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const departments = await prismaDB.departments.findMany({
        orderBy: {
            id: 'asc'
        }
    })

    res.json(JSON.stringify(departments))
}