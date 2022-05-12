// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import prismaDB from '../../../../../prisma/Instance'

// Helpers
import { Authenticated } from '../../../../../api/authentication'
import { getModuleUrl } from '../../../../../api/getDirModuleUrl'
import { RegisterDataRemoved } from '../../../../../api/registerDataRemoved'

export default Authenticated(async function RemoveRoomStatus(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const response = req.body
    const dirModuleUrl = await getModuleUrl(req)

    if (!dirModuleUrl) {
        return res.status(200).json({ res: false, message: 'Ocurrió un problema y no se pudo registar el usuario que eliminará la información' })
    }

    await RegisterDataRemoved(cookie, response.reasonToDelete, dirModuleUrl)
    await prismaDB.roomStatus
        .delete({ where: { id: response.roomStatus.id } })
        .then((responseDB: any) => { res.status(200).json({ res: responseDB ? true : false, message: 'El estatus de la habitación se eliminó con éxito!' }) })
        .catch(() => { res.status(500).json({ res: false, message: 'No se pudo eliminar el estatus de la habitación!' }) })
})