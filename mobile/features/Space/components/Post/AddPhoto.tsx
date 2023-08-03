import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { PostContext } from '../../contexts/PostContext';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const AddPhoto = () => {
  const { formData, setFormData, route } = useContext(PostContext);

  // useEffect(() => {
  //   setAllowedMedia(() => {
  //     if(route?.params?.space.contentType === 'photo'){
  //       setAllowedMedia(ImagePicker.MediaTypeOptions.All)
  //     } else if(route?.params?.space.contentType === 'video'){
  //       setAllowedMedia(ImagePicker.MediaTypeOptions.All)
  //     } else {

  //     }
  //   })
  // },[])

  const pickAndSendImage = async () => {
    const pickerOption = {
      mediaTypes:
        route?.params?.space.contentType === 'photo'
          ? ImagePicker.MediaTypeOptions.Images
          : route?.params?.space.contentType === 'video'
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
      duration: route?.params?.space.videoLength ? 3000 : null,
    };
    let result = await ImagePicker.launchImageLibraryAsync(pickerOption);
    if (!result.canceled && result.assets) {
      // result assets それぞれのassetに対して、dataを作る様にすると。
      setFormData((previous) => {
        const addedAssets = result.assets.map((asset) => {
          return {
            uri: asset.uri,
            type: asset.type === 'image' ? 'image' : 'video',
            duration: asset.duration ? asset.duration : null,
          };
        });

        return {
          ...previous,
          contents: [...previous.contents, ...addedAssets],
        };
      });

      // Determine media type based on file extension
      // if (uri.endsWith('.jpg') || uri.endsWith('.png')) {
      //   // The picked content is a photo.
      //   console.log('Picked photo:', uri);
      // } else if (uri.endsWith('.mp4') || uri.endsWith('.mov')) {
      //   // The picked content is a video.
      //   console.log('Picked video:', uri);
      // } else {
      //   console.log('Unknown media type:', uri);
      // }

      // setFormData((previous) => {
      //   return {
      //     ...previous,
      //     photos: [...previous.photos, result.assets[0].uri],
      //   };
      // });
    }
  };
  // console.log(JSON.stringify(formData, null, 4));

  const renderPhoto = () => {
    if (formData.contents.length) {
      const list = formData.contents.map((content, index) => {
        return (
          <View key={index}>
            <Image source={{ uri: content.uri }} style={{ width: 90, height: 90, borderRadius: 12, marginRight: 10 }} />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -10,
                right: 0,
                backgroundColor: 'red',
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                setFormData((previous) => {
                  const updating = [...previous.contents];
                  const updated = updating.filter((content, idx) => index !== idx);
                  return {
                    ...previous,
                    contents: updated,
                  };
                })
              }
            >
              <Ionicons name='trash' size={20} color={'white'} />
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <ScrollView horizontal={true} style={{ paddingTop: 10, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  const renderDescription = () => {
    return <Text style={{ color: 'white' }}>{formData.contents.length ? 'Add more' : 'Add image'}</Text>;
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
