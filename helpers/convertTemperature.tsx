export const convertKelvinToCelsius = (kelvinGrades: number) => {
    const celcius = kelvinGrades - 273.15
    const round = Math.round(celcius)
    return `${round}°C`
}