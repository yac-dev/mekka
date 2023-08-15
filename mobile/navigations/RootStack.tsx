import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
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

const { MCI, II } = icons;

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='BottomTab'
        component={BottomTab}
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
          headerTintColor: 'white',
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
      {/* <Stack.Group>
        <Stack.Screen
          name='Home'
          component={Home}
          options={({ navigation }) => ({
            headerShown: true,
            headerTintColor: 'white',
            headerTitle: 'Mekka',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
              borderBottomWidth: 0,
            },
            headerRight: () => {
              return (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
                    <Entypo name='bell' size={25} color={'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: 0 }} onPress={() => navigation.navigate('Profile Top')}>
                    <MCI name='account-circle' size={25} color={'white'} />
                  </TouchableOpacity>
                </View>
              );
            },
          })}
        />
        <Stack.Screen
          name='Discover'
          component={Discover}
          options={({ navigation }) => ({
            headerShown: true,
            headerTintColor: 'white',
            headerTitle: 'Discover',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
              borderBottomWidth: 0,
            },
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
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
        <Stack.Screen
          name='PhotoAndVideoSpaceRootStackNavigator'
          component={PhotoAndVideoSpaceRootStackNavigator}
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
        <Stack.Screen
          name='CreateNewSpace'
          component={CreateNewSpace}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: '',
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
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
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
          name='Login'
          component={Login}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Login',
            headerStyle: {
              backgroundColor: 'rgb(35, 35, 35)',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
        <Stack.Screen
          name='EmojiPicker'
          component={EmojiPicker}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: '',
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
          name='CreateSticker'
          component={CreateSticker}
          options={({ navigation }) => ({
            headerTitle: '',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
      </Stack.Group> */}
    </Stack.Navigator>
  );
};

export default RootStack;
