// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { userSecret } from '../../../../api/secret';
import { verify } from 'jsonwebtoken'

export default async function SendEmail(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    
    const authorization: string = req.cookies.userAuth

    if (!authorization || authorization == undefined) {
        return res.status(200).json({ isLogged: false, message: 'No hay usuario conectado', user: [] })
    }

    const verifyUser = verify(authorization, userSecret)
    
    return res.status(200).json({ isLogged: true, message: 'Usuario conectado', user: verifyUser })
}