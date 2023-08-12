import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';
import backendAPI from '../../../apis/backend';
import { VideoSpaceContext } from '../contexts/VideoSpaceContext';
import VideoPosts from '../components/VideoPosts';

const Videos = (props) => {
  const [space, setSpace] = useState({ name: '' });
  const [posts, setPosts] = useState<PostType[]>([]);
  const [arePostsFetched, setArePostsFetched] = useState<boolean>(false);
  const mediaRefs = useRef([]);

  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}`);
    const { space } = result.data;
    setSpace(space);
  };

  const getPosts = async () => {
    const result = await backendAPI.get(`/posts/space/${props.route?.params?.spaceId}`);
    setPosts(result.data.posts);
    setArePostsFetched(true);
  };

  useEffect(() => {
    getSpace();
    getPosts();
  }, []);

  return (
    <VideoSpaceContext.Provider value={{ space, setSpace, posts, setPosts, arePostsFetched, setArePostsFetched }}>
      <VideoPosts />
    </VideoSpaceContext.Provider>
  );
};

export default Videos;
