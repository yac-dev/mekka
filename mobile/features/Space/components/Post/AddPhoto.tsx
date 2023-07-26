import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { PostContext } from '../../contexts/PostContext';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

const AddPhoto = () => {
  const { formData, setFormData } = useContext(PostContext);

  const pickAndSendImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [16, 9],
      quality: 1,
    });
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      console.log(pickedImage);
      setFormData((previous) => {
        return {
          ...previous,
          photos: [...previous.photos, pickedImage.assets[0].uri],
        };
      });
    }
    // user idと日付でfile名を確保しておく。
    // let creatingFileName = `${auth.data._id}-${Date.now()}`;
    // if (!pickedImage.cancelled && pickedImage.uri) {
    // }
  };

  const renderPhoto = () => {
    if (formData.photos.length) {
      const list = formData.photos.map((photo, index) => {
        return <Image key={index} source={{ uri: photo }} style={{ width: 80, height: 80 }} />;
      });

      return <View style={{ flexDirection: 'row' }}>{list}</View>;
    } else {
      return <Text style={{ color: 'white' }}>Please select the image</Text>;
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{ width: 80, height: 80, backgroundColor: 'red', marginBottom: 20 }}
        onPress={() => pickAndSendImage()}
      >
        <AntDesign name='plus' size={20} color='white' />
      </TouchableOpacity>
      {renderPhoto()}
    </View>
  );
};

export default AddPhoto;
