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

    const roomsFiltered = await getAllRoomTypes()

    res.status(200).json({ res: true, message: 'Todas las habitaciones obtenidas con éxito', data: roomsFiltered })

}

const getAllRoomTypes = async () => {
    const allRoomsType = await prismaDB.rooms.findMany({
        orderBy: [
            { roomNumber: 'asc' },
            { roomTypeId: 'asc' },
            { floor: 'asc' }
        ],
        include: {
            roomType: true
        }
    })
    console.log(allRoomsType);

    return allRoomsType
}