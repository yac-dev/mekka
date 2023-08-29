import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../themes/color';

// いいや、locationは、
const AddLocation = () => {
  const { navigation, route, setFormData, formData } = useContext(CreateNewPostContext);
  const [accordion, setAccordion] = useState(false);

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
            <MaterialCommunityIcons name='map' color={iconColorTable['blue1']} size={20} />
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
          <Text style={{ marginBottom: 20, color: 'white' }}>Please add the location of your moment as you need.</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: 'rgb(88,88,88)',
              borderRadius: 8,
              marginBottom: 20,
            }}
            // これで、locationをaddする。地図が必要だ。そのために。
            onPress={() => navigation?.navigate('AddLocation')}
          >
            <Entypo name='globe' size={20} color='white' style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Add location</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default AddLocation;
