import React, { useState, useReducer } from 'react';
// import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigations/RootStack';
import { GlobalContext, GlobalReducer } from './contexts/GlobalContext';
import { GLOBAL_INITIAL_STATE, GlobalState, GlobalAction } from './types/global';

const App: React.FC = function () {
  const [state, dispatch] = useReducer(GlobalReducer, { authData: null, jwt: null });
  console.log(state.authData);

  return (
    <GlobalContext.Provider value={{ globalState: state, globalDispatch: dispatch }}>
      {/* <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' /> */}
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </GlobalContext.Provider>
  );
};

export default App;
