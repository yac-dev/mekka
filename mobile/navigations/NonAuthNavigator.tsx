import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ProfileHome from '../features/Profile/pages/Home';
import { Ionicons } from '@expo/vector-icons';
import WelcomePage from '../features/NotAuthenticated/pages/WelcomePage';

const NonAuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        // bottomSheetをやめた。
        name='Welcome'
        component={WelcomePage}
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
    </Stack.Navigator>
  );
};

export default NonAuthNavigator;
