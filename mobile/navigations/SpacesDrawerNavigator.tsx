import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, ActivityIndicator, ScrollView, Text, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GlobalContext } from '../contexts/GlobalContext';
import Dummy from '../features/Space/pages/Dummy';
import Dummy2 from '../features/Space/pages/Dummy2';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
const Drawer = createDrawerNavigator();
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import SpaceTagsTopTabNavigator from './SpaceTagsTopTabNavigator';

const SpacesDrawerNavigator = (props) => {
  const {
    isIpad,
    spaceAndUserRelationships,
    haveSpaceAndUserRelationshipsBeenFetched,
    setCurrentSpaceAndUserRelationship,
  } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  // const spaceMenuBottomSheetRef = useRef(null);
  const iconWidth = oneGridWidth * 0.65;

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View
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
                width: 80,
                height: 90,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                borderBottomColor: isFocused ? 'white' : 'transparent',
                borderBottomWidth: 2, // Adjust the thickness of the underline
                // paddingHorizontal: 10,
              }}
              onPress={onPress}
            >
              <FastImage
                style={{ width: 90, aspectRatio: 1, borderRadius: 10, marginBottom: 5 }}
                source={{ uri: route.params?.spaceAndUserRelationship.space.icon }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text numberOfLines={1} style={{ color: 'white' }}>
                {route.params?.spaceAndUserRelationship.space.name}
              </Text>
            </TouchableOpacity>
          );
        })}
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

  // return (
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     <Tab.Navigator
  //       tabBar={(props) => <CustomTabBar {...props} />}
  //       screenOptions={({ route }) => ({
  //         tabBarScrollEnabled: false,
  //         lazy: true,
  //         swipeEnabled: false,
  //       })}
  //     >
  //       {spaceAndUserRelationships.map((spaceAndUserRelationship) => (
  //         <Tab.Screen
  //           key={spaceAndUserRelationship._id}
  //           name={`SpaceTab_${spaceAndUserRelationship._id}`}
  //           options={{ title: spaceAndUserRelationship.space.name }}
  //           initialParams={{ spaceAndUserRelationship }}
  //         >
  //           {() => (
  //             <SpaceRootContext.Provider
  //               value={{
  //                 spaceAndUserRelationship,
  //                 navigation: props.navigation,
  //                 spaceMenuBottomSheetRef,
  //                 setCurrentSpace,
  //               }}
  //             >
  //               <SpaceTagsTopTabNavigator />
  //             </SpaceRootContext.Provider>
  //           )}
  //         </Tab.Screen>
  //       ))}
  //     </Tab.Navigator>
  //     {/* <SpaceMenuBottomSheet currentSpace={currentSpace} spaceMenuBottomSheetRef={spaceMenuBottomSheetRef} /> */}
  //   </GestureHandlerRootView>
  // );

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: 'rgb(50,50,50)',
          width: 240,
        },
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 0,
        },
        tabBarLabel: 'Home',
        headerRight: () => {
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile Top')}>
                <MaterialCommunityIcons name='account-circle' size={25} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 0 }} onPress={() => navigation.navigate('About Lampost')}>
                <MaterialCommunityIcons name='information' size={25} color={'white'} />
              </TouchableOpacity>
            </View>
          );
        },
        headerLeft: () => {
          return (
            <TouchableOpacity style={{}} onPress={() => navigation.toggleDrawer()}>
              <MaterialCommunityIcons name='home-group' style={{ marginLeft: 10 }} size={25} color={'white'} />
            </TouchableOpacity>
          );
        },
      })}
    >
      {spaceAndUserRelationships.map((spaceAndUserRelationship) => (
        <Drawer.Screen
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
                // spaceMenuBottomSheetRef,
                // setCurrentSpace,
              }}
            >
              <SpaceTagsTopTabNavigator />
            </SpaceRootContext.Provider>
          )}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default SpacesDrawerNavigator;
