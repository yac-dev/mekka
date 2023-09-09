import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const WelcomePage = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <Text>Welcome to Mekka. Please signup or login to proceed.</Text>
      <View>
        <Text>signup</Text>
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={{ padding: 10 }}>
        <Text style={{ color: 'white' }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomePage;
