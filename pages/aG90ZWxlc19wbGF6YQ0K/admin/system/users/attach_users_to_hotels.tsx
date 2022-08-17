// React and Next

// Libraries
import { ToastContainer } from "react-toastify"

// CSS
import styles from "../../../../../styles/admin/system/users/AttachUsersToHotels.module.css"

// Components
import Layout from "../../../../../components/globals/Layout"
import Loading from "../../../../../components/admin/loading/Loader"
import { NextPageContext } from "next"
import { endpoint } from "../../../../../config/endpoint"
import Router, { useRouter } from "next/router"
import { User } from "../../../../../types/User"
import { Hotel } from "../../../../../types/Hotel"
import { CanvasHTMLAttributes, useEffect, useRef, useState } from "react"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions"
import BtnSubmit from "../../../../../components/admin/buttons/submit/BtnSubmit"
import UsersFunctions from "../../../../../helpers/functions/admin/users/usersFunctions"

// Helpers

// Types

AttachUsersToHotels.getInitialProps = async (ctx: NextPageContext) => {

    const isAdmin = await getFetch(endpoint + '/api/admin/auth/isAdmin', ctx)
    const UsersJson = await getFetch(endpoint + '/api/admin/users/showUsers', ctx)
    const hotelsJson = await getFetch(endpoint + '/api/admin/hotels/showHotels', ctx)

    if (!isAdmin.res) {
        ctx.res?.writeHead(302, { Location: '/aG90ZWxlc19wbGF6YQ0K/admin/system/users/users' })
        ctx.res?.end()
        return { props: {} }
    }

    return { isAdmin, users: UsersJson, hotels: hotelsJson }
}

async function getFetch(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, { headers: { cookie: cookie! } })

    if (resp.status === 401 && !ctx.req) {
        Router.replace(endpoint + '/aG90ZWxlc19wbGF6YQ0K/authentication/login')
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
            Location: endpoint + '/aG90ZWxlc19wbGF6YQ0K/authentication/login'
        })
        ctx.res?.end()
        return;
    }

    return await resp.json()
}

