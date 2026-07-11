export type AuthMode = 'login' | 'register'

export type AuthFormValues = {
  nickname: string
  password: string
  email?: string
  confirm_password?: string
}