// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// React and Next
import type { NextApiRequest, NextApiResponse } from 'next'

// Libraries
import * as jwt from 'jsonwebtoken'
import prismaDB from '../../../../prisma/Instance'

// Helpers
import { secret } from '../../../../api/secret'
import { Authenticated } from '../../../../api/authentication'

// Types
import { Hotel, HotelForm, PlaceOfInterestElement } from '../../../../types/Hotel'

export default Authenticated(async function AddHotel(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    const cookie = req.cookies.auth
    const currentUser: any = jwt.verify(cookie, secret);
    const response = req.body;

    if (req.body && req.body.type && res) {
        switch (req.body.type) {
            case 'verify':
                await verifyIfHotelExist(response.dataForm, res)
                break;
            case 'veryfied':
                await createHotelInDB(response.dataForm, response.roomData, res, currentUser)
                break;

            default:
                res.status(500).json({ res: true, message: 'No data found', })
                break;
        }
    }
})

const registerPlacesAndRooms = async (response: HotelForm, places: Array<PlaceOfInterestElement>, roomData: any, res: NextApiResponse, currentUser: any) => {
    let placesOfInterest: any = []

    if (places) {
        places.forEach((place: PlaceOfInterestElement) => {
            const data = {
                name: place.name,
                distance: place.distance,
                duration: place.duration,
                travelMode: place.travelMode,
                hotelId: (response.id)
            }

            placesOfInterest.push(data)
        });
    }

    const rooms = await generateRooms(response, roomData, currentUser)
    const placesRegistre = await createPlacesOfInterestInDB(placesOfInterest)
    const roomsRegistre = await createRoomsOfHotelInDB(rooms, res)

    if (placesRegistre && roomsRegistre) {
        res.status(200).json({ res: true, message: 'El hotel se creó con éxito!' })
    }
}

const generateRooms = async (hotel: any, roomData: any, currenUser: any) => {
    let emptyArray: any = []
    for (let index = 0; index < roomData.length; index++) {
        let roomNumber = 1
        const room = roomData[index];
        for (let i = 0; i < room.length; i++) {
            const roomElement = room[i];
            for (let j = 0; j < roomElement.quantity; j++) {
                const data = {
                    floor: roomElement.floor,
                    roomNumber: roomNumber,
                    roomTypeId: roomElement.roomTypeId,
                    editedBy: currenUser.email,
                    hotelId: hotel.id,
                    roomStatusId: roomElement.roomStatusId,
                    observations: '',
                    lastRoomStatusId: roomElement.roomStatusId
                }
                emptyArray.push(data)
                roomNumber += 1
            }
        }
    }
    return emptyArray
}

const createRoomsOfHotelInDB = async (rooms: any, res: NextApiResponse) => {
    const roomsRegistre = prismaDB.rooms.createMany({ data: rooms })
        .catch((err: any) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ res: false, message: 'No se pudieron crear las habitaciones!' })
            }
        })

    if (!roomsRegistre) {
        return false
    }

    return true
}

const verifyIfHotelExist = async (hotel: Hotel, res: NextApiResponse) => {
    const hotelExist = await prismaDB.hotels
        .findFirst({
            where: { name: hotel.name }
        })

    if (hotelExist) {
        return res.status(200).json({ res: false, message: 'El hotel ya se encuentra registrado en el sistema', })
    }

    return res.status(200).json({ res: true, message: 'Hotel disponible para registrar', })
}

const createPlacesOfInterestInDB = async (places: any) => {
    const placesRegistre = await prismaDB.placesInterest
        .createMany({ data: places })
        .catch((err: any) => console.log('createPlacesOfInterestInDB ERRR: ', err))

    if (!placesRegistre) {
         return false
    }

    return true
}

const createHotelInDB = async (hotelData: HotelForm, roomData: any, res: NextApiResponse, currentUser: any) => {
    // const categoryId: any = parseInt(hotelData.category_id.toString())
    const email: string = currentUser.email
    const hotelName = hotelData.name.substring(6, hotelData.name.length)
    if (!hotelName.length) { return errorHoteName(res) }
    const hotelSplitName = hotelName.split(' ')
    if (!hotelSplitName.length) { return errorHoteName(res) }
    const pathDirImage = hotelSplitName.length > 1 ? hotelSplitName[0].toLocaleLowerCase() + '_' + hotelSplitName[1].toLocaleLowerCase() : ''
    if (!pathDirImage) { return errorHoteName(res) }
    const pathImageName = hotelSplitName[1].toLocaleLowerCase() + '_'
    const hotel: any = await prismaDB.hotels
        .create({
            data: {
                // id: (hotelId),
                name: hotelData.name,
                ubication: hotelData.ubication,
                phone: hotelData.phone,
                // category: categoryId,
                // categoryId,
                stars: parseInt(hotelData.stars.toString()),
                facebook: hotelData.facebook,
                whatsapp: hotelData.whatsapp,
                instagram: hotelData.instagram,
                references: hotelData.references,
                googleMaps: hotelData.googleMaps,
                latitude: hotelData.latitude?.toString(),
                longitude: hotelData.longitude?.toString(),
                placeId: hotelData.placeId,
                // reviews: hotelData.reviews,
                totalFloors: parseInt(hotelData.totalFloors.toString()),
                totalRooms: hotelData.totalRooms,
                logoImage: hotelData.image,
                imageUrl: hotelData.url,
                pathDirImage,
                pathImageName,
                editedBy: email
            }
        })
        .catch((err: any) => { console.log('errerrerrerr: ', err); res.status(500).json({ res: false, message: 'No se pudo crear el hotel!' }) })

        if (hotel) {
            await registerPlacesAndRooms(hotel, hotelData.placesInterest, roomData, res, currentUser)
        }
}

const errorHoteName = (res: NextApiResponse) => {
    return res.json({ res: false, message: 'El nombre del hotel es incorrecto' })
}