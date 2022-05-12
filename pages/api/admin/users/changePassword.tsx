// Next.js API route support: https://nextjs.org/docs/api-routes
// React and Next/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { verify } from 'jsonwebtoken'
import { hash, hashSync } from 'bcrypt'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'
import { Authenticated } from '../../../../api/authentication'

export default Authenticated(async function ShowCurrentUser(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = verify(cookie, secret);
    const response = JSON.parse(req.body)
    const salt = 12
    const hashPassword = hashSync(response.password, salt)
    await prismaDB.users.update({
        where: { email: response.user.email },
        data: {
            password: hashPassword,
            editedBy: currentUser.email
        }
    }).catch(() => { res.status(200).json({ res: false, message: 'No se pudo actualizada su contraseña!' }) })
    
    res.status(200).json({ res: true, message: 'Contraseña actualizada con éxito!' })
})