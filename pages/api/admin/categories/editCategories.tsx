// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { Authenticated } from '../../../../api/authentication'

export default Authenticated(async function EditCategory(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    res.json([])

    // const response = req.body

    // await prismaDB.categories.update({
    //     where: {
    //         id: response.id
    //     },
    //     data: {
    //         name: response.name
    //     }
    // }).then(() => { res.status(200).json({ res: true, message: 'Categoría actualizada con éxito!' }) })
    // .catch(() => { res.status(500).json({ res: false, message: 'No se pudo editar la categoría!' }) })
})