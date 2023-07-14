import React, { useState, useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { GlobalContext } from './contexts/GlobalContext';
import RootStack from './navigations/RootStack';
import backendAPI from './apis/backend';

type AuthDataType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

const App: React.FC = function () {
  const [authData, setAuthData] = useState<AuthDataType>({ _id: '', name: '', email: '', avatar: '' });
  const [isIpad, setIsIpad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<boolean>(false);

  const loadMe = async () => {
    const jwt = await SecureStore.getItemAsync('secure_token');
    if (jwt) {
      const result = await backendAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwt}` } });
      const { user } = result.data;
      setAuthData(user);
    }
  };
  useEffect(() => {
    loadMe();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ authData, setAuthData, isIpad, setIsIpad, loading, setLoading, snackBar, setSnackBar }}
    >
      {/* <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' /> */}
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </GlobalContext.Provider>
  );
};

export default App;
