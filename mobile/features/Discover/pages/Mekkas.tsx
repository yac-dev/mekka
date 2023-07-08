import React from 'react';
import { View, Text } from 'react-native';
import { primaryBackgroundColor } from '../../../themes/color';
import { primaryTextColor } from '../../../themes/text';

const Mekkas: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: primaryTextColor }}>Mekkas</Text>
    </View>
  );
};

export default Mekkas;
