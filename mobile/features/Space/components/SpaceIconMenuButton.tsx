import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { SpaceContext } from '../contexts/SpaceContext';
import FastImage from 'react-native-fast-image';

const SpaceIconButton = () => {
  const { space, menuBottomSheetRef } = useContext(SpaceContext);
  return (
    <TouchableOpacity
      style={{ position: 'absolute', bottom: 60, right: 20 }}
      onPress={() => menuBottomSheetRef.current.snapToIndex(0)}
    >
      <FastImage source={{ uri: space.icon }} style={{ width: 60, height: 60, borderRadius: 15 }} />
    </TouchableOpacity>
  );
};

export default SpaceIconButton;
