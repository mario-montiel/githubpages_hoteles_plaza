// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../../prisma/Instance'
import { Authenticated } from '../../../../../api/authentication'

export default Authenticated(async function RemoveRoomStatus(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = req.body

    prismaDB.roomStatus
    .delete({ where: { id: response.id } })
    .then((responseDB) => { res.status(200).json({ res: responseDB ? true : false, message: 'El estatus de la habitación se eliminó con éxito!' }) })
    .catch(() => { res.status(500).json({ res: false, message: 'No se pudo eliminar el estatus de la habitación!' }) })
})