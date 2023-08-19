import React, { useContext, useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, View, Dimensions, StyleSheet } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
const Stack = createNativeStackNavigator();
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import SpaceTopTabNavigator from './SpaceTopTabNavigator';
import Space from '../features/Space/pages/Space';
import ViewPost from '../features/Space/pages/ViewPost';
import Comments from '../features/Space/pages/Comments';
import TaggedPosts from '../features/Space/pages/TaggedPosts';
import ViewCalendar from '../features/Space/pages/ViewCalendar';
import ViewMap from '../features/Space/pages/ViewMap';
import Photos from '../features/Space/pages/Photos';
import CrearePost from '../features/Space/pages/CreatePost';
import AddLoaction from '../features/Space/pages/AddLocation';
import CreateTag from '../features/Space/pages/CreateTag';
import Reactions from '../features/Space/pages/Reactions';
import { Ionicons } from '@expo/vector-icons';
import backendAPI from '../apis/backend';
import Dummy from '../features/Space/pages/Dummy';

const { MCI, II } = icons;

const windowHeight = Dimensions.get('window').height;
const modalHeight = windowHeight / 2;

const styles = StyleSheet.create({
  modalContainer: {
    height: modalHeight,
    backgroundColor: 'white',
  },
});

const SpaceRootStackNavigator = (props) => {
  const [posts, setPosts] = useState([]);
  const [havePostsBeenFetched, setHavePostsBeenFetched] = useState(false);
  const [space, setSpace] = useState(null);
  const [hasSpaceBeenFetched, setHasSpaceBeenFetched] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);
  const menuBottomSheetRef = useRef(null);

  // useEffect(() => {
  //   if (props.route?.params?.createdPost) {
  //     setPosts((previous) => {
  //       const updating = [...previous];
  //       updating.unshift(props.route?.params?.createdPost);
  //       return updating;
  //     });
  //   }
  // }, [props.route?.params?.createdPost]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SpaceTopTabNavigator'
        component={SpaceTopTabNavigator}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='close-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerShown: true,
          headerTitle: 'Space',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: primaryTextColor,
          },
        })}
      />
      <Stack.Screen
        name='ViewPost'
        component={ViewPost}
        options={({ navigation }) => ({
          // headerShown: false, // ここtrueにすると、,,,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: primaryTextColor,
          },
        })}
      />
      <Stack.Screen
        name='Comments'
        component={Comments}
        options={({ navigation }) => ({
          headerShown: true, // ここtrueにすると、,,,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerTitle: 'Comments',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      />
      <Stack.Screen
        name='Reactions'
        component={Reactions}
        options={({ navigation }) => ({
          headerShown: true, // ここtrueにすると、,,,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerTitle: 'Reactions',
          headerStyle: {
            backgroundColor: 'rgb(40, 40, 40)',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      />
      <Stack.Screen
        name='TaggedPosts'
        component={TaggedPosts}
        options={({ navigation }) => ({
          headerShown: true, // ここtrueにすると、,,,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      />
      <Stack.Screen
        name='ViewCalendar'
        component={ViewCalendar}
        options={({ navigation }) => ({
          headerShown: true, // ここtrueにすると、,,,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerTitle: 'Travel back memories!',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      />
      <Stack.Screen
        name='ViewMap'
        component={ViewMap}
        options={({ navigation }) => ({
          headerShown: true, // ここtrueにすると、,,,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerTitle: 'Map view',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      />
      {/* Postに関するmodal */}
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='AddLocation'
          component={AddLoaction}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: 'Add location',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen
          name='CreateTag'
          component={CreateTag}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group>
      {/* viewpostにかんするmenu */}
      {/* <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='Comments'
          component={Comments}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-outline' size={27} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: 'Comments',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />

        <Stack.Screen
          name='Reactions'
          component={Reactions}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Reactions',
            headerStyle: {
              backgroundColor: 'rgb(40, 40, 40)',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group> */}
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='CreatePost'
          component={CrearePost}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SpaceRootStackNavigator;
