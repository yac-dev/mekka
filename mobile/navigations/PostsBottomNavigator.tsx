import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import backendAPI from '../apis/backend';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import SpaceTagsTopTabNavigator from './SpaceRootNavigator';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import SpaceMenuBottomSheet from '../features/Space/pages/SpaceMenuBottomSheet';
import CreatePost from '../features/Space/pages/CreatePost';
import TaggedPosts from '../features/Space/components/TaggedPosts';
import Map from '../features/MapView/pages/Map';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PostsContext } from '../contexts/PostsContext';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// const Tab = createMaterialTopTabNavigator();

const ViewMenuMaterialNavigator = (props) => {
  const {
    isIpad,
    spaceAndUserRelationships,
    haveSpaceAndUserRelationshipsBeenFetched,
    setCurrentSpaceAndUserRelationship,
  } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  const spaceMenuBottomSheetRef = useRef(null);
  const iconWidth = oneGridWidth * 0.65;
  const [focusedTab, setFocusedTab] = useState(null);
  const [currentSpace, setCurrentSpace] = useState(null);
  const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPostsByTagId = async () => {
    const result = await backendAPI.get(`/posts/tag/${props.tagObject.tag._id}`);
    const { posts } = result.data;
    setPosts(posts);
    // setSelectedTag(tags[0]);
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

  // const CustomTabBar = ({ state, descriptors, navigation }) => {
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: 'red',
  //         flexDirection: 'row',
  //         // position: 'absolute',
  //         // bottom: 50,
  //         // right: 20,
  //       }}
  //     >
  //       {state.routes.map((route, index) => {
  //         const { options } = descriptors[route.key];
  //         const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

  //         const isFocused = state.index === index;

  //         const onPress = () => {
  //           const event = navigation.emit({
  //             type: 'tabPress',
  //             target: route.key,
  //             canPreventDefault: true,
  //           });

  //           setCurrentSpaceAndUserRelationship(route.params?.spaceAndUserRelationship);

  //           // setCurrentSpace(route.params?.spaceAndUserRelationship);

  //           if (!isFocused && !event.defaultPrevented) {
  //             navigation.navigate(route.name);
  //           }
  //         };

  //         return (
  //           <TouchableOpacity
  //             key={route.key}
  //             style={{
  //               // backgroundColor: 'red',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //               marginRight: 10,
  //               borderBottomColor: isFocused ? 'white' : 'transparent',
  //               borderBottomWidth: 2, // Adjust the thickness of the underline
  //               // paddingHorizontal: 10,
  //             }}
  //             onPress={onPress}
  //           >
  //             <Text numberOfLines={1} style={{ color: 'white' }}>
  //               {route.name}
  //             </Text>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
  // };

  return (
    // <View style={{ flex: 1, backgroundColor: 'black' }}>
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        havePostsBeenFetched,
        setHavePostsBeenFetched,
        getPostsByTagId,
        isRefreshing,
        setIsRefreshing,
        onRefresh,
      }}
    >
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: 'rgb(70,70,70)',
            position: 'absolute',
            bottom: 15,
            marginHorizontal: 130,
            height: 40,
            borderRadius: 30,
            // Shadow...
            // shadowColor: '#000',
            // shadowOpacity: 0.06,
            // shadowOffset: {
            //   width: 10,
            //   height: 10,
            // },
          },
        })}
        // tabBar={(props) => <CustomTabBar {...props} />}
        // screenOptions={({ route }) => ({
        //   tabBarScrollEnabled: false,
        //   lazy: true,
        //   swipeEnabled: false,
        // })}
      >
        <Tab.Screen
          name='Grid'
          component={TaggedPosts}
          options={({ navigation }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <Ionicons name='apps-sharp' color={focused ? 'white' : 'rgb(100, 100, 100)'} size={23} />
            ),
          })}
        />
        <Tab.Screen
          name='Map'
          component={Map}
          options={({ navigation }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <Entypo name='globe' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={23} />
            ),
          })}
        ></Tab.Screen>
      </Tab.Navigator>
      {/* <TouchableOpacity
                 onPress={() => {
                   spaceMenuBottomSheetRef.current.snapToIndex(0);
              }}
           >
             <FastImage
        source={{ uri: spaceAndUserRelationship.space.icon }}
          style={{ width: 30, height: 30, borderRadius: 8, marginRight: 10 }}
       />
       </TouchableOpacity> */}
    </PostsContext.Provider>
  );
};

export default ViewMenuMaterialNavigator;
