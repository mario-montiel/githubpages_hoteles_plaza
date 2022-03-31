// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import sgMail from '@sendgrid/mail'
import { MessageEmail } from '../../../../types/MessageEmail'
import { Email } from '../../../../types/Email'
import { email } from '../../../../api/email'
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export default async function SendEmail(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const response = JSON.parse(req.body);
    console.log('response: ', response);

    await sendEmail(response)
    await saveDataInDB(response)
    await sendGuestEmail(response)

    res.status(200).json({ res: true, message: 'Mensaje enviado correctamente' })

}

const saveDataInDB = async (response: Email) => {
    const data = {
        hotelId: response.hotel.id!,
        email: response.email
    }
    const emailResponse = await prismaDB.onlyEmail.create({
        data
    })

    return emailResponse
}

const sendEmail = async (response: Email) => {
    const msg: any = {
        to: email, // Change to your recipient
        from: email, // Change to your verified sender
        subject: 'Hoteles Plaza',
        html:
            `<div>
                    <h1 style="font-size: 24px;text-align: center;font-family: 'Poppins', sans-serif;">Hoteles Plaza</h1>
                    <p style="font-family: 'Raleway', sans-serif;line-height: 26px;text-align: center;">
                        Hay una persona que desea saber más sobre el ${response.hotel.name}, su correo electrónico es <strong>${response.email}</strong>.
                    </p>
                </div>`
    }

    await sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

}

const sendGuestEmail = async (response: MessageEmail) => {
    const guestEmail = response.email

    const msg: any = {
        to: guestEmail, // Change to your recipient
        from: email, // Change to your verified sender
        subject: 'Hoteles Plaza',
        html:
            `<div>
                    <h1 style="font-size: 24px;text-align: center;font-family: 'Poppins', sans-serif;">Hoteles Plaza</h1>
                    <p style="font-family: 'Raleway', sans-serif;line-height: 26px;text-align: center;">
                        Tu mensaje ha sido enviado con éxito, en breve nos comunicaremos contigo. Gracias.
                    </p>
                </div>`
    }

    await sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

}