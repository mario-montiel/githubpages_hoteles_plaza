import { useState } from "react"
import { useRouter } from "next/router"

// Helpers
import { endpoint } from "../../../../config/endpoint";

// Types
import { RoomType } from "../../../../types/RoomType"

// Components and CSS
import { toast } from 'react-toastify';

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
    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showLoading, setShowLoading] = useState(initialLoadingValues)

    // Use Effect

    // Functions
    // const errorsMessages = (errors: string, type?: string, quantity?: number) => {
    //     let errorText: string = ''
    //     switch (errors) {
    //         case 'maxLength':
    //             errorText = `El campo ${type} solo puede tener ${quantity} caracteres como máximo!`
    //             return (
    //                 <small>{errorText}</small>
    //             )
    //         case 'required':
    //             errorText = `El campo ${type} esta vacio!`
    //             return (
    //                 <small>{errorText}</small>
    //             )
    //             break;

    //         case 'required':
    //             errorText = `Solo puede que ingresar números!`
    //             return (
    //                 <small>{errorText}</small>
    //             )
    //             break;

    //         default:
    //             break;
    //     }
    // }

    const showDialog = (dataForm: RoomType) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/dialog/roomType.svg',
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
        
        try {
            await fetch(endpoint + '/api/admin/rooms/roomsType/addRoomsType', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
                .then((response) => {

                    if (response.ok) {
                        router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type')
                        return setTimeout(() => {
                            toast('Tipo de habitación creada con éxito!', {
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

    const askIfItShouldRemove = (dataForm: RoomType) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/dialog/roomType.svg',
            alt: 'Type room image',
            description: `¿Desea eliminar el tipo de habitación ${dataForm.name}?`,
            btnConfirm: 'Eliminar',
            btnCancel: 'Cancelar',
            onConfirm: () => deleteRoomType(dataForm),
            onClose: () => setShowDialogConfirm({ ...showDialogConfirm, show: false })
        })
    }

    const deleteRoomType = async (dataForm: RoomType) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: 'Eliminando tipo de habitación' })

        await fetch(endpoint + '/api/admin/rooms/roomsType/removeRoomsType', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        }).then(() => {
            setTimeout(() => {
                toast('Tipo de habitación eliminado con éxito!', {
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

    const showEditDialog = (dataForm: RoomType) => {
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            image: '/dialog/roomType.svg',
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
            toast('El tipo de habitación que desea editar no se encuentra registrado en el sistema', {
                position: "top-right",
                autoClose: 4000,
                closeOnClick: true,
                type: 'warning'
            })
            return router.replace(endpoint + '/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type')
        } else { setShowLoading({ ...showLoading, show: false }) }
    }

    const successEditConfirm = async (dataForm: RoomType) => {
        // selectToastText()
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })
        try {
            await fetch(endpoint + '/api/admin/rooms/roomsType/editRoomsType', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataForm)
            })
                .then(() => {
                    router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type')
                    setTimeout(() => {
                        toast('Tipo de habitación editado con éxito!', {
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
        // errorsMessages,
        successConfirm,
        successEditConfirm,
        showDialog,
        askIfItShouldRemove,
        showEditDialog,
        loadingData
    }
}

export default TypeRoomsFunctions