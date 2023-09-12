import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import backendAPI from '../../../apis/backend';

const Momento = () => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const { spaceAndUserRelationship, navigation, space, hasSpaceBeenFetched, setHasSpaceBeenFetched } =
    useContext(SpaceRootContext);
  const [momentos, setMomentos] = useState([]);
  const [haveMomentosBeenFetched, setHaveMomentosBeenFetched] = useState(false);

  const getMomentos = async () => {
    const result = await backendAPI.get(`/momentos/${spaceAndUserRelationship.space._id}`);
    const { momentos } = result.data;
    setMomentos(momentos);
    setHaveMomentosBeenFetched(true);
  };

  useEffect(() => {
    getMomentos();
  }, []);

  const renderItem = useCallback((momento) => {
    if (momento.content.type === 'video') {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => navigation.navigate({ name: 'ViewPost', params: { momento } })}
        >
          <Video source={{ uri: momento.content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />;
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
          onPress={() => navigation.navigate({ name: 'ViewPost', params: { momento } })}
        >
          <FastImage
            source={{ uri: momento.content.data }}
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
          />
        </TouchableOpacity>
      );
    }
  }, []);

  if (haveMomentosBeenFetched) {
    if (momentos.length) {
      return (
        <FlatList
          style={{ paddingTop: 10 }}
          numColumns={3}
          data={momentos}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id}
          // refreshControl={
          //   <RefreshControl colors={['#FF0000', '#00FF00']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />
          // }
        />
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 50, alignSelf: 'center' }}>
            <Text style={{ color: 'white', marginRight: 10 }}>There are no momentos currently</Text>
            <FastImage
              source={require('../../../assets/forApp/ghost.png')}
              style={{ width: 25, height: 25 }}
              tintColor={'white'}
            />
          </View>
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }
};

export default Momento;
