import { useState } from "react"
import { useRouter } from "next/router"

// Helpers
import { endpoint } from "../../../../config/endpoint";

// Types
import { RoomType, RoomTypeForm } from "../../../../types/RoomType"

// Components and CSS
import { toast, TypeOptions } from 'react-toastify';

const TypeRoomsFunctions = () => {

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
        title: 'Eliminando categoría',
    }

    // Use State
    const [roomType, setRoomType] = useState<RoomTypeForm>()
    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showLoading, setShowLoading] = useState(initialLoadingValues)

    // Use Effect

    // Functions
    const showMessage = (message: string, typeMessage: TypeOptions, duration: number) => {
        toast(message, {
            position: "top-right",
            autoClose: duration,
            closeOnClick: true,
            type: typeMessage
        })
    }

    const showDialog = (dataForm: RoomType) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/hotels/dialog/roomType.svg',
            alt: 'Type room image',
            description: `¿Desea crear el tipo de habitación ${dataForm.name}?`,
            btnConfirm: 'Crear',
            btnCancel: 'Cancelar',
            onConfirm: () => successConfirm(dataForm),
            onClose: () => setShowDialogConfirm({ ...showDialogConfirm, show: false })
        })
    }

    const successConfirm = async (dataForm: RoomType) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })

        const resp = await fetch(endpoint + '/api/admin/rooms/roomsType/addRoomsType', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dataForm)
        })
        const response = await resp.json()

        if (!response.res) { return showMessage(response.message, 'error', 4000) }

        router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type')
        setTimeout(() => { showMessage(response.message, 'success', 4000) }, 300);

        setShowLoading({ ...showLoading, show: false })
    }

    const askIfItShouldRemove = (dataForm: RoomType) => {
        setRoomType(dataForm)
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/hotels/dialog/roomType.svg',
            alt: 'Type room image',
            description: `¿Desea eliminar el tipo de habitación ${dataForm.name}?`,
            btnConfirm: 'Eliminar',
            btnCancel: 'Cancelar',
            onClose: () => setShowDialogConfirm({ ...showDialogConfirm, show: false })
        })
    }

    const deleteRoomType = async (reasonToDelete: string) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: 'Eliminando tipo de habitación' })

        const resp = await fetch(endpoint + '/api/admin/rooms/roomsType/removeRoomsType', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ roomType, reasonToDelete })
        })
        const response = await resp.json()

        if (!response.res) { return showMessage(response.message, 'error', 4000) }

        router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type')
        setTimeout(() => { showMessage(response.message, 'success', 4000) }, 300);
        setShowLoading({ ...showLoading, show: false })
    }

    const showEditDialog = (dataForm: RoomType) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/hotels/dialog/roomType.svg',
            alt: 'Type room image',
            description: `¿Desea editar el tipo de habitación ${dataForm.name}?`,
            btnConfirm: 'Editar',
            btnCancel: 'Cancelar',
            onConfirm: () => successEditConfirm(dataForm),
            onClose: () => setShowDialogConfirm({ ...showDialogConfirm, show: false })
        })
    }

    const loadingData = (props: any) => {
        setShowLoading({ ...showLoading, show: true })
        
        if (!props.roomType.res) {
            showMessage('El tipo de habitación que desea editar no se encuentra registrado en el sistema', 'warning', 4000)
            return router.replace(endpoint + '/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type')
        } else { setShowLoading({ ...showLoading, show: false }) }
    }

    const successEditConfirm = async (dataForm: RoomType) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })

        const resp = await fetch(endpoint + '/api/admin/rooms/roomsType/editRoomsType', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dataForm)
        })
        const response = await resp.json()

        if (!response.res) { return showMessage(response.message, 'error', 4000) }

        router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type')
        setTimeout(() => { showMessage(response.message, 'success', 4000) }, 300);
        setShowLoading({ ...showLoading, show: false })
    }

    return {
        showDialogConfirm,
        showLoading,
        // errorsMessages,
        successConfirm,
        successEditConfirm,
        showDialog,
        askIfItShouldRemove,
        showEditDialog,
        loadingData,
        deleteRoomType
    }
}

export default TypeRoomsFunctions