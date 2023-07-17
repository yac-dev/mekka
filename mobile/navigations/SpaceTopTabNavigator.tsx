import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Grid from '../features/Space/pages/Home';
import Map from '../features/Space/pages/Map';
import Albums from '../features/Space/pages/Albums';

const Tab = createMaterialTopTabNavigator();

const SpaceStackNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Grid'
        component={Grid}
        options={({ route }) => ({
          tabBarLabel: 'Grid',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
        })}
      />
      <Tab.Screen
        name='Map'
        component={Map}
        options={({ route }) => ({
          tabBarLabel: 'Map',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
        })}
      />
      <Tab.Screen
        name='Albums'
        component={Albums}
        options={({ route }) => ({
          tabBarLabel: 'Albums',
          tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold', fontSize: 17 },
        })}
      />
    </Tab.Navigator>
  );
};

export default SpaceStackNavigator;
