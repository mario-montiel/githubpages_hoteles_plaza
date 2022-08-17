// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import * as cookie from 'cookie'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
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
    const response = req.body
    console.log(response);
    
    // try {
    //     const response = req.body
    //     res.setHeader("Set-Cookie",
    //         cookie.serialize('hotel_plaza', jwt.sign(response, secret, { expiresIn: '8h' }), {
    //             httpOnly: true, // not let use js code in the client side
    //             secure: process.env.NODE_ENV !== 'development', // Only will work with https conections, but it will work only in production, so while we can work
    //             maxAge: ((60 * 60) * 8),
    //             sameSite: 'strict',
    //             path: '/'
    //         })
    //     )
    // }
    // catch (error) {
    //     console.log(error)
    //     return res.json({ res: false, message: 'Ocurrió un error, por favor vuelva a intentarlo más tarde' })
    // }

    return res.json({ res: true })
}