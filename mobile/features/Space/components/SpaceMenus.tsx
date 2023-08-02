import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { SpaceContext } from '../contexts/SpaceContext';
import { AntDesign } from '@expo/vector-icons';

const SpaceMenus = () => {
  const { isIpad } = useContext(GlobalContext);
  const { menuBottomSheetRef, navigation, space } = useContext(SpaceContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7;
  const iconWidth = oneGridWidth * 0.7;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: oneGridWidth, aspectRatio: 1 }}>
        <TouchableOpacity
          style={{
            width: iconWidth,
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}
          onPress={() => {
            menuBottomSheetRef?.current.close();
            navigation?.navigate('Post', { space });
          }}
        >
          <AntDesign name='plus' size={20} color='white' />
        </TouchableOpacity>
      </View>
      <View style={{ width: oneGridWidth, aspectRatio: 1 }}>
        <Text>Invite friends</Text>
      </View>
      <View style={{ width: oneGridWidth, aspectRatio: 1 }}>
        <Text>About</Text>
      </View>
      <View style={{ width: oneGridWidth, aspectRatio: 1 }}>
        <Text>Leave</Text>
      </View>
    </View>
  );
};

export default SpaceMenus;
