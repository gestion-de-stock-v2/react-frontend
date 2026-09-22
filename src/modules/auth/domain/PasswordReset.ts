export interface ForgotPasswordData {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  devToken?: string;
  devResetLink?: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}