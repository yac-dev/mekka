import React, { useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { HomeContext } from '../contexts/HomeContext';

const Spaces: React.FC = () => {
  const { spaceAndMeRelationships } = useContext(HomeContext);
  // const isIpad = Platform.OS === 'ios' && (Platform.isPad || Platform.isTVOS);
  // const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  // const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7.5;

  const renderSpace = useCallback((relationship: any) => {
    return (
      <TouchableOpacity>
        <Image source={{ uri: relationship.space.icon }} style={{ width: 100, height: 100 }} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlatList
      data={spaceAndMeRelationships}
      renderItem={({ item }) => renderSpace(item)}
      keyExtractor={(item, index) => `${item._id}-${index}`}
    />
  );
};

export default Spaces;
