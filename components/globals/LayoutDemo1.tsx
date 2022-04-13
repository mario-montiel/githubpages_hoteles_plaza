// React
import { NextPageContext } from "next"
import Head from "next/head"
import { endpoint } from "../../config/endpoint"

// CSS

// Componets
import FooterDemo1 from "../website/demo1/globals/footer/Footer"
import NavbarDemo1 from "../website/demo1/globals/navbar/Navbar"

// Libraries

// Helpers

// Types

export default function LayoutDemo1 ({children, title, description, weather, currentHotel}: any) {
    
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/hotels/logos/matamoros_logo_white.webp" />
            </Head>

            <NavbarDemo1 />

            <main>
                {children}
            </main>

            <FooterDemo1 weather={weather} currentHotel={currentHotel} />
        </>
    )
}