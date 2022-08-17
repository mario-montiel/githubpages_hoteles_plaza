// React
import { useRouter } from "next/router"
import { useState } from "react"

// Helpers
import { endpoint } from "../../../../config/endpoint";

// Types
import { Department } from "../../../../types/Department"

// Components and CSS
import { toast, TypeOptions } from 'react-toastify';
import { Service } from "../../../../types/Service";

const ServicesFunctions = () => {

    // Variables
    const router = useRouter()
    const initialDialogValues = {
        title: '',
        show: false,
        btnCancel: "",
        btnConfirm: "",
        isDelete: false,
        description: '',
        onConfirm: (reasonToDelete?: string) => { }
    }
    const initialLoadingValues = {
        show: false,
        title: '',
    }

    // Use State
    const [service, setService] = useState<Service>()
    const [editService, setEditService] = useState<Service>()
    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showLoading, setShowLoading] = useState(initialLoadingValues)

    // Functions
    const showMessage = (message: string, typeMessage: TypeOptions) => {
        toast(message, {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            type: typeMessage
        })
    }

    const handleDialogConfirm = () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
    }

    const showDialog = (serviceData: Service) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: true })
        setService(serviceData)
    }

    const successConfirm = async () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })

        const getResponse = await fetch(endpoint + '/api/admin/services/addServices', {
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(service),
        })
        const response = await getResponse.json()

        if (!response.res) { showMessage('No se pudo crear el servicio!', 'error') }

        setShowLoading({ ...showLoading, show: false })
        router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/website/services/services')
        setTimeout(() => { showMessage('Servicio creado con éxito!', 'success') }, 500);
    }

    const askIfItShouldRemove = (data: any) => {
        setService(data)
        setShowDialogConfirm({
            ...showDialogConfirm,
            show: true,
            title: '¿Desea eliminar el servicio ' + data.name + '?',
            description: 'Si desea quitar o asignar un servicio a un tipo de habitacion favor de editarlo ya que el servicio se eliminará de forma permanente con todos los tipos de habitación asignados'
        })
    }

    const deleteService = async (reasonToDelete: string) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: 'Eliminando departamento' })

        const getResponse = await fetch(endpoint + '/api/admin/services/removeServices', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ service, reasonToDelete })
        })
        const response = await getResponse.json()

        if (!response.res) { return showMessage(response.message, 'error') }

        showMessage(response.message, 'success')
        setShowLoading({ ...showLoading, show: false, title: 'Eliminando departamento' })
        router.replace(router.asPath);
    }

    const showEditDialog = (serviceData: Service) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: true })
        setEditService(serviceData)
    }

    const loadingData = (props: any) => {
        setShowLoading({ ...showLoading, show: true })
        if (!props && !props.department) {
            router.replace(endpoint + '/aG90ZWxlc19wbGF6YQ0K/admin/website/services/services')
        } else { setShowLoading({ ...showLoading, show: false }) }
    }

    const successEditConfirm = async () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })

        const resp = await fetch(endpoint + '/api/admin/services/editService', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(editService)
        })
        const response = await resp.json()

        if (!response.res) {
            return showMessage('No se pudo editar el departamento!', 'error')
        }

        setShowLoading({ ...showLoading, show: false })
        router.push('/aG90ZWxlc19wbGF6YQ0K/admin/website/services/services')
        setTimeout(() => { showMessage('Servicio editado con éxito!', 'success') }, 300);
    }

    return {
        service,
        editService,
        showDialogConfirm,
        showLoading,
        successConfirm,
        successEditConfirm,
        showDialog,
        handleDialogConfirm,
        askIfItShouldRemove,
        deleteService,
        showEditDialog,
        loadingData,
        showMessage
    }
}

export default ServicesFunctions