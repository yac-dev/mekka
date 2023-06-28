import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import BottomNavigator from './BottomNavigator';
import MyLibraries from '../screens/MyLibraries';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='MyLibraries'
          options={{
            headerShown: false,
          }}
          component={MyLibraries}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
