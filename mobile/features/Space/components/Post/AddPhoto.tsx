import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
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
        return (
          <Image
            key={index}
            source={{ uri: photo }}
            style={{ width: 90, height: 90, borderRadius: 12, marginRight: 10 }}
          />
        );
      });

      return (
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  const renderDescription = () => {
    return <Text style={{ color: 'white' }}>{formData.photos.length ? 'Add more' : 'Add image'}</Text>;
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            width: 90,
            height: 90,
            backgroundColor: 'rgb(44, 44, 44)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            alignSelf: 'center',
            marginRight: 10,
          }}
          onPress={() => pickAndSendImage()}
        >
          <AntDesign name='plus' size={25} color='white' style={{ marginBottom: 10 }} />
          {renderDescription()}
        </TouchableOpacity>
        {renderPhoto()}
      </View>
    </View>
  );
};

export default AddPhoto;
