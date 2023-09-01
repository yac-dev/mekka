import React, { useState, useContext } from 'react';
import { TouchableOpacity, View, ActivityIndicator, ScrollView, Text, Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GlobalContext } from '../contexts/GlobalContext';
import Dummy from '../features/Space/pages/Dummy';
import Dummy2 from '../features/Space/pages/Dummy2';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { iconParameterBackgroundColorTable, iconColorTable } from '../themes/color';
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
        <View style={{ padding: 20 }}>
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
              <Text numberOfLines={1} style={{ color: 'white', fontSize: 17 }}>
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
          <View
            style={{
              width: 40,
              aspectRatio: 1,
              borderRadius: 10,
              marginRight: 15,
              backgroundColor: iconParameterBackgroundColorTable['red1'],
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name='plus' color={iconColorTable['red1']} size={25} />
          </View>
          <Text style={{ color: 'white' }}>Create new Space</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
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
              marginRight: 15,
              backgroundColor: iconParameterBackgroundColorTable['blue1'],
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name='compass' color={iconColorTable['blue1']} size={25} />
          </View>
          <Text style={{ color: 'white' }}>Discover Space</Text>
        </TouchableOpacity>
        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <Text style={{ color: 'red' }}>Hellooooo</Text>
        </View>
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
          backgroundColor: 'rgb(50,50,50)',
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
            headerLeft: () => {
              return (
                <TouchableOpacity style={{}} onPress={() => navigation.toggleDrawer()}>
                  <MaterialCommunityIcons name='home-group' style={{ marginLeft: 10 }} size={25} color={'white'} />
                </TouchableOpacity>
              );
            },
            headerRight: () => {
              return (
                <TouchableOpacity
                // onPress={() => {
                //   spaceMenuBottomSheetRef.current.snapToIndex(0);
                // }}
                >
                  {/* <FastImage
                    source={{ uri: spaceAndUserRelationship.space.icon }}
                    style={{ width: 30, height: 30, borderRadius: 8, marginRight: 10 }}
                  /> */}
                  <MaterialCommunityIcons name='account' size={25} color='white' style={{ marginRight: 10 }} />
                </TouchableOpacity>
              );
            },
          })}
          initialParams={{ spaceAndUserRelationship }}
        >
          {({ navigation, route }) => (
            <SpaceTagsTopTabNavigator
              spaceAndUserRelationship={spaceAndUserRelationship}
              navigation={navigation}
              route={route}
            />
          )}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default SpacesDrawerNavigator;
