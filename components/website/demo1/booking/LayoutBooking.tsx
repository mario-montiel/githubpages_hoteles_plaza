// React and Next
import { useRef } from "react"
import { NextPageContext } from "next";
import { useRouter } from "next/router";

// CSS
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../../styles/booking/BookingPayment.module.css"

// Variables

// Componets
import Steps from "../../../../components/website/demo1/steps/Steps";
import LayoutDemo1 from "../../../../components/globals/LayoutDemo1";
import Booking1 from "./booking1/choosingTypeRoom";

// Libraries
import { toast, ToastContainer, TypeOptions } from 'react-toastify';

// Helpers
import { endpoint } from "../../../../config/endpoint"
import { RoomType } from "../../../../types/RoomType";

// Types

LayoutBooking.getInitialProps = async (ctx: NextPageContext) => {
    // const roomTypeSelected = await getFetchData(endpoint + '/api/landingPage/booking/roomTypeSelected', ctx)
    // const roomTypesJson = await getFetchData(endpoint + '/api/landingPage/roomsType/showRoomsType', ctx, ctx.query.currenthotel)
    return { /* roomTypes: roomTypesJson, roomTypeSelected */ }
}

// async function getFetchData(url: string, ctx: NextPageContext, routeQuery?: any) {
//     const cookie = ctx.req?.headers.cookie
//     if (routeQuery) {
//         const getResponse = await fetch(url, {
//             method: 'POST',
//             headers: { cookie: cookie! },
//             body: JSON.stringify(ctx.query.currenthotel)
//         })
//         const response = await await getResponse.json()

//         // validateFetchData(response, ctx)
//         return response
//     }
//     const getResponse: any = await fetch(url)
//     const response = await getResponse.json()

//     // validateFetchData(response, ctx)

//     return response
// }

const validateFetchData = (response: any, ctx: NextPageContext) => {
    // if (response.data.length) {
    //     ctx.res?.writeHead(302, {
    //         Location: endpoint + '/hotel-not-found'
    //     })
    //     ctx.res?.end()
    //     return;
    // }

    // return true
}

export default function LayoutBooking({ children, tacos }: any) {

    // Variables
    const router = useRouter()

    // Use Ref
    const ImageTopRef = useRef<HTMLImageElement>(null)
    const ImageSmallRef = useRef<HTMLImageElement>(null)

    // Use State

    // Functions
    const redirectTo = async (url: string, roomType: RoomType) => {
        const currentHotel = router.query.currenthotel;
        const roomTypeName = roomType.name?.toString().toLocaleLowerCase()
        router.push({ pathname: url, query: { currenthotel: currentHotel, roomtype: roomTypeName } })
    }

    const showMessage = (text: string, duration: number, type: TypeOptions) => {
        toast(text, {
            position: "top-right",
            autoClose: duration,
            closeOnClick: true,
            type: type
        })
    }

    const redirectToStep = (step: number, roomType?: RoomType) => {
        switch (step) {
            case 1:
                redirectTo(`${endpoint}/demo-1/hotel/booking/seleccionar-tipo-habitación`, roomType!)
                break;
            case 2:
                redirectTo(`${endpoint}/demo-1/hotel/booking/formulario`, roomType!)
                break;

            default:
                redirectTo(`${endpoint}/demo-1/hotel/booking/seleccionar-tipo-habitación`, roomType!)
                break;
        }
    }

    // Use Effect

    return (
        <LayoutDemo1>
            <section className={styles.paypment_container}>
                <img
                    ref={ImageTopRef}
                    alt="texture_image"
                    className={styles.texture_top_image}
                    src={`${endpoint}/hotels/symbols/frame_texture_top_right.webp`}
                />

                <h2>Reservaciones</h2>

                <img
                    alt="Símbolo"
                    ref={ImageSmallRef}
                    className={styles.symbol}
                    src="/hotels/symbols/frame.webp"
                />

                {children}
            </section>
        </LayoutDemo1>
    )
}