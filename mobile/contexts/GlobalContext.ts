import React, { createContext } from 'react';

type AuthType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

type GlobalState = {
  authData: AuthType | null;
  jwt: string | null;
};

// これ、jwtもいらねーよな。。別に。
// reducerのためにtypeを作っておく。
type GlobalAction =
  | { type: 'SET_AUTH_DATA'; payload: AuthType }
  | { type: 'SET_JWT'; payload: string }
  | {
      type: 'SIGNUP';
      payload: { authData: { _id: string; name: string; email: string; avatar: string }; jwt: string };
    }
  | { type: 'LOAD_ME'; payload: AuthType };

export const GlobalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case 'SET_AUTH_DATA':
      return { ...state, authData: action.payload };
    case 'SET_JWT':
      return { ...state, jwt: action.payload };
    case 'SIGNUP':
      return { ...state, authData: action.payload.authData, jwt: action.payload.jwt };
    case 'LOAD_ME':
      return { ...state, authData: action.payload };
    default:
      return state;
  }
};

interface GlobalContextProps {
  globalState: GlobalState;
  globalDispatch: React.Dispatch<any>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  globalState: { authData: null, jwt: null },
  globalDispatch: () => {},
});
