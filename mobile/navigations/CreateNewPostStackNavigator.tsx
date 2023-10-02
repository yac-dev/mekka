import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SelectPostType from '../features/CreateNewPost/pages/SelectPostType';
import { Ionicons } from '@expo/vector-icons';
import NormalPost from '../features/CreateNewPost/pages/NormalPost';
import AddTags from '../features/CreateNewPost/pages/AddTags';
import AddLocationTag from '../features/CreateNewPost/pages/AddLocationTag';
import MomentPost from '../features/CreateNewPost/pages/MomentPost';
import { GlobalContext } from '../contexts/GlobalContext';
import { CreateNewPostContext } from '../features/CreateNewPost/contexts/CreateNewPostContext';
import backendAPI from '../apis/backend';
import CreateNewTag from '../features/CreateNewPost/pages/CreateNewTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';

const CreateNewPostStackNavigator = (props) => {
  const { authData, setLoading, setSnackBar } = useContext(GlobalContext);
  const [postType, setPostType] = useState('');
  const [contents, setContents] = useState([]);
  const [caption, setCaption] = useState('');
  const [dummyCreatedTagId, setDummyCreatedTagId] = useState(1);
  const [addedTags, setAddedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  // const [createdTags, setCreatedTags] = useState([]);
  const [locationTagOptions, setLocationTagOptions] = useState([]);
  const [addedLocationTag, setAddedLocationTag] = useState(null);
  const [createdLocationTag, setCreatedLocationTag] = useState(null);
  const {
    spaceAndUserRelationship: { space },
  } = props.route.params;

  const getTags = async () => {
    const result = await backendAPI.get(`/spaces/${space._id}/tags`);
    const { tags } = result.data;
    // setTagOptions(() => {
    //   const table = {};
    //   tags.forEach((tag, index) => {
    //     table[tag._id] = tag;
    //   });

    //   return table;
    // });
    setTagOptions(() => {
      const options = tags.map((tag, index) => {
        return {
          ...tag,
          added: false,
          created: false,
        };
      });
      return options;
    });
    // 最終的に、addedのやつだけを切り抜いてくれば良いいね。addedTagsっていうarrayはもういらんね。
  };

  const getLocationTags = async () => {
    const result = await backendAPI.get(`/spaces/${space._id}/locationtags`);
    const { locationTags } = result.data;
    const options = locationTags.map((locationTag, index) => {
      return {
        ...locationTag,
        created: false,
      };
    });
    setLocationTagOptions(options);
  };

  useEffect(() => {
    getTags();
    getLocationTags;
  }, []);

  const onPostPress = async () => {
    try {
      const payload = new FormData();
      payload.append('reactions', JSON.stringify(space.reactions));
      payload.append('caption', caption);
      payload.append('createdTags', JSON.stringify(createdTags));
      payload.append('addedTags', JSON.stringify(Object.keys(addedTags)));
      // そもそもaddedLocationTagがない場合もあり、それを考慮しないといけない。
      if (addedLocationTag) {
        if (addedLocationTag.created) {
          payload.append('createdLocationTag', JSON.stringify(addedLocationTag)); // これがない場合もある。
        } else {
          payload.append('addedLocationTag', JSON.stringify(addedLocationTag)); // これがない場合もある。
        }
      } else {
        payload.append('addedLocationTag', '');
      }
      payload.append('createdBy', authData._id);
      payload.append('spaceId', space._id);
      for (let content of contents) {
        const obj = {
          name: content.uri.split('/').pop(),
          uri: content.uri,
          type: content.type === 'image' ? 'image/jpg' : 'video/mp4',
        };
        payload.append('contents', JSON.parse(JSON.stringify(obj)));
      }
      console.log(payload);
      setLoading(true);
      const result = await backendAPI.post('/posts', payload, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      setLoading(false);
      const { post } = result.data;
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Post has been created successfully.',
        duration: 7000,
      });
      //ここのcomponentは、photos. video or photoAndVideoどれかになる。
      // なるほど、戻る時に必要になるのか。。。でもなーーーー。
      props.navigation.navigate({
        name: `Space_${props.route?.params?.spaceAndUserRelationship._id}`,
        params: { afterPosted: true }, // 作ったtagをSpaceRootに入れる。
        merge: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (props.route.params.createdTag) {
  //     console.log(props.route.params.createdTag);
  //     setCreatedTags((previous) => {
  //       const tagObject = {
  //         _id: dummyCreatedTagId,
  //         icon: '',
  //         name: props.route.params.createdTag,
  //       };
  //       setDummyCreatedTagId((previous) => previous + 1);
  //       return [...previous, tagObject];
  //     });
  //   }
  // }, [props.route.params.createdTag]);

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
        tagOptions,
        setTagOptions,
        setAddedTags,
        createdTags,
        setCreatedTags,
        locationTagOptions,
        setLocationTagOptions,
        addedLocationTag,
        setAddedLocationTag,
        createdLocationTag,
        setCreatedLocationTag,
        space,
        navigation: props.navigation,
        route: props.route,
        dummyCreatedTagId,
        setDummyCreatedTagId,
      }}
    >
      <Stack.Navigator>
        <Stack.Group>
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
                  disabled={contents.length ? false : true}
                >
                  <Text
                    style={{
                      color: contents.length ? 'white' : 'rgb(170,170,170)',
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
                  onPress={() => navigation.navigate('AddLocationTag')}
                  disabled={Object.keys(addedTags).length ? false : true}
                >
                  <Text
                    style={{
                      color: Object.keys(addedTags).length ? 'white' : 'rgb(170,170,170)',
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
          <Stack.Screen
            name='AddLocationTag'
            component={AddLocationTag}
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
                  <TouchableOpacity onPress={() => onPostPress()}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      Post!
                    </Text>
                  </TouchableOpacity>
                );
              },
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
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
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          <Stack.Screen
            name='CreateNewTag'
            component={CreateNewTag}
            options={({ navigation }) => ({
              headerShown: true,
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
            name='CreateNewLocationTag'
            component={CreateNewLocationTag}
            options={({ navigation }) => ({
              headerShown: true,
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
    </CreateNewPostContext.Provider>
  );
};

export default CreateNewPostStackNavigator;
