// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../prisma/Instance'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<object>
) {

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Código de estado de respuesta no permitido' })
    }

    let aTacos: any = []

    const tacos = await prismaDB.tacos.findMany({
        orderBy: {
            id: 'asc'
        }
    })
    

    if (!tacos.length) {
        return res.status(200).json({ data: aTacos, res: false })
    }

    aTacos = tacos
    res.status(200).json({ data: aTacos, res: true })
}
