import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FastImage from 'react-native-fast-image';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import backendAPI from '../apis/backend';
import LocationsView from '../features/Space/pages/LocationsView';

const Tab = createMaterialTopTabNavigator();

const LocationsViewTopTabNavigator = () => {
  const { spaceAndUserRelationship, navigation, space, hasSpaceBeenFetched, setHasSpaceBeenFetched } =
    useContext(SpaceRootContext);
  const [locationTags, setLocationTags] = useState([]);
  const [haveLocationTagsBeenFetched, setHaveLocationTagsBeenFetched] = useState(false);
  const [selectedLocationTag, setSelectedLocationTag] = useState(null);

  const getLocationTagsBySpaceId = async () => {
    const result = await backendAPI.get(`/spaces/${spaceAndUserRelationship.space._id}/locationtags`);
    const { locationTags } = result.data;
    setLocationTags(locationTags);
    setSelectedLocationTag(locationTags[0]);
    setHaveLocationTagsBeenFetched(true);
  };

  useEffect(() => {
    getLocationTagsBySpaceId();
  }, []);

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        style={{
          backgroundColor: 'transparent',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          height: 80,
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

            setSelectedLocationTag(route.params?.locationTag);

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
                // borderRadius: 20,
                // backgroundColor: isFocused ? 'rgb(150, 150,150)' : 'rgb(60,60,60)',
                width: 70,
                height: 70,
                borderBottomWidth: isFocused && 1,
                borderBottomColor: isFocused && 'white',
              }}
              // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
              onPress={onPress}
            >
              <FastImage
                source={{ uri: route.params?.locationTag.icon }}
                style={{ width: 35, height: 35, borderRadius: 8, marginBottom: 5 }}
                tintColor={'white'}
              />
              <Text numberOfLines={1} style={{ color: 'white', marginBottom: 5 }}>
                {route.params?.locationTag.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  if (haveLocationTagsBeenFetched) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={({ route }) => ({
            lazy: true,
            swipeEnabled: false,
          })}
        >
          {locationTags.map((locationTag, index) => (
            <Tab.Screen
              key={index}
              name={`LocationTag-${locationTag._id}`}
              // options={{ title: tagObject.tag.name }} // Set the tab title to the space name
              initialParams={{ locationTag }}
            >
              {({ navigation, route }) => (
                <LocationsView
                  navigation={navigation}
                  locationTag={locationTag}
                  selectedLocationTag={selectedLocationTag}
                />
              )}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
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

export default LocationsViewTopTabNavigator;
