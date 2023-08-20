import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import TagMenus from '../components/TagMenus';
import Gallery from '../components/Gallery';
import BottomMenu from '../components/BottomMenu';
import SpaceMenu from './SpaceMenu';

const Grid = () => {
  const { selectedTag, menuBottomSheetRef } = useContext(SpaceRootContext);
  {
    /* <GestureHandlerRootView></GestureHandlerRootView> */
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* <TouchableOpacity onPress={() => menuBottomSheetRef.current.snapToIndex(0)}>
        <Text style={{ color: 'red' }}>ROute</Text>
      </TouchableOpacity> */}
      {/* <View style={{ padding: 10 }}>
        <Text style={{ color: 'white', marginLeft: 10 }}>{selectedTag?.name}</Text>
      </View> */}
      <Gallery />
      {/* <BottomMenu /> */}
      {/* <SpaceMenu /> */}
    </View>
  );
};

export default Grid;
