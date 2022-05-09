// React and Next

// Libraries
import * as jwt from 'jsonwebtoken'
import prismaDB from '../prisma/Instance'

// Helpers
import { secret } from './secret'

export const RegisterDataRemoved = async (cookie: any, reason: string) => {
    const currentUser: any = jwt.verify(cookie, secret);
    
    await prismaDB.activityOfDeleteData.create({
        data: {
            reason,
            createdAt: new Date(),
            user: currentUser.email,
            typeUserId: currentUser.typeUser
        }
    })

    return true
}