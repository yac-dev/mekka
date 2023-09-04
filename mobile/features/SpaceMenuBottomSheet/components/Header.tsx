import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GlobalContext } from '../../../contexts/GlobalContext';

const Header = () => {
  const { currentSpaceAndUserRelationship } = useContext(GlobalContext);

  return (
    <View style={{ paddingTop: 20, flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
      <FastImage
        source={{ uri: currentSpaceAndUserRelationship.space.icon }}
        style={{ width: 70, height: 70, borderRadius: 15, marginRight: 15 }}
      />
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, marginBottom: 10 }}>
          {currentSpaceAndUserRelationship.space.name}
        </Text>
        <Text style={{ color: 'red' }}>{currentSpaceAndUserRelationship.createdAt}</Text>
      </View>
    </View>
  );
};

export default Header;
