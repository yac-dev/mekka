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
// import SpaceRootStackNavigator from './SpaceRootStackNavigator';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import SpacesTopTabNavigator from './SpacesTopTabNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CreateNewSpace from '../features/CreateNewSpace/pages/CreateNewSpace';
import CreateNewPost from '../features/CreateNewPost/pages/Form';
import SpaceMenuBottomSheet from '../features/SpaceMenuBottomSheet/pages/BottomSheet';
import SpacesDrawerNavigator from './SpacesDrawerNavigator';
import ViewPost from '../features/ViewPost/pages/ViewPost';
import Comments from '../features/ViewPost/pages/Comments';
import Discover from '../features/Discover/pages/Discover';
import ProfileStackNavigator from './ProfileStackNavigator';
import LocationPicker from '../features/CreateNewPost/pages/LocationPicker';
import CreateTag from '../features/CreateNewPost/pages/CreateTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';
import Report from '../features/Report/pages/Report';
import SpaceDetailStackNavigator from './SpaceDetailStackNavigator';
import WelcomePage from '../features/NotAuthenticated/pages/WelcomePage';
import Login from '../features/NotAuthenticated/pages/Login';

import { HomeStackNavContext } from '../contexts/HomeStackNavContext';
const HomeStackNavigator: React.FC = (props) => {
  const { isAuthenticated } = useContext(GlobalContext);

  return (
    <HomeStackNavContext.Provider value={{}}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {isAuthenticated ? (
          <Stack.Navigator
            screenOptions={({ navigation }) => ({
              headerShown: false,
              // headerShown: true,
            })}
          >
            <Stack.Group>
              <Stack.Screen
                name='SpacesDrawerNavigator'
                component={SpacesDrawerNavigator}
                options={({ navigation }) => ({
                  // headerShown: false,
                })}
              />
              <Stack.Screen
                name='ViewPost'
                component={ViewPost}
                options={({ navigation }) => ({
                  headerShown: true,
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
              <Stack.Screen
                name='Comments'
                component={Comments}
                options={({ navigation }) => ({
                  headerShown: true,
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
              <Stack.Screen
                name='Discover'
                component={Discover}
                options={({ navigation }) => ({
                  headerShown: true,
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
                name='CreateNewPost'
                component={CreateNewPost}
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
              <Stack.Screen
                name='ProfileStackNavigator'
                component={ProfileStackNavigator}
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
              <Stack.Screen
                name='SpaceDetailStackNavigator'
                component={SpaceDetailStackNavigator}
                options={({ navigation }) => ({
                  // headerShown: true, // ここtrueにすると、,,,
                  headerShown: false, // ここtrueにすると、,,,

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
                name='LocationPicker'
                component={LocationPicker}
                options={({ navigation }) => ({
                  headerShown: true,
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                    </TouchableOpacity>
                  ),
                  headerTitle: 'Pick location',
                  headerStyle: {
                    backgroundColor: 'black',
                  },
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    color: 'white',
                  },
                })}
              />
              <Stack.Screen
                name='CreateTag'
                component={CreateTag}
                options={({ navigation }) => ({
                  headerShown: true,
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
              <Stack.Screen
                name='CreateNewLocationTag'
                component={CreateNewLocationTag}
                options={({ navigation }) => ({
                  headerShown: true,
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
              <Stack.Screen
                name='Report'
                component={Report}
                options={({ navigation }) => ({
                  headerShown: true,
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                    </TouchableOpacity>
                  ),
                  headerTitle: 'Report',
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
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={({ navigation }) => ({
              headerShown: false,
              // headerShown: true,
            })}
          >
            <Stack.Group>
              <Stack.Screen name='Welcome' component={WelcomePage}></Stack.Screen>
              <Stack.Screen name='Login' component={Login}></Stack.Screen>
            </Stack.Group>
          </Stack.Navigator>
        )}

        <SpaceMenuBottomSheet navigation={props.navigation} />
      </GestureHandlerRootView>
    </HomeStackNavContext.Provider>
  );
};

export default HomeStackNavigator;
