import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TagMenus = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='' size={15} style={{}} />
        <Text style={{ color: 'white' }}>All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TagMenus;
