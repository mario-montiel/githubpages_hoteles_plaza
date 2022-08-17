// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'
import { getModuleUrl } from '../../../../api/getDirModuleUrl'
import { Authenticated } from '../../../../api/authentication'
import { RegisterDataRemoved } from '../../../../api/registerDataRemoved'

export default Authenticated(async function RemoveService(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const response = req.body
    const dirModuleUrl = await getModuleUrl(req)
    const arrayId = response.service.ServicesOnRoom.map((element: any)=> { return parseInt(element.id) });
    
    if (!dirModuleUrl) {
        return res.status(200).json({ res: false, message: 'Ocurrió un problema y no se pudo registar el usuario que eliminará la información' })
    }

    await RegisterDataRemoved(cookie, response.reasonToDelete, dirModuleUrl)
    await removeServiceOnRoomType(arrayId, response, res)
    await removeService(response, res)

    return res.status(200).json({ res: true, message: 'El servicio se eliminó con éxito!' })
})

const removeServiceOnRoomType = async (arrayId: Array<number>, response: any, res: NextApiResponse) => {
    const serviceOnRoomType = await prismaDB.servicesOnRoom.deleteMany({
        where: { id: { in: arrayId } }
    })

    if (!serviceOnRoomType) {
        return res.status(200).json({ res: false, message: 'Ocurrió un problema y no se pudo eliminar el servicio' })
    }
}

const removeService = async (response: any, res: NextApiResponse) => {
    const service = await prismaDB.services.delete({ where: { id: response.service.id } })

    if (!service) {
        return res.status(200).json({ res: false, message: 'Ocurrió un problema y no se pudo registar el usuario que eliminará la información' })
    }
}