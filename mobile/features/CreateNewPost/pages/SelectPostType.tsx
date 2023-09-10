import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SelectPostType = (props) => {
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
            backgroundColor: 'rgb(70,70,70)',
            borderRadius: 10,
            marginBottom: 20,
          }}
          onPress={() =>
            props.navigation?.navigate({
              name: 'NormalPost',
              params: {
                space: props.route?.params?.space,
                spaceAndUserRelationship: props.route?.params?.spaceAndUserRelationship,
              }, // なんで、spaceUserRelが必要？？いらなくね。。。
              merge: true,
            })
          }
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name='send' color='white' size={25} style={{ marginRight: 20 }} />
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Normal post</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color='white' size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgb(70,70,70)',
            borderRadius: 10,
            marginBottom: 20,
          }}
          onPress={() =>
            props.navigation?.navigate({
              name: 'NormalPost',
              params: {
                space: props.currentSpace,
                spaceAndUserRelationship: props.currentSpaceAndUserRelationship,
              }, // なんで、spaceUserRelが必要？？いらなくね。。。
              merge: true,
            })
          }
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage
              source={require('../../../assets/forApp/ghost.png')}
              tintColor={'white'}
              style={{ width: 25, height: 25, marginRight: 20 }}
            />
            <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>Momento post</Text>
          </View>
          <MaterialCommunityIcons name='chevron-right' color='white' size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectPostType;
