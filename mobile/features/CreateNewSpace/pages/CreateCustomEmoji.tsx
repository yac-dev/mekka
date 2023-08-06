import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import backendAPI from '../../../apis/backend';

const CreateCustomEmoji = (props) => {
  const { authData } = useContext(GlobalContext);
  const [previewEmoji, setPreviewEmoji] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          // このmergeって、初めて知ったな。
          onPress={() => props.navigation.navigate({ name: 'EmojiPicker', params: { previewEmoji }, merge: true })}
          disabled={previewEmoji ? false : true}
        >
          <Text
            style={{
              color: previewEmoji ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [previewEmoji]);

  // pickしたら、その画像をそのままserverに送って、removebgのcodeを動かす感じ。
  const pickImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      const payload = new FormData();

      const iconData = {
        name: `${authData._id}-${new Date()}`,
        uri: pickedImage.assets[0].uri,
        type: 'image/jpeg',
      };
      payload.append('createdBy', authData._id);
      payload.append('originalEmojiImage', JSON.parse(JSON.stringify(iconData)));
      const result = await backendAPI.post('/customemojis/preview', payload, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      const { previewEmoji } = result.data;
      setPreviewEmoji(previewEmoji);
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
