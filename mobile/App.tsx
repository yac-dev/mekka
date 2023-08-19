import React, { useState, useReducer, useEffect } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { GlobalContext } from './contexts/GlobalContext';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import LoadingSpinner from './components/LoadingSpinner';
import SnackBar from './components/SnackBar';
import RootStack from './navigations/RootStack';
import backendAPI from './apis/backend';

type AuthDataType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

const App: React.FC = function () {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authData, setAuthData] = useState<AuthDataType>({ _id: '', name: '', email: '', avatar: '' });
  const [isIpad, setIsIpad] = useState<boolean>(Platform.OS === 'ios' && Platform.isPad);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: '', barType: '', duration: null });
  const [spaceAndUserRelationships, setSpaceAndUserRelationships] = useState([]);

  const loadMe = async () => {
    const jwt = await SecureStore.getItemAsync('secure_token');
    if (jwt) {
      const result = await backendAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwt}` } });
      const { user } = result.data;
      setAuthData(user);
      setIsAuthenticated(true);
    }
  };

  const getMySpaces = async () => {
    const result = await backendAPI.get(`/spaceanduserrelationships/users/${authData._id}`);
    const { spaceAndUserRelationships } = result.data;
    setSpaceAndUserRelationships(spaceAndUserRelationships);
  };

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getMySpaces();
    }
  }, [isAuthenticated]);

  return (
    <GlobalContext.Provider
      value={{
        authData,
        setAuthData,
        isAuthenticated,
        setIsAuthenticated,
        isIpad,
        setIsIpad,
        loading,
        setLoading,
        snackBar,
        setSnackBar,
        spaceAndUserRelationships,
        setSpaceAndUserRelationships,
      }}
    >
      <PaperProvider>
        <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
        {/* <LoadingSpinner /> */}
        {/* <SnackBar /> */}
      </PaperProvider>
      {/* <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' /> */}
    </GlobalContext.Provider>
  );
};

export default App;
