import React, { useState, useEffect, useContext, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity } from 'react-native';
import { SpaceContext } from '../contexts/SpaceContext';
import backendAPI from '../../../apis/backend';
import SpaceIconMenuButton from '../components/SpaceIconMenuButton';
import SpaceMenu from './SpaceMenu';

type HomeProps = {};

const Home: React.FC = (props) => {
  const [space, setSpace] = useState({ name: '' });
  const menuBottomSheetRef = useRef(null);
  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route.params.spaceId}`);
    const { space } = result.data;
    setSpace(space);
  };
  useEffect(() => {
    getSpace();
  }, []);

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
