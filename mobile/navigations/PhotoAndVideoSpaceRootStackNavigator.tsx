import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Photos from '../features/Space/pages/Photos';
import Videos from '../features/Space/pages/Videos';

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
      {/* さらに奥に行きたい場合は、この上にさらにnavigatorをつけないといけないね。 */}
      <TopTab.Screen
        name='Photos'
        component={Photos}
        options={({ route }) => ({
          tabBarLabel: 'Photos',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
        })}
      />
      <TopTab.Screen
        name='Videos'
        component={Videos}
        options={({ route }) => ({
          tabBarLabel: 'Videos',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
          // tabBarLabelStyle: { padding: 5 },
        })}
      />
    </TopTab.Navigator>
  );
};

export default PhotoAndVideoSpaceRootStackNavigator;
