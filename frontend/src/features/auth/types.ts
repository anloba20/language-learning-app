export type AuthMode = 'login' | 'register'

export type AuthFormValues = {
  nickname: string
  email: string
  password: string
  confirm_password: string
}

export const initialAuthForm: AuthFormValues = {
  nickname: '',
  email: '',
  password: '',
  confirm_password: '',
}
