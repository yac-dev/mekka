import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const BottomMenu = () => {
  const { isIpad } = useContext(GlobalContext);
  const { navigation, reactionOptionsBottomSheetRef, commentInputBottomSheetRef, textInputRef, reactionStatuses } =
    useContext(ViewPostContext);

  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;

  // const renderFirstTwoReactions = () => {
  //   const list = reactionStatuses.slice()
  // };

  const renderReactionIcons = () => {
    const list = reactionStatuses.slice(0, 2).map((reactionStatus, index) => {
      if (reactionStatus.reaction.type === 'emoji') {
        return (
          <Text
            key={index}
            style={{
              fontSize: 30,
              // marginRight: 5,
              position: 'absolute',
              top: index === 0 ? -5 : null,
              left: index === 0 ? -5 : null,
              right: index === 0 ? null : -5,
              bottom: index === 0 ? null : -5,
            }}
          >
            {reactionStatus.reaction.emoji}
          </Text>
        );
      } else if (reactionStatus.reaction.type === 'sticker') {
        return (
          <FastImage
            key={index}
            source={{ uri: reactionStatus.reaction.sticker.url }}
            style={{
              width: 30,
              height: 30,
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
          {/* <TouchableOpacity onPress={() => reactionOptionsBottomSheetRef.current.snapToIndex(0)}>
            <Entypo name='emoji-happy' size={25} color={'white'} />
          </TouchableOpacity> */}
          {renderReactionIcons()}
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
            height: 40,
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
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity>
            <Feather name='more-horizontal' size={25} color={'white'} />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            width: oneGridWidth,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            onPress={() => {
              commentInputBottomSheetRef?.current.snapToIndex(0);
              textInputRef.current.focus();
            }}
          >
            <Entypo name='feather' size={20} color={'yellow'} />
          </TouchableOpacity>

          <Text style={{ color: 'white', textAlign: 'center' }}>Comments</Text>
        </View>
        <View
          style={{
            width: oneGridWidth,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            // onPress={() => props.navigation.navigate('My friends')}
          >
            <MaterialCommunityIcons name='human-greeting-variant' size={20} color={'yellow'} />
          </TouchableOpacity>
          <Text style={{ color: 'white', textAlign: 'center' }}>Share</Text>
        </View>
        <View
          style={{
            width: oneGridWidth,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            // onPress={() => props.navigation.navigate('Assets', { userId: auth.data._id })}
          >
            <Ionicons name='camera' size={20} color={'yellow'} />
          </TouchableOpacity>
          <Text style={{ color: 'white', textAlign: 'center' }}>...</Text>
        </View>
        <View
          style={{
            width: oneGridWidth,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            // onPress={() => appMenuBottomSheetRef.current.snapToIndex(0)}
          >
            <Ionicons name='settings' size={20} color={'yellow'} />
          </TouchableOpacity>
          <Text style={{ color: 'white', textAlign: 'center' }}>Setting</Text>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default BottomMenu;

{
  /* <View
          style={{
            width: oneGridWidth,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            // onPress={() => props.navigation.navigate('My friends')}
          >
            <MaterialCommunityIcons name='human-greeting-variant' size={20} color={'yellow'} />
          </TouchableOpacity>
          <Text style={{ color: 'white', textAlign: 'center' }}>Share</Text>
        </View> */
}
