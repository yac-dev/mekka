import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import GlobalContext from '../contexts/GlobalContext';
import { baseBackgroundColor, baseTextColor } from '../theme';

const MyLibraries = () => {
  console.log('My libraries');
  const { auth, setAuth } = useContext(GlobalContext);

  return (
    <View style={{ flex: 1, backgroundColor: baseBackgroundColor }}>
      <Text style={{ color: baseTextColor }}>Here is the my libraries component</Text>
      <Text style={{ color: baseTextColor }}>{auth.isAuthenticated ? "I'm logged in!" : "I'm logged out now"}</Text>
    </View>
  );
};

export default MyLibraries;
