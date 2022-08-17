// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'
import { Authenticated } from '../../../../api/authentication'
import { Services } from '@prisma/client'

export default Authenticated(async function EditService(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = verify(cookie, secret);
    const response = req.body
    const service = await editService(response, currentUser.email, res)

    if (service) {
        const data = await generateData(service, response)
        await removeAttachServiceRoomType(response, res)
        await attachServiceRoomType(data, res)
    }

    return res.status(200).json({ res: true, message: "Se creó el servicio con éxito!" })
})

const generateData = async (service: Services, response: any) => {
    const roomTypeSelected = response.ServicesOnRoom
    const dataGenerated = roomTypeSelected.map((roomType: number) => {
        const data = {
            roomTypeId: parseInt(roomType.toString()),
            serviceId: parseInt(service.id.toString())
        }
        
        return data
    });

    return dataGenerated
}

const editService = async (response: any, currentUser: string, res: NextApiResponse) => {
    const service = await prismaDB.services.update({
        where: { id: response.id },
        data: {
            name: response.name,
            description: response.description,
            icon: response.icon,
            mainInformation: response.mainInformation,
            editedBy: currentUser
        }
    })

    if (!service) {
        res.status(200).json({ res: false, message: 'No se pudo actualizar el servicio' })
    }

    return service
}

const removeAttachServiceRoomType = async (response: any, res: NextApiResponse) => {
    const serviceRoomType = await prismaDB.servicesOnRoom.deleteMany({ where: { serviceId: response.id } })

    if (!serviceRoomType) {
        return res.status(200).json({ res: false, message: "No se pudo eliminar el servicio en el tipo de habitación seleccionado" })
    }
}

const attachServiceRoomType = async (data: any, res: NextApiResponse) => {
    const serviceRoomType = await prismaDB.servicesOnRoom.createMany({ data })

    if (!serviceRoomType) {
        return res.status(200).json({ res: false, message: "No se pudo asignar el servicio al tipo de habitación seleccionado" })
    }

    return true
}