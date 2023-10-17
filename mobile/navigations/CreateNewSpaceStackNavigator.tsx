import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Overview from '../features/CreateNewSpace/pages/Overview';
import SelectSpaceVisibility from '../features/CreateNewSpace/pages/SelectSpaceVisibility';
import ContentType from '../features/CreateNewSpace/pages/ContentType';
import Moment from '../features/CreateNewSpace/pages/Moment';
import Reaction from '../features/CreateNewSpace/pages/Reaction';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../contexts/GlobalContext';
import { CreateNewSpaceContext } from '../features/CreateNewSpace/contexts/CreateNewSpace';
import backendAPI from '../apis/backend';
import CreateNewTag from '../features/CreateNewPost/pages/CreateNewTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';
import LoadingSpinner from '../components/LoadingSpinner';

const CreateNewSpaceStackNavigator = (props) => {
  const { authData, setLoading, setSnackBar, setSpaceAndUserRelationships } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    contentType: '', // ここら辺は、全部選択式になる。
    isPublic: undefined,
    isCommentAvailable: undefined,
    isReactionAvailable: undefined,
    videoLength: 60,
    disappearAfter: 720, // from 5 minutes to 1440 minutes(24 hours), 720 minutes(12 hours)
    reactions: [],
    description: '',
  });

  // const {
  //   currentSpaceAndUserRelationship: { space },
  // } = props.route.params;

  const onDonePress = async () => {
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('contentType', formData.contentType);
    payload.append('isPublic', formData.isPublic.toString());
    payload.append('isCommentAvailable', formData.isCommentAvailable.toString());
    payload.append('isReactionAvailable', formData.isReactionAvailable.toString());
    payload.append('reactions', JSON.stringify(formData.reactions));
    payload.append('videoLength', formData.videoLength.toString());
    payload.append('disappearAfter', formData.disappearAfter.toString());
    payload.append('description', formData.description);
    payload.append('createdBy', authData._id);
    const iconData = {
      name: `${authData._id}-${Date.now()}`,
      uri: formData.icon,
      type: 'image/jpeg',
    };

    payload.append('icon', JSON.parse(JSON.stringify(iconData)));
    setLoading(true);
    const result = await backendAPI.post('/spaces', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    setLoading(false);
    const { spaceAndUserRelationship } = result.data;
    setSpaceAndUserRelationships((previous) => [...previous, spaceAndUserRelationship]);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'The space has been created successfully. Invite your friends, share your moments and have fun.',
      duration: 7000,
    });
    props.navigation.navigate('SpacesDrawerNavigator');
  };

  return (
    <CreateNewSpaceContext.Provider
      value={{
        formData,
        setFormData,
      }}
    >
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Overview'
            component={Overview}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('SelectSpaceVisibility')}
                  disabled={formData.name.length && formData.icon.length ? false : true}
                >
                  <Text
                    style={{
                      color: formData.name.length && formData.icon.length ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
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
            name='SelectSpaceVisibility'
            component={SelectSpaceVisibility}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ContentType')}
                  disabled={formData.isPublic !== undefined ? false : true}
                >
                  <Text
                    style={{
                      color: formData.isPublic !== undefined ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
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
            name='ContentType'
            component={ContentType}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Moment')}
                  disabled={formData.contentType ? false : true}
                >
                  <Text
                    style={{
                      color: formData.contentType ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
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
            name='Moment'
            component={Moment}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Reaction')}
                  disabled={formData.disappearAfter ? false : true}
                >
                  <Text
                    style={{
                      color: formData.disappearAfter ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
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
            name='Reaction'
            component={Reaction}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Description')}
                  disabled={formData.name.length && formData.icon && formData.isPublic !== undefined ? false : true}
                >
                  <Text
                    style={{
                      color: formData.name.length ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
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
            name='Description'
            component={Overview}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => console.log('create done!!')}
                  disabled={formData.name.length && formData.icon && formData.isPublic !== undefined ? false : true}
                >
                  <Text
                    style={{
                      color: formData.name.length ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Create
                  </Text>
                </TouchableOpacity>
              ),
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
        <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          {/* <Stack.Screen
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
          /> */}
        </Stack.Group>
      </Stack.Navigator>
      <LoadingSpinner />
    </CreateNewSpaceContext.Provider>
  );
};

export default CreateNewSpaceStackNavigator;
