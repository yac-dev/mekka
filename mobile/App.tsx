import React, { useState, useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { GlobalContext, GlobalReducer } from './contexts/GlobalContext';
import RootStack from './navigations/RootStack';
import backendAPI from './apis/backend';

const App: React.FC = function () {
  const [state, dispatch] = useReducer(GlobalReducer, { authData: null, jwt: null });

  const loadMe = async () => {
    const jwt = await SecureStore.getItemAsync('secure_token');
    if (jwt) {
      const result = await backendAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwt}` } });
      const { user } = result.data;
      dispatch({ type: 'LOAD_ME', payload: user });
    }
  };
  useEffect(() => {
    loadMe();
  }, []);

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
