import React, { useContext, useCallback } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';

const Gallery = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  const getAssetsByLibraryId = async () => {
    const result = await backendAPI.get(`/libraryandassetrelationships/${props.route.params.libraryId}/assets`);
    const { assets } = result.data;
  };

  const renderItem = useCallback((asset) => {
    if (asset.type === 'photo') {
      return (
        <View style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
          <FastImage
            style={{ width: '100%', height: '100%', borderRadius: 7 }}
            source={{
              uri: asset.data,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Ionicons name='camera' size={25} color={'white'} />
          </View>
        </View>
      );
    } else if (asset.type === 'video') {
      return (
        <View style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
          <Video
            style={{ width: '100%', height: '100%', borderRadius: 7 }}
            source={{
              uri: asset.data,
            }}
            useNativeControls={false}
            resizeMode='stretch'
            isLooping={false}
          />
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Ionicons name='videocam' size={25} color={iconColorsTable[videoTypesTable[asset.effect]]} />
          </View>
        </View>
      );
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text style={{ color: 'white' }}>Gallerty in here</Text>
    </View>
  );
};

export default Gallery;
