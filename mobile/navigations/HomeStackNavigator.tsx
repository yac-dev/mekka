import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import GlobalContext from '../contexts/GlobalContext';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import MySpaces from '../features/Home/pages/MySpaces';
import Signup from '../features/Home/pages/Signup';
import CreateNewSpace from '../features/Discover/pages/CreateNewSpace';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='MySpaces'
          component={MySpaces}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Signup',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
