import React, { useState, useEffect, useContext, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import backendAPI from '../apis/backend';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import SnackBar from '../components/SnackBar';
import Grid from '../features/Space/pages/Grid';
import Map from '../features/Space/pages/Map';
import Calendar from '../features/Space/pages/Calendar';
import { ViewPostsRootContext } from '../features/SpaceMenuBottomSheet/contexts/ViewPostsRootContext';

const Tab = createMaterialTopTabNavigator();

const ViewPostsTopTabNavigator = (props) => {
  const { isIpad, authData } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const { spaceAndUserRelationship, navigation } = useContext(SpaceRootContext);
  // const { posts, havePostsBeenFetched, setHavePostsBeenFetched, onRefresh, isRefreshing } = useContext(PostsContext);
  const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPostsByTagId = async () => {
    const result = await backendAPI.get(`/posts/tag/${props.tagObject.tag._id}`);
    const { posts } = result.data;
    setPosts(posts);
    console.log(posts);
    setHavePostsBeenFetched(true);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getPostsByTagId();
    setIsRefreshing(false);
  };

  useEffect(() => {
    getPostsByTagId();
  }, []);

  return (
    <ViewPostsRootContext.Provider
      value={{ posts, havePostsBeenFetched, setHavePostsBeenFetched, isRefreshing, setIsRefreshing }}
    >
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            lazy: false,
            swipeEnabled: false,
            tabBarStyle: {
              display: 'none',
            },
            animationEnabled: false,
          })}
        >
          <Tab.Screen
            name={'Grid'}
            options={{ title: 'Grid' }} // Set the tab title to the space name
            component={Grid}
          />
          <Tab.Screen
            name={'Map'}
            options={{ title: 'Map' }} // Set the tab title to the space name
            component={Map}
          />
          <Tab.Screen
            name={'Calendar'}
            options={{ title: 'Calendar' }} // Set the tab title to the space name
            component={Calendar}
          />
        </Tab.Navigator>
      </View>
    </ViewPostsRootContext.Provider>
  );
};

export default ViewPostsTopTabNavigator;
