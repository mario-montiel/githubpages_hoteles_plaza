// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../../api/secret'
import { Authenticated } from '../../../../../api/authentication'

export default Authenticated(async function EditRoomStatus(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = verify(cookie, secret);
    const response = req.body
    const statusRoomData = {
        name: response.name,
        backgroundColor: response.backgroundColor,
        textColor: response.textColor,
        border: response.border,
        editedBy: currentUser.email
    }
    
    await prismaDB.roomStatus.update({
        where: { id: response.id },
        data: statusRoomData
    })
    .then(() => { res.status(200).json({ res: true, message: 'Estatus de habitación actualizado con éxito!' }) })
    .catch(() => { res.status(500).json({ res: false, message: 'No se pudo editar el estatus de habitación!' }) })
})