import { useRouter } from "next/router"
import { RefObject, useState } from "react"

// Libraries
import { toast } from 'react-toastify';

// CSS

// Components

// Helpers
import { endpoint } from "../../../../config/endpoint";

// Types
import { RoomStatus } from "../../../../types/RoomStatus";

const RoomStatusFunction = () => {

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
    const [checkBoxRef, setCheckBoxRef] = useState<any>()
    const [roomContainerRef, setRoomContainer] = useState<any>()
    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showLoading, setShowLoading] = useState(initialLoadingValues)

    // Use Effect

    // Functions
    const sendUseRefData = (checkBox: RefObject<HTMLDivElement>, roomContainer: RefObject<HTMLDivElement>) => {
        setCheckBoxRef(checkBox)
        setRoomContainer(roomContainer)
    }

    const changeCheckBox = () => {
        const checkBoxInput: any = checkBoxRef.current?.children[2].checked as HTMLInputElement
        const input: any = roomContainerRef.current as HTMLInputElement
        
        if (checkBoxInput) {
            return input.style.border = '0.05px solid #CBCBCB'
        }

        return input.style.border = 'none'
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

    const askIfItShouldRemove = (dataForm: any) => {
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
        console.log(dataForm);

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
        console.log('successEditConfirm: ', dataForm);
        
        // selectToastText()
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
                        toast('Estatus de habitación editado con éxito!', {
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
        loadingData
    }
}

export default RoomStatusFunction