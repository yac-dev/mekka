import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import TagMenus from '../components/TagMenus';
import Gallery from '../components/Gallery';

const Grid = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <TagMenus />
      <Gallery />
    </View>
  );
};

export default Grid;
