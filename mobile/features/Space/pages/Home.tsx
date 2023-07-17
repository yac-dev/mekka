import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { SpaceContext } from '../contexts/SpaceContext';
import backendAPI from '../../../apis/backend';
import SpaceIconButton from '../components/SpaceIconButton';

const Home = (props) => {
  const [space, setSpace] = useState({ name: '' });
  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route.params.spaceId}`);
    const { space } = result.data;
    setSpace(space);
  };
  useEffect(() => {
    getSpace();
  }, []);

  return (
    <SpaceContext.Provider value={{ space, setSpace }}>
      <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
        <Text style={{ color: 'white' }}>Grid here</Text>
        <SpaceIconButton />
      </View>
    </SpaceContext.Provider>
  );
};

export default Home;
