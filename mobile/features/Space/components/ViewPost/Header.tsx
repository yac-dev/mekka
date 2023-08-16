import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { ViewPostContext } from '../../contexts/ViewPostContext';
import { FadingTransition } from 'react-native-reanimated';

const Header = () => {
  const { post, setIsPostFetched, isPostFetched } = useContext(ViewPostContext);

  const renderHeader = () => {
    return (
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <FastImage source={{ uri: post.createdBy.avatar }} style={{ width: 30, height: 30, marginRight: 20 }} />
          <View style={{ flexDirection: 'column' }}>
            <Text>{post.createdBy.name}</Text>
            <Text>{post.createdBY}</Text>
          </View>
        </View>
        <Text style={{ color: 'white' }}>{post.caption}</Text>
      </View>
    );
  };

  return (
    <View style={{ padding: 5 }}>
      {post ? (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <FastImage
              source={{ uri: post.createdBy.avatar }}
              style={{ width: 30, height: 30, marginRight: 20, backgroundColor: 'rgba()' }}
              tintColor={'white'}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: 'white', marginBottom: 7 }}>{post.createdBy.name}</Text>
              <Text style={{ color: 'white' }}>{post.createdAt}</Text>
            </View>
          </View>
          <Text style={{ color: 'white', fontSize: 17 }}>{post.caption}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Header;
