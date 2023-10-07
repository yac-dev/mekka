import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

const BottomMenu = () => {
  const { isIpad } = useContext(GlobalContext);
  const { navigation, reactionOptionsBottomSheetRef, commentInputBottomSheetRef, textInputRef, reactionStatuses } =
    useContext(ViewPostContext);
  const {
    spaceAndUserRelationship: { space },
  } = useContext(SpaceRootContext);

  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;

  // const renderFirstTwoReactions = () => {
  //   const list = reactionStatuses.slice()
  // };

  const renderReactionIcons = () => {
    const list = space.reactions.slice(0, 2).map((reaction, index) => {
      if (reaction.type === 'emoji') {
        return (
          <Text
            key={index}
            style={{
              fontSize: 25,
              // marginRight: 5,
              position: 'absolute',
              top: index === 0 ? -5 : null,
              left: index === 0 ? -5 : null,
              right: index === 0 ? null : -5,
              bottom: index === 0 ? null : -5,
            }}
          >
            {reaction.emoji}
          </Text>
        );
      } else if (reaction.type === 'sticker') {
        return (
          <FastImage
            key={index}
            source={{ uri: reaction.sticker.url }}
            style={{
              width: 25,
              height: 25,
              //  marginRight: 5
              position: 'absolute',
              top: index === 0 ? -5 : null,
              left: index === 0 ? -5 : null,
              right: index === 0 ? null : -5,
              bottom: index === 0 ? null : -5,
            }}
          />
        );
      }
    });

    return (
      <TouchableOpacity
        onPress={() => reactionOptionsBottomSheetRef.current.snapToIndex(0)}
        // style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        {list}
      </TouchableOpacity>
    );
  };

  return (
    // <ScrollView
    //   horizontal={true}
    //   style={{
    //     backgroundColor: 'rgb(40,40,40)',
    //     position: 'absolute',
    //     width: '100%',
    //     bottom: 0,
    //   }}
    // >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // alignSelf: 'center',
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        // marginHorizontal: 100,
        height: 54,
        // borderRadius: 30,
      }}
    >
      <View
        style={{
          width: oneGridWidth,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        {renderReactionIcons()}
      </View>
      <View
        style={{
          width: oneGridWidth,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            commentInputBottomSheetRef?.current.snapToIndex(0);
            textInputRef.current.focus();
          }}
        >
          <Entypo name='feather' size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: oneGridWidth,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <TouchableOpacity>
          <MaterialCommunityIcons name='share-variant' size={25} color={'white'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: oneGridWidth,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}
      >
        <TouchableOpacity>
          <Feather name='more-horizontal' size={25} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
};

export default BottomMenu;
