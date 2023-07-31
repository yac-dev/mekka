import React, { useCallback, useContext, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { PostContext } from '../../contexts/PostContext';

const AddCaption = () => {
  const { setFormData } = useContext(PostContext);

  return (
    <TextInput
      style={{ backgroundColor: 'rgb(44, 44, 44)', padding: 10, borderRadius: 8, marginBottom: 20 }}
      placeholder='Add caption...'
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
