
const x = () => {

    return (
        <div>x</div>
    )
}

export default x

// // React

// // Libraries

// // Components and CSS
// import { useContext, useEffect, useRef, useState } from "react"
// import { useForm } from "react-hook-form";
// import BtnActions from "../../../components/admin/buttons/actions/BtnActions";
// import BtnSubmit from "../../../components/admin/buttons/submit/BtnSubmit";
// import styles from "../../../styles/admin/profile/Profile.module.css";
// import { Department } from "../../../types/Department";
// import { Hotel } from "../../../types/Hotel";
// import { User, UserForm } from "../../../types/User";
// import router from "next/router";
// import AdminLogin from "../authentication/login";
// import { notAuthWarningText, notAuthWarningTitle } from "../../../helpers/global_variables/GlobalVariables";

// // Types

// // export const getServerSideProps = async () => {
// //     let departmentData: any = []
// //     let hotelData: any = []
// //     let usersData: any = []
// //     const departments = (await GetDocs(Collection(db, 'departments'))).docs
// //     const hotels = (await GetDocs(Collection(db, 'hotels'))).docs
// //     const users = (await GetDocs(Collection(db, 'users'))).docs

// //     departments.forEach((doc) => {
// //         departmentData.push({ ...doc.data(), id: doc.id })
// //     });

// //     hotels.forEach((doc) => {
// //         hotelData.push({ ...doc.data(), id: doc.id })
// //     });

// //     users.forEach((doc) => {
// //         usersData.push({ ...doc.data(), id: doc.id })
// //     });

// //     return {
// //         props: {
// //             departments: (await departmentData),
// //             hotels: (await hotelData),
// //             users: (await usersData)
// //         }
// //     }
// // };

// export default function Profile(props: any) {

//     // Variables
//     const { register, setValue, clearErrors, handleSubmit, formState: { errors } } = useForm<UserForm>();
//     const onSubmit = (data: any) => {
//         console.log(data);
//     }
//     const profileFormRef = useRef<HTMLFormElement>(null)
//     const selectUserRef = useRef<HTMLSelectElement>(null)
//     const btnIconBack = `<svg class="svg_back" viewBox="0 0 24 24">
//         <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
//     </svg>`

//     // States
//     const [username, setUsername] = useState<string>('')
//     const [option, setOption] = useState<number>(0)

//     // Use Effect
//     useEffect(() => {
//         capitalLetter()
//         // loadData(currentUser.username)
//     }, [option])

//     // Function
//     function loadData(dataUser: string) {
//         let userDB: any = null

//         props.users.map((user: any) => {
//             if (user.username === dataUser) { userDB = user }
//         })


//         if (userDB) {

//             // setValue('username', userDB.username)
//             // setValue('email', userDB.email)
//             // setValue('phone', userDB.phone)
//             // setValue('hotel', userDB.hotel)
//             // setValue('area', userDB.area)
//             // setValue('privileges', userDB.privileges)
//             // disabledElements('disabled')
//         }
//     }

//     function disabledElements(type: string) {
//         const inputs = profileFormRef.current?.querySelectorAll('input')
//         const selects = profileFormRef.current?.querySelectorAll('select')

//         inputs?.forEach(el => {
//             if (type === 'disabled') {
//                 el.setAttribute('disabled', 'true')
//             } else { el.removeAttribute('disabled') }
//         })

//         selects?.forEach(el => {
//             if (type === 'disabled') {
//                 el.setAttribute('disabled', 'true')
//             } else { el.removeAttribute('disabled') }
//         })
//     }

//     function capitalLetter() {
//         // if (currentUser) {
//         //     const capitalLetter = currentUser.username[0].toUpperCase()
//         //     setUsername(capitalLetter + currentUser.username.substr(1, currentUser.username.length))
//         // }
//     }

//     function showSelectUser() {
//         let username: any = null
//         // if (currentUser) { username = currentUser.username }

//         let html: any = []
//         let storageDataToReplace: any = []

//         {
//             props.users.map((user: User, index: number) => {

