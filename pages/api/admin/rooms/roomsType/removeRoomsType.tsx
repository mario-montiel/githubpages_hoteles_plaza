// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import prismaDB from '../../../../../prisma/Instance'

// Helpers
import { Authenticated } from '../../../../../api/authentication'
import { getModuleUrl } from '../../../../../api/getDirModuleUrl'
import { RegisterDataRemoved } from '../../../../../api/registerDataRemoved'
import { RoomTypeImages } from '@prisma/client'

export default Authenticated(async function RemoveRoomType(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const response = req.body
    const dirModuleUrl = await getModuleUrl(req)

    try {
        if (!dirModuleUrl) {
            return res.status(200).json({ res: false, message: 'Ocurrió un problema y no se pudo registar el usuario que eliminará la información' })
        }

        await RegisterDataRemoved(cookie, response.reasonToDelete, dirModuleUrl)

        if (response.roomType && response.roomType.RoomTypeImages && response.roomType.RoomTypeImages.length) {
            const roomTypeImages: Array<number> = await generateImagesData(response.roomType.RoomTypeImages)
            await removeRoomTypeImages(roomTypeImages, res)
        }
        
        if (response.roomType && response.roomType.ServicesOnRoom && response.roomType.ServicesOnRoom.length) {
            const servicesOnRoom: Array<number> = await generateServicesData(response.roomType.ServicesOnRoom)
            await removeServicesOnRoom(servicesOnRoom, res)
        }

        await removeRoomType(response.roomType, res)
        
        res.status(200).json({ res: true, message: 'Se eliminó el tipo de habitación con éxito!' })
    } catch (error) {
        console.log('ERROR MESSAGE. ', error);
        return res.status(200).json({ res: false, message: 'Ocurrió un problema y no se pudo eliminar el tipo de habitación' })
    }
})

const removeRoomType = async (response: any, res: NextApiResponse) => {
    await prismaDB.roomType.delete({ where: { id: response.id } })
}

const removeRoomTypeImages = async (arrayImagesId: Array<number>, res: NextApiResponse) => {
    await prismaDB.roomTypeImages.deleteMany({ where: { id: { in: arrayImagesId } } })
    .catch((error) => { console.log(error); res.status(200).json({ res: false, message: 'No se pudieron eliminar las imágenes del tipo de habitación!' }) })
}

const removeServicesOnRoom = async (arrayServicesId: Array<number>, res: NextApiResponse) => {
    await prismaDB.servicesOnRoom.deleteMany({ where: { id: { in: arrayServicesId } } })
    .catch((error) => { console.log(error); res.status(200).json({ res: false, message: 'No se pudieron eliminar los servicios del tipo de habitación!' }) })
} 

const generateImagesData = async (roomTypeImages: Array<RoomTypeImages>) => {
    const ImagesIdToRemove = roomTypeImages.map((roomTypeImage) => roomTypeImage.id )
    return ImagesIdToRemove
}

const generateServicesData = async (servicesOnRoom: Array<RoomTypeImages>) => {
    const ImagesIdToRemove = servicesOnRoom.map((serviceOnRoom) => serviceOnRoom.id )
    return ImagesIdToRemove
}