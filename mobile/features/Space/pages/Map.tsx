import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { mapStyle } from '../../../themes/map';

const Map = (props) => {
  const [selectingVenue, setSelectingVenue] = useState(null);

  const onMapPress = (event) => {
    event.persist();
    // console.log(event.nativeEvent.coordinate);
    setSelectingVenue({
      coordinates: [event.nativeEvent.coordinate.longitude, event.nativeEvent.coordinate.latitude],
      type: 'Point',
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
          onPress={() => props.navigation.navigate('Launch new meetup', { selectedVenue: selectingVenue })}
          disabled={selectingVenue ? false : true}
        >
          <Text
            style={{
              color: selectingVenue ? 'white' : 'yellow',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectingVenue]);

  return (
    <MapView
      style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      showsUserLocation={true}
      customMapStyle={mapStyle}
      // // showsMyLocationButton={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      onPress={(event) => onMapPress(event)}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      // provider='google'
    >
      {selectingVenue ? (
        <Marker
          tracksViewChanges={false}
          coordinate={{
            latitude: selectingVenue.coordinates[1],
            longitude: selectingVenue.coordinates[0],
          }}
          // pinColor='black'
        ></Marker>
      ) : null}
    </MapView>
  );
};

export default Map;
