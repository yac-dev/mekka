import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SpaceRootContext } from '../contexts/SpaceRootContext';

const Grid = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <Text style={{ color: 'white' }}>Grid</Text>
    </View>
  );
};

export default Grid;
