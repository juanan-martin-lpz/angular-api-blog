import { Usuario } from './usuario';

export interface LoginResponse {
  status: boolean;
  message: string;
  user: Usuario;
  token: string;
}
