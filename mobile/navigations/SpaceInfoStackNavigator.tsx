import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import { Ionicons } from '@expo/vector-icons';
import SpaceInfo from '../features/SpaceInfo/pages/SpaceInfo';

const SpaceInfoStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SpaceInfo'
        component={SpaceInfo}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='close-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'rgb(30, 30, 30)',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: primaryTextColor,
          },
        })}
      />
      {/* ここにuser infoのcomponentを入れるかんじだ。 */}
      {/* <Stack.Screen
        name='Members'
        component={Members}
        options={({ navigation }) => ({
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.goBack()}>
          //     <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
          //   </TouchableOpacity>
          // ),
          // headerShown: true,
          // headerTitle: 'Space detail',
          // headerStyle: {
          //   backgroundColor: primaryBackgroundColor,
          // },
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          //   color: primaryTextColor,
          // },
        })}
      /> */}
    </Stack.Navigator>
  );
};

export default SpaceInfoStackNavigator;
