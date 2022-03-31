// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import * as cookie from 'cookie'
import * as jwt from 'jsonwebtoken'
import { secret } from '../../../../api/secret'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    res.setHeader("Set-Cookie",
            cookie.serialize('auth', '', {
                httpOnly: true, // not let use js code in the client side
                secure: process.env.NODE_ENV !== 'development', // Only will work with https conections, but it will work only in production, so while we can work
                sameSite: 'strict',
                path: '/',
                expires: new Date()
            }))

    res.statusCode = 200
    return res.json({ res: true, message: 'Su sesión fue cerrada con éxito!' })
}