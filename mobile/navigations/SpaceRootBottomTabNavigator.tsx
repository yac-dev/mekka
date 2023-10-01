import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import backendAPI from '../apis/backend';
import { PostsContext } from '../contexts/PostsContext';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import TagViewTopTabNavigator from './TagViewTopTabNavigator';
import PeopleViewTopTabNavigator from './PeopleViewTopTabNavigator';
import LocationsViewTopTabNavigator from './LocationsViewTopTabNavigator';
import MomentsView from '../features/Space/pages/MomentsView';
import FastImage from 'react-native-fast-image';
import TagsTopTabNavigator from './TagsTopTabNavigator';
import Projects from '../features/Space/pages/Projects';
import ChooseViewBottomSheet from '../features/Space/pages/ChooseViewBottomSheet';
import LocationsViewPostsBottomSheet from '../features/Space/components/LocationsViewPostsBottomSheet';

const Tab = createBottomTabNavigator();

const SpaceRootBottomTabNavigator = (props) => {
  const { spaceAndUserRelationship } = useContext(SpaceRootContext);
  const { isIpad, spaceMenuBottomSheetRef, currentSpace, setCurrentSpace, currentSpaceAndUserRelationship } =
    useContext(GlobalContext);
  const [space, setSpace] = useState(null);
  const [hasSpaceBeenFetched, setHasSpaceBeenFetched] = useState(false);
  const [tags, setTags] = useState({});
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);
  const chooseViewBottomSheetRef = useRef(null);
  const locationsViewPostsBottomSheetRef = useRef(null);
  const [locationsViewPosts, setLocationsViewPosts] = useState([]);
  const [haveLocationsViewPostsBeenFetched, setHaveLocationsViewPostsBeenFetched] = useState(false);
  const [isFetchingLocationsViewPosts, setIsFetchingLocationsViewPosts] = useState(false);
  const [selectedLocationTag, setSelectedLocationTag] = useState(null);

  // const getSpaceById = async () => {
  //   setHasSpaceBeenFetched(false);
  //   const result = await backendAPI.get(`/spaces/${props.spaceAndUserRelationship.space._id}`);
  //   const { space } = result.data;
  //   setSpace(space);
  //   setCurrentSpace(space); // globalで持っているspaceだからねこれ。bottom sheetでrenderするためのもの。
  //   setHasSpaceBeenFetched(true);
  // };

  // const getTags = async () => {
  //   const result = await backendAPI.get(`/spaces/${props.spaceAndUserRelationship.space._id}/tags`);
  //   const { tags } = result.data;
  //   setTags(() => {
  //     const table = {};
  //     tags.forEach((tag, index) => {
  //       table[tag._id] = {
  //         tag,
  //         hasUnreadPosts: tag.updatedAt > props.route?.params?.lastCheckedIn ? true : false,
  //         createdPosts: false,
  //       };
  //     });

  //     return table;
  //   });
  //   setHaveTagsBeenFetched(true);
  // };

  // useEffect(() => {
  //   getSpaceById();
  // }, []);

  // useEffect(() => {
  //   if(space){
  //     getTags();
  //   }
  // },[hasSpaceBeenFetched, space])

  // useEffect(() => {
  //   getTags();
  // }, []);

  // useNavigationでも使ってみようかね。
  // うん。とりあえず、ここでまんまnavigationをすることは難しそう。。。
  return (
    <SpaceRootContext.Provider
      value={{
        spaceAndUserRelationship: props.spaceAndUserRelationship,
        // space,
        hasSpaceBeenFetched,
        setHasSpaceBeenFetched,
        chooseViewBottomSheetRef,
        navigation: props.navigation,
        locationsViewPosts,
        setLocationsViewPosts,
        haveLocationsViewPostsBeenFetched,
        setHaveLocationsViewPostsBeenFetched,
        locationsViewPostsBottomSheetRef,
        selectedLocationTag,
        setSelectedLocationTag,
        isFetchingLocationsViewPosts,
        setIsFetchingLocationsViewPosts,
      }}
    >
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ navigation, route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'black',
              // marginHorizontal: 90,
              // paddingBottom: 0, // きたー。これよ。これ。
              // borderRadius: 30,
              // height: 50,
              borderTopWidth: 0,
              // position: 'absolute',
              // bottom: 30,
              // justifyContent: 'center',
              // alignItems: 'center',
            },
            // tabBarLabel: navigation.isFocused() ? route.name : '',
          })}
        >
          <Tab.Screen
            name='TagsTopTabNavigator'
            component={TagsTopTabNavigator}
            options={({ navigation, route }) => ({
              // tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Octicons name='hash' color={focused ? 'white' : 'rgb(100, 100, 100)'} size={23} />
              ),
              tabBarLabel: ({ focused }) => {
                return <Text style={{ color: 'white' }}>{focused ? 'Home' : null}</Text>;
              },
            })}
          />
          <Tab.Screen
            name='LocationsViewTopTabNavigator'
            component={LocationsViewTopTabNavigator}
            options={({ navigation }) => ({
              // tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                // <Entypo name='globe' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={23} />
                <FastImage
                  source={require('../assets/forApp/globe.png')}
                  style={{ width: 25, height: 25 }}
                  tintColor={focused ? 'white' : 'rgb(100, 100, 100)'}
                />
              ),
              tabBarLabel: ({ focused }) => {
                return <Text style={{ color: 'white' }}>{focused ? 'Map' : null}</Text>;
              },
              // tabBarLabel: 'Map',
              // tabBarLabel: ({ focused }) => {
              //   // Only show the label when the tab is focused
              //   if (focused) {
              //     return <Text style={{ color: 'white' }}>Locations</Text>;
              //   }
              //   return null;
              // },
            })}
          />
          <Tab.Screen
            name='MomentsView'
            component={MomentsView}
            options={({ navigation }) => ({
              // tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <FastImage
                  source={require('../assets/forApp/ghost.png')}
                  style={{ width: 25, height: 25 }}
                  tintColor={focused ? 'white' : 'rgb(100, 100, 100)'}
                />
              ),
              tabBarLabel: ({ focused }) => {
                return <Text style={{ color: 'white' }}>{focused ? 'Moments' : null}</Text>;
              },
            })}
          />
          <Tab.Screen
            name='Projects'
            component={Projects}
            options={({ navigation }) => ({
              // tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Ionicons name='musical-notes' color={focused ? 'white' : 'rgb(100, 100, 100)'} size={30} />
                // <FastImage
                //   source={require('../assets/forApp/cameraman.png')}
                //   style={{ width: 25, height: 25 }}
                //   tintColor={focused ? 'white' : 'rgb(100, 100, 100)'}
                // />
              ),
              tabBarLabel: ({ focused }) => {
                return <Text style={{ color: 'white' }}>{focused ? 'Projects' : null}</Text>;
              },
            })}
          />
        </Tab.Navigator>
        <TouchableOpacity
          onPress={() => {
            props.navigation?.navigate(
              'CreateNewPostStackNavigator',
              { spaceAndUserRelationship: props.spaceAndUserRelationship }
              // {
              //   screen: 'SelectPostType',
              //   params: {
              //     // space: currentSpace,
              //     // spaceAndUserRelationship: currentSpaceAndUserRelationship,
              //     spaceAndUserRelationship: props.spaceAndUserRelationship,
              //   }, // なんで、spaceUserRelが必要？？いらなくね。。。
              //   merge: true,
              // }
            );
          }}
          style={{
            backgroundColor: 'white',
            width: 50,
            height: 50,
            borderRadius: 25,
            position: 'absolute',
            bottom: 80,
            right: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <MaterialCommunityIcons name='plus' color='black' size={30} />
        </TouchableOpacity>
        {/* <ChooseViewBottomSheet /> */}
        <LocationsViewPostsBottomSheet />
      </View>
    </SpaceRootContext.Provider>
  );
};

export default SpaceRootBottomTabNavigator;

// tabBar={(props) => <CustomTabBar {...props} />}
// screenOptions={({ route }) => ({
//   tabBarScrollEnabled: false,
//   lazy: true,
//   swipeEnabled: false,
// })}
