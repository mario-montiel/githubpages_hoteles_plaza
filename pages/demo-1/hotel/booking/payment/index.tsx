// 
import { useRef } from "react"
import { NextPageContext } from "next";
import { useRouter } from "next/router";

// CSS
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../../../styles/BookingPayment.module.css"

// Variables

// Componets
import Steps from "../../../../../components/website/demo1/steps/Steps";
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1";
import Booking3 from "../../../../../components/website/demo1/booking/booking3/Booking";

// Libraries
import { useForm } from "react-hook-form";
import { toast, ToastContainer, TypeOptions } from 'react-toastify';

// Helpers
import { endpoint } from "../../../../../config/endpoint"

// Types
import { Booking } from "../../../../../types/Booking"

HotelesPlazaPayment.getInitialProps = async (ctx: NextPageContext) => {
    const roomTypesJson = await getFetchData(endpoint + '/api/landingPage/roomsType/showRoomsType', ctx)
    return { roomTypes: roomTypesJson }
}

async function getFetchData(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, {
        method: 'POST',
        headers: { cookie: cookie! },
        body: JSON.stringify(ctx.query.currentHotel)
    })
    return await resp.json()
}

export default function HotelesPlazaPayment({ roomTypes }: any) {
    console.log(roomTypes);


    // Variables
    const router = useRouter()
    const { formState: { errors } } = useForm<Booking>();
    const onSubmit = (data: any) => { console.log(data); }

    // Use Ref
    const ImageTopRef = useRef<HTMLImageElement>(null)
    const ImageSmallRef = useRef<HTMLImageElement>(null)

    // Use State

    // Functions
    const redirectTo = (url: string) => {
        const currentHotel = router.query.currentHotel
        router.push({ pathname: url, query: { currenthotel: currentHotel }})
    }

    const showMessage = (text: string, duration: number, type: TypeOptions) => {
        toast(text, {
            position: "top-right",
            autoClose: duration,
            closeOnClick: true,
            type: type
        })
    }

    const redirectToStep = (step: number) => {
        switch (step) {
            case 1:
                redirectTo(`${endpoint}/demo-1/hotel/booking/seleccionar-tipo-habitacion`)
                break;
            case 2:
                redirectTo(`${endpoint}/demo-1/hotel/booking/formulario`)
                break;

            default:
                redirectTo(`${endpoint}/demo-1/hotel/booking/seleccionar-tipo-habitacion`)
                break;
        }
    }

    // Use Effect

    return (
        <LayoutDemo1>
            <div className={styles.paypment_container}>
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

                <Steps
                    maxSteps={3}
                    currentStep={2}
                    redirectToStep={(step: number) => redirectToStep(step)}
                >
                    <Booking3
                        redirectToStep={(step: number) => redirectToStep(step)}
                        showMessage={(text: string, duration: number, typeOptions: TypeOptions) => showMessage(text, duration, typeOptions)}
                    />
                </Steps>
            </div>
        </LayoutDemo1>
    )
}