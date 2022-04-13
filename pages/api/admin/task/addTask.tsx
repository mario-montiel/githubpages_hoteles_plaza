// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = JSON.parse(req.body)
    
    // await prismaDB.departments
    //     .create({data: {name: response.name}})
    //     .then(response => { res.status(200).json({ res: true, message: 'El departamento se creó con éxito!' }) })
    //     .catch((err) => { res.status(200).json({ res: false, message: 'No se pudo crear el departamento!' }) })
}