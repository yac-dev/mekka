import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { PostContext } from '../../contexts/PostContext';
import { Entypo } from '@expo/vector-icons';

// いいや、locationは、
const AddLocation = () => {
  const { navigation, route, setFormData } = useContext(PostContext);

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
  );
};

export default AddLocation;
