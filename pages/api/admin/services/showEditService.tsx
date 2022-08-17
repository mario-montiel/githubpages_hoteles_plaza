// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { Authenticated } from '../../../../api/authentication'

export default Authenticated(async function ShowEditService(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    
    const response = req.body
    const servicesOnRoomsType = await prismaDB.services.findMany({
        where: { name: response },
        orderBy: { id: 'asc' },
        include: {  ServicesOnRoom: { include: { roomType: true } } }
    })

    if (!servicesOnRoomsType.length) {
        return res.status(200).json({ res: false, message: 'No existe ningún servicio con esos datos', })
    }

    res.status(200).json({ res: true, data: servicesOnRoomsType })
})