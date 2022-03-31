// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import sgMail from '@sendgrid/mail'
// import { MessageEmail } from '../../../../types/MessageEmail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

// LD = Landing Page
export default async function LDRoomsType(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    
    const roomsType = await getRoomsType()

    res.status(200).json({ res: true, message: 'Tipos de habitaciones obtenidos con éxito', data: roomsType })

}

const getRoomsType = async () => {
    const allRoomsType = await prismaDB.roomType.findMany()
    console.log(allRoomsType);
    
    return allRoomsType
}