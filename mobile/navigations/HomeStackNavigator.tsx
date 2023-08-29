import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { GlobalContext } from '../contexts/GlobalContext';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from '../features/Home/pages/Home';
import Signup from '../features/Home/pages/Signup';
import CreatePost from '../features/Space/pages/CreatePost';
import SpaceRootStackNavigator from './SpaceRootStackNavigator';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import SpacesTopTabNavigator from './SpacesTopTabNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AboutSpaceStackNavigator from './AboutSpaceStackNavigator';
import CreateNewSpace from '../features/CreateNewSpace/pages/CreateNewSpace';
import SpaceMenuBottomSheet from '../features/Space/pages/SpaceMenuBottomSheet';
import Dummy from '../features/Space/pages/Dummy';
import SpacesDrawerNavigator from './SpacesDrawerNavigator';
import ViewPost from '../features/Space/pages/ViewPost';
import Discover from '../features/Discover/pages/Discover';
// import CreateNewPost from '../features/Space/pages/CreatePost';

import { HomeStackNavContext } from '../contexts/HomeStackNavContext';
const HomeStackNavigator: React.FC = (props) => {
  return (
    <HomeStackNavContext.Provider value={{}}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerShown: false,
          })}
        >
          <Stack.Group>
            <Stack.Screen
              name='SpacesDrawerNavigator'
              component={SpacesDrawerNavigator}
              options={({ navigation }) => ({
                headerShown: false,
              })}
            />
            <Stack.Screen
              name='ViewPost'
              component={ViewPost}
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-circle-sharp' size={30} color={'red'} />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name='Discover'
              component={Discover}
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-circle-sharp' size={30} color={'red'} />
                  </TouchableOpacity>
                ),
                headerTitle: 'ko',
                headerStyle: {
                  backgroundColor: 'black',
                },
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
                headerShown: true,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='close-circle-sharp' size={30} color={'white'} />
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
              name='CreatePost'
              component={CreatePost}
              options={({ navigation }) => ({
                headerShown: true, // ここtrueにすると、,,,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                  </TouchableOpacity>
                ),
                headerTitle: '',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: 'white',
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
        <SpaceMenuBottomSheet navigation={props.navigation} />
      </GestureHandlerRootView>
    </HomeStackNavContext.Provider>
  );
};

export default HomeStackNavigator;
