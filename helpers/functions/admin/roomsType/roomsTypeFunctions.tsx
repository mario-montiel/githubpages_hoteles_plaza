import { useState } from "react"
import { useRouter } from "next/router"

// CSS
import styles from "../../../../styles/admin/system/rooms/roomTypes/CreateRoomTypes.module.css"

// Libraries
import { toast, TypeOptions } from 'react-toastify';

// Helpers
import { endpoint } from "../../../../config/endpoint";

// Types
import { RoomType, RoomTypeForm, RoomTypeImages } from "../../../../types/RoomType"
import { Hotel } from "../../../../types/Hotel";

const TypeRoomsFunctions = (hotels: Array<Hotel>) => {
    
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
    const initialImagesValues = {
        type: 'add',
        imageSelected: -1,
        imageUrl: '',
        hotelId: 0,
        hotelName: ''
    }

    // Use State
    const [imagesUrl, setImagesUrl] = useState<Array<RoomTypeImages>>([])
    const [roomType, setRoomType] = useState<RoomTypeForm>()
    const [showLoading, setShowLoading] = useState(initialLoadingValues)
    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [roomImageSelected, setRoomImageSelected] = useState(initialImagesValues)

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

    const loadHotelsImages = (hotels: Array<Hotel>) => {
        const aImages = ['simple', 'double', 'suite']
        
        hotels.forEach((hotel: Hotel) => {
            const pathHotelName = hotel.pathImageName.substring(0, hotel.pathImageName.length - 1)

            aImages.forEach(image => {
                const imageUrl = `${endpoint}/hotels/rooms/${pathHotelName}/to_show_website/${image}_room.webp`

                setImagesUrl((oldValue: any) => [...oldValue, {hotelId: hotel.id, imageUrl, hotelName: hotel.pathImageName.substring(0, (hotel.pathImageName.length - 1))}])
            });
        });
    }

    const showImages = () => {
        let html: any = []

        imagesUrl.forEach((url: RoomTypeImages, index: number) => {
            html.push(
                <div key={index} className={styles.rooms_images_container}>
                    <div className={styles.svg_icon_container}>
                        <div className={styles.svg_icon_selected}>
                            <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
                            </svg>
                            Imágen seleccionada
                        </div>
                        <div className={styles.remove_images} onClick={() => removeImages(index)}>
                            <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
                            </svg>
                        </div>
                    </div>
                    <img src={url.imageUrl} alt="Habitación del hotel" onClick={() => addImages(index, url.hotelId, url.hotelName)} />
                </div>
            )
        });

        return html
    }

    const addImages = (index: number, hotelId: number, hotelName: string) => {
        setRoomImageSelected({
            ...roomImageSelected,
            type: 'add',
            imageSelected: index,
            imageUrl: imagesUrl[index].imageUrl,
            hotelId,
            hotelName
        })
    }

    const removeImages = (index: number) => {
        setRoomImageSelected({
            ...roomImageSelected,
            type: 'remove',
            imageSelected: index,
            imageUrl: imagesUrl[index].imageUrl
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
        console.log(dataForm);
        
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

        if (!props.res) {
            showMessage('El tipo de habitación que desea editar no se encuentra registrado en el sistema', 'warning', 4000)
            return router.replace(endpoint + '/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms_type/rooms_type')
        } 
        
        setShowLoading({ ...showLoading, show: false })
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
        imagesUrl,
        showImages,
        loadHotelsImages,
        roomImageSelected,
        showDialogConfirm,
        showLoading,
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