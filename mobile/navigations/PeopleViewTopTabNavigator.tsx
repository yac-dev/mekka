import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PeopleView from '../features/Space/pages/PeopleView';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import FastImage from 'react-native-fast-image';
import backendAPI from '../apis/backend';

const Tab = createMaterialTopTabNavigator();

const PeopleViewTopTabNavigator = () => {
  const { spaceAndUserRelationship, navigation, space, hasSpaceBeenFetched, setHasSpaceBeenFetched } =
    useContext(SpaceRootContext);
  const [people, setPeople] = useState([]);
  const [havePeopleBeenFetched, setHavePeopleBeenFetched] = useState(false);

  const getPeopleBySpaceId = async () => {
    const result = await backendAPI.get(`/spaces/${spaceAndUserRelationship.space._id}/people`);
    const { people } = result.data;
    setPeople(people);
    setHavePeopleBeenFetched(true);
  };

  console.log(people);

  useEffect(() => {
    getPeopleBySpaceId();
  }, []);

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
                  source={{ uri: route.params?.user.avatar }}
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 5,
                    backgroundColor: 'blue',
                    borderRadius: 8,
                  }}
                  tintColor={'white'}
                />
                <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(120, 120, 120)' }}>
                  {route.params?.user.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  if (havePeopleBeenFetched) {
    return (
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={({ route }) => ({
            lazy: true,
            swipeEnabled: false,
          })}
        >
          {people.map((user, index) => (
            <Tab.Screen
              key={index}
              name={`User-${user._id}`}
              // options={{ title: tagObject.tag.name }} // Set the tab title to the space name
              initialParams={{ user }}
            >
              {({ navigation }) => <PeopleView navigation={navigation} user={user} />}
              {/* {({ navigation }) => <PostsBottomNavigator navigation={navigation} tagObject={tagObject} />} */}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
        <TouchableOpacity
          onPress={() => {
            spaceMenuBottomSheetRef.current.snapToIndex(0);
          }}
        >
          <FastImage
            source={{ uri: spaceAndUserRelationship.space.icon }}
            style={{ width: 45, height: 45, borderRadius: 8, position: 'absolute', bottom: 15, right: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }
};

export default PeopleViewTopTabNavigator;
