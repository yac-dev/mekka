import React, { useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { HomeContext } from '../contexts/HomeContext';
import FastImage from 'react-native-fast-image';

const Spaces: React.FC = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const { spaceAndMeRelationships, navigation } = useContext(HomeContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  const iconWidth = oneGridWidth * 0.65;

  const navigate = (relationship) => {
    if (relationship.space.contentType === 'photo') {
      navigation?.navigate('PhotoSpaceRootStackNavigator', {
        screen: 'Photos',
        params: { spaceId: relationship.space._id },
      });
    } else if (relationship.space.contentType === 'video') {
      navigation?.navigate('VideoSpaceRootStackNavigator', {
        screen: 'Home',
        params: { spaceId: relationship.space._id },
      }); // いいや、とりあえず3つそれぞれでnavigationを分けようか。
    } else {
      navigation?.navigate('PhotoAndVideoSpaceRootStackNavigator', {
        screen: 'Photos',
        params: { spaceId: relationship.space._id },
      });
    }
  };

  const renderMySpaces = () => {
    const list = spaceAndMeRelationships.map((relationship) => {
      return (
        <TouchableOpacity
          key={relationship._id}
          style={{
            width: oneGridWidth,
            height: oneGridHeight,
            // backgroundColor: 'red',
            alignItems: 'center',
          }}
          // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
          onPress={() => navigate(relationship)}
        >
          <FastImage
            style={{ width: iconWidth, aspectRatio: 1, borderRadius: 15, marginBottom: 5 }}
            source={{ uri: relationship.space.icon }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={{ color: 'white' }}>{relationship.space.name}</Text>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>{list}</View>
      </ScrollView>
    );
  };

  return <>{renderMySpaces()}</>;
};

export default Spaces;
