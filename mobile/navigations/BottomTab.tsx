import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import GlobalContext from '../contexts/GlobalContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { primaryBackgroundColor } from '../themes/color';
import { icons } from '../utils/icons';
import MySpaces from '../features/Home/pages/MySpaces';
import Mekkas from '../features/Discover/pages/Spaces';
import HomeStackNavigator from './HomeStackNavigator';
import DiscoverStackNavigator from './DiscoverStackNavigator';
const { MCI, MI, ET } = icons;

const BottomTab: React.FC = () => {
  const { globalState } = useContext(GlobalContext);

  // navigatorってさ、多分scope chainやらprototype chain的な働きなのかね。。。同じstack内で名前が見つからなかったら、上のnavigatorを探す、てきな動きをするのだろう、、、と仮定してみる。
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: {
          backgroundColor: primaryBackgroundColor,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: 'white',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: primaryBackgroundColor,
          borderBottomWidth: 0,
        },
        headerRight: () => {
          // if (globalState.authData) {
          //   return (
          //     <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
          //       <MCI name='account-circle' size={30} color={'white'} />
          //     </TouchableOpacity>
          //   );
          // } else {
          //   return null;
          // }
          return (
            // 今はこれでとりあえず。
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
                <ET name='bell' size={25} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
                <MCI name='account-circle' size={25} color={'white'} />
              </TouchableOpacity>
            </View>
          );
        },
        // headerLeft: () => {
        //   return (
        //     <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('About Lampost')}>
        //       <MCI name='information' size={25} color={'white'} />
        //     </TouchableOpacity>
        //   );
        // },
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeStackNavigator}
        options={({ navigation }) => ({
          headerShown: true,
          tabBarIcon: ({ size, color, focused }) => (
            <MI name='apps' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
          title: 'Home',
        })}
      />
      <Tab.Screen
        name='Discover'
        component={DiscoverStackNavigator}
        options={({ navigation }) => ({
          headerShown: true,
          tabBarIcon: ({ size, color, focused }) => (
            <MCI name='compass' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
          title: 'Discover',
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
