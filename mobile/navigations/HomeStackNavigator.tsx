import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GlobalContext } from '../contexts/GlobalContext';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from '../features/Home/pages/Home';
import Signup from '../features/Home/pages/Signup';
import PhotoSpaceRootStackNavigator from './PhotoSpaceRootStackNavigator';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Home'
          component={Home}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Signup',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
        <Stack.Screen
          name='PhotoSpaceRootStackNavigator'
          component={PhotoSpaceRootStackNavigator}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
