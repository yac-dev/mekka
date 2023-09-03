import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import MapView, { Marker } from 'react-native-maps';
import backendAPI from '../../../apis/backend';
import { SpaceRootContext } from '../contexts/SpaceRootContext';

const LocationsView = (props) => {
  const { height, width } = Dimensions.get('window');
  const LATITUDE = props.locationTag.point.coordinates[1];
  const LONGITUDE = props.locationTag.point.coordinates[0];
  const LATITUDE_DELTA = 100;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  const { spaceAndUserRelationship, navigation, space } = useContext(SpaceRootContext);
  // const { posts, havePostsBeenFetched, setHavePostsBeenFetched, onRefresh, isRefreshing } = useContext(PostsContext);
  const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPostsByLocationTagId = async () => {
    const result = await backendAPI.get(`/posts/locationtag/${props.locationTag._id}/space/${space._id}`);
    const { posts } = result.data;
    setPosts(posts);
    setHavePostsBeenFetched(true);
  };
  // props.locationTag.pointを使ってzoomする。initial regionを設定する。

  useEffect(() => {
    getPostsByLocationTagId();
  }, []);

  const renderPostThumbnailMarkers = () => {
    if (posts.length) {
      const list = posts.map((post, index) => {
        return (
          <Marker
            key={`${index}`}
            tracksViewChanges={false}
            coordinate={{ latitude: post.location.coordinates[1], longitude: post.location.coordinates[0] }}
            pinColor='black'
            onPress={() => {
              // getSelectedMeetup(meetup._id);
              navigation.navigate('ViewPost', { post });
            }}
          >
            <TouchableOpacity style={{ width: 45, height: 45 }}>
              <FastImage
                // onLoad={() => setInitialRender(false)}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{
                  uri: post.content.data,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </Marker>
        );
      });
      return <>{list}</>;
    } else {
      return null;
    }
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
        {renderPostThumbnailMarkers()}
      </MapView>
    </View>
  );
};

export default LocationsView;
