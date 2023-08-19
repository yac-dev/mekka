import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import backendAPI from '../apis/backend';
// import Space from '../features/Space/pages/Space';
// import ViewMap from '../features/Space/pages/ViewMap';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import Grid from '../features/Space/pages/Grid';
import Map from '../features/Space/pages/Map';
import FastImage from 'react-native-fast-image';
import { SpaceContext } from '../features/Space/contexts/SpaceContext';

const Tab = createMaterialTopTabNavigator();

const SpaceTopTabNavigator = (props) => {
  const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [space, setSpace] = useState(null);
  const [hasSpaceBeenFetched, setHasSpaceBeenFetched] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);
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

  useEffect(() => {
    if (space) {
      props.navigation.setOptions({
        headerTitle: () => (
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              // paddingTop: 10,
              // paddingBottom: 10,
            }}
            onPress={() => menuBottomSheetRef.current.snapToIndex(0)}
          >
            <FastImage source={{ uri: space.icon }} style={{ width: 40, height: 40, borderRadius: 8 }} />
          </TouchableOpacity>
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

  const getPostsBySpaceId = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}/posts`);
    const { posts } = result.data;
    setPosts(posts);
    setHavePostsBeenFetched(true);
  };

  // これも、spaceの方のapiに含めた方がいいな。principle的にね。
  const getTags = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}/tags`);
    const { tags } = result.data;
    setTags(tags);
    setHaveTagsBeenFetched(true);
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
      getPostsBySpaceId();
      getTags();
    }
  }, [space]);

  return (
    <SpaceRootContext.Provider
      value={{
        space,
        setSpace,
        posts,
        setPosts,
        havePostsBeenFetched,
        setHavePostsBeenFetched,
        tags,
        setTags,
        haveTagsBeenFetched,
        navigation: props.navigation,
        menuBottomSheetRef,
      }}
    >
      <Tab.Navigator
        // ここはtop tabそれ自体のstyling。
        screenOptions={({ navigation }) => ({
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            color: 'white',
          },
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'black',
            borderBottomWidth: 0,
          },
        })}
      >
        <Tab.Screen name='Grid' component={Grid} />
        <Tab.Screen name='Map' component={Map} />
      </Tab.Navigator>
    </SpaceRootContext.Provider>
  );
};

export default SpaceTopTabNavigator;
