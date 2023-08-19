import React, { useContext, useCallback, useState, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, Dimensions, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import backendAPI from '../../../apis/backend';
import PostThumbnail from '../components/PostThumbnail';
import Gallery from '../components/Gallery';
import SpaceIconMenuButton from '../components/SpaceIconMenuButton';
import SpaceMenu from './SpaceMenu';
import BottomMenu from '../components/BottomMenu';
import TagMenus from '../components/TagMenus';
import { SpaceContext } from '../contexts/SpaceContext';
import SnackBar from '../../../components/SnackBar';
import FastImage from 'react-native-fast-image';

const Space = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);
  const [arePostsFetched, setArePostsFetched] = useState(false);
  const [space, setSpace] = useState(null);
  const [hasSpaceBeenFetched, setHasSpaceBeenFetched] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [areTagsFetched, setAreTagsFetched] = useState(false);
  const menuBottomSheetRef = useRef(null);

  useEffect(() => {
    if (props.route?.params?.createdPost) {
      setPosts((previous) => {
        const updating = [...previous];
        updating.unshift(props.route?.params?.createdPost);
        return updating;
      });
    }
  }, [props.route?.params?.createdPost]);

  useEffect(() => {
    if (space) {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => menuBottomSheetRef.current.snapToIndex(0)}
          >
            <FastImage source={{ uri: space.icon }} style={{ width: 35, height: 35, borderRadius: 9 }} />
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              fontWeight: 'bold',
            }}
          >
            {space.name}
          </Text>
        ),
      });
    }
  }, [space]);

  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}`);
    const { space } = result.data;
    setSpace(space);
    setHasSpaceBeenFetched(true);
  };

  const getPosts = async () => {
    const result = await backendAPI.get(`/posts/space/${props.route?.params?.spaceId}`);
    const { posts } = result.data;
    setPosts(posts);
    setArePostsFetched(true);
  };

  const getTagsBySpaceId = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}/tags`);
    const { tags } = result.data;
    setTags(tags);
    setAreTagsFetched(true);
  };

  useEffect(() => {
    getSpace();

    // return () => {
    //   getSpace();
    // };
    // unmountはまた後でいいや。
  }, []);

  // spaceが消されたていたらここは動かさん。
  useEffect(() => {
    if (space) {
      getPosts();
      getTags();
    }
  }, [space]);

  return (
    <SpaceContext.Provider
      value={{
        space,
        setSpace,
        posts,
        setPosts,
        arePostsFetched,
        setArePostsFetched,
        tags,
        setTags,
        areTagsFetched,
        navigation: props.navigation,
        menuBottomSheetRef,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
        {hasSpaceBeenFetched ? (
          space ? (
            <>
              <TagMenus />
              <Gallery />
              <BottomMenu />
              <SpaceMenu />
              <SnackBar />
            </>
          ) : (
            <Text style={{ color: 'white', marginTop: 50, textAlign: 'center' }}>This space was deleted...</Text>
          )
        ) : (
          <ActivityIndicator />
        )}
      </GestureHandlerRootView>
    </SpaceContext.Provider>
  );
};

export default Space;
