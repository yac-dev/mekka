import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import * as SecureStore from 'expo-secure-store';

const Login = (props) => {
  const { setAuthData, setIsAuthenticated } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onDonePress = async () => {
    const payload = {
      email,
      password,
    };
    console.log(payload);
    const result = await backendAPI.post('/auth/login', payload);
    const { user, jwt } = result.data;
    setAuthData(user);
    setIsAuthenticated(true);
    await SecureStore.setItemAsync('secure_token', jwt);
    props.navigation?.navigate('SpacesDrawerNavigator');
    // ここで、secureeをさらにsetする感じか。
  };

  return (
    <View style={{ flex: 1, paddingTop: 100, backgroundColor: 'black' }}>
      <TextInput
        placeholder='email'
        value={email}
        style={{ backgroundColor: 'red', marginBottom: 20 }}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder='password'
        value={password}
        style={{ backgroundColor: 'red', marginBottom: 20 }}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => onDonePress()}>
        <Text style={{ color: 'red' }}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
