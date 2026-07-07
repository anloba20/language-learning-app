export type AuthMode = 'login' | 'register'

export type AuthFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const initialAuthForm: AuthFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}
