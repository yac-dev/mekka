import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, ActivityIndicator, ScrollView, Text, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GlobalContext } from '../contexts/GlobalContext';
import Dummy from '../features/Space/pages/Dummy';
import Dummy2 from '../features/Space/pages/Dummy2';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FastImage from 'react-native-fast-image';
const Drawer = createDrawerNavigator();
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import SpaceTagsTopTabNavigator from './SpaceRootNavigator';

const SpacesDrawerNavigator = (props) => {
  const {
    isIpad,
    spaceAndUserRelationships,
    haveSpaceAndUserRelationshipsBeenFetched,
    setCurrentSpaceAndUserRelationship,
    spaceMenuBottomSheetRef,
  } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  // const spaceMenuBottomSheetRef = useRef(null);
  const iconWidth = oneGridWidth * 0.65;

  function CustomDrawerContent(props) {
    const { state, descriptors, navigation } = props;
    return (
      <DrawerContentScrollView {...props} style={{ paddingTop: 10 }}>
        <View style={{ padding: 10 }}>
          <Text style={{ color: 'white', fontSize: 25 }}>My Spaces</Text>
        </View>
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

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={{
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                // backgroundColor: isFocused ? '#e0e0e0' : 'transparent',
              }}
              onPress={onPress}
            >
              <FastImage
                style={{ width: 40, aspectRatio: 1, borderRadius: 10, marginRight: 15 }}
                source={{ uri: route.params?.spaceAndUserRelationship.space.icon }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(120,120,120)' }}>
                {route.params?.spaceAndUserRelationship.space.name}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
          onPress={() => {
            navigation.navigate('CreateNewSpace');
            navigation.closeDrawer();
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              aspectRatio: 1,
              borderRadius: 10,
              marginRight: 15,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name='plus' color={'white'} size={25} />
          </TouchableOpacity>
          <Text style={{ color: 'white' }}>Create new Space</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
          onPress={() => {
            navigation.navigate('Discover');
            // navigation.closeDrawer();
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              aspectRatio: 1,
              borderRadius: 10,
              marginRight: 15,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name='compass' color={'white'} size={25} />
          </TouchableOpacity>
          <Text style={{ color: 'white' }}>Discover Space</Text>
        </TouchableOpacity>
        {/* Include the rest of the drawer items */}
        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>
    );
  }

  if (!haveSpaceAndUserRelationshipsBeenFetched) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerStyle: {
          backgroundColor: 'rgb(50,50,50)',
          width: 300,
        },
        // drawerContent:{(props) => (<CustomDrawerContent {...props} />)},
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
      })}
    >
      {spaceAndUserRelationships.map((spaceAndUserRelationship) => (
        <Drawer.Screen
          key={spaceAndUserRelationship._id}
          name={`Space_${spaceAndUserRelationship._id}`}
          options={({ navigation }) => ({
            headerTitle: spaceAndUserRelationship.space.name,
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerRight: () => {
              return (
                <TouchableOpacity
                  // style={{ position: 'absolute', bottom: 20, right: 20 }}
                  onPress={() => {
                    spaceMenuBottomSheetRef.current.snapToIndex(0);
                  }}
                >
                  <FastImage
                    source={{ uri: spaceAndUserRelationship.space.icon }}
                    style={{ width: 30, height: 30, borderRadius: 8, marginRight: 10 }}
                  />
                </TouchableOpacity>
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
          initialParams={{ spaceAndUserRelationship }}
        >
          {({ navigation }) => (
            <SpaceTagsTopTabNavigator spaceAndUserRelationship={spaceAndUserRelationship} navigation={navigation} />
          )}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default SpacesDrawerNavigator;
