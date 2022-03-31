// React
import { useEffect } from "react"

// Libraries

// Components and CSS
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router"
import { NextPageContext } from "next"
import { useForm } from "react-hook-form";
import { mainUrl } from "../../../../../../api/url"
import BtnSubmit from "../../../../../../components/admin/buttons/submit/BtnSubmit"
import DialogConfirm from "../../../../../../components/admin/dialogs/confirm/DialogConfirm"
import Layout from "../../../../../../components/Layout"
import styles from "../../../../../../styles/admin/system/rooms/EditRoom.module.css"
import Loading from "../../../../../../components/admin/loading/Loader"
import BtnActions from "../../../../../../components/admin/buttons/actions/BtnActions"
import RoomFunctions from "../roomsFunctions"
import { ToastContainer } from "react-toastify";
import { RoomForm } from "../../../../../../types/Room";
import { RoomType } from "../../../../../../types/RoomType";

EditCategory.getInitialProps = async (ctx: NextPageContext) => {
    let rooomTypeJson: any = []
    let rooomJson: any = []

    rooomTypeJson = await getFetch(mainUrl + '/api/admin/rooms/roomsType/showRoomsType', ctx)
    rooomJson = await getFetch(mainUrl + '/api/admin/rooms/showEditRoom', ctx, ctx.query.id)

    return {
        roomsType: rooomTypeJson,
        room: rooomJson
    }
}

async function getFetch(url: string, ctx: NextPageContext, routeQuery?: any) {
    const cookie = ctx.req?.headers.cookie
    if (routeQuery) {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                cookie: cookie!
            },
            body: routeQuery ? JSON.stringify(parseInt(ctx.query.id!.toString())) : null
        })

        validations(resp, ctx)

        return resp.json()
    }

    const resp = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })

    validations(resp, ctx)

    return await resp.json()
}

const validations = (resp: any, ctx: NextPageContext) => {
    if (resp.status === 500 && ctx.req) {
        ctx.res?.writeHead(302, {
            Location: 'http://localhost:3000/aG90ZWxlc19wbGF6YQ0K/admin/system/rooms/rooms'
        })
        ctx.res?.end()

        return {};
    }

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
}

