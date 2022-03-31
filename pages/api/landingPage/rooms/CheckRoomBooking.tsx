// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { Room } from '../../../../types/Room';
// import sgMail from '@sendgrid/mail'
// import { MessageEmail } from '../../../../types/MessageEmail'
// sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export default async function SendEmail(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    const response = JSON.parse(req.body);
    // const datesGenerated = await generateDates(response, res)
    // const dates = await checkRommsNotHaveBooking(datesGenerated)


    // const allRoomsOfHotel = await getAllRooms(response.hotel)
    // const roomsAvailables = await getRoomsAvailables(response, allRoomsOfHotel)
    // console.log(allRoomsOfHotel.length);
    

    /* */
    const allRooms = await getAllRooms(response)
    const roomsBooking = await checkRoomsWithBooking(response)
    const roomsAvailable = await getRoomsAvailables(allRooms, response)
    // console.log('res: ', roomsAvailable.length);
    
    res.status(200).json({ res: true, message: 'Mensaje enviado correctamente', data: roomsAvailable })
}





const getAllRooms = async (response: any) => {
    const rooms = prismaDB.rooms.findMany({
        where: {
            hotelId: response.hotel
        }
    })

    return rooms
}

const diffDates = (responseCheckIn: number, roomCheckIn: number, responseCheckOut: number, roomCheckOut: number) => {
    const checkIndiff = responseCheckIn - roomCheckIn;
    const checkOutdiff = responseCheckOut - roomCheckOut
    const checkInDiffDays = Math.round(checkIndiff / (1000 * 60 * 60 * 24))
    const checkOutDiffDays = Math.round(checkOutdiff / (1000 * 60 * 60 * 24))

    // console.log('checkIndiff: ', checkIndiff);
    // console.log('checkOutdiff: ', checkOutdiff);
    
    const dateTimeResp = {
        checkInDiffDays,
        checkOutDiffDays
    }
    
    return dateTimeResp
}

const totalDiffDates = async (responseCheckIn: number, roomCheckIn: number) => {
    const checkIndiff = responseCheckIn - roomCheckIn;
    const checkInDiffDays = Math.round(checkIndiff / (1000 * 60 * 60 * 24))
    
    return checkInDiffDays
}

const getRoomsAvailables = async (allRooms: Array<any>, response: any) => {
    let roomsWith10DaysBeforeToBooking: Array<any> = []
    let roomsWithoutBooking: Array<any> = []
    console.log('response: ', response);
    
    const responseCheckInToBooking = new Date(response.checkIn).getTime()
    const responseCheckOutToBooking = new Date(response.checkOut).getTime()

    console.log('responseCheckInToBooking ', responseCheckInToBooking);
    console.log('responseCheckOutToBooking: ', responseCheckOutToBooking);
    
    const totalDiffDays = await totalDiffDates(responseCheckInToBooking, responseCheckOutToBooking)
    console.log('totalDiffDays: ',totalDiffDays);
    
    
    // roomsBooking.forEach(room => {
    //     const roomCheckInDateToBooking: number = room.checkIn ? new Date(room.checkIn).getTime() : 0
    //     const roomCheckOutDateToBooking: number = room.checkOut ? new Date(room.checkOut).getTime() : 0
    //     const diffDays = diffDates(responseCheckInToBooking, roomCheckInDateToBooking, responseCheckOutToBooking, roomCheckOutDateToBooking)
    //     console.log('diffDays: ', diffDays);

    //     if (room.checkIn) {
    //         console.log(room.checkIn);
            
    //     }
        
    //     if (diffDays.checkInDiffDays < 0 && diffDays.checkInDiffDays > -3) {
    //         roomsWith10DaysBeforeToBooking.push(room)
    //     }
    // });

    allRooms.forEach((room) => {
        const roomCheckInDateToBooking: number = room.checkIn ? new Date(room.checkIn).getTime() : 0
        const roomCheckOutDateToBooking: number = room.checkOut ? new Date(room.checkOut).getTime() : 0
        // console.log(roomCheckInDateToBooking);
        const diffDays = diffDates(responseCheckInToBooking, roomCheckInDateToBooking, responseCheckOutToBooking, roomCheckOutDateToBooking)
        // console.log(diffDays);

        if (diffDays.checkInDiffDays < 0 && diffDays.checkInDiffDays >= -1) {
            roomsWithoutBooking.push(room)
        }
        
        // if (roomsWith10DaysBeforeToBooking.findIndex(room => room.id == rooms.id) == -1) {
        //     roomsWithoutBooking.push(rooms)
        // }
    });

    console.log('RESP: ', roomsWithoutBooking);
    

    return roomsWithoutBooking
}


// const getRoomsAvailables = async (allRooms: Array<any>, roomsBooking: Array<any>, response: any) => {
//     let roomsWith10DaysBeforeToBooking: Array<any> = []
//     let roomsWithoutBooking: Array<any> = []
//     const responseCheckInToBooking = new Date(response.checkIn).getTime()
//     const responseCheckOutToBooking = new Date(response.checkOut).getTime()
//     console.log('roomsBooking: ', roomsBooking);
    
//     roomsBooking.forEach(room => {
//         const roomCheckInDateToBooking: number = room.checkIn ? new Date(room.checkIn).getTime() : 0
//         const roomCheckOutDateToBooking: number = room.checkOut ? new Date(room.checkOut).getTime() : 0
//         const diffDays = diffDates(responseCheckInToBooking, roomCheckInDateToBooking, responseCheckOutToBooking, roomCheckOutDateToBooking)
//         console.log('diffDays: ', diffDays);

//         if (room.checkIn) {
//             console.log(room.checkIn);
            
//         }
        
//         if (diffDays.checkInDiffDays < 0 && diffDays.checkInDiffDays > -3) {
//             roomsWith10DaysBeforeToBooking.push(room)
//         }
//     });

//     allRooms.forEach((rooms) => {
//         if (roomsWith10DaysBeforeToBooking.findIndex(room => room.id == rooms.id) == -1) {
//             roomsWithoutBooking.push(rooms)
//         }
//     });

//     return roomsWithoutBooking
// }

// const generateDates = async (response: any, res: NextApiResponse) => {
//     const initialDate = new Date(
//         response.initialDate.year,
//         response.initialDate.month,
//         response.initialDate.day
//     )
//     const endDate = new Date(
//         response.endDate.year,
//         response.endDate.month,
//         response.endDate.day
//     )

//     if (!initialDate.getTime()) {
//         return res.status(500).json({ res: false, message: 'Las fechas que ingresó son inválidas' })
//     }

//     if (!endDate.getTime()) {
//         return res.status(500).json({ res: false, message: 'Las fechas que ingresó son inválidas' })
//     }

//     const dates = {
//         initialDate,
//         endDate
//     }

//     return dates
// }

const checkRoomsWithBooking = async (response: any) => {
    const roomsFinded = await prismaDB.rooms.findMany({
        where: {
            checkIn: { lte: response.checkIn },
            hotelId: response.hotel
        }
    })
    
    return roomsFinded
}

// const checkRommsNotHaveBooking = async (dates: any) => {
//     const roomsFinded = await prismaDB.rooms.findMany({
//         where: {
//             checkIn: {
//                 gte: dates.initialDate
//             }
//         }
//     })

//     return roomsFinded
// }