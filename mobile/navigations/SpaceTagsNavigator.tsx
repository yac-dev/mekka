import React, { useState, useEffect, useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import backendAPI from '../apis/backend';
import GalleryNew from '../features/Space/components/GalleryNew';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import TaggedPosts from '../features/Space/components/TaggedPosts';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const SpaceTopTabNavigatorNew = (props) => {
  const { spaceAndUserRelationship, navigation, setCurrentSpace } = useContext(SpaceRootContext);
  const { isIpad, spaceMenuBottomSheetRef } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  const route = useRoute();
  const [space, setSpace] = useState(null);
  const [tags, setTags] = useState({});
  const [hasSpaceBeenFetched, setHasSpaceBeenFetched] = useState(false);
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);

  console.log(props);

  const getSpaceById = async () => {
    const result = await backendAPI.get(`/spaces/${spaceAndUserRelationship.space._id}`);
    const { space } = result.data;
    setSpace(space);
    setHasSpaceBeenFetched(true);
  };

  const getTags = async () => {
    const result = await backendAPI.get(`/spaces/${spaceAndUserRelationship.space._id}/tags`);
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
    setHaveTagsBeenFetched(true);
  };

  useEffect(() => {
    getSpaceById();
  }, []);

  useEffect(() => {
    if (hasSpaceBeenFetched) {
      getTags();
    }
  }, [hasSpaceBeenFetched]);

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          style={{
            backgroundColor: 'black',
            paddingTop: 30,
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
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
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 10,
                  backgroundColor: isFocused ? 'rgb(110,110,110)' : 'rgb(60,60,60)',
                  padding: 10,
                  borderRadius: 5,
                }}
                // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
                onPress={onPress}
              >
                <Text style={{ color: 'white' }}>{route.params?.tagObject.tag.name}</Text>
                <Text style={{ color: 'white' }}>{route.params?.tagObject.tag.count}</Text>
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
            {() => <TaggedPosts tagObject={tagObject} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 20, right: 20 }}
        onPress={() => {
          spaceMenuBottomSheetRef.current.snapToIndex(0);
        }}
      >
        <FastImage
          source={{ uri: spaceAndUserRelationship.space.icon }}
          style={{ width: 50, height: 50, borderRadius: 8 }}
        />
      </TouchableOpacity>
      {/* <ScrollView
        horizontal={true}
        style={{
          backgroundColor: 'rgb(40,40,40)',
          position: 'absolute',
          width: '100%',
          bottom: 0,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <TouchableOpacity
            style={{
              width: oneGridWidth,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}
            onPress={() =>
              navigation?.navigate({ name: 'CreatePost', params: { space, tags: Object.values(tags) }, merge: true })
            }
          >
            <View>
              <Ionicons name='add-circle' size={23} color={'white'} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: oneGridWidth,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}
          >
            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons name='human-greeting-variant' size={23} color='white' />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: oneGridWidth,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity>
              <Foundation name='comments' size={23} color='white' />
            </TouchableOpacity>
          </View>
          {space ? (
            <TouchableOpacity
              style={{
                width: oneGridWidth,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                // paddingTop: 10,
                // paddingBottom: 10,
              }}
              onPress={() => navigation.navigate('AboutSpaceStackNavigator', { spaceAndUserRelationship })}
            >
              <FastImage source={{ uri: space.icon }} style={{ width: 35, height: 35, borderRadius: 8 }} />
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView> */}
    </View>
  );
};

export default SpaceTopTabNavigatorNew;
