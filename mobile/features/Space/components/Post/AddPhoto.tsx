import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddPhoto = () => {
  const pickAndSendImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [16, 9],
      quality: 1,
    });
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      console.log(pickedImage);
      // setFormData((previous) => {
      //   return {
      //     ...previous,
      //     icon: pickedImage.assets[0].uri,
      //   };
      // });
    }
    // user idと日付でfile名を確保しておく。
    // let creatingFileName = `${auth.data._id}-${Date.now()}`;
    // if (!pickedImage.cancelled && pickedImage.uri) {
    // }
  };

  return (
    <TouchableOpacity onPress={() => pickAndSendImage()}>
      <Text style={{ color: 'red' }}>Opne</Text>
    </TouchableOpacity>
  );
};

export default AddPhoto;
