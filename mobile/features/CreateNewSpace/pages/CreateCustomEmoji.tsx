import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import backendAPI from '../../../apis/backend';
import baseURL from '../../../apis/baseURL';
import { Ionicons } from '@expo/vector-icons';

const CreateCustomEmoji = (props) => {
  const { authData, setLoading } = useContext(GlobalContext);
  const [previewEmoji, setPreviewEmoji] = useState('');
  const [fileName, setFileName] = useState('');

  const onClose = async () => {
    if (fileName) {
      setLoading(true);
      const result = await backendAPI.patch('/customemojis/preview', { fileName });
      setLoading(false);
      props.navigation.goBack();
    } else {
      props.navigation.goBack();
    }
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => onClose()}>
          <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
        </TouchableOpacity>
      ),
    });
  }, [fileName]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          // このmergeって、初めて知ったな。
          onPress={() => props.navigation.navigate({ name: 'CreateNewSpace', params: { fileName }, merge: true })}
          disabled={fileName ? false : true}
        >
          <Text
            style={{
              color: fileName ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [fileName]);

  console.log(fileName);

  // pickしたら、その画像をそのままserverに送って、removebgのcodeを動かす感じ。
  const pickImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    let creatingFileName = `${authData._id}-${Date.now()}`;
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      const payload = new FormData();

      payload.append('createdBy', authData._id);
      if (fileName) {
        payload.append('exFileName', fileName);
      }
      const iconData = {
        name: creatingFileName,
        uri: pickedImage.assets[0].uri,
        type: 'image/jpeg',
      };
      payload.append('originalEmojiImage', JSON.parse(JSON.stringify(iconData)));
      const result = await backendAPI.post('/customemojis/preview', payload, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      // const { previewEmoji } = result.data;
      setFileName(creatingFileName);
      // setPreviewEmoji(previewEmoji);
    }

    // user idと日付でfile名を確保しておく。
    // let creatingFileName = `${auth.data._id}-${Date.now()}`;
    // if (!pickedImage.cancelled && pickedImage.uri) {
    // }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, marginBottom: 20 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
          Create custom emoji
        </Text>
        <Text style={{ color: 'rgb(170, 170, 170)', textAlign: 'center' }}>
          Couldn't find the sticker you want to use? Now you can create one from an image easily and quickly.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, alignSelf: 'center' }}>
        <Image
          source={require('../../../assets/forApp/elon-wtf-original.png')}
          style={{ width: 100, height: 70, marginRight: 20 }}
        />
        <Ionicons name='arrow-forward-circle' color='rgb(170,170, 170)' size={25} style={{ marginRight: 20 }} />
        <Image source={require('../../../assets/forApp/elon-wtf.png')} style={{ width: 70, height: 70 }} />
      </View>
      <TouchableOpacity
        style={{ backgroundColor: 'rgb(88,88,88)', padding: 10, borderRadius: 5, marginBottom: 30 }}
        onPress={() => pickImage()}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <MaterialCommunityIcons name='plus' size={25} color={'white'} />
          <Text style={{ color: 'white' }}>Choose from library</Text>
        </View>
      </TouchableOpacity>

      {fileName ? (
        <Image
          style={{
            width: 80,
            height: 80,
          }}
          source={{
            uri: `${baseURL}/buffer/customemojis/removed-${fileName}.png`,
            // priority: FastImage.priority.normal,
          }}
        />
      ) : null}
    </View>
  );
};

export default CreateCustomEmoji;
