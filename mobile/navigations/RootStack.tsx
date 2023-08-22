import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeStackNavigator from './HomeStackNavigator';
import BottomTab from './BottomTab';
import Home from '../features/Home/pages/Home';
import Signup from '../features/Home/pages/Signup';
import Login from '../features/Home/pages/Login';
import PhotoSpaceRootStackNavigator from './SpaceRootStackNavigator';
import PhotoAndVideoSpaceRootStackNavigator from './PhotoAndVideoSpaceRootStackNavigator';
import CreateNewSpace from '../features/CreateNewSpace/pages/CreateNewSpace';
import EmojiPicker from '../features/CreateNewSpace/components/CreateNewSpace/EmojiPicker';
import CreateSticker from '../features/CreateNewSpace/pages/CreateSticker';
import Discover from '../features/Discover/pages/Discover';
import { Entypo } from '@expo/vector-icons';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import SpaceMenuBottomSheet from '../features/Space/pages/SpaceMenuBottomSheet';

const { MCI, II } = icons;

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        // bottomSheetをやめた。
        name='HomeStackNavigator'
        component={HomeStackNavigator}
        options={({ navigation }) => ({
          // headerShown: true,
          headerShown: false,
          // いや、ここで設定すると、BottomTabっていう上のtabに対する設定になってしまうね。
          headerRight: () => {
            // if (state.authData) {

            // } else {
            //   return null;
            // }
            return (
              <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
                <MCI name='account-circle' size={30} color={'white'} />
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('About Lampost')}>
                <MCI name='information' size={25} color={'white'} />
              </TouchableOpacity>
            );
          },
          title: 'Mekka',
          headerTintColor: 'red',
          headerStyle: {
            backgroundColor: 'black',
            borderBottomWidth: 0,
          },
          tabBarLabel: 'Home',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
