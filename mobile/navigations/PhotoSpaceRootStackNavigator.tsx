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
import Photos from '../features/Space/pages/Photos';
import AddLoaction from '../features/Space/pages/AddLocation';
import Reactions from '../features/Space/pages/Reactions';
import Albums from '../features/Space/pages/Albums';
import CrearePost from '../features/Space/pages/CreatePost';

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
const PhotoSpaceRootStackNavigator = () => {
  // これ、めんどうだな。。。3つに分かれるのかね。。。パターンが。
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Photos'
        component={Space}
        options={({ navigation }) => ({
          headerShown: false, // ここtrueにすると、,,,
        })}
      />
      <Stack.Screen
        name='ViewPost'
        component={ViewPost}
        options={({ navigation }) => ({
          // headerShown: false, // ここtrueにすると、,,,
        })}
      />
      {/* <Stack.Screen
        name='Photos'
        component={Photos}
        options={({ navigation }) => ({
          headerShown: false, // ここtrueにすると、,,,
        })}
      /> */}
      <Stack.Screen
        name='Albums'
        component={Albums}
        options={({ navigation }) => ({
          headerShown: false, // ここtrueにすると、,,,
        })}
      />
      {/* Reactions */}
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='AddLocation'
          component={AddLoaction}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
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
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='CreatePost'
          component={CrearePost}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Post',
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

export default PhotoSpaceRootStackNavigator;
