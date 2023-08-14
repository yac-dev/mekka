import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { ViewPostContext } from '../../contexts/ViewPostContext';
import { FadingTransition } from 'react-native-reanimated';

const Content = (props) => {
  const { post, setIsPostFetched, isPostFetched } = useContext(ViewPostContext);
  const [viewingContent, setViewingContent] = useState('');

  if (isPostFetched) {
    if (post.contents[0].type === 'video') {
      return <Video source={{ uri: post.contents[0].data }} style={{ width: 200, height: 200 }} />;
    } else if (post.contents[0].type === 'photo') {
      return <FastImage source={{ uri: post.contents[0].data }} style={{ width: 200, height: 200 }} />;
    }
  } else {
    return <ActivityIndicator />;
  }
};

export default Content;
