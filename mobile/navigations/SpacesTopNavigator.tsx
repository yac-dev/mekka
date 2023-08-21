import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import backendAPI from '../apis/backend';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Dummy2 from '../features/Space/pages/Dummy2';
import Dummy from '../features/Space/pages/Dummy';
import FastImage from 'react-native-fast-image';
import SpaceTopTabNavigatorNew from './SpaceTopTabNavigatorNew';

const Tab = createMaterialTopTabNavigator();

const SpacesMaterialTopNavigator = () => {
  const { isIpad, spaceAndUserRelationships, haveSpaceAndUserRelationshipsBeenFetched } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  const iconWidth = oneGridWidth * 0.65;
  const [focusedTab, setFocusedTab] = useState(null);

  useEffect(() => {
    // Fetch initial data or perform any necessary actions
    if (spaceAndUserRelationships.length > 0) {
      setFocusedTab(spaceAndUserRelationships[0]._id); // Initialize with the first tab's id
    }
  }, [spaceAndUserRelationships]);

  const handleTabPress = (tabId) => {
    setFocusedTab(tabId);
  };

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={{ paddingHorizontal: 10 }}
          style={{
            backgroundColor: 'black',
            // paddingTop: 40,
            // height: 100,
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

            // console.log(route);
            return (
              // <TouchableOpacity
              //   onPress={onPress}
              //   key={route.key}
              //   style={{ width: 150, padding: 10, flexDirection: 'row', alignItems: 'center' }}
              // >
              //   <Text style={{ color: isFocused ? 'black' : 'rgb(170,170,170)' }}>{label}</Text>
              //   <Text>{route.params?.hasUnreadPosts ? 'has' : null}</Text>
              // </TouchableOpacity>
              <TouchableOpacity
                key={route.key}
                style={{
                  // backgroundColor: 'red',
                  width: 90,
                  height: 110,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                  borderBottomColor: isFocused ? 'white' : 'transparent',
                  borderBottomWidth: 2, // Adjust the thickness of the underline
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
                onPress={onPress}
              >
                <FastImage
                  style={{ width: isFocused ? iconWidth : 40, aspectRatio: 1, borderRadius: 10 }}
                  source={{ uri: route.params?.spaceUserRelationship.space.icon }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                {/* <Text style={{ color: 'white' }}>{route.params?.spaceUserRelationship.space.name}</Text> */}
                {/* <Text style={{ color: 'white' }}>Hwllo</Text> */}
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
    ); // Show loading indicator while fetching data
  }

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarScrollEnabled: false,
        lazy: true,
        swipeEnabled: false,

        tabBarLabel: spaceAndUserRelationships.find(
          (spaceUserRelationship) => route.name === `SpaceTab_${spaceUserRelationship._id}`
        ).space.name,
      })}
    >
      {spaceAndUserRelationships.map((spaceUserRelationship) => (
        <Tab.Screen
          key={spaceUserRelationship._id}
          name={`SpaceTab_${spaceUserRelationship._id}`}
          options={{ title: spaceUserRelationship.space.name }} // Set the tab title to the space name
          initialParams={{ spaceUserRelationship }}
        >
          {() => <SpaceTopTabNavigatorNew spaceUserRelationship={spaceUserRelationship} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );

  // ここで、relationship.space._idを使って、spaceをfetchする。そして、そのspaceの_idを使ってtagsを取ってきて、さらにtopTabを横に展開する。
  // const DummyWithRelationshipId = ({ relationship }) => {
  //   return <SpaceTopTabNavigatorNew relationship={relationship} />;
  // };

  // const generateDynamicComponent = (relationship) => {
  //   return function DynamicComponent(props) {
  //     return <SpaceTopTabNavigatorNew relationship={relationship} />;
  //   };
  // };

  // const renderTabScreen = () => {
  //   if (haveSpaceAndUserRelationshipsBeenFetched) {
  //     if (spaceAndUserRelationships.length) {
  //       const list = spaceAndUserRelationships.map((relationship, index) => {
  //         // const DynamicComponent = generateDynamicComponent(relationship);
  //         return (
  //           <Tab.Screen
  //             key={index}
  //             name={`Space-${index}`}
  //             component={DummyWithRelationshipId} // ここにさらにtopTabをいれこむことになる。
  //             initialParams={{ relationship }}
  //             options={({ navigation }) => ({})}
  //           />
  //         );
  //       });

  //       return (
  //         <Tab.Navigator
  //           tabBar={(props) => <CustomTabBar {...props} />}
  //           screenOptions={{
  //             tabBarScrollEnabled: false,
  //             tabBarStyle: { backgroundColor: 'red' },
  //             // tabBarPressOpacity: true,
  //             lazy: true, // add the option here
  //           }}
  //           // initialRouteName={`Space-${spaceAndUserRelationships[0].space._id}`}
  //         >
  //           {list}
  //         </Tab.Navigator>
  //       );
  //     } else {
  //       return null;
  //     }
  //   } else {
  //     return <ActivityIndicator />;
  //   }
  // };

  // return <View style={{ flex: 1 }}>{renderTabScreen()}</View>;
};

export default SpacesMaterialTopNavigator;

{
  /* <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarScrollEnabled: false,
          tabBarStyle: { backgroundColor: 'red' },
          // tabBarPressOpacity: true,
          lazy: true, // add the option here
        }}
        // initialRouteName={`Space-${spaceAndUserRelationships[0].space._id}`}
      >
        <Tab.Screen
          name='Dummy1'
          component={Dummy} // ここにさらにtopTabをいれこむことになる。
          // initialParams={{ relationship }}
          options={({ navigation }) => ({
            // tabBarShowLabel: false,
            // tabBarIcon: ({ size, color, focused }) => (
            //   <MaterialIcons name='apps' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={25} />
            // ),
          })}
        />
        <Tab.Screen
          name='Dummy2'
          component={Dummy2} // ここにさらにtopTabをいれこむことになる。
          // initialParams={{ relationship }}
          options={({ navigation }) => ({
            // tabBarShowLabel: false,
            // tabBarIcon: ({ size, color, focused }) => (
            //   <MaterialIcons name='apps' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={25} />
            // ),
          })}
        />
      </Tab.Navigator> */
}
