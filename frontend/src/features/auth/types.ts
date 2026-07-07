export type AuthMode = 'login' | 'register'

export type AuthFormValues = {
  nickname: string
  email: string
  password: string
  confirmPassword: string
}

export const initialAuthForm: AuthFormValues = {
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
}
