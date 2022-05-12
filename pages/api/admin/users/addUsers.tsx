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

type Hotels = {
    id: number,
    checked: boolean
}

type UsersOnHotes = {
    hotelId: number,
    userId: number,
    assignedBy: string
}

export default Authenticated(async function AddUser(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = verify(cookie, secret);
    const response = JSON.parse(req.body)
    const userExist = await verifyIfUserExist(response.dataForm.email)
    
    if (userExist) {
        return res.status(200).json({ res: false, message: 'El usuario ya existe en el sistema' })
    }

    if (!response.hotels && !response.hotels.length) {
        return res.status(200).json({ res: false, message: 'There are not hotels selected' })
    }

    hash(response.dataForm.password, 12, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            return res.status(200).json({ res: false, message: 'No se pudo generar la contraseña HASH al usuario!' })
        }

        const userId = await createUser(response.dataForm, hash)
        const dataToSaveInDB: any = await prepareDataToSaveInDB(currentUser.email, userId, response.hotels)
        await assignHotelToUser(dataToSaveInDB)
        
        return res.status(200).json({ res: true, message: 'El usuario fue registrado con éxito!' })
    });
})

const verifyIfUserExist = async (email: string) => {
    const userExist = await prismaDB.users.findUnique({
        where: { email: email }
    })
    
    return userExist
}

const createUser = async (userData: any, hashPassword: string) => {
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
                editedBy: 'x'
            }
        })
    return userId.id
}

const prepareDataToSaveInDB = (currentUser: string, userId: number, hotels: Array<Hotels>) => {
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
    prismaDB.usersOnHotels.createMany({ data })
    .catch((err: any) => { console.log(err); })
}