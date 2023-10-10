import React, { useState, useContext, useEffect, forwardRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { FadingTransition } from 'react-native-reanimated';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

const Content = forwardRef(({ post }, parentRef) => {
  // const { post, setIsPostFetched, isPostFetched } = useContext(ViewPostContext);
  const [viewingContent, setViewingContent] = useState(post.contents[0]);
  // const {} = useContext(SpaceRootContext)

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };
  console.log('post', post);

  const renderContentOptions = () => {
    if (post.contents.length >= 2) {
      const list = post.contents.map((content, index) => {
        if (content.type === 'video') {
          return (
            <TouchableOpacity
              key={index}
              style={{ width: 50, height: 50, marginRight: 10 }}
              onPress={() => setViewingContent(content)}
            >
              <Video source={{ uri: content.data }} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={index}
              style={{ width: 50, height: 50, marginRight: 10 }}
              onPress={() => setViewingContent(content)}
            >
              <FastImage source={{ uri: content.data }} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
            </TouchableOpacity>
          );
        }
      });

      return (
        <ScrollView style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  if (viewingContent.type === 'video') {
    return (
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Video source={{ uri: viewingContent.data }} style={{ width: '100%' }} />

        <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>{renderContentOptions()}</View>
      </View>
    );
  } else if (viewingContent.type === 'photo') {
    return (
      <View style={{ flex: 1 }}>
        <View style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <FastImage
              source={{ uri: post.createdBy.avatar }}
              style={{
                width: 30,
                height: 30,
                marginRight: 20,
                // backgroundColor: iconColorTable['blue1'],
                borderRadius: 5,
              }}
              // tintColor={'white'}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: 'white', marginBottom: 10 }}>{post.createdBy.name}</Text>
              <Text style={{ color: 'white' }}>{renderDate(post.createdAt)}</Text>
            </View>
          </View>
          <View style={{ position: 'absolute', right: 10, top: 10 }}>{renderContentOptions()}</View>
          <Text style={{ color: 'white', fontSize: 17 }}>{post.caption}</Text>
        </View>
        <FastImage
          source={{ uri: viewingContent.data }}
          style={{ width: '100%', aspectRatio: 1, marginBottom: 10 }}
          resizeMode='cover'
        />
      </View>
    );
  }
});

export default Content;
