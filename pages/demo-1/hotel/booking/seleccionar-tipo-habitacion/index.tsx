// React and Next
import { NextPageContext } from "next";
import { useRouter } from "next/router";

// CSS
// import 'react-toastify/dist/ReactToastify.css';

// Variables

// Componets
import Steps from "../../../../../components/website/demo1/steps/Steps";
import LayoutBooking from "../../../../../components/website/demo1/booking/LayoutBooking";
import BookingChoosingTypeRoom from "../../../../../components/website/demo1/booking/booking1/choosingTypeRoom";
import BookingHotelDatePeopleDetail from "../../../../../components/website/demo1/booking/bookingDetail/hotelDatePeople/BookingHotelDatePeopleDetail";

// Libraries
// import { toast, ToastContainer, TypeOptions } from 'react-toastify';

// Helpers
import { endpoint } from "../../../../../config/endpoint"
import { RoomType, RoomTypeImagesTable } from "../../../../../types/RoomType";

// Types
import { Hotel } from "../../../../../types/Hotel";

type HotelesPlazaChoosingTypeRoom = {
    hotels: Array<Hotel>,
    roomTypesSelected: RoomTypeImagesTable[],
    roomsTypes: RoomType[]
}

HotelesPlazaChoosingTypeRoom.getInitialProps = async (ctx: NextPageContext) => {
    const hotelsJson = await getFetchData(endpoint + "/api/landingPage/hotels/showHotels", ctx)
    const roomTypesSelected = await getFetchData(endpoint + '/api/landingPage/booking/roomTypeSelected', ctx)
    const roomTypesJson = await getFetchData(endpoint + '/api/landingPage/roomsType/showRoomsType', ctx, ctx.query.currenthotel)
    return { hotels: hotelsJson, roomsTypes: roomTypesJson, roomTypesSelected }
}

async function getFetchData(url: string, ctx: NextPageContext, routeQuery?: any) {
    const cookie = ctx.req?.headers.cookie
    if (routeQuery) {
        const getResponse = await fetch(url, {
            method: 'POST',
            headers: { cookie: cookie! },
            body: JSON.stringify(ctx.query.currenthotel)
        })
        const response = await await getResponse.json()

        return response
    }
    const getResponse: any = await fetch(url)
    const response = await getResponse.json()

    return response
}

export default function HotelesPlazaChoosingTypeRoom({ hotels, roomsTypes, roomTypesSelected }: HotelesPlazaChoosingTypeRoom) {
    console.log(roomTypesSelected);
    

    // Variables
    const router = useRouter()

    // Use Ref

    // Use State

    // Functions

    // Use Effect

    return (
        <LayoutBooking>
            <Steps
                maxSteps={4}
                currentStep={2}
            >
                <>
                    <BookingHotelDatePeopleDetail
                        hotels={hotels}
                        
                    />
                    <BookingChoosingTypeRoom
                        roomTypes={roomsTypes}
                        roomTypeSelected={roomTypesSelected}
                    />
                </>
            </Steps>
        </LayoutBooking>
    )
}