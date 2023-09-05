import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { removeEmojis } from '../utils/removeEmoji';

const CreateLocationTag = (props) => {
  const [locationTagName, setLocationTagName] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={locationTagName.length ? false : true}>
          <Text
            style={{
              color: locationTagName.length && locationTagName.length <= 40 ? 'white' : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [locationTagName]);

  const onDonePress = () => {
    props.navigation.navigate({
      name: 'CreateNewPost',
      params: { createdLocationTag: removeEmojis(locationTagName) },
      merge: true,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Create location tag
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Couldn't find a location tag you want to add?{'\n'}Create new one and share with members.
        </Text>
      </View>
      <Text
        style={{
          color: locationTagName.length <= 40 ? 'rgb(170,170,170)' : 'red',
          alignSelf: 'flex-end',
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        {locationTagName.length}/30
      </Text>
      <TextInput
        placeholder='Type location tag name and press "Done"'
        placeholderTextColor={'rgb(170, 170, 170)'}
        value={locationTagName}
        onChangeText={(text) => setLocationTagName(text)}
        style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, color: 'white' }}
      />
    </View>
  );
};

export default CreateLocationTag;
