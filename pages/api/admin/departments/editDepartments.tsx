// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import prismaDB from '../../../../prisma/Instance'
import * as jwt from 'jsonwebtoken'

// Helpers
import { secret } from '../../../../api/secret'
import { Authenticated } from '../../../../api/authentication'

export default Authenticated(async function EditDepartment(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const response = req.body
    const currentUser: any = jwt.verify(cookie, secret);

    await prismaDB.departments.update({
        where: {
            id: response.id
        },
        data: {
            name: response.name,
            editedBy: currentUser.email,
            updateAt: new Date()
        }
    }).then(() => { res.status(200).json({ res: true, message: 'Departamento actualizado con éxito!' }) })
    .catch(() => { res.status(500).json({ res: false, message: 'No se pudo editar el departamento!' }) })
})