import React, { useState, useReducer } from 'react';
import { View, Text, TextInput } from 'react-native';
import { primaryBackgroundColor } from '../../../themes/color';
import { primaryTextColor, placeholderTextColor } from '../../../themes/text';

// こういう簡単なものはstateでいいかね。別にcontextを使うまでもないしな。。。
type signupStateType = {
  name: string;
  email: string;
  password: string;
};

// 行が長くなると、最初の一つ目にもunion operatorがつくのね。
type sugnupActionType =
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string };

const signupReducer = (state: signupStateType, action: sugnupActionType) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const Signup: React.FC = () => {
  const [state, dispatch] = useReducer(signupReducer, { name: '', email: '', password: '' });

  return (
    <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, padding: 10 }}>
      <TextInput
        placeholder='Username'
        placeholderTextColor={placeholderTextColor}
        onChangeText={(text) => {
          dispatch({ type: 'SET_USER_NAME', payload: text });
        }}
        value={state.name}
        style={{ color: primaryTextColor }}
      />
    </View>
  );
};

export default Signup;
