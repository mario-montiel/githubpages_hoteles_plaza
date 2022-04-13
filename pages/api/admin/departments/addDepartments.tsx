// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { Authenticated } from '../../../../api/authentication'

export default async function AddDepartment(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    
    const departmentData = {
        name: req.body.name,
        registredBy: ''
    }
    
    prismaDB.departments
    .create({data: departmentData })
    .then(() => { res.status(200).json({ res: true, message: 'El usuario se creó con éxito!' }) })
    .catch(() => { res.status(500).json({ res: false, message: 'No se pudo crear el usuario!' }) })
}