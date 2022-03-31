// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { secret } from '../../../../api/secret'
import { Authenticated } from '../../../../api/authentication'
import { Hotel, HotelForm, PlaceOfInterestElement } from '../../../../types/Hotel';
import { User } from '../../../../types/User'
import { timeStamp } from 'console'

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
    const authorization: string = req.cookies.auth || ''
    const response = JSON.parse(req.body)
    const hotels: any = await validateTheHotelsSelected(response.hotel)
    
    if (!hotels.length) {
        return res.status(200).json({ res: false, message: 'There are not hotels selected' })
    }

    bcrypt.hash(response.password, 12, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            return res.status(200).json({ res: false, message: 'No se pudo generar la contraseña HASH al usuario!' })
        }

        jwt.verify(authorization, secret, async (err: any, currentUser: any) => {
            if (!err && currentUser) {
                const userId = await editUser(response, hash)
                await removeHotelsOfUser(userId)
                const dataToSaveInDB = await prepareDataToSaveInDB(currentUser.email, userId, response, hotels)
                await assignHotelToUser(dataToSaveInDB)

                return res.status(200).json({ res: true, message: 'The user was created in the system' })
            }


            res.status(401).json({ message: "Lo sentimos pero usted no está autendicado!" })
        });
    });
})

const removeHotelsOfUser = async (userId: number) => {
    return await prismaDB.usersOnHotels.deleteMany({
        where: {
            userId
        }
    }).catch((err) => { console.log(err);
    })
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

const editUser = async (userData: any, hashPassword: string) => {
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
                registredBy: 'x'
            },
            include: {
                hotels: {
                    include: {
                        hotel: true
                    }
                }
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
    prismaDB.usersOnHotels.createMany({
        data
    }).catch((err) => {
        console.log(err);
    })
}