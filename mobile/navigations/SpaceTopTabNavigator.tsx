import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import backendAPI from '../apis/backend';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import Space from '../features/Space/pages/Space';
// import ViewMap from '../features/Space/pages/ViewMap';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import Grid from '../features/Space/pages/Grid';
import Map from '../features/Space/pages/Map';
import SpaceMenu from '../features/Space/pages/SpaceMenu';
import FastImage from 'react-native-fast-image';
import TagMenus from '../features/Space/components/TagMenus';
import BottomMenu from '../features/Space/components/BottomMenu';
import { SpaceContext } from '../features/Space/contexts/SpaceContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Dummy from '../features/Space/pages/Dummy';
import Dummy2 from '../features/Space/pages/Dummy2';

const Tab = createMaterialTopTabNavigator();

// tags {tagId1: {tag: {_id: 1, name: 'Test1'}, hasNewPosts: true}, tagId2: {tag: {_id: 2, name: "tsest2"}, hasNewPosts: false}　的な感じかな。これのtypeづけをしよう。

const SpaceTopTabNavigator = (props) => {
  const [posts, setPosts] = useState({}); // ここ、{tagId1: [], tagId2:[], tagId3: []}みたいにcacheした方がいいな。わざわざloadの必要がなくなる。
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [space, setSpace] = useState(null);
  const [hasSpaceBeenFetched, setHasSpaceBeenFetched] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState({});
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);
  const topTabHeight = 50;
  const menuBottomSheetRef = useRef(null);
  console.log(JSON.stringify(posts, null, 4));
  // useEffect(() => {
  //   if (props.route?.params?.createdPost) {
  //     setPosts((previous) => {
  //       const updating = [...previous];
  //       updating.unshift(props.route?.params?.createdPost);
  //       return updating;
  //     });
  //   }
  // }, [props.route?.params?.createdPost]);

  // useEffect(() => {
  //   if (space) {
  //     props.navigation.setOptions({
  //       headerTitle: () => (
  //         <TouchableOpacity
  //           style={{
  //             width: 50,
  //             height: 50,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             // paddingTop: 10,
  //             // paddingBottom: 10,
  //           }}
  //           onPress={() => menuBottomSheetRef.current.snapToIndex(0)}
  //         >
  //           <FastImage source={{ uri: space.icon }} style={{ width: 40, height: 40, borderRadius: 8 }} />
  //         </TouchableOpacity>
  //       ),
  //     });
  //   }
  // }, [space]);

  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}`);
    const { space } = result.data;
    setSpace(space);
    setHasSpaceBeenFetched(true);
  };

  const getPostsBySpaceIdAndTag = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}/posts`);
    const { posts } = result.data;
    setPosts(posts);
    setHavePostsBeenFetched(true);
  };

  // props.route?.params?.lastCheckedIn
  // これも、spaceの方のapiに含めた方がいいな。principle的にね。
  const getTags = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}/tags`);
    const { tags } = result.data;
    setTags(() => {
      const table = {};
      tags.forEach((tag, index) => {
        table[tag._id] = {
          tag,
          hasUnreadPosts: tag.updatedAt > props.route?.params?.lastCheckedIn ? true : false,
        };
      });

      return table;
    });
    // setSelectedTag(tags[0]);
    setHaveTagsBeenFetched(true);
  };

  // const getPostsByTagId = async () => {
  //   if (!posts[selectedTag._id]) {
  //     setHavePostsBeenFetched(false);
  //     const result = await backendAPI.get(`/posts/tag/${selectedTag._id}`);
  //     const { posts } = result.data;
  //     setPosts((previous) => {
  //       return {
  //         ...previous,
  //         [selectedTag._id]: posts,
  //       };
  //     });
  //     setHavePostsBeenFetched(true);
  //   }
  // };

  useEffect(() => {
    getSpace();

    // return () => {
    //   getSpace();
    // };
    // unmountはまた後でいいや。
  }, []);

  // spaceが消されたていたらここは動かさん。
  useEffect(() => {
    if (hasSpaceBeenFetched) {
      getTags();
    }
  }, [hasSpaceBeenFetched]);

  console.log(tags);
  const renderTabScreen = () => {
    if (haveTagsBeenFetched) {
      if (Object.keys(tags).length) {
        const list = Object.values(tags).map((tagObject, index) => {
          return (
            <Tab.Screen
              key={index}
              name={tagObject.tag.name}
              component={Dummy}
              initialParams={{ tagId: tagObject.tag._id, hasUnreadPosts: tagObject.hasUnreadPosts }}
              options={({ navigation }) => ({
                // tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <MaterialIcons name='apps' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={25} />
                ),
              })}
            />
          );
        });

        return (
          <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            initialRouteName={Object.values(tags)[0].tag.name}
          >
            <Tab.Screen
              name={'example'}
              component={Dummy2}
              // initialParams={{ tagId: tagObject.tag._id, hasUnreadPosts: tagObject.hasUnreadPosts }}
              options={({ navigation }) => ({
                // tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <MaterialIcons name='apps' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={25} />
                ),
              })}
            />
            {/* <Dummy2 /> */}
            {list}
          </Tab.Navigator>
        );
      } else {
        return null;
      }
    } else {
      return <ActivityIndicator />;
    }
  };

  // <Tab.Navigator
  //           screenOptions={({ navigation }) => ({
  //             tabBarStyle: {
  //               backgroundColor: 'black',
  //               borderTopWidth: 0,
  //               height: topTabHeight,
  //             },
  //             tabBarLabelStyle: {
  //               fontSize: 12,
  //               color: 'white',
  //             },
  //             headerTintColor: 'white',
  //             headerStyle: {
  //               backgroundColor: 'black',
  //               borderBottomWidth: 0,
  //             },
  //           })}
  //         ></Tab.Navigator>

  {
    /* <Tab.Screen
            name={'dummy'}
            component={Dummy}
            options={({ navigation }) => ({
              // tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <MaterialIcons name='apps' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={25} />
              ),
            })}
          /> */
  }

  return (
    <SpaceRootContext.Provider
      value={{
        space,
        setSpace,
        posts,
        setPosts,
        havePostsBeenFetched,
        setHavePostsBeenFetched,
        // tags,
        // setTags,
        haveTagsBeenFetched,
        selectedTag,
        setSelectedTag,
        navigation: props.navigation,
        menuBottomSheetRef,
        topTabHeight,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        {renderTabScreen()}

        {/* <Tab.Navigator
          // っていうか、viewの中にnavigatorって、できるのかよ。。。
          screenOptions={({ navigation }) => ({
            tabBarStyle: {
              backgroundColor: 'black',
              borderTopWidth: 0,
              height: topTabHeight,
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
          <Tab.Screen
            name='Grid'
            component={Grid}
            options={({ navigation }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <MaterialIcons name='apps' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={25} />
              ),
            })}
          />
          <Tab.Screen
            name='Map'
            component={Map}
            options={({ navigation }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Entypo name='globe' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={25} />
              ),
            })}
          />
        </Tab.Navigator> */}
        {/* <TagMenus />
        <BottomMenu />
        <SpaceMenu /> */}
      </GestureHandlerRootView>
    </SpaceRootContext.Provider>
  );
};

export default SpaceTopTabNavigator;

// const CustomTabBar = ({ state, descriptors, navigation }) => {
//   return (
//     <View>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         // contentContainerStyle={{ paddingHorizontal: 10 }}
//         // style={{ backgroundColor: 'black' }}
//       >
//         {state.routes.map((route, index) => {
//           const { options } = descriptors[route.key];
//           const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

//           const isFocused = state.index === index;

//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name);
//             }
//           };

//           console.log(route);
//           return (
//             <TouchableOpacity
//               onPress={onPress}
//               key={route.key}
//               style={{ width: 150, padding: 10, flexDirection: 'row', alignItems: 'center' }}
//             >
//               <Text style={{ color: isFocused ? 'black' : 'rgb(170,170,170)' }}>{label}</Text>
//               <Text>{route.params?.hasUnreadPosts ? 'has' : null}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const DummyWithTagId = ({ tagId }) => {
//   return <Dummy tagId={tagId} />;
// };
