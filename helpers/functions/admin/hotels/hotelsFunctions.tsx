// React
import { useRouter } from "next/router"
import { useState } from "react"

// Libraries
import { toast } from 'react-toastify';

// CSS
import 'react-toastify/dist/ReactToastify.css';
import styles from "../../../../styles/admin/system/hotels/Hotels.module.css"

// Components

// Helpers
import { endpoint } from "../../../../config/endpoint";

// Types
import { RoomType } from "../../../../types/RoomType"
import { RoomStatus } from "../../../../types/RoomStatus"
import { Hotel, HotelForm, PlaceOfInterestElement } from "../../../../types/Hotel"

const HotelesFunctions = () => {

    // Variables
    const router = useRouter()
    const initialValues = {
        oldValue: router.query.id + "" || "",
        id: 0,
        name: '',
        ubication: '',
        phone: '',
        // category_id: 0,
        stars: 0,
        facebook: '',
        whatsapp: '',
        instagram: '',
        references: '',
        googleMaps: '',
        latitude: '',
        longitude: '',
        placeId: '',
        reviews: [],
        placesInterest: [],
        rooms: [],
        totalFloors: 0,
        totalRooms: 0,
        file: '',
        image: '',
        url: '',
        type: ''
    }
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
    const [hotel, setHotel] = useState(initialValues)
    const [editHotel, setEditHotel] = useState(initialValues)
    const [hotelsLoaded, setHotelsLoaded] = useState<any>([])
    const [rooms, setRooms] = useState<any>([])
    const [roomsType, setRoomsType] = useState<any>([])
    const [roomsStatus, setRoomsStatus] = useState<any>([])
    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showDialogWarning, setShowDialogWarning] = useState(initialDialogValues)
    const [showLoading, setShowLoading] = useState(initialLoadingValues)
    const [roomsError, setRoomsError] = useState<boolean>(false)
    const [newImage, setNewImage] = useState<boolean>(false)
    const [removeHotel, setRemoveHotel] = useState(initialValues)

    // Use Effect
    // useEffect(() => {
    //     if (hotel.url) {
    //         saveDataInDB()
    //     }

    //     // fillDataOfDBOfHotel(roomsType, 1)
    // }, [hotelsLoaded, hotel.url, editHotel])

    // Functions
    const handleDialogConfirm = () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm.show })
    }

    const hotelNotHaveLatAndLng = () => {
        setShowDialogWarning({
            ...showDialogWarning,
            show: !showDialogWarning.show,
            image: '/dialog/map.svg',
            alt: 'Warning Dialog Image',
            description: 'El hotel no tiene latitud ni longitud necesarios para poder saber su ubicación en Google Maps, para poder continuar debe seleccionar el lugar del hotel en Google Maps para que la gente que visite la página web sepa su ubicación y se le pueda dar indicaciones de como llegar al lugar',
            btnConfirm: 'Seleccionar',
            btnCancel: 'Cancelar',
        })
    }

    const verifiedIfTheHotelIsRepeat = async (hotelData: Hotel, roomData: any) => {
        setShowLoading({ ...showLoading, show: true, title: 'Validando información!' })
        const direction = hotelData.type === 'create' ? 'addHotels' : 'editHotels'
        const url = endpoint + `/api/admin/hotels/${direction}`
        console.log(url);

        const data = {
            dataForm: hotelData,
            rooms: roomData,
            type: 'verify'
        }
        const hotelVerifieded = await fetch(url, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data),
        })

        setShowLoading({ ...showLoading, show: false })

        return hotelVerifieded.json()
    }

    const handleRoomsErrorVaues = (show: boolean, title: string) => {
        setRoomsError(show)

        if (title) {
            toast(title, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                type: 'error'
            })
        }
    }

    function handleChangeImage(file: string, imageFile: string, type: string) {
        VerifyIfImageWasChanged()

        if (type === 'create') {
            setHotel({
                ...hotel,
                file: file,
                image: imageFile
            })
        } else {
            setEditHotel({
                ...editHotel,
                file: file,
                image: imageFile
            })
        }
    }

    const createFloors = () => {
        let html: any = []
        const floors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        floors.map((floor, index: number) => {
            html.push(<option defaultValue={floor} key={index}>{floor}</option>)
        })

        return html
    }

    const generateStructureRoomData = async () => {
        let total: number = 0
        let roomData: any = []
        let array: any = []
        let totalRooms: number = 0
        const roomsTypeInput = document.querySelectorAll('.room-type-input-container') as any
        
        for (let rowIndex = 0; rowIndex < roomsTypeInput.length; rowIndex++) {
            const rowRoomType = roomsTypeInput[rowIndex];
            array = []
            total = 0

            for (let colIndex = 0; colIndex < rowRoomType.children.length; colIndex++) {
                const roomElement = rowRoomType.children[colIndex] as any;

                if (colIndex > 0 && colIndex < (rowRoomType.children.length - 1)) {

                    if (!parseInt(rowRoomType.children[colIndex].children[0].value)) {
                        handleStylesRoomDiv(roomsTypeInput[rowIndex]);
                        return false
                    }

                    total += parseInt(rowRoomType.children[colIndex].children[0].value)
                    
                    const data = {
                        uid: colIndex,
                        name: roomElement.parentNode?.parentNode?.parentNode?.children[0].children[0].children[colIndex].innerText,
                        floor: (rowIndex + 1),
                        roomTypeId: roomsType[(colIndex - 1)].id,
                        roomStatusId: roomsStatus[0].id,
                        quantity: parseInt(rowRoomType.children[colIndex].children[0].value),
                        totalRooms: parseInt(rowRoomType.children[rowRoomType.children.length - 1].children[0].value)
                    }
                    
                    totalRooms += parseInt(rowRoomType.children[colIndex].children[0].value)
                    array.push(data)
                }
            }

            const totalInput = parseInt(roomsTypeInput[rowIndex].children[rowRoomType.children.length - 1].children[0].value)
            await checkTotalOfRooms(total, totalInput, roomsTypeInput[rowIndex], '<')

            roomData.push(array);
        }

        const returnData = {
            roomData,
            totalRooms
        }

        return returnData
    }

    const checkTotalOfRooms = async (total: number, totalInput: number, input: HTMLElement, type: string) => {
        if (total < totalInput && type === '<') {
            handleStylesRoomDiv(input)
            return handleRoomsErrorVaues(true, 'La suma de todas las habitaciones no puede ser menor al total de habitaciones que seleccionó')
        }

        if (total > totalInput && type === '>') {
            input.classList.add(styles.error_input)
            return handleRoomsErrorVaues(true, 'La suma de todas las habitaciones no puede ser superior al total de habitaciones que seleccionó')
        }
    }

    const handleStylesRoomDiv = (element?: HTMLElement) => {
        if (element) {
            element.classList.add(styles.error_container)

            return setTimeout(() => {
                element.classList.remove(styles.error_container)
            }, 5000)
        } else {
            const div = document.querySelector('.rooms-table-container')
            div?.classList.add(styles.error_table)

            setTimeout(() => {
                div?.classList.remove(styles.error_table)
            }, 5000)
        }
    }

    const generateFloors = (roomsType: Array<RoomType>, e: any, roomsStatus: Array<RoomStatus>) => {
        setRoomsType(roomsType)
        setRoomsStatus(roomsStatus)
        setRooms([])

        console.log('generateFloorsroomsType: ', roomsType);
        console.log('generateFloorsroomsStatus: ', roomsStatus);
        console.log('hotelsLoaded: ', hotelsLoaded);
        console.log('rooms: ', rooms);
        console.log('editHotel: ', editHotel);
        console.log(hotel);
        console.log(e);
        

        const length = e > 0 ? e : e.target.value

        for (let index = 0; index < length; index++) {
            setRooms((oldValue: any) => [...oldValue,
            <div className={`${styles.range_input_container} rooms-table`} key={index}>
                <label htmlFor="roomsRange">Piso {index + 1}</label>
                <div className={styles.range_input_data}>
                    <table>
                        <thead>
                            <tr>
                                <th>Cantidad de habitaciones</th>
                                {roomsType.map((roomType: RoomType, index: number) =>
                                    <th key={index + 100}>{roomType.name}</th>
                                )}
                                <th>Total de habitaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="room-type-input-container">
                                <td>
                                    <input
                                        className='input input-range'
                                        id="roomsRange"
                                        type="range"
                                        min="1"
                                        max="50"
                                        defaultValue="1"
                                        onChange={() => generateRooms(index)}
                                    />
                                </td>
                                {
                                    roomsType.map((roomType: RoomType, i: number) => {
                                        return (
                                            <td key={i + 100}>
                                                <input
                                                    type="text"
                                                    id="rooms"
                                                    onChange={() => checkValuesLimit(index, i)}
                                                />
                                            </td>
                                        )
                                    })
                                }
                                <td>
                                    <input id="totalRooms" className="total-rooms" type="text" disabled value="1" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            ])
        }
    }

    const generateRoomDataInInputs = (roomsData: Array<any>, roomsType: Array<RoomType>, floors: number) => {
        const inputRange: any = document.querySelectorAll('.input-range') as NodeListOf<HTMLInputElement>
        const inputs: any = document.querySelectorAll('.room-type-input-container') as NodeListOf<HTMLInputElement>
        const totalInputs: any = document.querySelectorAll('.total-rooms')
        // GET INPUTS AND PRINT THE QUANTITIES ROOMS
        for (let index = 0; index < floors; index++) {
            roomsType.forEach((roomType, i) => {
                let roomQuantities: number = 0
                let floorQuantities: number = 0
                roomsData.forEach(roomData => {
                    if ((index + 1) === roomData.floor) {
                        floorQuantities += 1

                        if (roomType.id === roomData.roomTypeId) {
                            roomQuantities += 1
                        }

                    }
                });
                inputRange[index].value = floorQuantities
                inputs[index].children[i + 1].children[0].value = roomQuantities
                totalInputs[index].value = floorQuantities
            });
        }
    }

    const generateRooms = (index: number) => {
        const rangeInput = document.querySelectorAll('.input-range') as NodeListOf<HTMLInputElement>
        const totalRooms = document.querySelectorAll('.total-rooms') as NodeListOf<HTMLInputElement>
        totalRooms[index].value = rangeInput[index].value
    }

    const checkValuesLimit = async (rowIndex: number, colIndex: number) => {
        let total = 0
        const rooms_type_input = document.querySelectorAll('.room-type-input-container') as any
        const length = rooms_type_input[rowIndex].children.length

        for (let index = 0; index < length; index++) {
            const input = rooms_type_input[rowIndex].children[index];
            rooms_type_input[rowIndex].children[colIndex + 1].children[0].classList.remove(styles.error_input)

            if (index > 0 && index < (length - 1)) {
                const value = parseInt(input.children[0].value)

                if (value) { total += value }
                if (!rooms_type_input[rowIndex].children[colIndex + 1].children[0].value) {
                    rooms_type_input[rowIndex].children[colIndex + 1].children[0].classList.add(styles.error_input)
                    return handleRoomsErrorVaues(true, 'Ningún campo de la cantidad de habitaciones puede estar vacío')
                }
            }
        }

        handleRoomsErrorVaues(false, '')

        const  totalInput = parseInt(rooms_type_input[rowIndex].children[length - 1].children[0].value)
        const input = rooms_type_input[rowIndex].children[colIndex + 1].children[0]
        await checkTotalOfRooms(total, totalInput, input, '>')
    }

    const showDialog = async (dataForm: HotelForm, roomData: any) => {
        const hotelExist = await verifiedIfTheHotelIsRepeat(dataForm, roomData)

        if (!hotelExist.res) {
            return setShowDialogWarning({
                ...showDialogWarning,
                show: true,
                image: '/dialog/map.svg',
                alt: 'Warning Dialog Image',
                description: 'Ya existe un hotel con el mismo nombre!',
                btnConfirm: 'Confirmar',
                onConfirm: () => setShowDialogWarning({
                    ...showDialogWarning,
                    show: false
                })
            })
        }

        if (hotelExist.res) {
            setHotel({
                ...hotel,
                name: dataForm.name,
                ubication: dataForm.ubication,
                phone: dataForm.phone,
                // category_id: dataForm.category_id,
                stars: dataForm.stars,
                facebook: dataForm.facebook || '',
                whatsapp: dataForm.whatsapp || '',
                instagram: dataForm.instagram || '',
                references: dataForm.references,
                googleMaps: dataForm.googleMaps || '',
                latitude: dataForm.latitude || '',
                longitude: dataForm.longitude || '',
                placeId: dataForm.placeId,
                reviews: dataForm.reviews,
                placesInterest: dataForm.placesInterest,
                totalFloors: dataForm.totalFloors,
                rooms: roomData.roomData,
                totalRooms: roomData.totalRooms,
            })
            setShowDialogConfirm({
                ...showDialogConfirm,
                show: true,
                image: '/dialog/hotel1.svg',
                alt: 'Creación del hotel',
                description: `Para poder crear el hotel ${dataForm.name} debe ingresar su contraseña`,
                btnConfirm: 'Crear',
                btnCancel: 'Cancelar',
                onConfirm: () => successConfirm()
            })
        }
    }

    const uploadImage = async () => {
        const formData = new FormData()
        formData.append('file', hotel.file ? hotel.file : editHotel.file)
        formData.append('upload_preset', 'pruebon')
        formData.append('coud_name', 'dpz5gv3fb')

        const resp = await fetch('	https://api.cloudinary.com/v1_1/dpz5gv3fb/image/upload', {
            method: 'POST',
            body: formData
        })

        return resp.json()
    }

    // const verifyPassOfCurrentUser = async (password: string) => {
    //     return await fetch('/api/admin/auth/confirmPassCurrentUser', {
    //         method: "POST",
    //         body: JSON.stringify(password)
    //     })
    // }

    async function successConfirm() {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true, title: 'Guardando datos!' })

        saveDataInDB()
        // try {
        //     const urlImage = await uploadImage()
        //     setHotel({ ...hotel, url: urlImage.url })
        // }
        // catch (error) { console.log(error) }

    }

    const saveDataInDB = async (dataForm?: Hotel, imageUrl?: string, roomsData?: any) => {
        const direction = dataForm ? 'editHotels' : 'addHotels'
        const url = endpoint + `/api/admin/hotels/${direction}`
        const actionToast = dataForm ? 'actualizado' : 'creado'
        const hotelData = {
            dataForm: dataForm ? dataForm : hotel,
            imageUrl,
            roomData: roomsData ? roomsData : hotel.rooms,
            type: dataForm ? '' : 'veryfied'
        }

        console.log(hotelData);
        

        await fetch(url, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(hotelData),
        }).then((response: any) => {
            if (response.ok) {
                router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/hotels/hotels`)
                setTimeout(() => {
                    toast(`Hotel ${actionToast} con éxito!`, {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        type: 'success'
                    })
                }, 300);
            }
        }).catch(error => {
            console.log(error);
        })
        setShowLoading({ ...showLoading, show: false })
    }

    const showData = (hotels: Hotel[]) => {
        hotels.forEach((hotel: any, index: number) => {
            console.log(hotel);
            
            setHotelsLoaded((oldValue: any) => [...oldValue,
            <tr key={index}>
                <td>{(index + 1)}</td>
                {/* <td>
                    {hotel.url ? (
                        <ShowImage
                            src={hotel.url}
                            unoptimized={true}
                            width={100}
                            height={100}
                            alt="Imágen de hotel plaza"
                        // onClick={!imageLoaded}
                        />
                    ) : (<div className="table-no-data">No Data</div>)}</td> */}
                <td>{hotel.name}</td>
                <td>{hotel.ubication}</td>
                <td>{hotel.phone}</td>
                {/* <td>{hotel.category.name}</td> */}
                <td>{hotel.stars}</td>
                <td>{hotel.references}</td>
                <td className={styles.places_of_interest_container}>
                    {
                        hotel.placesOfInterest.length > 0 ? (hotel.placesOfInterest.length) : 0
                    }
                    <br />
                    <div className={styles.places_of_interes_data}>
                        <h3 className={styles.table_title}>Total de lugares: {hotel.placesOfInterest.length}</h3>
                        {
                            hotel.placesOfInterest.length > 0 ? (
                                hotel.placesOfInterest.map((place: PlaceOfInterestElement, i: number) =>
                                    <div key={i + 500}>
                                        <table className={styles.table}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Lugar</th>
                                                    <th>Distancia</th>
                                                    <th>Duración</th>
                                                    <th>Tipo de viaje</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{place.name}</td>
                                                    <td>{place.distance}</td>
                                                    <td>{place.duration}</td>
                                                    <td>{place.travelMode}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            ) : (<p>No hay lugares de interés registrados</p>)
                        }
                    </div>

                </td>
                <th>{hotel.totalFloors}</th>
                <th>{hotel.totalRooms}</th>
                <td>{hotel.googleMaps}</td>
                <td>{hotel.facebook ? (hotel.facebook) : (<div className="table-no-data">No Data</div>)}</td>
                <td>{hotel.instagram ? (hotel.instagram) : (<div className="table-no-data">No Data</div>)}</td>
                <td>{hotel.whatsapp ? (hotel.whatsapp) : (<div className="table-no-data">No Data</div>)}</td>
                <td>
                    <div className="container">
                        <button type="button" className="btn_action" onClick={() => router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/hotels/${hotel.name}`)}>
                            <svg className="svg_table_icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                            </svg>
                        </button>
                        <button type="button" className="btn_action" onClick={() => askIfItShouldRemove(hotel)}>
                            <svg className="svg_table_icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
            ])
        })
    }

    // const loadEditImage = (url: string) => {
    //     setEditHotel({ ...editHotel, image: url })
    // }

    const VerifyIfImageWasChanged = () => {
        setNewImage(!newImage)
    }

    const showEditDialog = async (dataForm: HotelForm, roomsData: any) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: "/dialog/hotel.svg",
            alt: "Editar hotel",
            title: 'Editr hotel',
            description: `¿Desea editar el ${dataForm.name}?`,
            btnConfirm: 'Editar',
            btnCancel: 'Cancelar',
            onConfirm: () => successEditConfirm(dataForm, roomsData)
        })
    }

    async function successEditConfirm(dataForm: Hotel, roomsData: any) {
        let urlImage = null

        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })

        try {
            if (newImage) {
                urlImage = await uploadImage()
            }
        }
        catch (error) { console.log(error) }
        const image = urlImage ? urlImage.url : ''

        saveDataInDB(dataForm, image, roomsData)
    }

    const askIfItShouldRemove = (data: any) => {
        setRemoveHotel(data)
        setShowDialogConfirm({ ...showDialogConfirm, show: true, title: '¿Desea eliminar el hotel ' + data.name + '?', description: 'Se eliminará el hotel de forma permanente' })
    }

    async function deleteHotel() {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: 'Eliminando hotel' })

        await fetch(endpoint + '/api/admin/hotels/removeHotels', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(removeHotel)
        }).then((response) => {
            if (response.ok) {
                router.reload()
                setTimeout(() => {
                    setShowLoading({ ...showLoading, show: false })
                    // router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/hotels/hotels`)
                    toast(`Hotel eliminado con éxito!`, {
                        position: "top-right",
                        autoClose: 2000,
                        closeOnClick: true,
                        type: 'success'
                    })
                }, 300);
            }
        }).catch(error => {
            console.log(error);
            setShowLoading({ ...showLoading, show: false })
        })
    }

    const redirectToDivMapGoogleMaps = () => {
        const div = document.getElementById('map') as HTMLElement
        div.scrollIntoView({ block: 'start', behavior: 'smooth' });
        setShowDialogWarning({ ...showDialogWarning, show: !showDialogWarning })
        div.classList.add(styles.addAnimiation)
        setTimeout(() => {
            div.classList.remove(styles.addAnimiation)
        }, 3000);
    }

    return {
        hotel,
        editHotel,
        hotelsLoaded,
        rooms,
        showDialogConfirm,
        showDialogWarning,
        showLoading,
        roomsError,
        handleDialogConfirm,
        handleChangeImage,
        handleRoomsErrorVaues,
        handleStylesRoomDiv,
        hotelNotHaveLatAndLng,
        createFloors,
        generateFloors,
        generateStructureRoomData,
        generateRoomDataInInputs,
        showDialog,
        successConfirm,
        showData,
        showEditDialog,
        // loadEditImage,
        VerifyIfImageWasChanged,
        successEditConfirm,
        askIfItShouldRemove,
        deleteHotel,
        redirectToDivMapGoogleMaps
    }
}

export default HotelesFunctions