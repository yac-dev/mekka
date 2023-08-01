import React, { useState, useEffect, useContext, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity } from 'react-native';
import { SpaceContext } from '../contexts/SpaceContext';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import SpaceIconMenuButton from '../components/SpaceIconMenuButton';
import SpaceMenu from './SpaceMenu';

type HomeProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any> | undefined;
};

const Home: React.FC<HomeProps> = (props) => {
  const [space, setSpace] = useState({ name: '' });
  const menuBottomSheetRef = useRef(null);

  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}`);
    const { space } = result.data;
    setSpace(space);
  };
  useEffect(() => {
    getSpace();
  }, []);
  console.log(space);

  return (
    <SpaceContext.Provider value={{ space, setSpace, navigation: props.navigation, menuBottomSheetRef }}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
        <Text style={{ color: 'white' }}>Grid here</Text>
        <SpaceIconMenuButton />
        <SpaceMenu />
      </GestureHandlerRootView>
    </SpaceContext.Provider>
  );
};

export default Home;
