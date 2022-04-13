// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'
import * as jwt from 'jsonwebtoken'
import { secret } from '../../../../api/secret'

export default Authenticated(async function ReadOrChangePreferences(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const authorization: string = req.cookies.auth ||''
    const response = JSON.parse(req.body)

    jwt.verify(authorization, secret, async (err, decoded) => {
        if (!err && decoded) {
            const user = await prismaDB.users.update({
                where: { email: decoded.email },
                data: {
                    preferencesId: response
                }
            })
        
            if (user) {
                return res.json(user)
            }

            return res.status(401).json({ message: "Lo sentimos pero usted no está autendicado!" })
        }
    });
})