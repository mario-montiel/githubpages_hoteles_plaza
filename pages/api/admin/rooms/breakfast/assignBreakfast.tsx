// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Authenticated } from '../../../../../api/authentication'
import prismaDB from '../../../../../prisma/Instance'
import { Room } from '../../../../../types/Room'

export default Authenticated(async function AddRooms(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    const authorization: string = req.cookies.auth || ''
    const response = JSON.parse(req.body)
    // console.log(response);
    const dataGenerated = await generateData(response)
    

    res.status(200).json({ res: true, message: 'Breakfast added into room successful' })
})

const generateData = (roomData: Room) => {
    console.log(roomData);
    const id = generateId()
    const breakfastConsumed = {

    }
}

const generateId = () => {
    const date = new Date()
    
}
