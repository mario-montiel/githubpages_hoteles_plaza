// React
import { useRouter } from "next/router"
import { useState } from "react"

// Helpers
import { endpoint } from "../../../../config/endpoint";

// Types
import { Department } from "../../../../types/Department"

// Components and CSS
import { toast, TypeOptions } from 'react-toastify';

const DepartmentsFunctions = () => {

    // Variables
    const router = useRouter()
    const initialValues = {
        oldValue: router.query.id + "" || "",
        id: '',
        name: '',
        password: ''
    }
    const initialDialogValues = {
        title: '',
        show: false,
        btnCancel: "",
        btnConfirm: "",
        isDelete: false,
        description: '',
    }
    const initialLoadingValues = {
        show: false,
        title: '',
    }

    // Use State
    const [department, setDepartment] = useState(initialValues)
    const [editDepartment, setEditDepartment] = useState(initialValues)
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

    const showDialog = (e: Department) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: true })
        setDepartment({
            ...department,
            id: e.id || '',
            name: e.name
        })
    }

    const successConfirm = async () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })

        try {
            await fetch(endpoint + '/api/admin/departments/addDepartments', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(department),
            })
                .then(() => {
                    router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/departments/departments')
                    setTimeout(() => {
                        showMessage('Departamento creado con éxito!', 'success')
                    }, 300);
                }).catch((err) => { console.log(err); })
        } catch (error) { console.log(error); }

        setShowLoading({ ...showLoading, show: false })
    }

    const askIfItShouldRemove = (data: any) => {
        setDepartment(data)
        setShowDialogConfirm({ 
            ...showDialogConfirm,
            show: true,
            title: '¿Desea eliminar el departamento ' + data.name + '?',
            description: 'Se eliminará el departamento de forma permanente'
        })
    }

    const deleteDepartment = async (reasonToDelete: string) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: 'Eliminando departamento' })

        await fetch(endpoint + '/api/admin/departments/removeDepartments', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({department, reasonToDelete})
        }).then(() => {
            showMessage('Departamento eliminada con éxito!', 'success')
            setShowLoading({ ...showLoading, show: false, title: 'Eliminando departamento' })
            router.replace(router.asPath);
        }).catch(error => {
            setShowLoading({ ...showLoading, show: false, title: 'Ocurrió un problema' })
        })

    }

    const showEditDialog = (e: Department) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: true })
        setEditDepartment({
            ...editDepartment,
            id: e.id ? e.id : '',
            name: e.name
        })
    }

    const loadingData = (props: any) => {
        setShowLoading({ ...showLoading, show: true })
        if (!props && !props.department) {
            router.replace(endpoint + '/aG90ZWxlc19wbGF6YQ0K/admin/system/departments/departments')
        } else { setShowLoading({ ...showLoading, show: false }) }
    }

    const successEditConfirm = async () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })
        try {
            await fetch(endpoint + '/api/admin/departments/editDepartments', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(editDepartment)
            })
                .then(() => {
                    router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/departments/departments')
                    setTimeout(() => {
                        showMessage('Departamento editado con éxito!', 'success')
                    }, 300);
                }).catch((err) => { console.log(err); })
        } catch (error) { console.log(error); }

        setShowLoading({ ...showLoading, show: false })
    }

    return {
        department,
        editDepartment,
        showDialogConfirm,
        showLoading,
        successConfirm,
        successEditConfirm,
        showDialog,
        handleDialogConfirm,
        askIfItShouldRemove,
        deleteDepartment,
        showEditDialog,
        loadingData,
        showMessage
    }
}

export default DepartmentsFunctions