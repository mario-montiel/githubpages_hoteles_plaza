// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React or Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'

// Types

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

    const cookie = req.cookies.auth
    const response = JSON.parse(req.body)
    const currentUser: any = jwt.verify(cookie, secret);
    const user = await checkUserInDB(currentUser, response.password)
    
    if (user) { return verifyPassword(user, response.password, res) }

    return res.status(401).json({ res: false, message: 'No se encontró ningún usuario con el correo' + currentUser.email }) 
}

const checkUserInDB = async (currentUser: any, password: string) => {
    const admin = await prismaDB.superAdmin.findUnique({
        where: { email: currentUser.email }
    })

    if (admin) { return admin }
    
    const user = await prismaDB.users.findFirst({
        where: { email: currentUser.email }
    })

    if (user) { return user }

    return false
}

const verifyPassword = (currentUser: any, password: string, res: NextApiResponse<Object>) => {
    bcrypt.compare(password, currentUser.password, function (err, result) {
        
        if (result) {
            return res.status(200).json({ res: true, message: 'La contraseña coincide con el usuario actual' })
        }

        return res.status(401).json({ res: false, message: 'La contraseña que ingresaste no coincide con el usuario actual' })
    });
}