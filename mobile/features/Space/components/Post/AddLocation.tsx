import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

// いいや、locationは、
const AddLocation = () => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgb(44,44,44)',
        borderRadius: 8,
      }}
      // これで、locationをaddする。地図が必要だ。そのために。
    >
      <Entypo name='globe' size={20} color='white' style={{ marginRight: 10 }} />
      <Text style={{ color: 'white' }}>Add location</Text>
    </TouchableOpacity>
  );
};

export default AddLocation;
