// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import * as cookie from 'cookie'
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'

export default async function getRoomsTypeWebsite(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    if (req.cookies && req.cookies.hotel_plaza) {
        const cookie = req.cookies.hotel_plaza
        const roomTypeSelected: any = await verify(cookie, secret);
        return res.json({ res: true, data: roomTypeSelected.bookingStepData })
    }

    return res.json({ res: true, data: [] })
}