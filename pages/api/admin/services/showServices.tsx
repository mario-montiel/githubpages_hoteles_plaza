// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'
import { Authenticated } from '../../../../api/authentication'

export default Authenticated(async function ShowServices(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const services = await prismaDB.services
        .findMany({ orderBy: { id: 'asc' }, include: { ServicesOnRoom: { include: { roomType: true } } } })

    if (!services) {
        res.status(200).json({ res: false, message: "No se pudieron obtener los servicios en los tipos de habitaciones" })
    }

    return res.status(200).json(services)
})