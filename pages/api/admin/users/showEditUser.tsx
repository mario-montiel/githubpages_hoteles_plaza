// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { Authenticated, AuthenticatedAdmin } from '../../../../api/authentication'

export default async function ShowEditUser(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = JSON.parse(req.body)

    prismaDB.users.findFirst({
        where: { id: response },
        include: {
            hotels: {
                include: {
                    hotel: true
                }
            }
        }

    })
        .then((responseDB: any) => {
            res.status(200).json({ res: true, data: responseDB })
        })
        .catch((err: any) => { res.status(500).json({ res: false, message: 'No existe ningun usuario con esos datos', messageError: err }) })
}