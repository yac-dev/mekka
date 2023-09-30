import React, { useContext, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SelectPostType from '../features/CreateNewPost/pages/SelectPostType';
import { Ionicons } from '@expo/vector-icons';
import NormalPost from '../features/CreateNewPost/pages/NormalPost';
import AddTags from '../features/CreateNewPost/pages/AddTags';
import MomentPost from '../features/CreateNewPost/pages/MomentPost';
import { CreateNewPostContext } from '../features/CreateNewPost/contexts/CreateNewPostContext';

const CreateNewPostStackNavigator = (props) => {
  // const [formData, setFormData] = useState({
  //   contents: [],
  //   caption: '',
  //   location: { type: 'Point', coordinates: [] },
  //   addedTags: {},
  //   createdTags: [],
  //   addedLocationTag: null,
  //   createdLocationTag: null,
  // });
  const [postType, setPostType] = useState('');
  const [contents, setContents] = useState([]);
  const [caption, setCaption] = useState('');
  const [addedTags, setAddedTags] = useState([]);
  const [createdTags, setCreatedTags] = useState([]);
  // const [location, setLocation] = useState({ type: 'Point', coordinates: [] });
  const [addedLocationTag, setAddedLocationTag] = useState(null);
  const [createdLocationTag, setCreatedLocationTag] = useState(null);
  const {
    spaceAndUserRelationship: { space },
  } = props.route.params;

  return (
    <CreateNewPostContext.Provider
      value={{
        postType,
        setPostType,
        contents,
        setContents,
        caption,
        setCaption,
        addedTags,
        setAddedTags,
        createdTags,
        setCreatedTags,
        addedLocationTag,
        setAddedLocationTag,
        createdLocationTag,
        setCreatedLocationTag,
        space,
        navigation: props.navigation,
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name='SelectPostType'
          component={SelectPostType}
          options={({ navigation }) => ({
            headerShown: true, // ここtrueにすると、,,,
            headerRight: () => null,
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
        <Stack.Screen
          name='NormalPost'
          component={NormalPost}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              );
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('AddTags')}
                disabled={contents.length && caption.length ? false : true}
              >
                <Text
                  style={{
                    color: contents.length && caption.length ? 'white' : 'rgb(170,170,170)',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                >
                  Next
                </Text>
              </TouchableOpacity>
            ),
            title: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            // headerTintColor: 'red',
            // headerStyle: {
            //   backgroundColor: 'black',
            //   borderBottomWidth: 0,
            // },
            // tabBarLabel: 'Home',
            // tabBarStyle: {
            //   backgroundColor: 'black',
            //   borderTopWidth: 0,
            // },
          })}
        />
        <Stack.Screen
          name='AddTags'
          component={AddTags}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              );
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('AddTags')}
                disabled={addedTags.length ? false : true}
              >
                <Text
                  style={{
                    color: addedTags.length ? 'white' : 'rgb(170,170,170)',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                >
                  Next
                </Text>
              </TouchableOpacity>
            ),
            title: '',
            headerStyle: {
              backgroundColor: 'black',
            },
          })}
        />
        {/* <Stack.Screen
          name='AddLocationTag'
          component={AddTags}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              );
            },
            headerRight: () => {
              return (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              );
            },
            title: '',
            headerStyle: {
              backgroundColor: 'black',
            },
          })}
        /> */}
        <Stack.Screen
          name='MomentPost'
          component={MomentPost}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              );
            },
            headerRight: () => {
              return (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              );
            },
            title: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            // title: 'Mekka',
            // headerTintColor: 'red',
            // headerStyle: {
            //   backgroundColor: 'black',
            //   borderBottomWidth: 0,
            // },
            // tabBarLabel: 'Home',
            // tabBarStyle: {
            //   backgroundColor: 'black',
            //   borderTopWidth: 0,
            // },
          })}
        />
      </Stack.Navigator>
    </CreateNewPostContext.Provider>
  );
};

export default CreateNewPostStackNavigator;
