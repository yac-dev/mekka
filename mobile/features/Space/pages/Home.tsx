import React, { useState, useEffect, useContext, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity } from 'react-native';
import { SpaceContext } from '../contexts/SpaceContext';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import SpaceIconMenuButton from '../components/SpaceIconMenuButton';
import Posts from '../components/Posts';
import SpaceMenu from './SpaceMenu';

type HomeProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any> | undefined;
};

type LocationType = {
  type: string;
  coordinates: number[];
};

type ContentType = {
  _id: string;
  data: string;
  type: string;
  createdBy: string;
  createdAt: string;
};

type PostType = {
  _id: string;
  location: LocationType;
  contents: ContentType[];
  caption: string;
  spaceId: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
};

const Home: React.FC<HomeProps> = (props) => {
  const [space, setSpace] = useState({ name: '' });
  const [posts, setPosts] = useState<PostType[]>([]);
  const [arePostsFetched, setArePostsFetched] = useState<boolean>(false);
  const menuBottomSheetRef = useRef(null);

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
  // console.log(JSON.stringify(posts, null, 4));

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
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
        <Posts />
        <SpaceIconMenuButton />
        <SpaceMenu />
      </GestureHandlerRootView>
    </SpaceContext.Provider>
  );
};

export default Home;
