import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CreateCustomEmoji = (props) => {
  const [generatedEmoji, setGeneratedEmoji] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          // このmergeって、初めて知ったな。
          onPress={() => props.navigation.navigate({ name: 'EmojiPicker', params: { generatedEmoji }, merge: true })}
          disabled={generatedEmoji ? false : true}
        >
          <Text
            style={{
              color: generatedEmoji ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [generatedEmoji]);

  // pickしたら、その画像をそのままserverに送って、removebgのcodeを動かす感じ。
  const pickImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      console.log(pickedImage);
    }
    // user idと日付でfile名を確保しておく。
    // let creatingFileName = `${auth.data._id}-${Date.now()}`;
    // if (!pickedImage.cancelled && pickedImage.uri) {
    // }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, marginBottom: 20 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
          Create custom emoji
        </Text>
        <Text style={{ color: 'rgb(170, 170, 170)' }}>
          You can create an emoji icon from an image and use it in your space.
        </Text>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: 'rgb(88,88,88)', padding: 10, borderRadius: 5 }}
        onPress={() => pickImage()}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <MaterialCommunityIcons name='plus' size={25} color={'white'} />
          <Text style={{ color: 'white' }}>Choose from library</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreateCustomEmoji;
