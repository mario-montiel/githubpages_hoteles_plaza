// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { Authenticated } from '../../../../api/authentication'

export default Authenticated(async function ShowEditRoom(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = JSON.parse(req.body)

    await prismaDB.rooms.findUnique(
        {
            where: {
                id: response
            },
            include: {
                roomType: true,
                roomStatus: true,
                lastRoomStatus: true,
                hotel: true
            }
        }
    )
    .then((responseDB: any) => {
        if (responseDB) {
            return res.status(200).json({ res: true, data: responseDB })
        }

        return res.status(500).json({ res: false, data: [] })
    })
    .catch((err: any) => { console.log(err);
     res.status(500).json({ res: false, message: 'No existe ninguna categoría con esos datos', messageError: err }) })
})