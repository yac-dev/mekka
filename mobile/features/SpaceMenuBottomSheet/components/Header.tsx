import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GlobalContext } from '../../../contexts/GlobalContext';

const Header = () => {
  const { currentSpaceAndUserRelationship } = useContext(GlobalContext);

  return (
    <View style={{ marginBottom: 20 }}>
      <FastImage
        source={{ uri: currentSpaceAndUserRelationship.space.icon }}
        style={{ width: '100%', height: 150, marginBottom: 20 }}
      />
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, marginBottom: 10 }}>
          {currentSpaceAndUserRelationship.space.name}
        </Text>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: 'white' }}>4 members</Text>
          <TouchableOpacity
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: 'white',
              borderRadius: 20,
              marginRight: 15,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>Invite</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'white' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam,
        </Text>
      </View>
    </View>
  );
};

export default Header;
