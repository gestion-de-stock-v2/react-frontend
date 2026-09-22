import type { Credentials, LoginResponse, User } from './User';
import type {
  ForgotPasswordData,
  ForgotPasswordResponse,
  ResetPasswordData,
} from './PasswordReset';

export interface RegisterData {
  username: string;
  password: string;
  nome: string;
  email?: string;
  role: string;
}

export interface AuthRepository {
  login(credentials: Credentials): Promise<LoginResponse>;
  register(data: RegisterData): Promise<User>;
  changePassword(currentPassword: string, newPassword: string): Promise<void>;
  forgotPassword(data: ForgotPasswordData): Promise<ForgotPasswordResponse>;
  resetPassword(data: ResetPasswordData): Promise<void>;
}