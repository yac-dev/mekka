import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

const PhotoAndVideoSpaceRootStackNavigator = () => {
  return (
    <TopTab.Navigator
    // screenOptions={{
    //   headerShown: true,
    //   headerTransparent: true,
    //   headerStyle: {
    //     backgroundColor: 'red',
    //   },
    //   tabBarStyle: {
    //     backgroundColor: appBottomSheetBackgroundColor,
    //   },
    //   tabBarLabelStyle: {
    //     fontSize: 17,
    //   },
    //   tabBarActiveTintColor: 'white',
    //   tabBarIndicatorStyle: {
    //     height: 0,
    //   },
    // }}
    >
      <TopTab.Screen
        name='Photos'
        component={MyMeetupsNavigator}
        options={({ route }) => ({
          tabBarLabel: 'Upcoming',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
        })}
      />
      <TopTab.Screen
        name='Videos'
        component={MyLibrariesNavigator}
        options={({ route }) => ({
          tabBarLabel: 'My Libraries',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
    </TopTab.Navigator>
  );
};

export default PhotoAndVideoSpaceRootStackNavigator;
