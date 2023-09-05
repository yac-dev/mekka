import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, ActivityIndicator, ScrollView, Text, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GlobalContext } from '../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconParameterBackgroundColorTable, iconColorTable } from '../themes/color';
import FastImage from 'react-native-fast-image';
const Drawer = createDrawerNavigator();
import SpaceRootBottomTabNavigator from './SpaceRootBottomTabNavigator';

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
  const iconWidth = oneGridWidth * 0.65;

  function CustomDrawerContent(props) {
    const { state, descriptors, navigation } = props;
    return (
      <DrawerContentScrollView {...props} style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 32, marginLeft: 20 }}>Mekka</Text>
          {/* ここに、profile用の自分のavatarを出しておく。 */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.3,
            borderBottomColor: 'rgb(150,150,150)',
            padding: 10,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              padding: 10,
              justifyContent: 'center',
              marginRight: 10,
            }}
            onPress={() => {
              navigation.navigate('CreateNewSpace');
              navigation.closeDrawer();
            }}
          >
            <View
              style={{
                width: 40,
                aspectRatio: 1,
                borderRadius: 10,
                // marginRight: 15,
                marginBottom: 10,
                backgroundColor: iconParameterBackgroundColorTable['red1'],
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name='plus' color={iconColorTable['red1']} size={25} />
            </View>
            <Text style={{ color: 'white' }}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'column', alignItems: 'center', padding: 10, justifyContent: 'center' }}
            onPress={() => {
              navigation.navigate('Discover');
              // navigation.closeDrawer();
            }}
          >
            <View
              style={{
                width: 40,
                aspectRatio: 1,
                borderRadius: 10,
                // marginRight: 15,
                marginBottom: 10,
                backgroundColor: iconParameterBackgroundColorTable['blue1'],
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons name='compass' color={iconColorTable['blue1']} size={25} />
            </View>
            <Text style={{ color: 'white' }}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'column', alignItems: 'center', padding: 10, justifyContent: 'center' }}
            onPress={() => {
              // navigation.navigate('Discover');
              // navigation.closeDrawer();
              console.log('enter key');
            }}
          >
            <View
              style={{
                width: 40,
                aspectRatio: 1,
                borderRadius: 10,
                // marginRight: 15,
                marginBottom: 10,
                backgroundColor: iconParameterBackgroundColorTable['green1'],
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name='key' color={iconColorTable['green1']} size={25} />
            </View>
            <Text style={{ color: 'white' }}>Enter key</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Text style={{ color: 'white', fontSize: 25, paddingLeft: 10 }}>My Spaces</Text>
        </View> */}
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
                padding: 5,
                // backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
              }}
              onPress={onPress}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
                  borderRadius: 10,
                }}
              >
                <FastImage
                  style={{ width: 40, aspectRatio: 1, borderRadius: 10, marginRight: 15 }}
                  source={{ uri: route.params?.spaceAndUserRelationship.space.icon }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text numberOfLines={1} style={{ color: 'white', fontSize: 17 }}>
                  {route.params?.spaceAndUserRelationship.space.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {/* ↓これあると、screenのtabもrenderするようになる。 */}
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
          backgroundColor: 'rgb(40,40,40)',
          width: 300,
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
          borderBottomColor: 'black',
          height: 80,
        },
        tabBarLabel: 'Home',
      })}
    >
      {spaceAndUserRelationships.map((spaceAndUserRelationship) => (
        <Drawer.Screen
          key={spaceAndUserRelationship._id}
          name={`Space_${spaceAndUserRelationship._id}`}
          initialParams={{ spaceAndUserRelationship }}
          options={({ navigation }) => ({
            headerTitle: spaceAndUserRelationship.space.name,
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },

            headerLeft: () => {
              return (
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    backgroundColor: 'white',
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.toggleDrawer()}
                >
                  <Ionicons name='menu' style={{}} size={20} />
                </TouchableOpacity>
              );
            },
            headerRight: () => {
              return (
                // <TouchableOpacity
                //   style={{
                //     width: 25,
                //     height: 25,
                //     borderRadius: 15,
                //     backgroundColor: 'white',
                //     marginRight: 10,
                //     justifyContent: 'center',
                //     alignItems: 'center',
                //   }}
                //   // onPress={() => navigation.toggleDrawer()}
                // >
                //   {/* <MaterialCommunityIcons name='home-switch' style={{}} size={20} /> */}
                //   <MaterialCommunityIcons name='account' size={20} />
                // </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    spaceMenuBottomSheetRef.current.snapToIndex(0);
                  }}
                >
                  <FastImage
                    source={{ uri: spaceAndUserRelationship.space.icon }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      marginRight: 10,
                      //  position: 'absolute', bottom: 15, right: 20
                    }}
                  />
                </TouchableOpacity>
              );
            },
          })}
        >
          {({ navigation, route }) => (
            <SpaceRootBottomTabNavigator spaceAndUserRelationship={spaceAndUserRelationship} />
          )}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default SpacesDrawerNavigator;
