import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import backendAPI from '../../../apis/backend';
import LoadingSpinner from '../../../components/LoadingSpinner';

const MomentPost = (props) => {
  const { isIpad, setLoading, setSnackBar, authData } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const [contents, setContets] = useState([]);
  const { space } = props.route.params;

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={contents.length ? false : true}>
          <Text
            style={{
              color: contents.length ? 'white' : 'rgb(70,70,70)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [contents]);

  const calcurateMinutes = () => {
    if (space.disappearAfter >= 60) {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
          {space.disappearAfter / 60} hours.
        </Text>
      );
    } else {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
          {space.disappearAfter} minutes.
        </Text>
      );
    }
  };

  const pickImages = async () => {
    const pickerOption = {
      mediaTypes:
        space.contentType === 'photo'
          ? ImagePicker.MediaTypeOptions.Images
          : space.contentType === 'video'
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
      duration: space.videoLength ? 3000 : null,
    };

    let result = await ImagePicker.launchImageLibraryAsync(pickerOption);
    if (!result.canceled && result.assets) {
      // result assets それぞれのassetに対して、dataを作る様にすると。
      setContets((previous) => {
        const addedAssets = result.assets.map((asset) => {
          return {
            uri: asset.uri,
            type: asset.type === 'image' ? 'image' : 'video',
            duration: asset.duration ? asset.duration : null,
          };
        });

        return [...previous, ...addedAssets];
      });
    }
  };

  const onDonePress = async () => {
    try {
      const payload = new FormData();
      payload.append('disappearAfter', space.disappearAfter);
      payload.append('createdBy', authData._id);
      payload.append('spaceId', space._id);
      for (let content of contents) {
        const obj = {
          name: content.uri.split('/').pop(),
          uri: content.uri,
          type: content.type === 'image' ? 'image/jpg' : 'video/mp4',
        };
        payload.append('contents', JSON.parse(JSON.stringify(obj)));
      }
      console.log(payload);
      setLoading(true);
      const result = await backendAPI.post('/moments', payload, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      setLoading(false);
      const { post } = result.data;
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Post has been created successfully.',
        duration: 7000,
      });
      // props.navigation.navigate({
      //   name: `Space_${props.route?.params?.spaceAndUserRelationship._id}`,
      //   params: { afterPosted: true },
      //   merge: true,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const renderAddedContents = () => {
    if (contents.length) {
      const list = contents.map((content, index) => {
        return (
          <View key={index}>
            <FastImage
              source={{ uri: content.uri }}
              style={{ width: 90, height: 90, borderRadius: 12, marginRight: 10 }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                right: 10,
                backgroundColor: 'red',
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                setContets((previous) => {
                  const updating = [...previous];
                  return updating.filter((element, idx) => index !== idx);
                })
              }
            >
              <Ionicons name='trash' size={20} color={'white'} />
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
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
          Create New Moment
        </Text>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            Moment is a story of IG. Instead of 24 hours rule, your post will be disappeared within
          </Text>
          {calcurateMinutes()}
        </View>
      </View>
      <View style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
          <TouchableOpacity
            style={{
              width: 90,
              aspectRatio: 1,
              backgroundColor: 'rgb(170,170,170)',
              borderRadius: 13,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
            onPress={() => pickImages()}
          >
            <MaterialCommunityIcons name='plus' size={30} color='white' />
            <Text style={{ color: 'white', fontSize: 17 }}>Add</Text>
          </TouchableOpacity>
          {renderAddedContents()}
        </View>
      </View>
      <LoadingSpinner />
    </View>
  );
};

export default MomentPost;
