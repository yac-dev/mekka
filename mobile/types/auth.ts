export interface AuthData {
  _id: string;
  name: string;
  avatar: string;
}

export interface AuthState {
  data: AuthData;
  isAuthenticated: boolean;
  jwt: string;
}
