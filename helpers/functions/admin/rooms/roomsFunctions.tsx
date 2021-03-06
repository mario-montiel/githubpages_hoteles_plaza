import { useState } from "react"
import { useRouter } from "next/router"
import { endpoint } from "../../../../config/endpoint";

// Components and CSS
import { toast } from 'react-toastify';
import { Room } from "../../../../types/Room";
import { RoomStatus } from "../../../../types/RoomStatus";

const RoomFunctions = () => {

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
        title: 'Eliminando estatus de habitación',
    }

    // Use State
    const [rooms, setRooms] = useState([])
    const [floors, setFloors] = useState<number>()
    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showLoading, setShowLoading] = useState(initialLoadingValues)

    // Use Effect

    // Functions
    const sendUseRefData = (user: any) => {
        console.log(user);
        
        if (user && user.hotels) {
            user.hotels.forEach((hotel: any) => {
                if (hotel.hotelId === user.preferencesId) {
                    setRooms(hotel.hotel.rooms)
                    setFloors(hotel.hotel.totalFloors)
                }
            });
        }
    }

    const changeCheckBox = () => {

        // if (checkBoxInput) {
        //     return input.style.border = '0.05px solid #CBCBCB'
        // }

        // return input.style.border = 'none'
    }

    const errorsMessages = (errors: string, type?: string, quantity?: number) => {
        let errorText: string = ''
        switch (errors) {
            case 'maxLength':
                errorText = `El campo ${type} solo puede tener ${quantity} caracteres como máximo!`
                return (
                    <small>{errorText}</small>
                )
                break;
            case 'required':
                errorText = `El campo ${type} esta vacio!`
                return (
                    <small>{errorText}</small>
                )
                break;
            default:
                break;
        }
    }

    const showDialog = (dataForm: RoomStatus) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/dialog/roomType.svg',
            alt: 'Type room image',
            description: `¿Desea crear el estatus ${dataForm.name} para las habitaciones?`,
            btnConfirm: 'Crear',
            btnCancel: 'Cancelar',
            onConfirm: () => successConfirm(dataForm),
            onClose: () => setShowDialogConfirm({ ...showDialogConfirm, show: false })
        })
    }

    const successConfirm = async (dataForm: RoomStatus) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })

        try {
            await fetch(endpoint + '/api/admin/rooms/roomsStatus/addRoomsStatus', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
                .then((response) => {
                    if (response.ok) {
                        router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_status/rooms_status')
                        setTimeout(() => {
                            toast('El estatus de la habitación se creó con éxito!', {
                                position: "top-right",
                                autoClose: 2000,
                                closeOnClick: true,
                                type: 'success'
                            })
                        }, 300);
                    }
                }).catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }

        setShowLoading({ ...showLoading, show: false })
    }

    const askIfItShouldRemove = (dataForm: RoomStatus) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/dialog/roomType.svg',
            alt: 'Status room image',
            description: `¿Desea eliminar el estatus ${dataForm.name} de las habitaciones?`,
            btnConfirm: 'Eliminar',
            btnCancel: 'Cancelar',
            onConfirm: () => deleteRoomStatus(dataForm),
            onClose: () => setShowDialogConfirm({ ...showDialogConfirm, show: false })
        })
    }

    const deleteRoomStatus = async (dataForm: RoomStatus) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: 'Eliminando tipo de habitación' })

        await fetch(endpoint + '/api/admin/rooms/roomsStatus/removeRoomsStatus', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        }).then(() => {
            setTimeout(() => {
                toast('El estatus de la habitación se eliminó con éxito!', {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    type: 'success'
                })
            }, 300);
            setShowLoading({ ...showLoading, show: false })
            router.replace(router.asPath);
        }).catch(error => {
            console.log(error);
            setShowLoading({ ...showLoading, show: false })
        })
    }

    const showEditDialog = (dataForm: RoomStatus) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/dialog/roomType.svg',
            alt: 'Type room image',
            description: `¿Desea editar el estatus ${dataForm.name} para las habitación?`,
            btnConfirm: 'Editar',
            btnCancel: 'Cancelar',
            onConfirm: () => successEditConfirm(dataForm),
            onClose: () => setShowDialogConfirm({ ...showDialogConfirm, show: false })
        })
    }

    const loadingData = (props: any) => {
        setShowLoading({ ...showLoading, show: true })
        if (!props.roomType.res) {
            toast('El tipo de habitación que desea editar no se encuentra registrado en el sistema', {
                position: "top-right",
                autoClose: 4000,
                closeOnClick: true,
                type: 'warning'
            })
            return router.replace(endpoint + '/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type')
        } else { setShowLoading({ ...showLoading, show: false }) }
    }

    const successEditConfirm = async (dataForm: RoomStatus) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })
        try {
            await fetch(endpoint + '/api/admin/rooms/roomsStatus/editRoomsStatus', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
                .then(() => {
                    router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_status/rooms_status')
                    setTimeout(() => {
                        toast('Estatus de habitación actualizada con éxito!', {
                            position: "top-right",
                            autoClose: 2000,
                            closeOnClick: true,
                            type: 'success'
                        })
                    }, 300);
                }).catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }

        setShowLoading({ ...showLoading, show: false })
    }

    // ROOMS COMPONENT

    const confirmToAddRooms = (roomsData: any) => {
        const text1: string = roomsData.totalRooms === 1 ? 'la' : 'las'
        const text2: string = roomsData.totalRooms === 1 ? '' : roomsData.totalRooms
        const text3: string = roomsData.totalRooms === 1 ? 'habitación' : 'habitaciones'

        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/dialog/roomType.svg',
            alt: 'Type room image',
            description: `¿Desea agregar ${text1} ${text2} ${text3} al hotel?`,
            btnConfirm: 'Agregar',
            btnCancel: 'Cancelar',
            onConfirm: () => sentRequest(roomsData),
            onClose: () => setShowDialogConfirm({ ...showDialogConfirm, show: false })
        })
    }

    const sentRequest = async (roomsData: any) => {
        const text: string = roomsData.totalRooms === 1 ? 'habitación' : 'habitaciones'

        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: `Creando ${text}...` })

        await fetch(endpoint + '/api/admin/rooms/addRooms', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(roomsData)
        }).then((resp) => {
            if (resp.ok) {
                setShowLoading({ ...showLoading, show: false })
                setTimeout(() => {
                    toast(`${text} agregada con éxito!`, {
                        position: "top-right",
                        autoClose: 5000,
                        closeOnClick: true,
                        type: 'warning'
                    })
                }, 300);
                router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms')
            }
        })
    }

    const editRoomConfirm = (room: Room) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/dialog/roomType.svg',
            alt: 'Type room image',
            description: `¿Desea editar la habitación ${room.name}?`,
            btnConfirm: 'Editar',
            btnCancel: 'Cancelar',
            onConfirm: () => sendEditRoomRequest(room),
            onClose: () => setShowDialogConfirm({ ...showDialogConfirm, show: false })
        })

    }

    const sendEditRoomRequest = async (room: Room) => {
        const data = {
            roomData: room,
            type: 'room'
        }

        await fetch('/api/admin/rooms/editRooms', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data),
        }).then(() => {
            setTimeout(() => {
                toast('Habitación actualizada con éxito!', {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    type: 'success'
                })
            }, 300);
            router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms')
        })
    }

    return {
        showDialogConfirm,
        showLoading,
        sendUseRefData,
        changeCheckBox,
        errorsMessages,
        successConfirm,
        successEditConfirm,
        showDialog,
        askIfItShouldRemove,
        showEditDialog,
        loadingData,
        confirmToAddRooms,
        editRoomConfirm
    }
}

export default RoomFunctions