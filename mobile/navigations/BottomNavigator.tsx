import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import MyLibraries from '../screens/MyLibraries';

const BrottomNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            // display: hide ? 'none' : 'flex',
            backgroundColor: 'black',
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: 'white',
        }}
      >
        <Tab.Screen
          name='MyLibraries'
          component={MyLibraries}
          // options={({ navigation }) => ({
          //   headerShown: true,
          //   headerRight: () => {
          //     if (auth.isAuthenticated) {
          //       return (
          //         <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
          //           <MaterialCommunityIcons name='account-circle' size={30} color={'white'} />
          //         </TouchableOpacity>
          //       );
          //     } else {
          //       return null;
          //     }
          //   },
          //   headerLeft: () => {
          //     return (
          //       <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('About Lampost')}>
          //       </TouchableOpacity>
          //     );
          //   },
          //   title: 'Home',
          //   headerTintColor: 'white',
          //   headerStyle: {
          //     backgroundColor: appBottomSheetBackgroundColor,
          //     borderBottomWidth: 0,
          //   },
          //   tabBarLabel: 'Home',
          //   tabBarBadge: chatsNotificationCount ? chatsNotificationCount : null,
          //   tabBarStyle: {
          //     backgroundColor: appBottomSheetBackgroundColor,
          //     borderTopWidth: 0,
          //   },
          //   tabBarIcon: ({ size, color, focused }) => (
          //     <Ionicons name='list' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          //   ),
          // })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BrottomNavigator;
