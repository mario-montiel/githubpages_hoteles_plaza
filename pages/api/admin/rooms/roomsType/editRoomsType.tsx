// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../../api/secret'
import { Authenticated } from '../../../../../api/authentication'
import { RoomType, RoomTypeImages } from '@prisma/client'

export default Authenticated(async function EditRoomType(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = verify(cookie, secret);
    const response = req.body

    console.log('response: ', response);
    
    try {
        const roomType = await editRoomType(response, res, currentUser.email)
        const roomTypeImages = await generateData(response.id, response.RoomTypeImages, currentUser.email)
        
        if (roomTypeImages.length) {
            await removeRoomTypeImagesOnHotel(roomType.id, roomTypeImages, res)
        }
    }
    catch (error: any) { console.log('ERROR MESSAGE. ', error); }
})

const editRoomType = async (response: any, res: NextApiResponse, currentUser: string) => {
    const typeRoomData = {
        id: response.id,
        name: response.name,
        title: response.title,
        editedBy: currentUser,
        updateAt: new Date(),
        smoke: response.smoke,
        keyWord: response.keyWord,
        description: response.description,
        maxPeople: parseInt(response.maxPeople),
        costPerNight: parseFloat(response.costPerNight)
    }

    const roomType = await prismaDB.roomType.update({ where: { id: response.id }, data: typeRoomData })

    if (!roomType) {
        res.status(200).json({ res: false, message: 'No se pudo crear el tipo de habitación!' })
    }

    return roomType
}

const removeRoomTypeImagesOnHotel = async (roomTypeId: number, roomTypeImages: any, res: NextApiResponse) => {
    await prismaDB.roomTypeImages.deleteMany({ where: { roomTypeId: roomTypeId } })
        .then(() => {
            if (roomTypeImages) {
                createRoomTypeOnHotels(roomTypeImages, res)
            }
        })
        .catch((error: any) => { console.log(error); res.status(200).json({ res: false, message: 'No se pudieron eliminar los datos de imágenes del tipo de habitación' }) })

    return true
}

const createRoomTypeOnHotels = async (arrayRoomTypeImages: Array<any>, res: NextApiResponse) => {
    await prismaDB.roomTypeImages.createMany({ data: arrayRoomTypeImages })
        .then((x: any) => {
            res.status(200).json({ res: true, message: 'El tipo de habitación se creó con éxito' }) })
        .catch((error: any) => {console.log(error); res.status(200).json({ res: false, message: 'No se pudieron crear los datos de imágenes del tipo de habitación' })})

    return true
}

const generateData = async (roomTypeId: number, roomTypeImages: any, currentUser: string) => {
    const removeRepeatElements = roomTypeImages.filter((roomTypeImage: any, index: number, array: any) =>
        array.findIndex((roomTypeImage2: any) => (roomTypeImage2.imageUrl == roomTypeImage.imageUrl)) == index
    );
    const imagesValue = removeRepeatElements.map((data: RoomTypeImages) => {
        if (data && data.index >= 0) {
            const imageData = {
                index: data.index,
                hotelId: data.hotelId,
                roomTypeId: roomTypeId,
                pathDirect: data.pathDirect,
                imageUrl: data.imageUrl,
                editedBy: currentUser,
                updateAt: new Date()
            }
    
            return imageData
        }
    });

    return imagesValue
}