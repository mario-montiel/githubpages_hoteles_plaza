// React
import { useRouter } from "next/router"
import { useState } from "react"

// Helpers
import { endpoint } from "../../../../config/endpoint";

// Types
import { Department } from "../../../../types/Department"

// Components and CSS
import { toast } from 'react-toastify';

const DepartmentsFunctions = () => {

    // Variables
    const router = useRouter()
    const initialValues = {
        oldValue: router.query.id + "" || "",
        id: '',
        name: '',
        type: ''
    }
    const initialDialogValues = {
        show: false,
        title: '',
        description: '',
        btnConfirm: "",
        btnCancel: ""
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
    const handleDialogConfirm = () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
    }

    const showDialog = (e: Department) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: true })
        setDepartment({
            ...department,
            id: e.id || '',
            name: e.name,
            type: e.type ? e.type : ''
        })
    }

    const successConfirm = async () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })
        console.log(department);
        
        try {
            await fetch(endpoint + '/api/admin/departments/addDepartments', {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(department),
            })
                .then((res) => {
                    console.log(res);
                    
                    router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/departments/departments')
                    setTimeout(() => {
                        toast('Departamento creado con éxito!', {
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

    const askIfItShouldRemove = (data: any) => {
        setDepartment(data)
        setShowDialogConfirm({ ...showDialogConfirm, show: true, title: '¿Desea eliminar el departamento ' + data.name + '?', description: 'Se eliminará el departamento de forma permanente' })
    }

    const deleteDepartment = async () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: 'Eliminando categoría' })

        await fetch(endpoint + '/api/admin/departments/removeDepartments', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(department)
        }).then(() => {
            toast('Categoria eliminada con éxito!', {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                type: 'success'
            })
            setShowLoading({ ...showLoading, show: false, title: 'Eliminando categoría' })
            router.replace(router.asPath);
        }).catch(error => {
            console.log(error);
            setShowLoading({ ...showLoading, show: false, title: 'Eliminando categoría' })
        })

    }

    const showEditDialog = (e: Department) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: true })
        setEditDepartment({
            ...editDepartment,
            id: e.id ? e.id : '',
            name: e.name,
            type: e.type ? e.type : ''
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
                        toast('Departamento editado con éxito!', {
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
        loadingData
    }
}

export default DepartmentsFunctions