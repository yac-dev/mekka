import React, { useCallback, useContext, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { PostContext } from '../../contexts/PostContext';

const AddCaption = () => {
  const { setFormData } = useContext(PostContext);

  return (
    <View>
      <TextInput
        style={{ backgroundColor: 'red', padding: 10 }}
        placeholder='add caption...'
        onChangeText={(text) =>
          setFormData((previous) => {
            return {
              ...previous,
              caption: text,
            };
          })
        }
      />
    </View>
  );
};

export default AddCaption;
