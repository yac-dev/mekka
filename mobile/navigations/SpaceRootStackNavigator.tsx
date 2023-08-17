import React, { useContext } from 'react';
import { TouchableOpacity, Text, View, Dimensions, StyleSheet } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SpaceTopTabNavigator from './SpaceTopTabNavigator';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import Space from '../features/Space/pages/Space';
import ViewPost from '../features/Space/pages/ViewPost';
import Comments from '../features/Space/pages/Comments';
import Photos from '../features/Space/pages/Photos';
import CrearePost from '../features/Space/pages/CreatePost';
import AddLoaction from '../features/Space/pages/AddLocation';
import CreateTag from '../features/Space/pages/CreateTag';
import Reactions from '../features/Space/pages/Reactions';
import { Ionicons } from '@expo/vector-icons';
import Dummy from '../features/Space/pages/Dummy';

const { MCI, II } = icons;

const windowHeight = Dimensions.get('window').height;
const modalHeight = windowHeight / 2;

const styles = StyleSheet.create({
  modalContainer: {
    height: modalHeight,
    backgroundColor: 'white',
  },
});

// シンプルに、というかあれか。spaceで持っておけばいいのか。photo, video, photoAndVideoって。
const SpaceRootStackNavigator = () => {
  // これ、めんどうだな。。。3つに分かれるのかね。。。パターンが。
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Space'
        component={Space}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='close-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerShown: true,
          headerTitle: 'Space',
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
        name='ViewPost'
        component={ViewPost}
        options={({ navigation }) => ({
          // headerShown: false, // ここtrueにすると、,,,
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
            color: primaryTextColor,
          },
        })}
      />
      <Stack.Screen
        name='Comments'
        component={Comments}
        options={({ navigation }) => ({
          headerShown: true, // ここtrueにすると、,,,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerTitle: 'Comments',
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
        name='Reactions'
        component={Reactions}
        options={({ navigation }) => ({
          headerShown: true, // ここtrueにすると、,,,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
            </TouchableOpacity>
          ),
          headerTitle: 'Reactions',
          headerStyle: {
            backgroundColor: 'rgb(40, 40, 40)',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      />
      {/* Postに関するmodal */}
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='AddLocation'
          component={AddLoaction}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: 'Add location',
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
      {/* viewpostにかんするmenu */}
      {/* <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='Comments'
          component={Comments}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-outline' size={27} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: 'Comments',
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
          name='Reactions'
          component={Reactions}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Reactions',
            headerStyle: {
              backgroundColor: 'rgb(40, 40, 40)',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group> */}
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='CreatePost'
          component={CrearePost}
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
    </Stack.Navigator>
  );
};

export default SpaceRootStackNavigator;
