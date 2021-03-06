// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../../prisma/Instance'
import { Authenticated } from '../../../../../api/authentication'

export default async function ShowEditRoomStatus(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = JSON.parse(req.body)

    prismaDB.roomStatus.findFirst({ where: {id: response} })
    .then((responseDB) => { res.status(200).json({ res: responseDB ? true : false, data: responseDB ? responseDB : [] }) })
    .catch((err) => { console.log(err);
     res.status(500).json({ res: false, message: 'No existe ninguna categoría con esos datos', messageError: err }) })
}