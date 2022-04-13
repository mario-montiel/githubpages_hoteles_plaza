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

    if (!req.body) {
        return res.status(500).json({ message: "Los campos no pueden estar vacíos" })
    }

    const cookie = req.headers.cookie
    console.log('cookie: ', cookie);
    

    console.log(req.body);
    
    const resp: boolean = await verifyPassOfCurrentUser(req.body.email)
    console.log(resp);
    
    if (resp) {
        // const token = jwt.sign({ sub: user[0].id, email: user[0].email }, secret, { expiresIn: '8h' })
        // res.status(200).json({ res: true })
    }

    res.status(401).json({ res: false })
}

const verifyPassOfCurrentUser = async (pass: string) => {
    const user = await prismaDB.users.findFirst({
        where: {
            password: JSON.stringify(pass)
        }
    })

    console.log(user);
    

    if (user) {
        return true
    }

    return false
}