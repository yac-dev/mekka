import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import { icons } from '../utils/icons';
import { NavigationProp } from '@react-navigation/native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home: React.FC<RouterProps> = (props) => {
  const { MCI } = icons;

  return (
    <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: primaryTextColor }}>Open up App.tsx to start working on your app!</Text>
      <Text style={{ color: primaryTextColor }}>Helloooooooo</Text>
      <StatusBar style='auto' />
      <MCI name='library' color={'blue'} />
      <TouchableOpacity onPress={() => props.navigation.navigate('Dummy')}>
        <Text style={{ color: primaryTextColor }}>Press to navigate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
