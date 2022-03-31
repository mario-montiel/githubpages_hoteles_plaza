import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { secret } from '../api/secret';
import * as jwt from 'jsonwebtoken'

export const Authenticated: any = (fn: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse, jwtCookie?: string) => {
    const authorization: string = req.cookies.auth
    console.log('authorization: ', authorization);

    jwt.verify(authorization, secret, async (err: any, decoded: any) => {
        console.log(decoded);

        if (!err && decoded && decoded.typeUser) {
            return await fn(req, res)
        }

        res.status(401).json({ message: "Lo sentimos pero usted no está autendicado!" })
    });
}

export const AuthenticatedAdmin = (fn: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse, jwtCookie: string) => {
    const authorization: string = req.cookies.auth || ''

    jwt.verify(authorization, secret, async (err, decoded: any) => {
        console.log(decoded);

        if (!err && decoded && decoded.typeUser === 1) {
            return await fn(req, res)
        }

        res.status(401).json({ message: "Usted no cuenta con los privilegios para poder realizar esta acción!", res: false })
    });
}

export const verifyIfIsAdmin = (user: any) => {
    if (user && !user.department && !user.typeUserId && user.typeUser === 'Superadmin') {
        return true
    }

    return false
}