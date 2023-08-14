import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { ViewPostContext } from '../../contexts/ViewPostContext';
import { FadingTransition } from 'react-native-reanimated';

const Content = (props) => {
  const { post, setIsPostFetched, isPostFetched } = useContext(ViewPostContext);
  const [viewingContent, setViewingContent] = useState('');

  useEffect(() => {
    if (isPostFetched) {
      setViewingContent(post.contents[0]);
    }
  }, [isPostFetched]);

  const renderContentOptions = () => {
    if (post.contents.length >= 2) {
      const list = post.contents.map((content, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              marginBottom: 10,
              borderRadius: 11,
              borderWidth: viewingContent._id === content._id ? 3 : null,
              borderColor: viewingContent._id === content._id ? 'blue' : null,
            }}
            onPress={() => setViewingContent(content)}
          >
            <FastImage source={{ uri: content.data }} style={{ width: 50, height: 50, borderRadius: 8 }} />
          </TouchableOpacity>
        );
      });

      return (
        <View style={{ position: 'absolute', right: 10, top: 20 }}>
          <ScrollView>{list}</ScrollView>
        </View>
      );
    } else {
      return null;
    }
  };

  if (isPostFetched) {
    if (viewingContent.type === 'video') {
      return (
        <View style={{ marginBottom: 20 }}>
          <Video source={{ uri: viewingContent.data }} style={{ width: '100%' }} />
          <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
            <Text style={{ color: 'white', fontSize: 20 }}>{post.caption}</Text>
            <Text style={{ color: 'white', fontSize: 20 }}>{post.createdAt}</Text>
          </View>
          {renderContentOptions()}
        </View>
      );
    } else if (viewingContent.type === 'photo') {
      return (
        <View style={{ marginBottom: 20 }}>
          <FastImage
            source={{ uri: viewingContent.data }}
            style={{ width: '100%', aspectRatio: 1 }}
            resizeMode='cover'
          />
          <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
            <Text style={{ color: 'white', fontSize: 20 }}>{post.caption}</Text>
            <Text style={{ color: 'white', fontSize: 20 }}>{post.createdAt}</Text>
          </View>
          {renderContentOptions()}
        </View>
      );
    }
  } else {
    return <ActivityIndicator />;
  }
};

export default Content;
