// React
import Head from "next/head"
import FooterDemo1 from "../website/demo1/globals/footer/Footer"
import NavbarDemo1 from "../website/demo1/globals/navbar/Navbar"

// CSS

// Componets

// Libraries

// Helpers

// Types

const LayoutDemo1 = ({ children, title, description }: any) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/hotels/logos/matamoros_logo_white.png" />
            </Head>

            <NavbarDemo1 />

            <main>
                {children}
            </main>

            <FooterDemo1 />
        </>
    )
}

export default LayoutDemo1