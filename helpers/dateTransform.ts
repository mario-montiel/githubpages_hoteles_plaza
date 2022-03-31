export const getDate = (date: Date) => {
    const getDate = new Date(date)
    return getDate.getDate() + '/' + (getDate.getMonth() + 1) + '/' + getDate.getFullYear()
}

export const getDateFormat_Dnum_D_M_Y = () => {
    const getDate = new Date()
    return getActualDay() + ' - ' + getDate.getDate() + '/' + (getDate.getMonth() + 1) + '/' + getDate.getFullYear()
}

export const getActualDay = () => {
    const aDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const getDate = new Date()
    return aDays[getDate.getDay()]
}

export const getDateFormat_Dtext_D_M_Y = (dateTimer: number) => {
    console.log(dateTimer);
    const aMonths =
        ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        const d = new Date(dateTimer)
        console.log(d);
        let date = d.getDate() + '/' + aMonths[d.getMonth()] + '/' + d.getFullYear()
        
    return date
}