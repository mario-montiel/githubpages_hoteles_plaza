export type Guest = {
    id: number
    email: string
    password: string
    fullName: string
    lastName: string
    company?: string
    city: string
}

export type GuestForm = {
    email: string
    password: string
    fullName: string
    lastName: string
    company: string
    city: string
    reasonForTrip: string
}