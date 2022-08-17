// 
import { NextPageContext } from "next";
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"

// CSS
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../../../styles/booking/BookingPayment.module.css"

// Variables

// Componets
import LayoutDemo1 from "../../../../../components/globals/LayoutDemo1";
import Steps from "../../../../../components/website/demo1/steps/Steps";
import Booking2 from "../../../../../components/website/demo1/booking/booking2/Booking";

// Libraries
import { toast, ToastContainer, TypeOptions } from 'react-toastify';

// Helpers
import { endpoint } from "../../../../../config/endpoint"

// Types
import { Booking } from "../../../../../types/Booking"
import x from "../../../../aG90ZWxlc19wbGF6YQ0K/profile";

HotelesPlazaForm.getInitialProps = async (ctx: NextPageContext) => {
    const roomTypesJson = await getFetchData(endpoint + '/api/landingPage/roomsType/showBookingRoomType', ctx)
    return { roomTypes: roomTypesJson }
}

async function getFetchData(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const getResponse = await fetch(url, {
        method: 'POST',
        headers: { cookie: cookie! },
        body: JSON.stringify(ctx.query.currentHotel)
    })
    const response = await getResponse.json()

    validateFetchData(response, ctx)

    return response
}

const validateFetchData = (response: any, ctx: NextPageContext) => {
    // if (!response.length) {
    //     ctx.res?.writeHead(302, {
    //         Location: endpoint + '/hotel-not-found'
    //     })
    //     ctx.res?.end()
    //     return;
    // }
}

export default function HotelesPlazaForm({ roomTypes }: any) {

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
        router.push({ pathname: url, query: { currentHotel } })
    }

    const showMessage = (text: string, duration: number, type: TypeOptions) => {
        toast(text, {
            position: "bottom-center",
            autoClose: duration,
            closeOnClick: true,
            type: type,

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
                break;
        }
    }

    // Use Effect

    return (
        <LayoutDemo1>
            <div className={`${styles.paypment_container} ${styles.paypment_container_data}`}>
                <section className={styles.form_section}>
                    <img
                        ref={ImageTopRef}
                        alt="texture_image"
                        className={styles.texture_top_image}
                        src={`${endpoint}/hotels/symbols/frame_texture_top_right.webp`}
                    />

                    <h2>Reservaciones2</h2>

                    <img
                        alt="Símbolo"
                        ref={ImageSmallRef}
                        className={styles.symbol}
                        src="/hotels/symbols/frame.webp"
                    />

                    <div className={styles.grid_content}>
                        <Steps
                            maxSteps={3}
                            currentStep={2}
                            // redirectToStep={(step: number) => redirectToStep(step)}
                        >
                            <Booking2
                                redirectToStep={(step: number) => redirectToStep(step)}
                                showMessage={(text: string, duration: number, typeOptions: TypeOptions) => showMessage(text, duration, typeOptions)}
                            />
                        </Steps>

                    </div>
                </section>
                {BookingDetails()}
            </div>
        </LayoutDemo1>
    )
}

export function BookingDetails() {

    return (
        <section className={styles.current_booking_detail_section}>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis reprehenderit id aliquid cum quibusdam fugiat autem laudantium quam? Voluptatem hic tenetur rem! Perferendis minus nemo omnis tenetur. Assumenda, ea in.</p>
        </section>
    )
}