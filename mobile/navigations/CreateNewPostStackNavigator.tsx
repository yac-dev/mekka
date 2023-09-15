import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SelectPostType from '../features/CreateNewPost/pages/SelectPostType';
import { Ionicons } from '@expo/vector-icons';
import NormalPost from '../features/CreateNewPost/pages/NormalPost';
import MomentPost from '../features/CreateNewPost/pages/MomentPost';

const CreateNewPostStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SelectPostType'
        component={SelectPostType}
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
        name='NormalPost'
        component={NormalPost}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            );
          },
          title: '',
          headerStyle: {
            backgroundColor: 'black',
          },
          // headerTintColor: 'red',
          // headerStyle: {
          //   backgroundColor: 'black',
          //   borderBottomWidth: 0,
          // },
          // tabBarLabel: 'Home',
          // tabBarStyle: {
          //   backgroundColor: 'black',
          //   borderTopWidth: 0,
          // },
        })}
      />
      <Stack.Screen
        name='MomentPost'
        component={MomentPost}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            );
          },
          title: '',
          headerStyle: {
            backgroundColor: 'black',
          },
          // title: 'Mekka',
          // headerTintColor: 'red',
          // headerStyle: {
          //   backgroundColor: 'black',
          //   borderBottomWidth: 0,
          // },
          // tabBarLabel: 'Home',
          // tabBarStyle: {
          //   backgroundColor: 'black',
          //   borderTopWidth: 0,
          // },
        })}
      />
    </Stack.Navigator>
  );
};

export default CreateNewPostStackNavigator;
