// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../api/authentication'
import prismaDB from '../../../../prisma/Instance'
import * as jwt from 'jsonwebtoken'
import { secret } from '../../../../api/secret'

export default async function ShowCurrentUser(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {

    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = jwt.verify(cookie, secret);
    const superAdmin = await prismaDB.superAdmin.findUnique({
        where: { email: currentUser.email },
        include: {
            SuperAdminOnHotels: true
        }
    })
    
    if (superAdmin) {
        return res.json(superAdmin)
    }

    const user = await prismaDB.users.findUnique({
        where: {
            email: currentUser.email
        }
    })

    if (user) {
        return res.json(user)
    }
    
    res.json([])
}