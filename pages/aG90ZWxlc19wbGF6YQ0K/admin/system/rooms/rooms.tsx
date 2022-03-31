// React
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPageContext } from "next";

// Libraries
import { toast, ToastContainer } from "react-toastify";

// CSS
import stylesModalCreate from "../../../../../styles/admin/system/rooms/ModalCreate.module.css"
import styles from "../../../../../styles/admin/system/rooms/Rooms.module.css"
import 'react-toastify/dist/ReactToastify.css';

// Components
import DialogConfirm from "../../../../../components/admin/dialogs/confirm/DialogConfirm"
import BtnActions from "../../../../../components/admin/buttons/actions/BtnActions";
import ModalCreate from "../../../../../components/admin/modal/ModalCreate";
import ComponentRooms from "../../../../../components/admin/rooms/rooms";
import Loading from "../../../../../components/admin/loading/Loader"
import Layout from "../../../../../components/Layout"
import RoomFunctions from "./roomsFunctions";

// Helpers
import { unauthorized } from "../../../../../helpers/notification401";
import { mainUrl } from "../../../../../api/url";

// Types
import { RoomType } from "../../../../../types/RoomType";

Rooms.getInitialProps = async (ctx: NextPageContext) => {
    let userJson: any = []
    let roomsTypeJson: any = []
    let roomsStatusJson: any = []

    roomsStatusJson = await getFetchData(mainUrl + '/api/admin/rooms/roomsStatus/showRoomsStatus', ctx)
    roomsTypeJson = await getFetchData(mainUrl + '/api/admin/rooms/roomsType/showRoomsType', ctx)
    userJson = await getFetchData(mainUrl + '/api/admin/users/showCurrentUserData', ctx)

    return {
        roomsType: roomsTypeJson,
        roomsStatus: roomsStatusJson,
        user: userJson
    }
}

async function getFetchData(url: string, ctx: NextPageContext) {
    const cookie = ctx.req?.headers.cookie
    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })

    if (resp.status === 401 && !ctx.req) {
        unauthorized()
        Router.replace('/aG90ZWxlc19wbGF6YQ0K/authentication/login')
        return {};
    }

    if (resp.status === 401 && ctx.req) {
        unauthorized()
        ctx.res?.writeHead(302, {
            Location: 'http://localhost:3000/aG90ZWxlc19wbGF6YQ0K/authentication/login'
        })
        ctx.res?.end()
        return;
    }

    return await resp.json()
}