//                 // if (user && username === user.username) {
//                 //     storageDataToReplace.push(html[0])
//                 //     html[0] = <option value={user.username} key={index} onClick={() => loadData(user.username)}>{user.username}</option>
//                 //     html.push(storageDataToReplace)
//                 // } else {
//                 //     html.push(<option value={user.username} key={index} onClick={() => loadData(user.username)}>{user.username}</option>)
//                 // }
//             })
//         }

//         return (
//             option === 0 ? (
//                 <select
//                     ref={selectUserRef}
//                     className="select_full_width"
//                     id="stars_select"
//                     autoComplete="off"
//                     onChange={() => loadData(selectUserRef.current?.value as string)
//                     }
//                 >
//                     {html}
//                 </select>
//             ) : null
//         )
//     }

//     function showHotels() {
//         let html: any = []
//         {
//             props.hotels.map((hotel: Hotel, index: number) =>
//                 html.push(
//                     <div className="input-container" key={index}>
//                         <label htmlFor="hotel">{hotel.name}</label>
//                         <br />
//                         <input
//                             className={errors.phone ? 'input_error_text checkbox' : 'checkbox'}
//                             {...register("hotel", { required: true })}
//                             id="hotel"
//                             autoComplete="off"
//                             autoFocus={true}
//                             type="checkbox"
//                             value={hotel.name}
//                         />
//                         <br />
//                     </div>
//                 )
//             )
//         }

//         return html
//     }

//     return (
//         <div className={styles.profile}>
//             <BtnActions icon={btnIconBack} onClick={() => router.back()} />
//             <h2>{username ? ('Perfil de ' + username) : ''}</h2>

//             {
//                 option === 1 ? (disabledElements('enabled')) : null
//             }

//             <div className={styles.container}>
//                 <div className={styles.options}>
//                     <div className={option === 0 ? styles.option_active : styles.watch_option} onClick={() => setOption(0)}>
//                         <svg className={styles.svg_icon} viewBox="0 0 24 24">
//                             <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
//                         </svg>
//                         <p>Ver</p>
//                     </div>
//                     <div className={option === 1 ? styles.option_active : styles.watch_option} onClick={() => setOption(1)}>
//                         <svg className={styles.svg_icon} viewBox="0 0 24 24">
//                             <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
//                         </svg>
//                         <p>Editar</p>
//                     </div>
//                     <div className={option === 2 ? styles.option_active : styles.watch_option} onClick={() => setOption(2)}>
//                         <svg className={styles.svg_icon} viewBox="0 0 24 24">
//                             <path fill="currentColor" d="M7.25,3C7.9,3 8.5,3.21 9,3.56V3A2,2 0 0,1 11,1A2,2 0 0,1 13,3V3.57C13.5,3.22 14.1,3 14.75,3A3,3 0 0,1 17.75,6C17.75,7.58 16.54,8.87 15,9H13V10H14.24L14.72,10.13L19.31,12.42C20.13,12.73 20.53,13.34 20.53,14.25L20.5,14.39V14.53L19.5,21.28C19.44,21.75 19.22,22.16 18.84,22.5C18.47,22.84 18.05,23 17.58,23H10C9.45,23 9,22.81 8.58,22.41L2,15.84L3.05,14.77C3.33,14.5 3.69,14.34 4.13,14.34H4.45L9,15.33V10L9,9H7V9C5.46,8.86 4.25,7.57 4.25,6A3,3 0 0,1 7.25,3M9,6A1.75,1.75 0 0,0 7.25,4.25A1.75,1.75 0 0,0 5.5,6C5.5,6.88 6.15,7.61 7,7.73V7.75H9V6M15,7.75V7.74C15.85,7.62 16.5,6.89 16.5,6C16.5,5.04 15.72,4.26 14.75,4.26C13.78,4.26 13,5.04 13,6V7.75H15Z" />
//                         </svg>
//                         <p>Recordatorios</p>
//                     </div>

