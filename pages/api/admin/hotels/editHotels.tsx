// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaDB from '../../../../prisma/Instance'
import { Authenticated } from '../../../../api/authentication'
import { HotelForm, PlaceOfInterestElement } from '../../../../types/Hotel';

export default async function EditHotel(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Código de estado de respuesta no permitido" })
    }
    const response = req.body
    console.log('EditHotelRespones: ', response);
    

    if (response.dataForm.placesInterest && response.dataForm.placesInterest.length) {
        await removePlacesOfInterest(response.dataForm.id)
        await createPlacesOfInterest(response.dataForm.placesInterest, response.dataForm.id)
    }

    if (response.roomData && response.roomData.roomData) {
        const rooms = await generateRooms(response.dataForm, response.roomData.roomData)
        await removeOldRoomsOfHotel(response.dataForm.id)
        await createRoomsOfHotelInDB(rooms)
    }

    await hotelUpdate(response.dataForm, response.imageUrl, res)

    res.status(200).json({ res: true, message: 'Hotel actualizado con éxito!' })
}

const removeOldRoomsOfHotel = async (hotelId: number) => {
    prismaDB.rooms.deleteMany({
        where: {
            hotelId
        }
    }).catch((err) => {
        console.log(err);

    })
}

const createRoomsOfHotelInDB = async (rooms: any) => {
    prismaDB.rooms.createMany({ data: rooms })
        .catch((err) => { console.log(err); })
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
                    roomStatusId: roomElement.roomStatusId ? roomElement.roomStatusId : 1,
                    lastRoomStatusId: roomElement.lastRoomStatusId ? roomElement.lastRoomStatusId : 1,
                    observations: ''
                }
                emptyArray.push(data)
                roomNumber += 1
            }
        }
    }
    return emptyArray
}

const removePlacesOfInterest = async (hotelId: number) => {
    await prismaDB.placesInterest
        .deleteMany({
            where: {
                hotelId
            }
        })
        .then(() => { })
        .catch((error) => { console.log('removePlacesOfInterest: ', error); })
}

const createPlacesOfInterest = async (places: any, hotelId: number) => {
    let placesOfInterest: any = []

    await places.forEach((place: PlaceOfInterestElement, index: number) => {
        const data = {
            name: place.name,
            distance: place.distance,
            duration: place.duration,
            travelMode: place.travelMode,
            hotelId: hotelId
        }

        placesOfInterest.push(data)
    });

    await prismaDB.placesInterest
        .createMany({
            data: placesOfInterest
        })
}

const hotelUpdate = async (response: HotelForm, urlImage: string, res: NextApiResponse) => {
    await prismaDB.hotels.update({
        where: {
            id: response.id
        },
        data: {
            id: response.id,
            name: response.name,
            ubication: response.ubication,
            phone: response.phone,
            // categoryId: parseInt(response.category_id.toString()),
            stars: parseInt(response.stars.toString()),
            facebook: response.facebook,
            whatsapp: response.whatsapp,
            instagram: response.instagram,
            references: response.references,
            googleMaps: response.googleMaps,
            latitude: response.latitude?.toString(),
            longitude: response.longitude?.toString(),
            // url: urlImage,
            registredBy: 'x'
        }
    }).catch(() => {
        res.status(500).json({ res: false, message: 'No se pudo actualizar el hotel!' })
    })
}