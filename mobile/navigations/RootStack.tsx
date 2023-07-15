import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import BottomTab from './BottomTab';
import Home from '../features/Home/pages/Home';
import Signup from '../features/Home/pages/Signup';
import Space from '../features/Home/pages/Space';
import CreateNewSpace from '../features/CreateNewSpace/pages/CreateNewSpace';
import Discover from '../features/Discover/pages/Spaces';
import { Entypo } from '@expo/vector-icons';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';

const { MCI, II } = icons;

const RootStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name='BottomTab'
        component={BottomTab}
        options={({ navigation }) => ({
          headerShown: false,
          // いや、ここで設定すると、BottomTabっていう上のtabに対する設定になってしまうね。
          // headerRight: () => {
          //   if (state.authData) {
          //     return (
          //       <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
          //         <MCI name='account-circle' size={30} color={'white'} />
          //       </TouchableOpacity>
          //     );
          //   } else {
          //     return null;
          //   }
          // },
          // headerLeft: () => {
          //   return (
          //     <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('About Lampost')}>
          //       <MCI name='information' size={25} color={'white'} />
          //     </TouchableOpacity>
          //   );
          // },
          // title: 'Mekka',
          // headerTintColor: 'white',
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
      /> */}
      <Stack.Group>
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
                  <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
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
          name='Space'
          component={Space}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Space',
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
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Create new space',
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

export default RootStack;
