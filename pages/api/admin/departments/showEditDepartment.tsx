// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { Authenticated } from '../../../../api/authentication'

export default Authenticated(async function ShowEditDepartment(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = req.body

    prismaDB.departments.findFirst({ where: {name: response} })
    .then((responseDB) => { res.status(200).json({ res: true, data: responseDB }) })
    .catch((err) => { res.status(500).json({ res: false, message: 'No se pudieron obtener los datos del departamento!', messageError: err }) })
})