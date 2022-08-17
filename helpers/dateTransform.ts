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

export const getMxDate = (dateTime: string) => {
    const aMonths =
    ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const dateTimeSplit = dateTime.split(' ')
    const dateSplit = dateTimeSplit[0]
    const timeSplit = dateTimeSplit[1]
    const dateMx = dateSplit.split('/')
    const month: number = parseInt(dateMx[1])
    const dataFormat = dateMx[0] + ' ' + aMonths[month] + ' ' + dateMx[2]
    const timeFormat = timeSplit.replaceAll(',' , ':')
    
    const date = {
        date: dataFormat,
        time: timeFormat,
        dateTime: dataFormat + ' a las ' + timeFormat
    }
    
    return date
}