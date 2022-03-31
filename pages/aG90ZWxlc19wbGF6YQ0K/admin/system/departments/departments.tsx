// React
import Router, { useRouter } from "next/router";

// Libraries

// Components and CSS
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"
import Layout from "../../../../../components/Layout"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions";
import styles from "../../../../../styles/admin/system/departments/Department.module.css"
import Loading from "../../../../../components/admin/loading/Loader"
import { Department } from "../../../../../types/Department";
import { NextPageContext } from "next";
import { mainUrl } from "../../../../../api/url";
import DepartmentsFunctions from "./departmentsFunctions";

// Types

Departments.getInitialProps = async (ctx: NextPageContext) => {
    let departmentsJson: any = []
    departmentsJson = await getUsers(mainUrl + '/api/admin/departments/showDepartments', ctx)
    return { departments: departmentsJson }
}

async function getUsers(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })

    if (resp.status === 401 && !ctx.req) {
        Router.replace('/aG90ZWxlc19wbGF6YQ0K/authentication/login')
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
            Location: 'http://localhost:3000/aG90ZWxlc19wbGF6YQ0K/authentication/login'
        })
        ctx.res?.end()
        return;
    }

    return await resp.json()
}

export default function Departments(props: any) {

    // Variables
    const router = useRouter()
    const {
        showDialogConfirm,
        showLoading,
        handleDialogConfirm,
        askIfItShouldRemove,
        deleteDepartment
    } = DepartmentsFunctions()
    // const filterButton = {
    //     icon: `<svg class="svg_department_icon" viewBox="0 0 24 24">
    //         <path fill="currentColor" d="M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z" />
    //     </svg>`,
    //     data: [
    //         {text: 'Ascendente', onClick: () => get()},
    //         {text: 'Descendente', onClick: () => get()}
    //     ]
    // }
    const addButton = `<svg  viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>`

    // States

    // UseEffect

    // Functions

    return (
        <Layout
            title="Departamentos"
            description="Departamentos de los hoteles plaza"
        >

            <h2 className={styles.title}>Departamentos</h2>

            <Loading isOpen={showLoading.show} text={showLoading.title} />

            <ToastContainer />

            {showDialogConfirm.show ? (
                <DialogConfirm
                    title={showDialogConfirm.title}
                    description={showDialogConfirm.description}
                    btnConfirm="Eliminar"
                    btnCancel="Cancelar"
                    onConfirm={(deleteDepartment)}
                    onClose={handleDialogConfirm}
                />
            ) : null}

            <section className={styles.department_section}>
                <div className={styles.container}>
                    <h5 className={styles.data_in_subtitle}>Total de departamentos: <b>{props.departments.length ? props.departments.length : 'No se pudieron cargar los datos!'}</b></h5>

                    <div className={styles.btn_container}>
                        {/* <BtnFilter
                            filterData={filterButton}
                            onClick={showFilterData} /> */}

                        <BtnActions
                            icon={addButton}
                            onClick={() => router.push('/aG90ZWxlc19wbGF6YQ0K/admin/system/departments/create_department')} />
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.departments.map((department: Department, index: number) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{department.name}</td>
                                    <td>
                                        <div className="container">
                                            <button className="btn_action" onClick={() => router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/departments/${department.name}`)}>
                                                <svg className="svg_table_icon" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                                </svg>
                                            </button>
                                            <button className="btn_action" onClick={() => askIfItShouldRemove(department)}>
                                                <svg className="svg_table_icon" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </section>
        </Layout>
    )
}