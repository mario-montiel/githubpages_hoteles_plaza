import { useState } from "react"
import { Department } from "../../../../../types/Department"
import { Hotel } from "../../../../../types/Hotel"
import { User } from "../../../../../types/User"
import styles from "../../../../../styles/admin/system/users/Users.module.css"
import { useRouter } from "next/router"
import { getDate } from "../../../../../helpers/dateTransform"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyIfIsAdmin } from "../../../../../api/authentication"

const UsersFunctions = () => {

    // Variables
    const router = useRouter()
    const initialDialogValues = {
        show: false,
        image: '',
        alt: '',
        title: '',
        description: '',
        btnConfirm: '',
        btnCancel: '',
        onConfirm: () => { },
        onClose: () => { }
    }
    const initialLoadingValues = {
        show: false,
        title: '',
    }

    // Use States
    const [currentUser, setCurrentUser] = useState<any>()
    const [usersData, setUsersData] = useState<Array<User>>([])
    const [hotelsData, setHotelsData] = useState<Array<Hotel>>([])
    const [departmentsData, setDepartmentsData] = useState<Array<Department>>([])
    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showDialogWarning, setShowDialogWarning] = useState(initialDialogValues)
    const [showLoading, setShowLoading] = useState(initialLoadingValues)
    const [isChangePassword, setIsChangePassword] = useState(false)

    // Use Effect

    // Functions
    const handleDialogConfirm = (show: boolean, image?: string, alt?: string, title?: string, description?: string, btnConfirm?: string, btnCancel?: string, onConfirm?: () => void, onClose?: () => void) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show,
            image: image ? image : '',
            alt: alt ? alt : '',
            // title: title ? title : '',
            description: description ? description : '',
            btnConfirm: btnConfirm ? btnConfirm : '',
            btnCancel: btnCancel ? btnCancel : '',
            onConfirm: onConfirm ? onConfirm : () => { },
            onClose: onClose ? onClose : () => { }
        })
    }

    const userExistInDB = () => {
        setShowDialogWarning({
            ...showDialogWarning,
            show: true,
            image: '/dialog/map.svg',
            alt: 'Warning Dialog Image',
            description: 'El correo electrónico del usuario que está registrado ya se encuentra en el sistema, por favor verifique los datos.',
            btnConfirm: 'Cerrar',
            onConfirm: () => setShowDialogWarning({ ...showDialogWarning, show: false })
        })
    }

    const showDialog = (dataForm: User) => {
        handleDialogConfirm(
            true,           // Show
            '/dialog/user.svg', // Image
            'User image',   // Alt
            'Crear usuario',    // Title
            `¿Desea crear al usuario ${dataForm.fullName}?`,    // Description
            'Crear',    // BtnConfirm
            'Cerrar',   // BtnCancel
            () => successConfirm(dataForm), // OnConfirm
            () => setShowDialogConfirm(     // OnCancel
                { ...showDialogConfirm, show: false }
            ))
    }

    const loadData = (users: User[], hotels: Hotel[], departments: Department[], user: User) => {
        setUsersData(users)
        setHotelsData(hotels)
        setDepartmentsData(departments)
        setCurrentUser(user)
    }

    const askIfItShouldRemove = (dataForm: any) => {
        handleDialogConfirm(
            true,           // Show
            '/dialog/user.svg', // Image
            'User image',   // Alt
            'Crear usuario',    // Title
            `¿Desea eliminar al usuario ${dataForm.fullName}?`,    // Description
            'Eliminar',    // BtnConfirm
            'Cerrar',   // BtnCancel
            () => deleteUser(dataForm), // OnConfirm
            () => setShowDialogConfirm(     // OnCancel
                { ...showDialogConfirm, show: false }
            ))
        // setShowDialogConfirm({ ...showDialogConfirm, show: true, description: '¿Desea eliminar al usuario ' + dataForm.fullName + "?" })
    }

    const generateAreaHTML = (hotel: Hotel, hotelIndex: number) => {
        let html: any = []

        {
            departmentsData.length > 0 ? (
                departmentsData.map((area: any, areaIndex: number) => {
                    html.push(
                        <div className={styles.reception_header} onClick={() => stylesActive(hotelIndex, areaIndex)} key={areaIndex + 500}>
                            <div className={styles.table_header}>
                                <h5>{area.name}</h5>
                                <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                </svg>
                            </div>
                            {generateTableData(hotel.name, area.name)}
                        </div>
                    )
                })
            ) : (<p>Cargando información...</p>)
        }
        return html
    }

    // const verifyPropertiesOfUser = (user: any) => {
    //     if (user && !user.department && !user.typeUserId && user.typeUser === 'Superadmin') {
    //         console.log('entro');
            
    //         return true
    //     }

    //     return false
    // }

    const generateTableData = (hotelName: string, type: string, i: number = 1) => {
        return (
            <table className={`${styles.table_dissapear} table`}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Correo electrónico</th>
                        <th>Registrado</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersData.map((user: any, index: number) =>
                            user.hotels.map((hotel: any, i: number) =>
                                hotel.hotel.name.indexOf(hotelName) > -1 && user.department.name === type ? (
                                    <tr key={index + 800}>
                                        <td>
                                            {hotel.hotel.name.indexOf(hotelName) > -1 && user.department.name === type ? (<p>{index + 1}</p>) : (null)}
                                        </td>
                                        <td>
                                            {hotel.hotel.name.indexOf(hotelName) > -1 && user.department.name === type ? (<p>{user.fullName + ' ' + user.lastName}</p>) : (null)}
                                        </td>
                                        <td>
                                            {hotel.hotel.name.indexOf(hotelName) > -1 && user.department.name === type ? (<p>{user.email}</p>) : (null)}
                                        </td>
                                        <td>
                                            {hotel.hotel.name.indexOf(hotelName) > -1 && user.department.name === type ? (<p>{getDate(user.createdAt)}</p>) : (null)}
                                        </td>
                                        <td>
                                            {hotel.hotel.name.indexOf(hotelName) > -1 && user.department.name === type ? (<div className={user.status === 'active' ? styles.active_chip : styles.inactive_chip}><p>{user.status}</p></div>) : (null)}
                                        </td>
                                        <td>
                                            <div className="container">
                                                {
                                                    verifyIfIsAdmin(currentUser) || user.email == currentUser.email || user?.typeUserId === 1 ? (
                                                        <button className="btn_action" onClick={() => router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/users/${user.id}`)}>
                                                            <svg className="svg_table_icon" viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                                            </svg>
                                                        </button>
                                                    ) : null
                                                }
                                                {
                                                    verifyIfIsAdmin(currentUser) || user?.typeUserId === 1 ? (
                                                        <button className="btn_action" onClick={() => askIfItShouldRemove(user)}>
                                                            <svg className="svg_table_icon" viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                                                            </svg>
                                                        </button>
                                                    ) : null
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ) : null
                            )
                        )
                    }
                </tbody>
            </table>
        )
    }

    const stylesActive = (hotelIndex: number, areaIndex: number) => {
        const userTableRef = document.querySelector('.table-container')
        userTableRef?.children[hotelIndex].children[areaIndex + 1].children[1].classList.toggle(styles.table_dissapear)
    }

    const deleteUser = async (dataForm: User) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: 'Eliminando hotel' })

        await fetch('/api/admin/users/removeUsers', {
            method: "POST",
            body: JSON.stringify(dataForm)
        }).then((response) => {
            response.json().then((responseApi) => {
                if (responseApi.res == 'The user is registred in the system') {
                    userExistInDB()
                }

                if (responseApi.res) {
                    router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/users/users`)
                    setTimeout(() => {
                        toast('El usuario fue registrado con éxito!', {
                            position: "top-right",
                            autoClose: 2000,
                            closeOnClick: true,
                            type: 'success'
                        })
                    }, 300);
                }

                setShowLoading({ ...showLoading, show: true })
            }).catch((e) => {
                console.log(e);
                setShowLoading({ ...showLoading, show: true })
            })

        }).catch((error) => { console.log(error); })
    }

    const showEditDialog = (dataForm: User) => {
        handleDialogConfirm(
            true,           // Show
            '/dialog/user.svg', // Image
            'User image',   // Alt
            'Editar usuario',    // Title
            `¿Desea editar al usuario ${dataForm.fullName}?`,    // Description
            'Crear',    // BtnConfirm
            'Cerrar',   // BtnCancel
            () => successEditConfirm(dataForm), // OnConfirm
            () => setShowDialogConfirm(     // OnCancel
                { ...showDialogConfirm, show: false }
            ))
    }

    const successConfirm = async (dataForm: User) => {
        setShowLoading({ ...showLoading, show: true })
        handleDialogConfirm(false)
        await fetch('/api/admin/users/addUsers', {
            method: "POST",
            body: JSON.stringify(dataForm)
        }).then((response) => {
            response.json().then((responseApi) => {
                if (responseApi.res == 'The user is registred in the system') {
                    userExistInDB()
                }

                if (responseApi.res) {
                    router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/users/users`)
                    setTimeout(() => {
                        toast('El usuario fue registrado con éxito!', {
                            position: "top-right",
                            autoClose: 2000,
                            closeOnClick: true,
                            type: 'success'
                        })
                    }, 300);
                }

                setShowLoading({ ...showLoading, show: true })
            }).catch((e) => {
                console.log(e);
                setShowLoading({ ...showLoading, show: true })
            })

        }).catch((error) => { console.log(error); })
    }

    const successEditConfirm = async (dataForm: User) => {
        setShowLoading({ ...showLoading, show: true })
        handleDialogConfirm(false)
        await fetch('/api/admin/users/editUsers', {
            method: "POST",
            body: JSON.stringify(dataForm)
        }).then((response) => {
            response.json().then((responseApi) => {
                if (responseApi.res == 'The user is registred in the system') {
                    userExistInDB()
                }

                if (responseApi.res) {
                    router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/users/users`)
                    setTimeout(() => {
                        toast('El usuario fue registrado con éxito!', {
                            position: "top-right",
                            autoClose: 2000,
                            closeOnClick: true,
                            type: 'success'
                        })
                    }, 300);
                }

                setShowLoading({ ...showLoading, show: true })
            }).catch((e) => {
                console.log(e);
                setShowLoading({ ...showLoading, show: true })
            })

        }).catch((error) => { console.log(error); })
    }

    const handleChangePassword = () => {
        setIsChangePassword(!isChangePassword)
    }

    return {
        hotelsData,
        showDialogConfirm,
        showDialogWarning,
        showLoading,
        isChangePassword,
        loadData,
        generateAreaHTML,
        handleDialogConfirm,
        handleChangePassword,
        showDialog,
        showEditDialog,
        successConfirm,
        deleteUser
    }
}

export default UsersFunctions