import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../themes/color';
import MapView, { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';

// いいや、locationは、
const AddLocationTag = (props) => {
  const {
    navigation,
    route,
    addedLocationTag,
    setAddedLocationTag,
    createdLocationTag,
    setCreatedLocationTag,
    locationTagOptions,
    setLocationTagOptions,
  } = useContext(CreateNewPostContext);
  const mapRef = useRef(null);

  useEffect(() => {
    if (props.route?.params?.createdLocationTag) {
      setCreatedLocationTag(props.route?.params?.createdLocationTag);
    }
  }, [props.route?.params?.createdLocationTag]);

  // useEffect(() => {
  //   if (props.route?.params?.selectedLocation) {
  //     setFormData((previous) => {
  //       return {
  //         ...previous,
  //         location: route?.params?.selectedLocation,
  //       };
  //     });
  //   }
  // }, [props.route?.params?.selectedLocation]);

  // useEffect(() => {
  //   if (props.route?.params?.createdLocationTag) {
  //     setFormData((previous) => {
  //       return {
  //         ...previous,
  //         createdLocationTag: route?.params?.createdLocationTag,
  //       };
  //     });
  //   }
  // }, [props.route?.params?.createdLocationTag]);
  // setLocationTagOptions

  // 近寄りすぎる。直す。
  useEffect(() => {
    if (addedLocationTag) {
      const newLat = addedLocationTag.point.coordinates[1] - 0.0065;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: addedLocationTag.point.coordinates[0],
      });
    } else if (createdLocationTag) {
      const newLat = createdLocationTag.point.coordinates[1] - 0.0065;
      mapRef.current.animateToRegion({
        latitude: newLat,
        longitude: createdLocationTag.point.coordinates[0],
      });
    }
  }, [addedLocationTag, createdLocationTag]);
  // createdLocationTagがある場合はそれを優先で表示する。
  // ない場合は、addedLocationTagの方をrender

  const renderAddedLocationTag = () => {
    if (addedLocationTag) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(90,90,90)',
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
            marginBottom: 20,
            alignSelf: 'flex-start',
          }}
        >
          <FastImage
            source={{ uri: addedLocationTag.icon }}
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
            // tintColor={'white'}
          />
          <Text style={{ color: 'white', marginRight: 10 }}>{addedLocationTag.name}</Text>
          {/* <TouchableOpacity
            onPress={() => {
              setFormData((previous) => {
                return {
                  ...previous,
                  addedLocationTag: null,
                };
              });
              setLocationTagOptions((previous) => [...previous, formData.addedLocationTag]);
            }}
          >
            <Ionicons name='close-circle-sharp' color='white' size={20} />
          </TouchableOpacity> */}
        </View>
      );
    } else {
      return null;
    }
  };

  const renderCreatedLocationTag = () => {
    if (createdLocationTag) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(90,90,90)',
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
            marginBottom: 20,
            alignSelf: 'flex-start',
          }}
        >
          <FastImage
            source={{ uri: createdLocationTag.icon }}
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
            tintColor={'white'}
          />
          <Text style={{ color: 'white', marginRight: 10 }}>{createdLocationTag.name}</Text>
          {/* <TouchableOpacity
            onPress={() => {
              setFormData((previous) => {
                return {
                  ...previous,
                  createdLocationTag: null,
                };
              });
            }}
          >
            <Ionicons name='close-circle-sharp' color='white' size={20} />
          </TouchableOpacity> */}
        </View>
      );
    } else {
      return null;
    }
  };

  const renderLocationTagOptions = () => {
    if (locationTagOptions.length) {
      const list = locationTagOptions.map((locationTag, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(90,90,90)',
              borderRadius: 8,
              marginRight: 10,
              marginBottom: 10,
            }}
            disabled={addedLocationTag || createdLocationTag ? true : false}
            onPress={() => {
              if (locationTag._id) {
                setAddedLocationTag(null);
              } else {
                setAddedLocationTag(locationTag);
              }
            }}
          >
            <FastImage
              source={{ uri: locationTag.icon }}
              style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
            />
            <Text style={{ color: 'white', marginRight: 10 }}>{locationTag.name}</Text>
            {locationTag._id === addedLocationTag._Id ? (
              <Ionicons name='delete' size={20} color='white' style={{ position: 'absolute', top: -10, right: -7 }} />
            ) : null}
          </TouchableOpacity>
        );
      });

      return <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{list}</View>;
    } else {
      return (
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>There are no location tag options yet.</Text>
        </View>
      );
    }
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
          Add Location Tag (Optional)
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>Where did you take that snap?</Text>
      </View>
      {/* {renderAddedLocationTag()}
          {renderCreatedLocationTag()} */}
      {renderLocationTagOptions()}
      <MapView
        ref={mapRef}
        userInterfaceStyle='dark'
        style={{ width: '100%', height: 350, marginBottom: 20 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        }}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        // provider='google'
        pitchEnabled={false}
      >
        {/* <TouchableOpacity onPress={() => navigation?.navigate('LocationPicker')}></TouchableOpacity> */}
        {addedLocationTag ? (
          <Marker
            tracksViewChanges={false}
            coordinate={{
              latitude: addedLocationTag.point.coordinates[1],
              longitude: addedLocationTag.point.coordinates[0],
            }}
          >
            <FastImage source={{ uri: addedLocationTag.icon }} style={{ width: 40, height: 40, borderRadius: 10 }} />
          </Marker>
        ) : null}
        {createdLocationTag ? (
          <Marker
            tracksViewChanges={false}
            coordinate={{
              latitude: createdLocationTag.point.coordinates[1],
              longitude: createdLocationTag.point.coordinates[0],
            }}
          >
            <FastImage source={{ uri: createdLocationTag.icon }} style={{ width: 40, height: 40, borderRadius: 10 }} />
          </Marker>
        ) : null}
      </MapView>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 25,
          // marginTop: 30,
        }}
        onPress={() => {
          navigation.navigate('CreateNewLocationTag');
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Ionicons name='add' color='black' size={25} style={{ marginRight: 5 }} />
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Create new?</Text>
        </View>
      </TouchableOpacity>

      {/* {formData.location.coordinates.length ? (
            <>
              <Text style={{ color: 'white', marginBottom: 20 }}>Please add a location title down below.</Text>
              {!formData.addedLocationTag && !formData.createdLocationTag ? (
                <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
                  There is no location title selected yet...
                </Text>
              ) : null}

              {renderCreatedLocationTag()}
            </>
          ) : null} */}
    </View>
  );
};

export default AddLocationTag;
