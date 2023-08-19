import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
// import * as VideoThumbnails from 'expo-video-thumbnails';
import { Video } from 'expo-av';
import { GlobalContext } from '../../../contexts/GlobalContext';
// import { SpaceContext } from '../contexts/SpaceContext';
import { SpaceRootContext } from '../contexts/SpaceRootContext';

const PostThumbnail = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const { navigation } = useContext(SpaceRootContext);

  // const generateThumbnail = async () => {
  //   try {
  //     if (props.post.content.type === 'video') {
  //       const { uri } = await VideoThumbnails.getThumbnailAsync(props.post.content.data, { time: 1000 });
  //       setImage(uri);
  //     } else {
  //       setImage(props.post.content.data);
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };

  // useEffect(() => {
  //   generateThumbnail();
  // }, []);

  if (props.post.content.type === 'video') {
    return (
      <TouchableOpacity
        style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
        onPress={() => navigation.navigate({ name: 'ViewPost', params: { post: props.post } })}
      >
        {/* { name: 'Photos', params: { createdPost: post }, merge: true } */}
        <Video source={{ uri: props.post.content.data }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />;
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}
        onPress={() => navigation.navigate({ name: 'ViewPost', params: { post: props.post } })}
      >
        <FastImage
          source={{ uri: props.post.content.data }}
          style={{ width: '100%', height: '100%', borderRadius: 5 }}
        />
      </TouchableOpacity>
    );
  }
};

export default PostThumbnail;
