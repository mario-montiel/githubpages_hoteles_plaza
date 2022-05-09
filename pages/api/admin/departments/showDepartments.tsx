// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { Authenticated } from '../../../../api/authentication'

export default Authenticated(async function getDepartments(
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
})