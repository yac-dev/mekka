import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import { TouchableOpacity } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from '../screens/Home';
import BottomTab from './BottomTab';
import Dummy from '../screens/Dummy';

const { MCI, II } = icons;

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
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
      />
      <Stack.Screen name='Dummy' component={Dummy} />
    </Stack.Navigator>
  );
};

export default RootStack;
