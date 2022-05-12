// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { hash } from 'bcrypt'
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'
import { Authenticated } from '../../../../api/authentication'

// Types
import { User } from '../../../../types/User'

type Hotels = {
    id: number,
    checked: boolean
}

type UsersOnHotes = {
    hotelId: number,
    userId: number,
    assignedBy: string
}

export default Authenticated(async function EditUser(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    const cookie = req.cookies.auth
    const response = JSON.parse(req.body)

    const userExist = await verifyIfUserExist(response.user)

    if (userExist) {
        return res.status(200).json({ res: false, message: 'El usuario ya existe en el sistema' })
    }

    if (!response.hotel.length) {
        return res.status(200).json({ res: false, message: 'There are not hotels selected' })
    }

    hash(response.password, 12, async function (err, hash) {
        if (err) {
            return res.status(200).json({ res: false, message: 'No se pudo generar la contraseña HASH al usuario!' })
        }

        verify(cookie, secret, async (err: any, currentUser: any) => {
            if (!err && currentUser) {
                // Store hash in your password DB.
                const userId = await editUser(response, hash, currentUser)
                await removeHotelsOfUser(userId)
                const dataToSaveInDB = await prepareDataToSaveInDB(currentUser.email, userId, response, response.hotel)
                await assignHotelToUser(dataToSaveInDB)

                return res.status(200).json({ res: true, message: 'The user was created in the system' })
            }

            res.status(401).json({ message: "Lo sentimos pero usted no está autendicado!" })
        });
    });
})

const verifyIfUserExist = async (user: User) => {
    const userData = await prismaDB.users.findFirst({
        where: { email: user.email }
    })

    return userData
}

const removeHotelsOfUser = async (userId: number) => {
    return await prismaDB.usersOnHotels
        .deleteMany({ where: { userId } })
        .catch((err: any) => { console.log(err); })
}

const editUser = async (userData: any, hashPassword: string, currentUser: any) => {
    const userEdited = await prismaDB.users
        .update({
            where: { id: userData.id },
            data: {
                fullName: userData.fullName,
                lastName: userData.lastName,
                email: userData.email,
                password: hashPassword,
                status: userData.status,
                phone: userData.phone,
                // image: response.status,
                typeUserId: parseInt(userData.typeUserId),
                departmentId: parseInt(userData.departmentId),
                editedBy: currentUser.email
            },
            include: {
                hotels: { include: { hotel: true } }
            }
        })
    return userEdited.id
}

const prepareDataToSaveInDB = (currentUser: string, userId: number, user: User, hotels: Array<Hotels>) => {
    let aData: any = []

    hotels.forEach(hotel => {
        const data = {
            hotelId: parseInt(hotel.id.toString()),
            userId: userId,
            assignedBy: currentUser
        }

        aData.push(data)
    });

    return aData
}

const assignHotelToUser = async (data: UsersOnHotes[]) => {
    prismaDB.usersOnHotels
        .createMany({ data })
        .catch((err: any) => { console.log(err); })
}