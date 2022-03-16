// React
import Head from "next/head"

// CSS

// Componets

// Libraries

// Helpers

// Types

const Layout = ({ children, title, description }: any) => {

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

export default Layout