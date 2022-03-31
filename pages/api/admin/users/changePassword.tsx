// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'
import { secret } from '../../../../api/secret'
import { hash, hashSync } from 'bcrypt'

export default async function ShowCurrentUser(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = JSON.parse(req.body)
    const salt = 12
    const hashPassword = hashSync(response.password, salt)
    const passwordChanged = await prismaDB.users.update({
        where: { email: response.user.email },
        data: {
            password: hashPassword
        }
    })
    
    res.status(200).json({ res: true, message: 'Contraseña actualizada con éxito!' })
}