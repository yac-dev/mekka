import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { PostContext } from '../../contexts/PostContext';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

const AddPhoto = () => {
  const { formData, setFormData } = useContext(PostContext);

  const pickAndSendImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled && result.assets[0].uri) {
      const { uri } = result.assets[0];

      // Determine media type based on file extension
      if (uri.endsWith('.jpg') || uri.endsWith('.png')) {
        // The picked content is a photo.
        console.log('Picked photo:', uri);
      } else if (uri.endsWith('.mp4') || uri.endsWith('.mov')) {
        // The picked content is a video.
        console.log('Picked video:', uri);
      } else {
        console.log('Unknown media type:', uri);
      }

      setFormData((previous) => {
        return {
          ...previous,
          photos: [...previous.photos, result.assets[0].uri],
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
