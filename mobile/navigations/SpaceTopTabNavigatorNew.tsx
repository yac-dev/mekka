import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import backendAPI from '../apis/backend';

const Tab = createMaterialTopTabNavigator();

const SpaceTopTabNavigatorNew = (props) => {
  const route = useRoute();
  // const { spaceUserRelationship } = route?.params;
  const [space, setSpace] = useState(null);
  const [tags, setTags] = useState({});
  const [hasSpaceBeenFetched, setHasSpaceBeenFetched] = useState(false);
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);
  console.log('hello', props.spaceUserRelationship._id);

  const getSpaceById = async () => {
    const result = await backendAPI.get(`/spaces/${props.spaceUserRelationship.space._id}`);
    const { space } = result.data;
    setSpace(space);
    setHasSpaceBeenFetched(true);
  };

  const getTags = async () => {
    const result = await backendAPI.get(`/spaces/${props.spaceUserRelationship.space._id}/tags`);
    const { tags } = result.data;
    setTags(() => {
      const table = {};
      tags.forEach((tag, index) => {
        table[tag._id] = {
          tag,
          hasUnreadPosts: tag.updatedAt > props.route?.params?.lastCheckedIn ? true : false,
        };
      });

      return table;
    });
    // setSelectedTag(tags[0]);
    setHaveTagsBeenFetched(true);
  };

  useEffect(() => {
    getSpaceById();
  }, []);

  useEffect(() => {
    if (hasSpaceBeenFetched) {
      getTags();
    }
  }, [hasSpaceBeenFetched]);

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
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                }}
                // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
                onPress={onPress}
              >
                <Text style={{ color: 'white' }}>{route.params?.tagObject.tag.name}</Text>
                <Text style={{ color: 'white' }}>{route.params?.tagObject.tag.count}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  if (!hasSpaceBeenFetched || !haveTagsBeenFetched) {
    return <ActivityIndicator />; // Show loading indicator while fetching data
  }

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        lazy: true,
        swipeEnabled: false,
        // tabBarLabel: tags.find(
        //   (spaceUserRelationship) => route.name === `SpaceTab_${spaceUserRelationship._id}`
        // ).space.name,
      })}
    >
      {Object.values(tags).map((tagObject, index) => (
        <Tab.Screen
          key={index}
          name={`SpaceTab_${tagObject._id}-${index}`}
          options={{ title: tagObject.tag.name }} // Set the tab title to the space name
          initialParams={{ tagObject }}
        >
          {() => (
            <View>
              <Text style={{ color: 'red' }}>here is </Text>
            </View>
          )}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default SpaceTopTabNavigatorNew;

// import React from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import backendAPI from '../apis/backend';
// // Import any necessary components or libraries for fetching data

// const SpaceTopTab = ({ relationship, focusedTab, onTabPress }) => {
//   const isFocused = focusedTab === relationship._id;
//   console.log(isFocused);
//   const a = async () => {
//     const v = await backendAPI.get('http://192.168.11.30:3500/');
//     console.log('success');
//   };

//   // Fetch space resources when tab is focused
//   React.useEffect(() => {
//     if (isFocused) {
//       // Perform API request using relationship._id to fetch space resources
//       // Example: fetchSpaceResources(relationship._id);
//       a();
//     }
//   }, [isFocused, relationship._id]);

//   return (
//     <ScrollView>
//       {/* Display the content for the focused tab */}
//       {isFocused && (
//         <View>
//           <Text>Content for {relationship.name}</Text>
//           {/* Display fetched space resources here */}
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// export default SpaceTopTab;
