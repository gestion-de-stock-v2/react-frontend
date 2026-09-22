import { httpClient } from '@/shared/infrastructure/HttpClient';
import { ENDPOINTS } from '@/config/endpoints';
import type {
  AuthRepository,
  RegisterData,
} from '../domain/AuthRepository';
import type { Credentials, LoginResponse, User } from '../domain/User';
import type {
  ForgotPasswordData,
  ForgotPasswordResponse,
  ResetPasswordData,
} from '../domain/PasswordReset';

export class HttpAuthRepository implements AuthRepository {
  async login(credentials: Credentials): Promise<LoginResponse> {
    const { data } = await httpClient.post<LoginResponse>(
      ENDPOINTS.auth.login,
      credentials
    );
    return data;
  }

  async register(payload: RegisterData): Promise<User> {
    const { data } = await httpClient.post<User>(
      ENDPOINTS.auth.register,
      payload
    );
    return data;
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await httpClient.post(ENDPOINTS.auth.changePassword, {
      currentPassword,
      newPassword,
    });
  }

  async forgotPassword(data: ForgotPasswordData): Promise<ForgotPasswordResponse> {
    const { data: res } = await httpClient.post<ForgotPasswordResponse>(
      ENDPOINTS.auth.forgotPassword,
      data
    );
    return res;
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    await httpClient.post(ENDPOINTS.auth.resetPassword, data);
  }
}

export const authRepository = new HttpAuthRepository();