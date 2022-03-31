// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import sgMail from '@sendgrid/mail'
// import { MessageEmail } from '../../../../types/MessageEmail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export default async function SendEmail(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    
    const rooms = await checkBooking()

    res.status(200).json({ res: true, message: 'Mensaje enviado correctamente', data: rooms })

}

const checkBooking = async () => {
    const allRooms = await prismaDB.rooms.findMany()
    console.log(allRooms);
    
    return allRooms
}