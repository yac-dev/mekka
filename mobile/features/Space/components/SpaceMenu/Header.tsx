import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SpaceContext } from '../../contexts/SpaceContext';
import FastImage from 'react-native-fast-image';
import { GlobalContext } from '../../../../contexts/GlobalContext';

const Header = () => {
  const { currentSpaceAndUserRelationship } = useContext(GlobalContext);
  return (
    <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 20 }}>
      <FastImage
        source={{ uri: currentSpaceAndUserRelationship.space.icon }}
        style={{ width: 80, height: 80, borderRadius: 15, marginRight: 20 }}
      />
      <View>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          {currentSpaceAndUserRelationship.space.name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Text style={{ color: 'white' }}>Posts</Text>
            <Text style={{ color: 'white' }}>{currentSpaceAndUserRelationship.space.totalPosts}</Text>
          </View>
          <View>
            <Text style={{ color: 'white' }}>Members</Text>
            <Text style={{ color: 'white' }}>{currentSpaceAndUserRelationship.space.totalMembers}</Text>
          </View>
          <View>
            <Text style={{ color: 'white' }}>Rate</Text>
            <Text style={{ color: 'white' }}>{currentSpaceAndUserRelationship.space.totalPosts}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
