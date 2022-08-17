// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../../api/secret';
import { Authenticated } from '../../../../../api/authentication'
import { RoomTypeImages } from '@prisma/client';
import { RoomType } from '../../../../../types/RoomType';

export default Authenticated(async function AddRoomType(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = verify(cookie, secret);
    const response = req.body
    const roomType: any = await createRoomType(response, res, currentUser.email)
    const data = await generateData(response.roomTypeImages, roomType, currentUser.email)
    console.log('DATA: ', data);
    
    await creatRoomTypeOnHotels(data, res)

    res.status(200).json({ res: true, message: 'El tipo de habitación se creó con éxito' })
})

const createRoomType = async (response: any, res: NextApiResponse, currentUser: string) => {
    const typeRoomData = {
        name: response.name,
        title: response.title,
        smoke: response.smoke,
        keyWord: response.keyWord,
        editedBy: currentUser,
        description: response.description,
        maxPeople: parseInt(response.maxPeople),
        costPerNight: parseFloat(response.costPerNight)
    }

    const roomType = await prismaDB.roomType.create({ data: typeRoomData })

    if (!roomType) {
        res.status(200).json({ res: false, message: 'No se pudo crear el tipo de habitación!' })
    }

    return roomType
}

const creatRoomTypeOnHotels = async (arrayRoomTypeImages: Array<any>, res: NextApiResponse) => {
    const roomTypeOnHotel = await prismaDB.roomTypeImages.createMany({
        data: arrayRoomTypeImages
    })

    if (!roomTypeOnHotel) {
        res.status(200).json({ res: false, message: 'No se pudo crear el tipo de habitación!' })
    }

    return true
}

const generateData = (roomTypeImages: Array<RoomTypeImages>, roomType: RoomType, currentUser: string) => {
    let arrayImages: any = []
    roomTypeImages.forEach((data: RoomTypeImages) => {
        const imageData = {
            index: data.index,
            hotelId: data.hotelId,
            roomTypeId: roomType.id,
            pathDirect: data.pathDirect,
            imageUrl: data.imageUrl,
            editedBy: currentUser,
            createdAt: new Date()
        }
        
        arrayImages.push(imageData)
    });

    return arrayImages
}