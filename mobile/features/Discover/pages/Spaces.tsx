import React from 'react';
import { View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { primaryBackgroundColor } from '../../../themes/color';
import { primaryTextColor } from '../../../themes/text';
import CreateNewButton from '../components/CreateNewButton';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

// client上では,mekkaとかそういう表現を使うことにする。
const Spaces: React.FC<RouterProps> = (props) => {
  const onButtonPress = () => {
    props.navigation.navigate('Create new space');
  };

  return (
    <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: primaryTextColor }}>Mekkas</Text>
      <CreateNewButton onButtonPress={onButtonPress} />
    </View>
  );
};

export default Spaces;
