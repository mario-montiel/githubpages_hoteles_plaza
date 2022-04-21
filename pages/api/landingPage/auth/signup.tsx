// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { hash } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { secret } from '../../../../api/secret'
import { Guest } from '../../../../types/Guest'

export default async function SendEmail(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    
    const response = JSON.parse(req.body);
    const hashPassword = await hash(response.password, 12)
    
    createGuest(response, hashPassword)
    res.status(200).json({ res: true, message: 'Mensaje enviado correctamente' })

}

const createGuest = async (response: Guest, hashPassword: string) => {
    const guest = await prismaDB.guest.create({
        data: {
            email: response.email,
            password: hashPassword,
            fullName: response.fullName,
            lastName: response.lastName,
            company: response.company,
            city: response.city
        }
    }).catch((err: any) => console.log(err))
}