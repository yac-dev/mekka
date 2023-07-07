import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import { TouchableOpacity } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from '../screens/Home';

const { MCI, II } = icons;

const RootStack = () => {
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={({ navigation }) => ({
          headerShown: true,
          headerRight: () => {
            if (state.authData) {
              return (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
                  {/* <Ionicons name='close-circle-outline' size={30} color={'white'} /> */}
                  {/* <Text style={{ color: 'white', fontSize: 20 }}>pro</Text> */}
                  <MCI name='account-circle' size={30} color={'white'} />
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          },
          // headerLeft: () => {
          //   return (
          //     <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('About Lampost')}>
          //       {/* <Ionicons name='close-circle-outline' size={30} color={'white'} /> */}
          //       {/* <Text style={{ color: 'white', fontSize: 20 }}>pro</Text> */}
          //       <MCI name='information' size={25} color={'white'} />
          //     </TouchableOpacity>
          //   );
          // },
          title: 'Mekka',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'black',
            borderBottomWidth: 0,
          },
          tabBarLabel: 'Home',
          tabBarStyle: {
            // display: hide ? 'none' : 'flex',
            backgroundColor: 'black',
            borderTopWidth: 0,
          },
          // tabBarIcon: ({ size, color, focused }) => (
          //   <II name='list' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          // ),
        })}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
