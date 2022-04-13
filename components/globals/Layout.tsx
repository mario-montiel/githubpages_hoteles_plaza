// React
import Head from "next/head"
import Sidebar from "../admin/sidebar/sidebar"

// CSS

// Componets

// Libraries

// Helpers

// Types

const Layout = ({children, title, metaName, metaContent }: any) => {

    return (
        <div className="admin_grid">
            <Head>
                {/* <html lang="es" /> */}
                <title>{title}</title>
                <meta
                    name={metaName}
                    content={metaContent}
                />
            </Head>

            <div className="column_blank" />

            <Sidebar />
        
            {/* <UserAndSettings /> */}

            <main>
                {children}
            </main>

        </div>
    )
}

export default Layout