// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import * as cookie from 'cookie'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { secret } from '../../../../api/secret'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth

    jwt.verify(cookie, secret, async (err, decoded: any) => {
        if (!err && decoded && decoded.typeUser == 'Superadmin') {
            return res.status(200).json({ res: true, message: 'El usuario si es administrador' })
        }
        
        return res.status(200).json({ res: false, message: 'El usuario no es administrador' })
    });
}