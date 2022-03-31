// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiKey } from '../../api/openweathermap'

export default async function SendEmail(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    
    const weatherResp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=25.56985&lon=-103.49588&appid=${apiKey}`)
    const weather = await weatherResp.json()

    res.status(200).json({ res: true, message: 'Clima actual', data: weather })
}