import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Discover from '../features/Discover/pages/Spaces';
import CreateNewSpace from '../features/Discover/pages/CreateNewSpace';
import SpaceDetail from '../features/Discover/pages/SpaceDetail';
import SpaceDetailStackNavigator from './SpaceDetailStackNavigator';
import { primaryBackgroundColor, modalBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';

const DiscoverStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Discover'
          component={Discover}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='SpaceDetailStackNavigator'
          component={SpaceDetailStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Space detail',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='CreateNewSpace'
          component={CreateNewSpace}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Create new space',
            headerTransparent: true,
            headerStyle: {
              backgroundColor: modalBackgroundColor,
              borderBottomWidth: 0,
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

export default DiscoverStackNavigator;
