// React

// Libraries
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../../contexts/authContext"
import Loading from "../loading/Loader"

// Components and CSS
import styles from "./NotLogin.module.css"

// Types

export default function NotLogin() {

    // Variables
    const { currentUser }: any = useContext(AuthContext)

    // States

    // Use Effect

    return (
        <div className={styles.container}>
            <div>
                <h2>Inicie sesión para poder continuar</h2>
                <Image src="/pages/not_auth/not_auth.svg" height={300} width={300} />
            </div>
        </div>
    )
}