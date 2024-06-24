import { UserRole } from "./userProfile"

export interface NewUser {
  userName: string
  email: string
  phone: string
  cargo: UserRole
  password: string
  passwordConfirmation: string
  fotoBase64: string; 
}
