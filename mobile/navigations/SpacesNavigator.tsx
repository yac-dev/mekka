import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import backendAPI from '../apis/backend';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import SpaceTagsNavigator from './SpaceTagsNavigator';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import SpaceMenuBottomSheet from '../features/Space/pages/SpaceMenuBottomSheet';

const Tab = createMaterialTopTabNavigator();

const SpacesMaterialTopNavigator = (props) => {
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

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          style={{
            backgroundColor: 'black',
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

              setCurrentSpaceAndUserRelationship(route.params?.spaceAndUserRelationship);

              // setCurrentSpace(route.params?.spaceAndUserRelationship);

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                style={{
                  // backgroundColor: 'red',
                  width: 90,
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                  borderBottomColor: isFocused ? 'white' : 'transparent',
                  borderBottomWidth: 2, // Adjust the thickness of the underline
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={onPress}
              >
                <FastImage
                  style={{ width: iconWidth, aspectRatio: 1, borderRadius: 10, marginBottom: 5 }}
                  source={{ uri: route.params?.spaceAndUserRelationship.space.icon }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text numberOfLines={1} style={{ color: 'white' }}>
                  {route.params?.spaceAndUserRelationship.space.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  if (!haveSpaceAndUserRelationshipsBeenFetched) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          tabBarScrollEnabled: false,
          lazy: true,
          swipeEnabled: false,
        })}
      >
        {spaceAndUserRelationships.map((spaceAndUserRelationship) => (
          <Tab.Screen
            key={spaceAndUserRelationship._id}
            name={`SpaceTab_${spaceAndUserRelationship._id}`}
            options={{ title: spaceAndUserRelationship.space.name }}
            initialParams={{ spaceAndUserRelationship }}
          >
            {() => (
              <SpaceRootContext.Provider
                value={{
                  spaceAndUserRelationship,
                  navigation: props.navigation,
                  spaceMenuBottomSheetRef,
                  setCurrentSpace,
                }}
              >
                <SpaceTagsNavigator />
              </SpaceRootContext.Provider>
            )}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
      {/* <SpaceMenuBottomSheet currentSpace={currentSpace} spaceMenuBottomSheetRef={spaceMenuBottomSheetRef} /> */}
    </GestureHandlerRootView>
  );
};

export default SpacesMaterialTopNavigator;
