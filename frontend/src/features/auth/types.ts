export type AuthMode = 'login' | 'register'

export type UserRole = 'admin' | 'user'

export type AuthFormValues = {
  nickname: string
  password: string
  email?: string
  confirm_password?: string
}

export type AuthUserProfile = {
  id: string
  nickname: string
  email: string
  role: UserRole
  native_language_id: number | null
  foreign_language_id: number | null
}

export type UpdateProfileValues = {
  nickname?: string
  native_language_id?: number
  foreign_language_id?: number
}
