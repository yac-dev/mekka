import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Map = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Map</Text>
      <TouchableOpacity
        style={{ backgroundColor: 'blue', position: 'absolute', bottom: 30, left: 20 }}
        onPress={() => props.navigation.navigate('Calendar')}
      >
        <Text>Change view</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Map;
