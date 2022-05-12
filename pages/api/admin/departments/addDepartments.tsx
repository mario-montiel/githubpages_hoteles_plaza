// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import { verify } from 'jsonwebtoken'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'
import { Authenticated } from '../../../../api/authentication'

export default Authenticated(async function AddDepartment(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = verify(cookie, secret);
    const departmentData = {
        name: req.body.name,
        editedBy: currentUser.email
    }
    
    prismaDB.departments
    .create({data: departmentData })
    .then(() => { res.status(200).json({ res: true, message: 'El usuario se creó con éxito!' }) })
    .catch(() => { res.status(500).json({ res: false, message: 'No se pudo crear el usuario!' }) })
})