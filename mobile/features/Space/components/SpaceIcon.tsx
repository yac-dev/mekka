import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { SpaceContext } from '../contexts/SpaceContext';

const SpaceIcon = () => {
  const { space, menuBottomSheetRef } = useContext(SpaceContext);
  return (
    <View style={{ alignSelf: 'center' }}>
      <Image source={{ uri: space.icon }} style={{ width: 80, height: 80, borderRadius: 15 }} />
    </View>
  );
};

export default SpaceIcon;
