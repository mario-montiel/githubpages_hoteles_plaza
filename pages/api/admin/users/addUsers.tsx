// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Authenticated } from '../../../../api/authentication'
import { User, UserForm } from '../../../../types/User';
import { userInfo } from 'os';
import { secret } from '../../../../api/secret'

type Hotels = {
    id: number,
    checked: boolean
}

type UsersOnHotes = {
    hotelId: number,
    userId: number,
    assignedBy: string
}

export default async function AddUser(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    // let hotels: Array<string> = []
    const response = JSON.parse(req.body)
    const userExist = await verifyIfUserExist(response.email)

    if (userExist) {
        return res.status(200).json({ res: false, message: 'The user is registred in the system' })
    }

    const hotels: any = await validateTheHotelsSelected(response.hotel)

    if (!hotels.length) {
        return res.status(200).json({ res: false, message: 'There are not hotels selected' })
    }

    bcrypt.hash(response.password, 12, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            return res.status(200).json({ res: false, message: 'No se pudo generar la contraseña HASH al usuario!' })
        }

        const userId = await createUser(response, hash, hotels, res)
        const dataToSaveInDB: any = await prepareDataToSaveInDB('currentUser.email', userId, response, hotels)
        await assignHotelToUser(dataToSaveInDB)

        return res.status(200).json({ res: true, message: 'The user was edited in the system' })



        // res.status(401).json({ message: "Lo sentimos pero usted no está autendicado!" })

        // jwt.verify(authorization, secret, async (err: any, currentUser: any) => {
        //     if (!err && currentUser) {
        //         console.log(currentUser);

        //         const userId = await createUser(response, hash, hotels, res)
        //         const dataToSaveInDB: any = await prepareDataToSaveInDB(currentUser.email, userId, response, hotels)
        //         await assignHotelToUser(dataToSaveInDB)

        //         return res.status(200).json({ res: true, message: 'The user was edited in the system' })
        //     }


        //     res.status(401).json({ message: "Lo sentimos pero usted no está autendicado!" })
        // });
    });
}

const verifyIfUserExist = (email: string) => {
    const userExist = prismaDB.users.findUnique({
        where: {
            email: email
        }
    })

    return userExist
}

const validateTheHotelsSelected = (hotels: Hotels[]) => {
    let aHotels: any = []

    hotels.forEach(hotel => {
        if (hotel.checked) {
            aHotels.push(hotel)
        }
    });

    return aHotels
}

const createUser = async (userData: any, hashPassword: string, hotels: Array<Hotels>, res: NextApiResponse) => {
    const userId = await prismaDB.users
        .create({
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
                registredBy: 'x'
            }
        })
    return userId.id
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
    prismaDB.usersOnHotels.createMany({
        data
    })
    .catch((err: any) => {
        console.log(err);
    })
}