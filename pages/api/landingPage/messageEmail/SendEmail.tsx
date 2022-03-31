// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import sgMail from '@sendgrid/mail'
import { MessageEmail } from '../../../../types/MessageEmail'
import styles from '../../../../styles/Email.module.css'
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

    await sendEmail(response)
    await saveDataInDB(response)
    await sendGuestEmail(response)

    res.status(200).json({ res: true, message: 'Mensaje enviado correctamente' })

}

const saveDataInDB = async (response: MessageEmail) => {
    const data = {
        name: response.name,
        email: response.email,
        message: response.message,
        bookingType: response.bookingType,
        bookingDays: response.bookingDays,
        hotelId: response.hotelSelected.id,
    }
    const emailResponse = await prismaDB.emailForm.create({
        data
    })

    return emailResponse
}

const sendEmail = async (response: MessageEmail) => {
    const msg: any = {
        to: email, // Change to your recipient
        from: email, // Change to your verified sender
        subject: 'Hoteles Plaza',
        html:
            `<div>
                    <h1 style="font-size: 24px;text-align: center;font-family: 'Poppins', sans-serif;">Hoteles Plaza</h1>
                    <p style="font-family: 'Raleway', sans-serif;line-height: 26px;text-align: center;">
                        La persona <strong>${response.name}</strong> solicita información del ${response.hotelSelected.name}
                        para hospedarse ${response.bookingDays} ${response.bookingDays === 1 ? 'día' : 'días'}.
                    </p>
                    <p style="font-style: italic;font-weight: 600;text-align: center;font-size: 14px;line-height: 26px;">
                        ${response.message}
                    </p>
                    <ul style="list-style: none;padding: 1rem;margin: 3rem auto 0rem auto;background-color: #f3f3f3;">
                        <li style="margin: 10px 0px;text-align: center;font-family: 'Poppins', sans-serif;font-size: 13px;">Tipo de hospedaje: <strong>${response.bookingType}</strong></li>
                        <li style="margin: 10px 0px;text-align: center;font-family: 'Poppins', sans-serif;font-size: 13px;">Correo electrónico: <strong>${response.email}</strong></li>
                    </ul>
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