import React, { useContext } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { HomeContext } from '../contexts/HomeContext';
import { AntDesign } from '@expo/vector-icons';

const MenuButtons = () => {
  const { isIpad } = useContext(GlobalContext);
  const { navigation } = useContext(HomeContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;
  const iconWidth = oneGridWidth * 0.65;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
      <View style={{ width: oneGridWidth, height: oneGridHeight, alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: iconWidth,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: 'red',
            marginBottom: 5,
          }}
          onPress={() => navigation?.navigate('CreateNewSpace')}
        >
          <AntDesign name='plus' color='white' size={25} />
        </TouchableOpacity>
        <Text style={{ color: 'white' }}>Create space</Text>
      </View>
      <View style={{ width: oneGridWidth, height: oneGridHeight, alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: iconWidth,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: 'red',
            marginBottom: 5,
          }}
          onPress={() => navigation?.navigate('Discover')}
        >
          <AntDesign name='plus' color='white' size={25} />
        </TouchableOpacity>
        <Text style={{ color: 'white' }}>Discover</Text>
      </View>
      <View style={{ width: oneGridWidth, height: oneGridHeight, alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: iconWidth,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: 'red',
            marginBottom: 5,
          }}
        >
          <AntDesign name='plus' color='white' size={25} />
        </TouchableOpacity>
        <Text style={{ color: 'white' }}>Invitations</Text>
      </View>
      {/* <View style={{ width: oneGridWidth, height: oneGridHeight, alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: iconWidth,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            backgroundColor: 'red',
            marginBottom: 5,
          }}
        >
          <AntDesign name='plus' color='white' size={25} />
        </TouchableOpacity>
        <Text style={{ color: 'white' }}>Create</Text>
      </View> */}
    </View>
  );
};

export default MenuButtons;
