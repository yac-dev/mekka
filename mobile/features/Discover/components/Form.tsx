import React from 'react';
import { View, Text } from 'react-native';
import NameForm from './CreateNewSpace/NameForm';
import ThumbnailForm from './CreateNewSpace/ThumbnailForm';

const Form = () => {
  return (
    <View>
      <NameForm />
      <ThumbnailForm />
    </View>
  );
};

export default Form;
