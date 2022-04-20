import { useState } from "react"
import { useRouter } from "next/router"

// React

// Libraries
import { toast } from 'react-toastify';

// CSS

// Components

//Helpers
import { endpoint } from "../../../../config/endpoint";

// Types
import { Category } from "../../../../types/Category";

const CategoriesFunctions = () => {

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
        title: 'Eliminar categoría',
        description: '',
        btnConfirm: "Eliminar",
        btnCancel: "Cancelar"
    }
    const initialLoadingValues = {
        show: false,
        title: 'Eliminando categoría',
    }

    // Use State
    const [category, setCategory] = useState(initialValues)
    const [editCategory, setEditCategory] = useState(initialValues)
    const [showDialogConfirm, setShowDialogConfirm] = useState(initialDialogValues)
    const [showLoading, setShowLoading] = useState(initialLoadingValues)

    // Use Effect

    // Functions
    const handleDialogConfirm = () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
    }

    const showDialog = (e: Category) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: true })
        setCategory({
            ...category,
            id: e.id ? e.id : '',
            name: e.name,
            type: e.type ? e.type : ''
        })
    }

    const successConfirm = async () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })

        try {
            await fetch(endpoint + '/api/admin/categories/addCategories', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(category)
            })
                .then((response) => {
                    if (response.ok) {
                        router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/categories/categories')
                        setTimeout(() => {
                            toast('Categoria creada con éxito!', {
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

    const askIfItShouldRemove = (data: any) => {
        setCategory(data)
        setShowDialogConfirm({ ...showDialogConfirm, show: true, title: '¿Desea eliminar la categoria ' + data.name + '?', description: 'Se eliminará la categoría de forma permanente' })
    }

    const deleteCategory = async () => {
        setShowDialogConfirm({ ...showDialogConfirm, show: false })
        setShowLoading({ ...showLoading, show: true, title: 'Eliminando categoría' })

        await fetch(endpoint + '/api/admin/categories/removeCategories', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(category)
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

    const showEditDialog = (e: Category) => {
        setShowDialogConfirm({ ...showDialogConfirm, show: true })
        setEditCategory({
            ...editCategory,
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
        // selectToastText()
        setShowDialogConfirm({ ...showDialogConfirm, show: !showDialogConfirm })
        setShowLoading({ ...showLoading, show: true })
        try {
            await fetch(endpoint + '/api/admin/categories/editCategories', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(editCategory)
            })
                .then(() => {
                    router.replace('/aG90ZWxlc19wbGF6YQ0K/admin/system/categories/categories')
                    setTimeout(() => {
                        toast('Categoria editada con éxito!', {
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
        category,
        editCategory,
        showDialogConfirm,
        showLoading,
        successConfirm,
        successEditConfirm,
        showDialog,
        handleDialogConfirm,
        askIfItShouldRemove,
        deleteCategory,
        showEditDialog,
        loadingData
    }
}

export default CategoriesFunctions