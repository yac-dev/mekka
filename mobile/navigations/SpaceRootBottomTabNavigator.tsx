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
import TagViewTopTabNavigator from './TagViewTopTabNavigator';
import PeopleViewTopTabNavigator from './PeopleViewTopTabNavigator';
import LocationsViewTopTabNavigator from './LocationsViewTopTabNavigator';
import MomentsView from '../features/Space/pages/MomentsView';
import FastImage from 'react-native-fast-image';
import TagsTopTabNavigator from './TagsTopTabNavigator';
import ChooseViewBottomSheet from '../features/Space/pages/ChooseViewBottomSheet';

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

  const getSpaceById = async () => {
    setHasSpaceBeenFetched(false);
    const result = await backendAPI.get(`/spaces/${props.spaceAndUserRelationship.space._id}`);
    const { space } = result.data;
    setSpace(space);
    setCurrentSpace(space); // globalで持っているspaceだからねこれ。bottom sheetでrenderするためのもの。
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
        space,
        hasSpaceBeenFetched,
        setHasSpaceBeenFetched,
        chooseViewBottomSheetRef,
        navigation: props.navigation,
      }}
    >
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ navigation }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgb(40,40,40)',
              marginHorizontal: 130,
              paddingBottom: 0, // きたー。これよ。これ。
              borderRadius: 30,
              height: 50,
              borderTopWidth: 0,
              position: 'absolute',
              bottom: 30,
              justifyContent: 'center',
              alignItems: 'center',
            },
          })}
        >
          <Tab.Screen
            name='TagsTopTabNavigator'
            component={TagsTopTabNavigator}
            options={({ navigation }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Octicons name='hash' color={focused ? 'white' : 'rgb(100, 100, 100)'} size={23} style={{}} />
              ),
            })}
          />
          <Tab.Screen
            name='MomentsView'
            component={MomentsView}
            options={({ navigation }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <FastImage
                  source={require('../assets/forApp/ghost.png')}
                  style={{ width: 25, height: 25 }}
                  tintColor={focused ? 'white' : 'rgb(100, 100, 100)'}
                />
              ),
            })}
          />
        </Tab.Navigator>
        <TouchableOpacity
          onPress={() => {
            props.navigation?.navigate('CreateNewPostStackNavigator', {
              screen: 'SelectPostType',
              params: {
                space: currentSpace,
                spaceAndUserRelationship: currentSpaceAndUserRelationship,
              }, // なんで、spaceUserRelが必要？？いらなくね。。。
              merge: true,
            });
          }}
          style={{
            backgroundColor: 'white',
            width: 50,
            height: 50,
            borderRadius: 25,
            position: 'absolute',
            bottom: 30,
            right: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <MaterialCommunityIcons name='plus' color='black' size={20} />
        </TouchableOpacity>
        <ChooseViewBottomSheet />
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

{
  /* <Tab.Screen
            name='LocationsViewTopTabNavigator'
            component={LocationsViewTopTabNavigator}
            options={({ navigation }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                // <Entypo name='globe' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={23} />
                <FastImage
                  source={require('../assets/forApp/globe.png')}
                  style={{ width: 25, height: 25 }}
                  tintColor={focused ? 'white' : 'rgb(100, 100, 100)'}
                />
              ),
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
            name='PeopleViewTopTabNavigator'
            component={PeopleViewTopTabNavigator}
            options={({ navigation }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                // <MaterialCommunityIcons
                //   name='account-group'
                //   color={focused ? 'white' : 'rgb(100, 100, 100)'}
                //   size={23}
                // />
                <FastImage
                  source={require('../assets/forApp/cameraman.png')}
                  style={{ width: 25, height: 25 }}
                  tintColor={focused ? 'white' : 'rgb(100, 100, 100)'}
                />
              ),
            })}
          /> */
}
