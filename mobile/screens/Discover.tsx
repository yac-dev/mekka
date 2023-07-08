import React from 'react';
import { View, Text } from 'react-native';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';

const Discover: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: primaryTextColor }}>Discover screen!!</Text>
    </View>
  );
};

export default Discover;