export default function EditCategory(props: any) {
    // console.log(props);

    // Variables
    const {
        showDialogConfirm,
        showLoading,
        showEditDialog,
        editRoomConfirm,
    } = RoomFunctions()
    const router = useRouter()
    const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>`
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<any>();
    const onSubmit = (data: any) => {
        console.log(data);

        editRoomConfirm(data)
    }

    // States

    // Use Efffect
    useEffect(() => {
        if (props) {
            fillDataOfRoom()
        }
    }, [props])

    // States

    // Functions
    const showRoomName = (room: any) => {
        if (room.hotel.totalFloors === 1) {
            const roomName = (room.roomNumber < 10 ? '0' + room.roomNumber : room.roomNumber)
            return roomName
        }

        const roomName = (room.floor) + '' + (room.roomNumber < 10 ? '0' + room.roomNumber : room.roomNumber)
        return roomName
    }

    const fillDataOfRoom = async () => {
        const roomName = await showRoomName(props.room.data)

        setValue('id', props.room.data.id)
        setValue('name', roomName)
        setValue('floor', props.room.data.floor)
        setValue('hotelId', props.room.data.hotel.name)
        setValue('roomTypeId', props.room.data.roomType.id)
        setValue('roomStatusId', props.room.data.roomStatus.id)
        setValue('roomStatus', props.room.data.roomStatus.name)
        setValue('lastRoomStatusId', props.room.data.lastRoomStatus.name)
        setValue('observations', props.room.data.observations)
    }

    return (
        <Layout
            title="Editar habitación"
            description="Habitación de los hoteles plaza"
        >
            <div className={styles.btn_back_container}>
                <BtnActions icon={btnIconBack} onClick={() => router.back()} />
            </div>

            <h2 className={styles.title}>Editar habitación {showRoomName(props.room.data)}</h2>

            {showLoading.show ? (
                <Loading isOpen={showLoading.show} text="Guardando datos" />
            ) : null}

            <ToastContainer />

            {showDialogConfirm.show ? (
                <DialogConfirm
                    image={showDialogConfirm.image ? showDialogConfirm.image : ''}
                    alt={showDialogConfirm.alt ? showDialogConfirm.alt : ''}
                    description={showDialogConfirm.description ? showDialogConfirm.description : ''}
                    btnConfirm={showDialogConfirm.btnConfirm ? showDialogConfirm.btnConfirm : ''}
                    btnCancel={showDialogConfirm.btnCancel ? showDialogConfirm.btnCancel : ''}
                    onConfirm={showDialogConfirm.onConfirm ? showDialogConfirm.onConfirm : () => { }}
                    onClose={showDialogConfirm.onClose ? showDialogConfirm.onClose : () => { }}
                />
            ) : (null)}

            <section className={styles.edit_room_section}>
                <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className={styles.room_card} style={{ backgroundColor: props.room.data.roomStatus.backgroundColor }}>
                            <p style={{ color: props.room.data.roomStatus.textColor }}>{showRoomName(props.room.data)}</p>
                            <p style={{ color: props.room.data.roomStatus.textColor }}>{props.room.data.roomType.keyWord}</p>
                        </div>
                    </div>

                    <h5 className={styles.subtitle}>Datos de la habitación</h5>

                    <div className="form-grid">
                        <div className="input-container" hidden>
                            <label htmlFor="id">ID</label>
                            <br />
                            <input
                                className={errors.id ? 'input input_error_text' : 'input'}
                                {...register("id", {
                                    required: true,
                                })}
                                id="id"
                                disabled
                                hidden
                            />
                            <br />
                        </div>
                        <div className="input-container">
                            <label htmlFor="email">Número de la habitación</label>
                            <br />
                            <input
                                className={errors.name ? 'input input_error_text' : 'input'}
                                {...register("name", {
                                    required: true,
                                })}
                                id="name"
                                disabled
                            />
                            <br />
                            {errors.name && <small>El campo número de la habitación está vacio!</small>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="floor">Piso</label>
                            <br />
                            <input
                                className={errors.floor ? 'input input_error_text' : 'input'}
                                {...register("floor", {
                                    required: false,
                                })}
                                id="floor"
                                disabled
                            />
                            <br />
                        </div>

                        <div className="input-container">
                            <label htmlFor="hotelId">Hotel</label>
                            <br />
                            <input
                                className={errors.hotelId ? 'input input_error_text' : 'input'}
                                {...register("hotelId", {
                                    required: false,
                                })}
                                id="hotelId"
                                disabled
                            />
                            <br />
                            {errors.hotelId && <small>El campo Correo Electrónico está vacio!</small>}
                        </div>

                        <div className="input-container">
                            <label htmlFor="roomTypeId">Tipo de habitación</label>
                            <br />
                            <select
                                className="select"
                                {...register("roomTypeId", { required: true })}
                                id="roomTypeId"
                                autoComplete="off"
                            >
                                {
                                    props.roomsType.length ? (
                                        props.roomsType.map((roomType: RoomType, index: number) =>
                                            <option key={index} value={roomType.id}>{roomType.name}</option>
                                        )
                                    ) : null
                                }
                            </select>
                            <br />
                        </div>

                        {errors.roomTypeId}

                        <div className="input-container">
                            <label htmlFor="roomStatusId">Estatus actual de la habitación</label>
                            <br />
                            <input
                                className={errors.hotelId ? 'input input_error_text' : 'input'}
                                {...register("roomStatusId", {
                                    required: false,
                                })}
                                id="roomStatusId"
                                disabled
                            />
                            <br />
                        </div>

                        <div className="input-container">
                            <label htmlFor="lastRoomStatusId">Último estatus de la habitación</label>
                            <br />
                            <input
                                className={errors.floor ? 'input input_error_text' : 'input'}
                                {...register("lastRoomStatusId", {
                                    required: false,
                                })}
                                id="lastRoomStatusId"
                                disabled
                            />
                            <br />
                        </div>

                        <div className="input-container">
                            <label htmlFor="observations">Observaciones</label>
                            <br />
                            <textarea
                                className={errors.observations ? 'input input_error_text' : 'input'}
                                {...register("observations", {
                                    required: false,
                                })}
                                id="observations"
                                autoComplete="off"
                                autoFocus={true}
                            />
                            <br />
                        </div>
                    </div>



                    {!Object.values(errors).length ? (
                        <BtnSubmit title="Editar" loading={showLoading.show} />
                    ) : (
                        <p className="submit-error-text mt-3">Se encontraron algunos errores!.</p>
                    )}

                </form>
            </section>
        </Layout>
    )
}