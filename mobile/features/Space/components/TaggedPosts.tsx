import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import backendAPI from '../../../apis/backend';
import PostThumbnail from './PostThumbnail';
import { SpaceRootContext } from '../contexts/SpaceRootContext';

const TaggedPosts = (props) => {
  const { spaceAndUserRelationship } = useContext(SpaceRootContext);
  const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);

  const getPostsByTagId = async () => {
    const result = await backendAPI.get(`/posts/tag/${props.tagObject.tag._id}`);
    const { posts } = result.data;
    setPosts(posts);
    // setSelectedTag(tags[0]);
    setHavePostsBeenFetched(true);
  };
  console.log(props);

  useEffect(() => {
    getPostsByTagId();
  }, []);

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
        <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 10 }}>
          <FlatList
            numColumns={3}
            data={posts}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item._id}
          />
          {/* <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Text style={{ color: 'white' }}>{spaceAndUserRelationship.space.name}</Text>
          </View> */}
          {/* <TouchableOpacity onPress={() => props.navigation.navigate('CreatePost')}>
            <Text style={{ color: 'white' }}>post</Text>
          </TouchableOpacity> */}
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
