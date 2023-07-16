import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { primaryBackgroundColor } from '../../../../themes/color';
import { inputBackgroundColor } from '../../../../themes/color';

const AddTag = (props) => {
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          // このmergeって、初めて知ったな。
          onPress={() =>
            props.navigation.navigate({ name: 'CreateNewSpace', params: { addedTag: tagName }, merge: true })
          }
          disabled={tagName.length ? false : true}
        >
          <Text
            style={{
              color: tagName.length ? 'white' : 'red',
              fontSize: 20,
              fontWeight: tagName.length ? 'bold' : null,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [tagName]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <Text style={{ color: 'white' }}>Add tag</Text>
      <TextInput
        placeholder='tag name here ...'
        style={{ backgroundColor: inputBackgroundColor, padding: 10, borderRadius: 8 }}
        value={tagName}
        onChangeText={(text) => setTagName(text)}
      />
    </View>
  );
};

export default AddTag;
