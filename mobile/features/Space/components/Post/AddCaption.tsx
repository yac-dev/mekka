import React, { useCallback, useContext, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { PostContext } from '../../contexts/PostContext';

const AddCaption = () => {
  const { setFormData } = useContext(PostContext);

  return (
    <TextInput
      style={{ backgroundColor: 'rgb(88, 88, 88)', padding: 10, borderRadius: 8, marginBottom: 20, color: 'white' }}
      placeholder='Add caption...'
      placeholderTextColor={'rgb(170,170,170)'}
      autoCapitalize='none'
      onChangeText={(text) =>
        setFormData((previous) => {
          return {
            ...previous,
            caption: text,
          };
        })
      }
    />
  );
};

export default AddCaption;
