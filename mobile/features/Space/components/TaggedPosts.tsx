import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import backendAPI from '../../../apis/backend';
import PostThumbnail from './PostThumbnail';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { PostsContext } from '../../../contexts/PostsContext';

const TaggedPosts = (props) => {
  const { spaceAndUserRelationship } = useContext(SpaceRootContext);
  const { posts, havePostsBeenFetched, setHavePostsBeenFetched, onRefresh, isRefreshing } = useContext(PostsContext);
  // const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);

  // const getPostsByTagId = async () => {
  //   const result = await backendAPI.get(`/posts/tag/${props.tagObject.tag._id}`);
  //   const { posts } = result.data;
  //   setPosts(posts);
  //   // setSelectedTag(tags[0]);
  //   setHavePostsBeenFetched(true);
  // };

  // useEffect(() => {
  //   getPostsByTagId();
  // }, []);

  const renderItem = useCallback((post) => {
    return (
      <View>
        <PostThumbnail post={post} />
      </View>
    );
  }, []);

  if (havePostsBeenFetched) {
    if (posts.length) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <FlatList
            numColumns={3}
            data={posts}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl colors={['#FF0000', '#00FF00']} refreshing={isRefreshing} onRefresh={() => onRefresh()} />
            }
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
          <Text style={{ color: 'white' }}>No posts in this tag</Text>
          {/* <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Text style={{ color: 'white' }}>{spaceAndUserRelationship.space.name}</Text>
          </View> */}
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
        <ActivityIndicator />
      </View>
    );
  }
};

export default TaggedPosts;
