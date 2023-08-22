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
import AboutSpaceStackNavigator from './AboutSpaceStackNavigator';
import CreateNewSpace from '../features/CreateNewSpace/pages/CreateNewSpace';

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='SpacesNavigator'
          component={SpacesNavigator}
          options={({ navigation }) => ({
            headerRight: () => {
              // if (state.authData) {

              // } else {
              //   return null;
              // }
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
                    <MaterialCommunityIcons name='account-circle' size={25} color={'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginRight: 0 }} onPress={() => navigation.navigate('About Lampost')}>
                    <MaterialCommunityIcons name='information' size={25} color={'white'} />
                  </TouchableOpacity>
                </View>
              );
            },
            // headerLeft: () => {
            //   return (
            //     <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('About Lampost')}>
            //       <MaterialCommunityIcons name='information' size={20} color={'white'} />
            //     </TouchableOpacity>
            //   );
            // },
            headerShown: true,
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitle: 'Mekka',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
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
                <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
          name='CreateNewSpace'
          component={CreateNewSpace}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
          name='SpaceRootStackNavigator'
          component={SpaceRootStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
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
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='AboutSpaceStackNavigator'
          component={AboutSpaceStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
