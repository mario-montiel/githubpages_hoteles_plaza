export type UserForm = {
    id?: number
    email: string
    password: string
    fullName: string
    lastName: string
    phone: string
    hotel: []
    departmentId: number
    typeUserId: number
    preferencesId?: string
    status: string
    image?: string
    type?: string
    registredBy?: string
}

export type User = {
    id?: number,
    email: string
    password: string
    fullName: string
    lastName: string
    phone: string
    hotel: []
    departmentId: number
    typeUserId: number
    preferencesId?: string
    status: string
    image?: string
    type?: string
    registredBy?: string
}

export type PasswordForm = {
    password: string,
    confirmPassword: string
}