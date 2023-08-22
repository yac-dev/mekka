import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { GlobalContext } from '../contexts/GlobalContext';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from '../features/Home/pages/Home';
import Signup from '../features/Home/pages/Signup';
import SpaceRootStackNavigator from './SpaceRootStackNavigator';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import SpacesNavigator from './SpacesNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AboutSpace from '../features/Space/pages/AboutSpace';
import Dummy from '../features/Space/pages/Dummy';
import CreateNewSpace from '../features/CreateNewSpace/pages/CreateNewSpace';

const AboutSpaceStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='About'
        component={AboutSpace}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='close-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerTitle: 'About',
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
        name='Dummy'
        component={Dummy}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerTitle: 'Members',
          headerStyle: {
            backgroundColor: primaryBackgroundColor,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: primaryTextColor,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default AboutSpaceStackNavigator;
