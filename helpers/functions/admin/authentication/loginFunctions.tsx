import { useState } from "react"
import { useRouter } from "next/router"

// Components and CSS
import { toast } from 'react-toastify';

// Types
import { Login } from '../../../../types/Login'

// Helpers
import { endpoint } from "../../../../api/url"


const LoginFunctions = () => {

    // Variables
    const router = useRouter()
    const imagesCarrousell = [
        '/login_admin/hotel-plaza-catedral.jpg',
        '/login_admin/hotel-plaza-matamoros.jpg',
        '/login_admin/288046501.jpg',
    ]

    // Use States
    const [validate, setValidate] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    // Functions
    const login = async (data: Login) => {
        setLoading(true)
        setValidate(true)

        await fetch(endpoint + '/api/admin/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(responseApi => {
                responseApi.json().then(responseData => {
                    if (responseData.res) {
                        setValidate(false)
                        router.push('/aG90ZWxlc19wbGF6YQ0K/admin')
                        setTimeout(() => {
                            toast(`Bienvenido ${responseData.user}`, {
                                position: "top-right",
                                autoClose: 2000,
                                closeOnClick: true,
                                type: 'success'
                            })
                        }, 300);
                        return 
                    }
                    
                    setLoading(false)
                    toast('El correo electrónico o contraseña son incorrectas!', {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        type: 'error'
                    })
                })
            }).catch(err => {
                setLoading(false)
                setValidate(false)
                console.log(err);
            })
    }

    return {
        imagesCarrousell, login, validate, loading
    }
}

export default LoginFunctions