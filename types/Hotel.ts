export type HotelForm = {
    id?: number,
    name: string
    ubication: string
    phone: string
    category_id: number
    stars: number
    facebook?: string
    whatsapp?: string
    instagram?: string
    references: string
    googleMaps?: string
    latitude?: string
    longitude?: string
    placeId: string
    reviews: []
    placesInterest: []
    rooms: [],
    totalFloors: number
    totalRooms: number
    file: string
    image: string
    url: string
    type: string
}

export type Hotel = {
    id?: number,
    name: string,
    ubication: string
    phone: string
    category_id: number,
    stars: number,
    references: string
    googleMaps?: string
    latitude?: string
    longitude?: string
    placeId: string
    reviews: []
    placesInterest: []
    facebook?: string
    whatsapp?: string
    instagram?: string
    file: string
    image: string,
    url: string
    type?: string,
}

export type Ubication = {
    center: {
        lat: number,
        lng: number
    },
    zoom: number
}

export type PlaceOfInterestElement = {
    id?: number,
    name: string,
    distance: string,
    duration: string,
    travelMode: string,
    createdAt?: string,
    updatedAt?: string,
    hotelId?: number
}