export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser | null;
}

export interface ILoginBody {
  email: string;
  password: string;
}
