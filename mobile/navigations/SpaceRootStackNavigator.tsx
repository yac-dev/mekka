import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SpaceTopTabNavigator from './SpaceTopTabNavigator';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import Home from '../features/Space/pages/Home';
import Map from '../features/Space/pages/Map';
import Albums from '../features/Space/pages/Albums';

const { MCI, II } = icons;

const SpaceRootStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={({ navigation }) => ({
          headerShown: false, // ここtrueにすると、,,,
        })}
      />
      <Stack.Screen
        name='Map'
        component={Map}
        options={({ navigation }) => ({
          headerShown: false, // ここtrueにすると、,,,
        })}
      />
      <Stack.Screen
        name='Albums'
        component={Albums}
        options={({ navigation }) => ({
          headerShown: false, // ここtrueにすると、,,,
        })}
      />
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        {/*ここは、space menuで使う。　*/}
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        {/* <Stack.Screen
          name='Post'
          component={SpaceTopTabNavigator}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Space',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SpaceRootStackNavigator;
