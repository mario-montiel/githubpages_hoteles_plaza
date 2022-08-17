import { useRouter } from "next/router"
import { RefObject, useState } from "react"

// Libraries
import { toast, TypeOptions } from 'react-toastify';

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
    const initialValues = {
        id: '',
        name: '',
        backgroundColor: '',
        textColor: '',
        keyWord: '',
        border: ''
    }
    const initialLoadingValues = {
        show: false,
        title: 'Eliminando estatus de habitación',
    }

    // Use State
    const [roomStatus, setRoomStatus] = useState(initialValues)
    const [checkBoxRef, setCheckBoxRef] = useState<any>()
    const [roomContainerRef, setRoomContainer] = useState<any>()
    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showLoading, setShowLoading] = useState(initialLoadingValues)

    // Use Effect

    // Functions
    const showMessage = (text: string, duration: number, typeOptions: TypeOptions) => {
        toast(text, {
            position: "top-right",
            autoClose: duration,
            closeOnClick: true,
            type: typeOptions
        })
    }

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
            image: '/hotels/dialog/roomType.svg',
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

        const getResponse = await fetch(endpoint + '/api/admin/rooms/roomsStatus/addRoomsStatus', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        })
        const response = await getResponse.json()

        if (!response.res) {
            showMessage(response.message, 4000, 'error')
        }

        router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_status/rooms_status')
        setTimeout(() => {
            showMessage(response.message, 4000, 'success')
        }, 300);

        setShowLoading({ ...showLoading, show: false })
    }

    const askIfItShouldRemove = (dataForm: any) => {
        setRoomStatus(dataForm)
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/hotels/dialog/roomType.svg',
            alt: 'Status room image',
            description: `¿Desea eliminar el estatus ${dataForm.name} de las habitaciones?`,
            btnConfirm: 'Eliminar',
            btnCancel: 'Cancelar',
            // onConfirm: () => deleteRoomStatus(dataForm),
            onClose: () => setShowDialogConfirm({ ...showDialogConfirm, show: false })
        })
    }

    const deleteRoomStatus = async (reasonToDelete: string) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: 'Eliminando tipo de habitación' })

        const getResponse = await fetch(endpoint + '/api/admin/rooms/roomsStatus/removeRoomsStatus', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ roomStatus, reasonToDelete })
        })
        const response = await getResponse.json()
        
        if (!response.res) { showMessage(response.message, 5000, 'error') }
        
        router.replace(router.asPath);
        setShowLoading({ ...showLoading, show: false })
        setTimeout(() => { showMessage(response.message, 5000, 'success') }, 300);
    }

    const showEditDialog = (dataForm: RoomStatus) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/hotels/dialog/roomType.svg',
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
            showMessage('El tipo de habitación que desea editar no se encuentra registrado en el sistema', 4000, 'warning')
            return router.replace(endpoint + '/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type')
        } else { setShowLoading({ ...showLoading, show: false }) }
    }

    const successEditConfirm = async (dataForm: RoomStatus) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })
        
        const getResponse = await fetch(endpoint + '/api/admin/rooms/roomsStatus/editRoomsStatus', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dataForm)
        })
        const response = await getResponse.json()

        if (!response.res) { showMessage(response.message, 4000, 'error') }

        setShowLoading({ ...showLoading, show: false })
        router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_status/rooms_status')
        setTimeout(() => { showMessage(response.message, 4000, 'success') }, 300);
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
        deleteRoomStatus
    }
}

export default RoomStatusFunction