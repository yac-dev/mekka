import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { removeEmojis } from '../utils/removeEmoji';
import FastImage from 'react-native-fast-image';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';

const CreateNewTag = (props) => {
  const { navigation } = useContext(CreateNewPostContext);
  const [tagName, setTagName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={tagName.length ? false : true}>
          <Text
            style={{
              color: tagName.length && tagName.length <= 40 ? 'white' : 'rgb(117,117, 117)',
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
  // createNewPostStackNavigatorに移動って、まさにこのcreateNewTagが今いる場所だもんね。だからpageが変わらないんだわ。

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDonePress = () => {
    navigation.navigate({
      name: 'AddTags',
      params: { createdTag: removeEmojis(tagName) },
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
          Create New Tag
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Couldn't find a tag you want to add?{'\n'}Create one and share with members.
        </Text>
      </View>
      <Text
        style={{
          color: tagName.length <= 40 ? 'rgb(170,170,170)' : 'red',
          alignSelf: 'flex-end',
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        {tagName.length}/30
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: 'rgb(88, 88, 88)',
          borderBottomWidth: 1,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <FastImage
          source={require('../../../assets/forApp/hashtag-normal.png')}
          style={{ width: 25, height: 25 }}
          tintColor={'rgb(170,170,170)'}
        />
        <TextInput
          style={{
            // backgroundColor: 'rgb(88, 88, 88)',
            padding: 10,
            // borderRadius: 5,
            fontSize: 17,
            flex: 1,
            color: 'white',
          }}
          ref={inputRef}
          placeholder='Tag name'
          placeholderTextColor={'rgb(170,170,170)'}
          autoCapitalize='none'
          value={tagName}
          onChangeText={(text) => setTagName(text)}
        />
      </View>
      {/* <TextInput
        placeholder='Type tag name and press "Done"'
        placeholderTextColor={'rgb(170, 170, 170)'}
        value={tagName}
        onChangeText={(text) => setTagName(text)}
        style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, color: 'white' }}
      /> */}
    </View>
  );
};

export default CreateNewTag;
