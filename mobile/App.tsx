import React, { useState, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigations/RootStack';
import GlobalContext from './contexts/GlobalContext';
import { GLOBAL_INITIAL_STATE, GlobalState, GlobalAction } from './types/global';

export const GlobalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case 'SET_AUTH_DATA':
      return { ...state, authData: action.payload };
    case 'SET_JWT':
      return { ...state, jwt: action.payload };
    default:
      return state;
  }
};

const App: React.FC = function () {
  const [state, dispatch] = useReducer(GlobalReducer, GLOBAL_INITIAL_STATE);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </GlobalContext.Provider>
  );
};

export default App;
