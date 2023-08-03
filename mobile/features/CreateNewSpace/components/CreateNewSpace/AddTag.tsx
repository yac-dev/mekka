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
              color: tagName.length ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
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
      <Text style={{ color: 'white', marginBottom: 10 }}>Write tag name and press Done.</Text>
      <TextInput
        placeholder='Tag name ...'
        placeholderTextColor={'rgb(180, 180, 180)'}
        style={{ backgroundColor: inputBackgroundColor, padding: 10, borderRadius: 8, color: 'white' }}
        value={tagName}
        onChangeText={(text) => setTagName(text)}
        autoCapitalize='none'
      />
    </View>
  );
};

export default AddTag;
