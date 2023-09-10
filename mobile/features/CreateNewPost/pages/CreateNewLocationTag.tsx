import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { removeEmojis } from '../utils/removeEmoji';
import MapView, { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';

const CreateLocationTag = (props) => {
  const mapRef = useRef(null);
  const [locationTag, setLocationTag] = useState({
    name: '',
    point: {
      type: 'Point',
      coordinates: [],
    },
    icon: 'https://mekka-dev.s3.us-east-2.amazonaws.com/locationTagIcons/map-pin.png',
  });

  const onMapPress = (event) => {
    event.persist();
    // console.log(event.nativeEvent.coordinate);
    setLocationTag((previous) => {
      return {
        ...previous,
        point: {
          type: 'Point',
          coordinates: [event.nativeEvent.coordinate.longitude, event.nativeEvent.coordinate.latitude],
        },
      };
    });
    // setSelectingVenue((previous) => {
    //   const updating = { ...previous };
    //   updating.coordinates[0] = event.nativeEvent.coordinate.longitude;
    //   updating.coordinates[1] = event.nativeEvent.coordinate.latitude;
    //   return updating;
    // });
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={locationTag.name.length && locationTag.point.coordinates.length ? false : true}
        >
          <Text
            style={{
              color: locationTag.name && locationTag.name.length <= 40 ? 'white' : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [locationTag]);

  const onDonePress = () => {
    props.navigation.navigate({
      name: 'NormalPost',
      params: { createdLocationTag: locationTag },
      merge: true,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Create location tag
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Couldn't find a location tag you want to add?{'\n'} Type location name and tap the location point down below.
        </Text>
      </View>
      <Text
        style={{
          color: locationTag.name.length <= 40 ? 'rgb(170,170,170)' : 'red',
          alignSelf: 'flex-end',
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        {locationTag.name.length}/30
      </Text>
      <TextInput
        placeholder='Type location tag name.'
        placeholderTextColor={'rgb(170, 170, 170)'}
        value={locationTag.name}
        onChangeText={(text) =>
          setLocationTag((previous) => {
            return {
              ...previous,
              name: text,
            };
          })
        }
        style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, color: 'white', marginBottom: 20 }}
      />
      <MapView
        // ref={mapRef}
        onPress={(event) => onMapPress(event)}
        style={{ width: '100%', height: 600, marginBottom: 20 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={false}
      >
        {locationTag.point.coordinates.length ? (
          <Marker
            tracksViewChanges={false}
            coordinate={{
              latitude: locationTag.point.coordinates[1],
              longitude: locationTag.point.coordinates[0],
            }}
          >
            <FastImage source={{ uri: locationTag.icon }} style={{ width: 40, height: 40, borderRadius: 10 }} />
          </Marker>
        ) : null}
      </MapView>
    </View>
  );
};

export default CreateLocationTag;
