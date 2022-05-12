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
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    if (!req.body) {
        return res.status(500).json({ message: "Los campos no pueden estar vacíos" })
    }

    const response = req.body
    const superAdmin: any = await prismaDB.superAdmin.findMany({
        where: { email: response.email }
    })
    
    if (superAdmin.length) {
        return verifyUser(response, superAdmin, res)
    }
    
    const user: any = await prismaDB.users.findMany({
        orderBy: { fullName: 'asc' },
        where: { email: { equals: response.email } }
    })

    if (!user.length) {
        return res.status(401).json({ res: false, message: 'El correo electrónico que ingresó no está registrado en el sistema' }) 
    }

    return verifyUser(response, user, res)
}

const verifyUser = async (response: any, user: any, res: NextApiResponse<Object>) => {
    bcrypt.compare(response.password, user[0].password, function (err, result) {
        if (!err && result) {
            const token = jwt.sign({ sub: user[0].id, email: user[0].email, typeUser: user[0].typeUserId ? user[0].typeUserId : user[0].typeUser }, secret, { expiresIn: '8h' })
            
            res.setHeader("Set-Cookie",
                cookie.serialize('auth', token, {
                    httpOnly: true, // not let use js code in the client side
                    secure: process.env.NODE_ENV !== 'development', // Only will work with https conections, but it will work only in production, so while we can work
                    maxAge: ((60 * 60) * 8),
                    sameSite: 'strict',
                    path: '/'
                })
            )
            res.statusCode = 200
            
            return res.json({ res: true, message: 'Inicio de sesión exitoso!', user: user[0].fullName })
        } else {
            return res.status(401).json({ res: false, message: 'El correo electrónico que ingresó no está registrado en el sistema' })
        }
    });
}