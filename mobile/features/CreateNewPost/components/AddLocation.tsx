import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../themes/color';
import MapView, { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';

// いいや、locationは、
const AddLocation = () => {
  const { navigation, route, setFormData, formData, locationTagOptions, setLocationTagOptions } =
    useContext(CreateNewPostContext);
  const [accordion, setAccordion] = useState(false);

  // locationTagのoptionも取ってきて出してあげる。

  useEffect(() => {
    if (route?.params?.selectedLocation) {
      setFormData((previous) => {
        return {
          ...previous,
          location: route?.params?.selectedLocation,
        };
      });
    }
  }, [route?.params?.selectedLocation]);

  useEffect(() => {
    if (route?.params?.createdLocationTag) {
      setFormData((previous) => {
        return {
          ...previous,
          createdLocationTag: {
            name: route?.params?.createdLocationTag,
            selected: true,
          },
          addedLocationTag: null,
        };
      });
    }
  }, [route?.params?.createdLocationTag]);
  // setLocationTagOptions

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
              backgroundColor: 'rgb(80,80,80)',
              borderRadius: 8,
              marginRight: 10,
              marginBottom: 10,
            }}
            onPress={() =>
              setFormData((previous) => {
                return {
                  ...previous,
                  addedLocationTag: locationTag._id,
                  createdLocationTag: {
                    ...previous.createdLocationTag,
                    selected: false,
                  },
                };
              })
            }
          >
            <FastImage
              source={{ uri: locationTag.icon }}
              style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
            />
            <Text style={{ color: 'white', marginRight: 10 }}>{locationTag.name}</Text>
            <Ionicons
              name='checkmark-circle-sharp'
              size={20}
              color={
                locationTag._id === formData.addedLocationTag ? iconColorTable['lightGreen1'] : 'rgb(100, 100, 100)'
              }
            />
          </TouchableOpacity>
        );
      });

      return (
        <View style={{ marginBottom: 15 }}>
          <Text style={{ color: 'white', marginBottom: 15 }}>Please add a location title.</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgb(80,80,80)',
                borderRadius: 8,
                padding: 5,
                marginRight: 10,
                marginBottom: 10,
              }}
              onPress={() => navigation?.navigate('CreateNewLocationTag')}
            >
              <Ionicons name='create' size={20} color='white' style={{ marginBottom: 5 }} />
              <Text style={{ color: 'white' }}>Create</Text>
            </TouchableOpacity>

            {formData.createdLocationTag.name ? (
              <TouchableOpacity
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgb(80,80,80)',
                  borderRadius: 8,
                  marginRight: 10,
                  marginBottom: 10,
                }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      createdLocationTag: {
                        ...previous.createdLocationTag,
                        selected: !previous.createdLocationTag.selected,
                      },
                      addedLocationTag: null,
                    };
                  })
                }
              >
                <FastImage
                  source={{ uri: 'https://mekka-dev.s3.us-east-2.amazonaws.com/locationTagIcons/map-pin.png' }}
                  style={{ width: 30, height: 30, marginRight: 10, borderRadius: 8 }}
                  tintColor={'white'}
                />
                <Text style={{ color: 'white', marginRight: 10 }}>{formData.createdLocationTag.name}</Text>
                <Ionicons
                  name='checkmark-circle-sharp'
                  size={20}
                  color={formData.createdLocationTag.selected ? iconColorTable['lightGreen1'] : 'rgb(100,100,100)'}
                />
              </TouchableOpacity>
            ) : null}
            {list}
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ padding: 7, borderRadius: 5, marginBottom: 10, backgroundColor: 'rgb(50,50,50)' }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => setAccordion((previous) => !previous)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: iconParameterBackgroundColorTable['blue1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <MaterialCommunityIcons name='map-marker' color={iconColorTable['blue1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Location</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', marginRight: 10, color: 'rgb(170, 170,170)' }}>Optional</Text>
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 20, color: 'white' }}>Where did you take that moment?</Text>
          {formData.location.coordinates.length ? (
            <>
              <MapView
                style={{ width: '100%', height: 200, marginBottom: 20 }}
                // 今の自分の場所
                initialRegion={{
                  latitude: formData.location.coordinates[1],
                  longitude: formData.location.coordinates[0],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                // provider='google'
                pitchEnabled={false}
              >
                <TouchableOpacity onPress={() => navigation?.navigate('LocationPicker')}></TouchableOpacity>
                <Marker
                  tracksViewChanges={false}
                  coordinate={{
                    latitude: formData.location.coordinates[1],
                    longitude: formData.location.coordinates[0],
                  }}
                ></Marker>
              </MapView>
              {renderLocationTagOptions()}
            </>
          ) : null}
          {formData.location.coordinates.length ? null : (
            <View style={{ width: '100%', padding: 5 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: 'rgb(88,88,88)',
                  borderRadius: 8,
                  marginBottom: 20,
                }}
                // これで、locationをaddする。地図が必要だ。そのために。
                onPress={() => navigation?.navigate('LocationPicker')}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                  <MaterialCommunityIcons name='map-marker' size={20} color='white' style={{ marginRight: 10 }} />
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Add a location</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default AddLocation;
