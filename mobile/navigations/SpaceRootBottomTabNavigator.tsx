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

const Tab = createBottomTabNavigator();

// const Tab = createMaterialTopTabNavigator();

const SpaceRootBottomTabNavigator = (props) => {
  const { spaceAndUserRelationship, navigation } = useContext(SpaceRootContext);
  const { isIpad, spaceMenuBottomSheetRef, currentSpace, setCurrentSpace } = useContext(GlobalContext);
  const [space, setSpace] = useState(null);
  const [hasSpaceBeenFetched, setHasSpaceBeenFetched] = useState(false);
  // const {
  //   isIpad,
  //   spaceAndUserRelationships,
  //   haveSpaceAndUserRelationshipsBeenFetched,
  //   setCurrentSpaceAndUserRelationship,
  //   spaceMenuBottomSheetRef,
  // } = useContext(GlobalContext);

  // const { spaceAndUserRelationship } = useContext(SpaceRootContext);

  // const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  // const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  // // const spaceMenuBottomSheetRef = useRef(null);
  // const iconWidth = oneGridWidth * 0.65;
  // const [focusedTab, setFocusedTab] = useState(null);
  // const [currentSpace, setCurrentSpace] = useState(null);
  // const [posts, setPosts] = useState([]);
  // const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  // const [isRefreshing, setIsRefreshing] = useState(false);

  const getSpaceById = async () => {
    setHasSpaceBeenFetched(false);
    const result = await backendAPI.get(`/spaces/${props.spaceAndUserRelationship.space._id}`);
    const { space } = result.data;
    setSpace(space);
    setCurrentSpace(space);
    setHasSpaceBeenFetched(true);
  };

  useEffect(() => {
    getSpaceById();
  }, []);

  return (
    <SpaceRootContext.Provider
      value={{
        spaceAndUserRelationship: props.spaceAndUserRelationship,
        space,
        hasSpaceBeenFetched,
        setHasSpaceBeenFetched,
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
            marginHorizontal: 100,
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
          name='TagViewTopTabNavigator'
          component={TagViewTopTabNavigator}
          options={({ navigation }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <Octicons name='hash' color={focused ? 'white' : 'rgb(100, 100, 100)'} size={23} />
            ),
          })}
        />
        <Tab.Screen
          name='LocationsViewTopTabNavigator'
          component={LocationsViewTopTabNavigator}
          options={({ navigation }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <Entypo name='globe' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={23} />
            ),
          })}
        />
        <Tab.Screen
          name='PeopleViewTopTabNavigator'
          component={PeopleViewTopTabNavigator}
          options={({ navigation }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <MaterialCommunityIcons name='account-group' color={focused ? 'white' : 'rgb(100, 100, 100)'} size={23} />
            ),
          })}
        />
      </Tab.Navigator>
    </SpaceRootContext.Provider>
  );
};

export default SpaceRootBottomTabNavigator;
