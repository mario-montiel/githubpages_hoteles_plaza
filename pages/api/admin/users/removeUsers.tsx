// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { Authenticated } from '../../../../api/authentication'
import { RegisterDataRemoved } from '../../../../api/registerDataRemoved'
import { getModuleUrl } from '../../../../api/getDirModuleUrl'

export default Authenticated(async function RemoveUser(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const response = JSON.parse(req.body)
    const dirModuleUrl = await getModuleUrl(req)

    if (!dirModuleUrl) {
        return res.status(200).json({ res: false, message: 'Ocurrió un problema y no se pudo registar el usuario que elimina datos' })
    }
    
    await RegisterDataRemoved(cookie, response.reasonToDelete, dirModuleUrl)
    await removeHotelsOfUser(response.user.id)
    await removeUser(response.user.id)

    return res.status(200).json({ res: true, message: 'Usuario eliminado con éxito!' })
})

const removeHotelsOfUser = async (userId: number) => {
    return await prismaDB.usersOnHotels
    .deleteMany({ where: { userId } })
    .catch((err: any) => { console.log(err); })
}

const removeUser = async (userId: number) => {
    return await prismaDB.users
    .delete({ where: { id: userId } })
    .catch((err: any) => { console.log(err); })
}