// React
import Head from "next/head"

// CSS

// Componets

// Libraries

// Helpers

// Types

const LayoutDemo2 = ({ children, title, description }: any) => {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <nav>
                navbar
            </nav>

            <main>
                {children}
            </main>

            <footer>
                footer
            </footer>
        </>
    )
}

export default LayoutDemo2