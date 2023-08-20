import React, { useContext, useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import PostThumbnail from '../components/PostThumbnail';
// import { SpaceContext } from '../contexts/SpaceContext';
import { SpaceRootContext } from '../contexts/SpaceRootContext';

const Gallery = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const { posts, setPosts, havePostsBeenFetched, selectedTag } = useContext(SpaceRootContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  // useEffect(() => {
  //   if (props.route?.params?.createdPost) {
  //     setPosts((previous) => {
  //       const updating = [...previous];
  //       updating.unshift(props.route?.params?.createdPost);
  //       return updating;
  //     });
  //   }
  // }, [props.route?.params?.createdPost]);

  const renderItem = useCallback((post) => {
    return (
      <View>
        <PostThumbnail post={post} />
      </View>
    );
  }, []);

  if (havePostsBeenFetched) {
    if (posts[selectedTag._id]?.length) {
      return (
        <FlatList
          numColumns={3}
          data={posts[selectedTag._id]}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id}
          style={{ marginTop: 60 }}
        />
      );
    } else {
      return <Text>No posts</Text>;
    }
  } else {
    return <ActivityIndicator />;
  }
};

export default Gallery;
