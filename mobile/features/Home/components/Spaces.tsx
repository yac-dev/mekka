import React, { useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { HomeContext } from '../contexts/HomeContext';

const Spaces: React.FC = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const { spaceAndMeRelationships, navigation } = useContext(HomeContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 7;
  const iconWidth = oneGridWidth * 0.7;

  const renderSpace = useCallback((relationship: any) => {
    return (
      <TouchableOpacity
        style={{
          width: oneGridWidth,
          height: oneGridHeight,
          // backgroundColor: 'red',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Space')}
      >
        <Image
          source={{ uri: relationship.space.icon }}
          style={{ width: iconWidth, aspectRatio: 1, borderRadius: 5, marginBottom: 5 }}
        />
        <Text style={{ color: 'white' }}>{relationship.space.name}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlatList
      data={spaceAndMeRelationships}
      renderItem={({ item }) => renderSpace(item)}
      keyExtractor={(item, index) => `${item._id}-${index}`}
      style={{ paddingTop: 20 }}
    />
  );
};

export default Spaces;
