import React, { createContext } from 'react';
import { AuthData } from '../types/auth';
import { AuthState } from '../types/auth';

interface GlobalContextProps {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  // myLibraries: [];
  // setMyLibraries: React.Dispatch<React.SetStateAction<AuthState>>;
  // まあ、多分これも後で必要になる。
}

// これが初期値な。
const GlobalContext = createContext<GlobalContextProps>({
  auth: { data: { _id: '', name: '', avatar: '' }, isAuthenticated: false, jwt: '' },
  setAuth: () => {},
});

export default GlobalContext;
