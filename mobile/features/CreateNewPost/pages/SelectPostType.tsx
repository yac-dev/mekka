import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Ionicons } from '@expo/vector-icons';

const SelectPostType = (props) => {
  const { navigation, setPostType } = useContext(CreateNewPostContext);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => null,
  //     headerLeft: () => (
  //       <TouchableOpacity onPress={() => navigation.goBack()}>
  //         <Ionicons name='close-circle-sharp' size={30} color={'white'} />
  //       </TouchableOpacity>
  //     ),
  //   });
  // });

  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Create new Post
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Post your photo/video and share your moments with your peers.
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: 30,
            marginBottom: 20,
          }}
          onPress={() => {
            setPostType('normalPost');
            navigation?.navigate('NormalPost');
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='images' color='black' size={25} style={{ marginRight: 20 }} />
            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Normal post</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color='black' size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: 30,
            marginBottom: 20,
          }}
          onPress={() => {
            setPostType('moment');
            navigation?.navigate('MomentPost');
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage
              source={require('../../../assets/forApp/ghost.png')}
              tintColor={'black'}
              style={{ width: 25, height: 25, marginRight: 20 }}
            />
            <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>Moment</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color='black' size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectPostType;