export default function Rooms(props: any) {

    // Variables
    const router = useRouter()
    const {
        showDialogConfirm,
        showLoading,
        sendUseRefData,
        confirmToAddRooms
    } = RoomFunctions()
    const addButton = `<svg  viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>`

    // States
    const [floorSelected, setFloorSelcted] = useState<number>(0)
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false)

    // UseEffect
    useEffect(() => {
        setFloorSelcted(1)
    }, [])

    useEffect(() => {
        sendUseRefData(props.user)
        initDisabledCheckbox()
    }, [showModalCreate])

    // Functions
    const initDisabledCheckbox = () => {
        const checkboxs = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>
        checkboxs.forEach((checkbox, index) => {
            checkbox.checked = false

            if (index === 0) {
                checkbox.checked = true
            }
        });
    }
    const writeDataSelctedInInputs = (e: any, index: number) => {
        const { value } = e.target
        const inputs: any = document.querySelectorAll('.input_quantity') as NodeListOf<HTMLElement>
        inputs[index].value = value
    }

    const confirmRequest = async (e: any) => {
        e.preventDefault()
        const modalCreate = document.querySelector('.create-modal') as HTMLElement
        const data = await checkErrorsAndGetData()

        if (!data) {
            toast('Asegurece de haber seleccionado las habitaciones que desea agregar', {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                type: "error"
            });
        }

        confirmToAddRooms(data)
        modalCreate.style.display = 'none'
    }

    const checkErrorsAndGetData = async () => {
        let html: any = []
        let roomsNumber: number = 0
        const checkboxs = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>
        const inputs: any = document.querySelectorAll('.input_quantity') as NodeListOf<HTMLElement>

        await inputs.forEach((input: HTMLInputElement, index: number) => {
            const inputValue = parseInt(input.value.toString())
            const checkbox = checkboxs[index]

            if (checkbox.checked && !input.value || inputValue < 1) {
                toast('Todos los campos deben estar llenos y deben ser valores numéricos', {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    type: "error"
                });
            }

            if (checkbox.checked) {
                const room = {
                    typeRoomId: parseInt(checkbox.value),
                    quantity: inputValue,
                }

                roomsNumber += inputValue
                html.push(room)
            }
        });

        if (html.length) {
            return {
                roomData: html,
                totalRooms: roomsNumber,
                floor: floorSelected,
                roomTypeId: 1,
                registredBy: '',
                hotelId: props.user.preferences.id,
                roomStatusId: props.roomsStatus[0].id,
                observations: '',
                lastRoomStatusId: props.roomsStatus[0].id,
                totalRoomsOfHotel: props.user.preferences.totalRooms,
                rooms: props.user.preferences.totalFloors > 1 ? props.user.preferences.rooms : false
            }
        }

        return false
    }

    const showRoomsRange = () => {
        let html: any = []
        props.roomsType.map((roomType: RoomType, index: number) => {
            html.push(
                <div className={`${stylesModalCreate.roomtype_container}`} key={index}>
                    <input
                        className={`${stylesModalCreate.checkbox_roomtype} checkbox`}
                        type="checkbox"
                        value={roomType.id}
                    />
                    <div className="input-container">
                        <label htmlFor={`name${index}`}>{roomType.name}</label>
                        <input
                            className='input'
                            id={`name${index}`}
                            name={`name${index}`}
                            type="range"
                            min="1"
                            max="50"
                            defaultValue="1"
                            onChange={(e) => writeDataSelctedInInputs(e, index)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            className={`${stylesModalCreate.input} input_quantity`}
                            name={`quantity${index}`}
                            placeholder="0"
                            defaultValue={1}
                            type="number"
                        />
                    </div>
                </div>
            )
        })

        return html
    }

    const showFloors = () => {
        let array = []
        for (let index = 0; index < props.user.preferences.totalFloors; index++) {
            array.push(
                <option value={(index + 1)} key={index}>{(index + 1)}</option>
            )
        }

        return array
    }


    return (
        <Layout
            title="Habitaciones"
            description="habitaciones de Hoteles Plaza"
        >
            {/* <h2 className={styles.title}>Habitaciones del {props.user ? props.user.preferences.name : null}</h2> */}

            <Loading isOpen={showLoading.show} text={showLoading.title} />

            <ToastContainer />

            {showDialogConfirm.show ? (
                <DialogConfirm
                    image={showDialogConfirm.image ? showDialogConfirm.image : ''}
                    alt={showDialogConfirm.alt ? showDialogConfirm.alt : ''}
                    title={showDialogConfirm.title ? showDialogConfirm.title : ''}
                    description={showDialogConfirm.description ? showDialogConfirm.description : ''}
                    btnConfirm={showDialogConfirm.btnConfirm ? showDialogConfirm.btnConfirm : ''}
                    btnCancel={showDialogConfirm.btnCancel ? showDialogConfirm.btnCancel : ''}
                    onConfirm={showDialogConfirm.onConfirm ? showDialogConfirm.onConfirm : () => { }}
                    onClose={showDialogConfirm.onClose ? showDialogConfirm.onClose : () => { }}
                />
            ) : null}

            <div className={`${styles.overlay} room-overlay`} />

            <section className={styles.room_section}>
                <div className={styles.container}>
                    {/* <h5 className={styles.data_in_subtitle}>Total de habitaciones: <b>{props.user.preferences.totalRooms ? props.user.preferences.totalRooms : 'No se pudieron cargar los datos!'}</b></h5> */}

                    <div className={styles.btn_container}>
                        {/* <BtnFilter
                            filterData={filterButton}
                            onClick={showFilterData} /> */}

                        <BtnActions
                            icon={addButton}
                            onClick={() => setShowModalCreate(!showModalCreate)}
                        />

                    </div>
                </div>

                {
                    showModalCreate ? (
                        <section>
                            <ModalCreate>
                                <button className={stylesModalCreate.btn_close} onClick={() => setShowModalCreate(!showModalCreate)}>
                                    <svg className={stylesModalCreate.svg_icon} viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                    </svg>
                                </button>

                                <form>
                                    <div className={stylesModalCreate.floor_container}>
                                        <h5>Agregar habitaciones</h5>
                                        <div className="input-flex-container">
                                            <label htmlFor="add_rooms_select">Piso donde se agregarán las habitaciones</label>
                                            <select
                                                className={`${stylesModalCreate.select} select`}
                                                id="add_rooms_select"
                                                onChange={(e) => setFloorSelcted(parseInt(e.target.value))}
                                            >
                                                {
                                                    showFloors()
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-grid">
                                        {showRoomsRange()}
                                    </div>
                                    <button className={stylesModalCreate.btn_submit} type="submit" onClick={(e) => confirmRequest(e)}>
                                        Agregar
                                    </button>
                                </form>
                            </ModalCreate>
                        </section>
                    ) : null
                }

                <section>
                    <ComponentRooms user={props.user} roomsStatus={props.roomsStatus} />
                </section>

            </section>
        </Layout>
    )
}