// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'

export default async function getTypeUsers(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const typeUsers = [
        { id: 1, name: 'Administrador' },
        { id: 2, name: 'Empleado' },
        { id: 3, name: 'Solo lectura' },
    ]

    res.json(typeUsers)
}