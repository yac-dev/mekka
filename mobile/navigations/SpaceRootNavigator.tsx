import React, { useState, useEffect, useContext, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import backendAPI from '../apis/backend';
import GalleryNew from '../features/Space/components/GalleryNew';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import TaggedPosts from '../features/Space/components/TaggedPosts';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CreatePost from '../features/Space/pages/CreatePost';
import SpaceMenuBottomSheet from '../features/Space/pages/SpaceMenuBottomSheet';
import PostsBottomNavigator from './PostsBottomNavigator';
import SnackBar from '../components/SnackBar';
import Grid from '../features/Space/components/Grid';

const Tab = createMaterialTopTabNavigator();

const SpaceTopTabNavigatorNew = (props) => {
  // const { spaceAndUserRelationship, navigation, setCurrentSpace } = useContext(SpaceRootContext);
  const { isIpad, spaceMenuBottomSheetRef, currentSpace, setCurrentSpace } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  const route = useRoute();
  const [space, setSpace] = useState(null);
  const [tags, setTags] = useState({});
  const [hasSpaceBeenFetched, setHasSpaceBeenFetched] = useState(false);
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);
  const [selectedView, setSelectedView] = useState('Grid'); // Map, Calendar
  // const spaceMenuBottomSheetRef = useRef(null);

  // useEffect(() => {
  //   if (props.route.params.addedTags) {
  //     // これ、for in の方か？？
  //     props.route.params.addedTags.forEach((element) => {
  //       if (!(element in tags)) {
  //         setTags((previous) => {
  //           return {
  //             ...previous,
  //             [element._id]: element,
  //           };
  //         });
  //       }
  //     });
  //   }
  // }, [props.route.params.addedTags]);

  const getSpaceById = async () => {
    setHasSpaceBeenFetched(false);
    const result = await backendAPI.get(`/spaces/${props.spaceAndUserRelationship.space._id}`);
    const { space } = result.data;
    setSpace(space);
    setCurrentSpace(space);
    setHasSpaceBeenFetched(true);
  };

  const getTags = async () => {
    const result = await backendAPI.get(`/spaces/${props.spaceAndUserRelationship.space._id}/tags`);
    const { tags } = result.data;
    setTags(() => {
      const table = {};
      tags.forEach((tag, index) => {
        table[tag._id] = {
          tag,
          hasUnreadPosts: tag.updatedAt > props.route?.params?.lastCheckedIn ? true : false,
          createdPosts: false,
        };
      });

      return table;
    });
    setHaveTagsBeenFetched(true);
  };

  useEffect(() => {
    getSpaceById();
  }, []);

  // console.log(props.route);

  useEffect(() => {
    if (hasSpaceBeenFetched || props.route?.params?.afterPosted) {
      getTags();
      // setHasSpaceBeenFetched(false);
    }
  }, [hasSpaceBeenFetched, props.route?.params?.afterPosted]);

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          style={{
            backgroundColor: 'black',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            // padding: 5,
          }}
        >
          <TouchableOpacity
            // key={route.key}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              // backgroundColor: isFocused ? 'rgb(110,110,110)' : null,
              padding: 10,
              borderRadius: 5,
              width: 70,
              height: 70,
            }}
            // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
            // onPress={onPress}
          >
            {/* <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(120, 120, 120)' }}>
                  {route.params?.tagObject.tag.name}
                </Text> */}
            <Entypo name='globe' color={'white'} size={25} style={{ marginBottom: 5 }} />
            <Text style={{ color: 'white' }}>Places</Text>
          </TouchableOpacity>

          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            return (
              <TouchableOpacity
                key={route.key}
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                  // backgroundColor: isFocused ? 'rgb(110,110,110)' : null,
                  padding: 10,
                  borderRadius: 5,
                  width: 70,
                  height: 70,
                }}
                // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
                onPress={onPress}
              >
                <FastImage
                  source={{ uri: route.params?.tagObject.tag.icon }}
                  style={{ width: 25, height: 25, marginBottom: 5 }}
                  tintColor={isFocused ? 'white' : 'rgb(100, 100, 100)'}
                />
                <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(120, 120, 120)' }}>
                  {route.params?.tagObject.tag.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  if (!hasSpaceBeenFetched || !haveTagsBeenFetched) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // ここでspace objectをcontextに入れて流す感じかな。
  return (
    <SpaceRootContext.Provider
      value={{
        space,
        spaceMenuBottomSheetRef,
        navigation: props.navigation,
        spaceAndUserRelationship: props.spaceAndUserRelationship,
      }}
    >
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={({ route }) => ({
            lazy: true,
            swipeEnabled: false,
          })}
        >
          {Object.values(tags).map((tagObject, index) => (
            <Tab.Screen
              key={index}
              name={`SpaceTab_${tagObject._id}-${index}`}
              options={{ title: tagObject.tag.name }} // Set the tab title to the space name
              initialParams={{ tagObject }}
            >
              {({ navigation }) => <Grid navigation={navigation} tagObject={tagObject} />}
              {/* {({ navigation }) => <PostsBottomNavigator navigation={navigation} tagObject={tagObject} />} */}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
        <SnackBar />
        <TouchableOpacity
          onPress={() => {
            spaceMenuBottomSheetRef.current.snapToIndex(0);
          }}
        >
          <FastImage
            source={{ uri: props.spaceAndUserRelationship.space.icon }}
            style={{ width: 45, height: 45, borderRadius: 8, position: 'absolute', bottom: 15, right: 20 }}
          />
        </TouchableOpacity>
      </View>
    </SpaceRootContext.Provider>
  );
};

export default SpaceTopTabNavigatorNew;
