// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { Authenticated } from '../../../../api/authentication'
import * as jwt from 'jsonwebtoken'
import { secret } from '../../../../api/secret'
import { Hotel, HotelForm, PlaceOfInterestElement } from '../../../../types/Hotel'

export default async function AddHotel(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }

    // const cookie = req.cookies.auth
    // const currentUser: any = jwt.verify(cookie, secret);
    const response = req.body;

    console.log(response);
    

    if (req.body && req.body.type && res) {
        switch (req.body.type) {
            case 'verify':
                await verifyIfHotelExist(response.dataForm, res)
                break;
            case 'veryfied':
                await register(response.dataForm, response.roomData, res, 'currentUser')
                break;

            default:
                res.status(500).json({ res: true, message: 'No data found', })
                break;
        }
    }
}

const register = async (response: HotelForm, roomData: any, res: NextApiResponse, currentUser: any) => {
    let placesOfInterest: any = []
    const hotelId = await getLengthOfHotelsOfDB()
    const hotelData = await createHotelInDB(hotelId, response, res, currentUser)

    if (response.placesInterest) {
        response.placesInterest.forEach((place: PlaceOfInterestElement) => {
            const data = {
                name: place.name,
                distance: place.distance,
                duration: place.duration,
                travelMode: place.travelMode,
                hotelId: (hotelId + 1)
            }

            placesOfInterest.push(data)
        });
    }

    await createPlacesOfInterestInDB(placesOfInterest)
    const rooms = await generateRooms(hotelData, roomData)
    await createRoomsOfHotelInDB(rooms, res)

    res.status(200).json({ res: true, message: 'El hotel se creó con éxito!' })
}

const generateRooms = async (hotel: any, roomData: any) => {
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
                    registredBy: '',
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
    prismaDB.rooms.createMany({ data: rooms })
        .catch((err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ res: false, message: 'No se pudieron crear las habitaciones!' })
            }
        })
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

const getLengthOfHotelsOfDB = async () => {
    const response = await prismaDB.hotels
        .findFirst({
            orderBy: { id: 'desc' }
        })
    const data = response ? response.id : 1

    return data
}

const createPlacesOfInterestInDB = async (places: any) => {
    await prismaDB.placesInterest
        .createMany({
            data: places
        }).catch((err) => console.log('createPlacesOfInterestInDB ERRR: ', err))
}

const createHotelInDB = async (hotelId: number, hotelData: HotelForm, res: NextApiResponse, currentUser: any) => {
    // const categoryId: any = parseInt(hotelData.category_id.toString())
    const hotelName = hotelData.name.substring(6, hotelData.name.length)
    const hotelSplitName = hotelName.split(' ')
    const pathDirImage = hotelSplitName[0].toLocaleLowerCase() + '_' + hotelSplitName[1].toLocaleLowerCase()
    const pathImageName = hotelSplitName[1].toLocaleLowerCase() + '_'
    
    const hotel: any = await prismaDB.hotels
        .create({
            data: {
                id: (hotelId + 1),
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
                registredBy: 'currentUser.email'
            }
        })
        .catch((err) => { console.log(err); res.status(500).json({ res: false, message: 'No se pudo crear el hotel!' }) })

    return hotel
}