export default function AttachUsersToHotels({ isAdmin, users, hotels }: any) {

    // Variables
    const router = useRouter()
    const {
        showDialogConfirm,
        showLoading,
        attachUsersIntoHotels
    } = UsersFunctions(isAdmin.res)
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`

    // Use Ref
    const ulContainerRef = useRef<HTMLUListElement>(null)
    const usersAssignedRef = useRef<HTMLDivElement>(null)
    const hotelContainerRef = useRef<HTMLUListElement>(null)

    // Use State
    const [usersData, setUsersData] = useState<any>([])
    const [usersWithoutAssign, setUserWithoutAssign] = useState(0)
    const [dragElement, setDragElement] = useState<HTMLLIElement>()
    const [draggedElement, setDraggedElement] = useState<HTMLLIElement>()

    // Functions
    const addCardDragStyles = (e: any) => {
        setDragElement(e.target)
        setTimeout(() => { e.target.classList.add(styles.dragEl) }, 0);
    }

    const removeCardDragStyles = (e: any) => {
        setTimeout(() => {
            e.target.classList.remove(styles.dragEl)
        }, 0);
    }

    const elementCreated = (e: any) => {
        const { target } = e
        const userName: string = dragElement?.textContent?.substring(0, dragElement?.textContent.length - 1) || ''
        let btnCanvas: any = document.createElement('button')
        btnCanvas.innerText = 'x'
        btnCanvas.type = 'button'

        let canvas: any = document.createElement('li');
        canvas.width = 300;
        canvas.height = 300;
        canvas.id = dragElement?.id;
        canvas.innerText = userName
        canvas.classList.add(styles.user_card)
        btnCanvas.onclick = () => returnElementToMainList(target, canvas)
        canvas.appendChild(btnCanvas)
        return canvas
    }

    const appendElementIfNotExist = (e: any) => {
        let isExist = false
        const isContainer = e.target.localName == 'ul' ? true : false
        const container: HTMLElement = e.target
        const validate = detectIfElementIsInAllContainers(e)

        if (isContainer) {

            if (validate) {
                container.appendChild(dragElement!)
                return setUserWithoutAssign(ulContainerRef.current?.childNodes.length!)
            }
            const element: HTMLLIElement = elementCreated(e)
            const elements: any = e.target.childNodes

            if (!elements.length) {
                container.appendChild(element!)
            }

            elements.forEach((htmlElement: any) => {
                if (htmlElement.textContent == element.textContent) { isExist = true }
            });

            if (!isExist) { container.appendChild(element!) }
        }
    }

    const detectIfElementIsInAllContainers = (e: any) => {
        let isInAllContainers = 1

        usersAssignedRef.current?.childNodes.forEach(htmlElement => {
            htmlElement.childNodes[1].childNodes.forEach(liElement => {
                if (liElement == dragElement) {
                    console.log(liElement);

                    isInAllContainers++
                }
            });
        });

        if (usersAssignedRef.current?.childNodes.length == isInAllContainers) {
            return true
        }

        return false
    }

    const returnElementToMainList = (htmlTarget: HTMLElement, htmlElement: HTMLElement) => {
        htmlTarget.removeChild(htmlElement)
    }

    const generateDataToSave = () => {
        let users: any = []
        const htmlChildren: any = usersAssignedRef.current?.children;
        
        for (let index = 0; index < htmlChildren.length; index++) {
            const HTMLusers: HTMLElement = htmlChildren[index];

            HTMLusers.childNodes[1].childNodes.forEach((user: any) => {
                users.push({ id: user.id, hotelId: hotels[index].id })
            });
        }
        
        attachUsersIntoHotels(users)
    }

    // Use Effect

    return (
        <Layout
            title="Adjuntar empleados a hoteles"
            description="Adjuntar empleados a los hoteles plaza"
        >

            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>


            <h2 className={styles.title}>Adjuntar empleados a los hoteles</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text={showDialogConfirm.title} />
            ) : null}

            <ToastContainer />

            <section className={styles.attach_user_hotel_section}>
                <form encType="multipart/form-data" className={styles.attach_user_hotel_form}>
                    <h5 className={styles.subtitle}>Usuarios sin asignar a un hotel {usersWithoutAssign}</h5>

                    <div className={`${styles.users_container}`}>
                        <ul ref={ulContainerRef}>
                            {
                                users.map((user: any, index: number) =>
                                    !user.hotels.length ? (
                                        <li
                                            id={user.id}
                                            key={index}
                                            className={styles.user_card}
                                            draggable={true}
                                            onDrag={(e: any) => addCardDragStyles(e)}
                                            onDragEnd={(e: any) => removeCardDragStyles(e)}
                                        >
                                            {user.fullName} {user.lastName}
                                            <button>x</button>
                                        </li>
                                    ) : (null)
                                )
                            }
                            {
                                !ulContainerRef.current?.childNodes.length ? (
                                    <p>Todos los usuarios están asignados a un hotel</p>
                                ) : null
                            }
                        </ul>
                    </div>

                    <h5 className={styles.subtitle}>Hoteles Plaza</h5>
                    <br />
                    <div ref={usersAssignedRef} className={styles.attach_user_hotel_grid}>
                        {
                            hotels.map((hotel: any, index: number) =>
                                <div className={styles.attach_user_hotel_container} key={index} onDragOver={(e: any) => appendElementIfNotExist(e)}>
                                    <h5>{hotel.name}</h5>
                                    <ul ref={hotelContainerRef} className={styles.user_into_hotel} />
                                </div>
                            )
                        }
                    </div>

                    <button
                        type="button"
                        onClick={generateDataToSave}
                    >Registrar</button>

                </form>

            </section>
        </Layout>
    )
}