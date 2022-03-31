// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { serialize } from 'cookie'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { userSecret } from '../../../../api/secret'
import { Guest } from '../../../../types/Guest'

export default async function Login(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = req.body;
    const guest = await getGuest(response)
    const verify = await compare(response.password, guest!.password)

    if (!guest) {
        return res.status(401).json({ res: false, message: 'El correo electrónico no está registrado en el sistema' })
    }

    if (verify) {
        const token = sign({ sub: guest.id, email: guest.email, name: guest.fullName }, userSecret, { expiresIn: '8h' })
        res.setHeader("Set-Cookie",
            serialize('userAuth', token, {
                httpOnly: true, // not let use js code in the client side
                secure: process.env.NODE_ENV !== 'development', // Only will work with https conections, but it will work only in production, so while we can work
                maxAge: ((60 * 60) * 8),
                sameSite: 'strict',
                path: '/'
            }))

        return res.status(200).json({ res: true, message: `Bienvenido ${guest.fullName}`, user: guest.fullName })
    }

    res.status(401).json({ res: false, message: 'Contraseña inválida' })
}

const getGuest = async (response: Guest) => {
    const guest = await prismaDB.guest.findUnique({
        where: {
            email: response.email
        }
    })

    return guest
}