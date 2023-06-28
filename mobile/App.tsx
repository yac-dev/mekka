import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './navigations/RootNavigator';
import BottomNavigator from './navigations/BottomNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import MyLibraries from './screens/MyLibraries';
import Discover from './screens/Discover';
import GlobalContext from './contexts/GlobalContext';
import { AuthState } from './types/auth';

export default function App() {
  const [auth, setAuth] = useState<AuthState>({
    data: { _id: '', name: '', avatar: '' },
    isAuthenticated: false,
    jwt: '',
  });
  // const [myLibraries, setMyLibraries] = useState(null);

  return (
    <GlobalContext.Provider value={{ auth, setAuth }}>
      <NavigationContainer>
        <Tab.Navigator
        // screenOptions={{
        //   tabBarStyle: {
        //     // display: hide ? 'none' : 'flex',
        //     backgroundColor: 'black',
        //     borderTopWidth: 0,
        //   },
        //   tabBarLabelStyle: {
        //     fontSize: 12,
        //   },
        //   tabBarActiveTintColor: 'white',
        // }}
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
          <Tab.Screen name='Discover' component={Discover} />
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
