// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { Authenticated, AuthenticatedAdmin } from '../../../../api/authentication'

export default async function AddCategory(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    res.json([])
    
    // const response = req.body
    // const categoryData = {
    //     name: response.name,
    //     registredBy: ''
    // }

    // prismaDB.categories
    // .create({data: categoryData})
    // .then(() => { res.status(200).json({ res: true, message: 'La categoría se creó con éxito!' }) })
    // .catch(() => { res.status(500).json({ res: false, message: 'No se pudo crear la categoría!' }) })
}