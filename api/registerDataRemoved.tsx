// React and Next

// Libraries
import * as jwt from 'jsonwebtoken'
import prismaDB from '../prisma/Instance'

// Helpers
import { secret } from './secret'

export const RegisterDataRemoved = async (cookie: any, reason: string, module: string) => {
    const currentUser: any = jwt.verify(cookie, secret);
    const user: string = currentUser.typeUser
    
    await prismaDB.activityOfDeleteData.create({
        data: {
            user: currentUser.email,
            reason,
            createdAt: new Date(),
            module,
            typeUser: user
        }
    })

    return true
}