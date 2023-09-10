import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SelectPostType from '../features/CreateNewPost/pages/SelectPostType';
import { Ionicons } from '@expo/vector-icons';
import NormalPost from '../features/CreateNewPost/pages/NormalPost';
import MomentoPost from '../features/CreateNewPost/pages/MomentoPost';

const CreateNewPostStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SelectPostType'
        component={SelectPostType}
        options={({ navigation }) => ({
          // headerShown: true,
          headerShown: false,
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
      <Stack.Screen
        name='NormalPost'
        component={NormalPost}
        options={({ navigation }) => ({
          // headerShown: true,
          headerShown: false,
          // headerLeft: () => {
          //   return (
          //     <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('About Lampost')}>
          //       <Ionicons name='close' color='white' size={25} />
          //     </TouchableOpacity>
          //   );
          // },
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
      <Stack.Screen
        name='MomentoPost'
        component={MomentoPost}
        options={({ navigation }) => ({
          // headerShown: true,
          headerShown: false,
          headerLeft: () => {
            return (
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('About Lampost')}>
                <Ionicons name='close' color='white' size={25} />
              </TouchableOpacity>
            );
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
