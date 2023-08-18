import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { SpaceContext } from '../contexts/SpaceContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const BottomMenu = () => {
  const { isIpad } = useContext(GlobalContext);
  const { navigation, space, menuBottomSheetRef } = useContext(SpaceContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;

  // const renderFirstTwoReactions = () => {
  //   const list = reactionStatuses.slice()
  // };

  return (
    <ScrollView
      horizontal={true}
      style={{
        backgroundColor: 'rgb(40,40,40)',
        position: 'absolute',
        width: '100%',
        bottom: 0,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <View
          style={{
            width: oneGridWidth,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation?.navigate({ name: 'CreatePost', params: { space: space }, merge: true })}
          >
            <MaterialCommunityIcons name='plus-box-multiple' size={25} color={'white'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: oneGridWidth,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name='human-greeting-variant' size={25} color='white' />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: oneGridWidth,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity>
            <Foundation name='comments' size={25} color='white' />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ width: oneGridWidth, height: 40, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => menuBottomSheetRef.current.snapToIndex(0)}
        >
          <FastImage source={{ uri: space.icon }} style={{ width: 35, height: 35, borderRadius: 9 }} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BottomMenu;