//                     <div className={styles.selected_user}>
//                         {/* {
//                             option === 0 || currentUser.privileges === 1 ? (<h5>Usuario seleccionado:</h5>) : null
//                         } */}
//                         {showSelectUser()}
//                     </div>
//                 </div>
//                 <div className={styles.info}>
//                     {
//                         option <= 1 ? (
//                             <form ref={profileFormRef}>
//                                 <h5 className={styles.subtitle}>Datos del hotel</h5>
//                                 <div className={styles.profile_grid}>
//                                     <div className="input-container">
//                                         <label htmlFor="username">Nombre de usuario del empleado</label>
//                                         <br />
//                                         {/* <input
//                                             className={errors.username ? 'input input_error_text' : 'input'}
//                                             {...register("username", { required: true })}
//                                             id="username"
//                                             autoComplete="off"
//                                             autoFocus={true}
//                                         />
//                                         <br />
//                                         {errors.username && <small>El campo Nombre está vacio!</small>} */}
//                                     </div>
//                                     <div className="input-container">
//                                         <label htmlFor="email">Correo electrónico</label>
//                                         <br />
//                                         <input
//                                             className={errors.email ? 'input input_error_text' : 'input'}
//                                             {...register("email", { required: true })}
//                                             id="email"
//                                             autoComplete="off"
//                                             autoFocus={true}
//                                         />
//                                         <br />
//                                         {errors.email && <small>El campo Correo Electrónico está vacio!</small>}
//                                     </div>
//                                     <div className="input-container">
//                                         <label htmlFor="phone">Teléfono</label>
//                                         <br />
//                                         <input
//                                             className={errors.phone ? 'input_error_text select' : 'input'}
//                                             {...register("phone", { required: true })}
//                                             id="phone"
//                                             autoComplete="off"
//                                             autoFocus={true}
//                                         />
//                                         <br />
//                                         {errors.phone && <small>El campo Teléfono está vacio!</small>}
//                                     </div>
//                                     {/* <div className="input-container">
//                                         <label htmlFor="hotel_select">Hotel</label>
//                                         <br />
//                                         <select
//                                             className={errors.hotel ? 'input_error_text select' : 'select'}
//                                             {...register("hotel", { required: true })}
//                                             id="hotel_select"
//                                             autoComplete="off"
//                                         >
//                                             {
//                                                 props.hotels.map((hotel: Hotel, index: number) =>
//                                                     <option key={index} value={hotel.name}>{hotel.name}</option>
//                                                 )
//                                             }
//                                         </select>
//                                         <br />
//                                         {errors.hotel && <small>El campo Hotel está vacio!</small>}
//                                     </div> */}
//                                     <div className="input-container">
//                                         <label htmlFor="area_select">Área laboral</label>
//                                         <br />
//                                         {/* <select
//                                             className={errors.area ? 'input_error_text select' : 'select'}
//                                             {...register("area", { required: true })}
//                                             id="area_select"
//                                             autoComplete="off"
//                                         >
//                                             {
//                                                 props.departments.map((department: Department, index: number) =>
//                                                     <option key={index} value={department.name}>{department.name}</option>
//                                                 )
//                                             }
//                                         </select>
//                                         <br />
//                                         {errors.area && <small>El campo Categoria está vacio!</small>} */}
//                                     </div>
//                                     {/* {
//                                         currentUser && parseInt(currentUser.privileges) === 1 ? (
//                                             <div className="input-container">
//                                                 <label htmlFor="privileges_select">Privilegios de la cuenta</label>
//                                                 <br />
//                                                 <select
//                                                     className={errors.privileges ? 'input_error_text select' : 'select'}
//                                                     {...register("privileges", { required: true })}
//                                                     id="privileges_select"
//                                                     autoComplete="off"
//                                                 >
//                                                     <option defaultValue={1}>1</option>
//                                                     <option defaultValue={2}>2</option>
//                                                     <option defaultValue={3}>3</option>
//                                                     <option defaultValue={4}>4</option>
//                                                     <option defaultValue={5}>5</option>
//                                                 </select>
//                                                 <br />
//                                                 {errors.privileges && <small>El campo Categoria está vacio!</small>}
//                                             </div>
//                                         ) : null
//                                     } */}
//                                 </div>

//                                 <h5 className={styles.subtitle}>Selecione los hoteles al que pertenecerá el usuario</h5>
//                                 <div className={styles.profile_grid}>
//                                     {showHotels()}
//                                 </div>

//                                 {!Object.values(errors).length && option === 1 ? (
//                                     <BtnSubmit title="Registrar" />
//                                 ) : (null)}
//                             </form>
//                         ) : (
//                             <p>notif</p>
//                         )
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }