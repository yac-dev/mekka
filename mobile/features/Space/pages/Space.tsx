import React, { useContext, useCallback, useState, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, Dimensions, FlatList } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import PostThumbnail from '../components/PostThumbnail';
import Gallery from '../components/Gallery';
import SpaceMenu from './SpaceMenu';
import { SpaceContext } from '../contexts/SpaceContext';

const Space = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const [posts, setPosts] = useState([]);
  const [space, setSpace] = useState({ name: '' });
  const [arePostsFetched, setArePostsFetched] = useState(false);
  const menuBottomSheetRef = useRef(null);

  // useEffect(() => {
  //   if (props.route?.params?.createdPost) {
  //     setPosts((previous) => {
  //       const updating = [...previous];
  //       updating.unshift(props.route?.params?.createdPost);
  //       return updating;
  //     });
  //   }
  // }, [props.route?.params?.createdPost]);

  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}`);
    const { space } = result.data;
    setSpace(space);
  };

  const getPosts = async () => {
    const result = await backendAPI.get(`/posts/space/${props.route?.params?.spaceId}`);
    const { posts } = result.data;
    setPosts(posts);
    setArePostsFetched(true);
  };

  useEffect(() => {
    getSpace();
    getPosts();
  }, []);

  const renderItem = useCallback((post) => {
    return (
      <View>
        <PostThumbnail post={post} />
      </View>
    );
  }, []);

  return (
    <SpaceContext.Provider
      value={{
        space,
        setSpace,
        posts,
        setPosts,
        arePostsFetched,
        setArePostsFetched,
        navigation: props.navigation,
        menuBottomSheetRef,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
        <Gallery />
        <SpaceMenu />
      </GestureHandlerRootView>
    </SpaceContext.Provider>
  );
};

export default Space;
