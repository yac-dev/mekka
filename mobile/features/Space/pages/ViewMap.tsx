import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import backendAPI from '../../../apis/backend';
import PostThumbnailMapMarkers from '../components/PostThumbnailMapMarkers';

const ViewMap = () => {
  const { height, width } = Dimensions.get('window');
  const LATITUDE = 40.74333; // Korea Town, New York, NY 10001
  const LONGITUDE = -73.99033; // Korea Town, New York, NY 10001
  const LATITUDE_DELTA = 100;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  const getPostsByLocation = async () => {
    const result = await backendAPI.get(`/posts/${props.route.params.spaceId}`);
    const { posts } = result.data;
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <MapView
        // ref={mapRef}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        showsUserLocation={true}
        // customMapStyle={mapStyle}
        // // showsMyLocationButton={true}
        // followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        // onPress={(event) => setMeetupLocation(event)}
        // initial regionっていうのは、最初に地図がloadされたときに画面の中心にどのlatitudeとlongitudeを映すかって言うことね。
        // これ、今のuserの場所にしたほうがいいわな。開発中は、ずっとsanfransisco中心に進めていたけど。。
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        // provider='google'
        // provider={Platform.OS === 'android' ? MapView.PROVIDER_GOOGLE : MapView.PROVIDER_DEFAULT}
      >
        <PostThumbnailMapMarkers />
      </MapView>
    </View>
  );
};

export default ViewMap;
