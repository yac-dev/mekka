import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import AddPhoto from '../components/AddPhoto';
import AddCaption from '../components/AddCaption';
import AddLocation from '../components/AddLocation';
import AddTags from '../components/AddTags';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import LoadingSpinner from '../../../components/LoadingSpinner';

const Form = (props) => {
  const { authData, setLoading, setSnackBar } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    contents: [],
    caption: '',
    location: { type: 'Point', coordinates: [] },
    addedTags: {},
    createdTags: [],
  });
  // const [createdTags, setCreatedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState({});

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={
            formData.contents.length && (Object.keys(formData.addedTags).length || formData.createdTags.length)
              ? false
              : true
          }
        >
          <Text
            style={{
              color:
                formData.contents.length && (Object.keys(formData.addedTags).length || formData.createdTags.length)
                  ? 'white'
                  : 'rgb(70,70,70)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData, props.route?.params?.space]);

  const getTags = async () => {
    const result = await backendAPI.get(`/spaces/${props.route.params.spaceAndUserRelationship.space._id}/tags`);
    const { tags } = result.data;
    setTagOptions(() => {
      const table = {};
      tags.forEach((tag, index) => {
        table[tag._id] = tag;
      });

      return table;
    });
  };

  useEffect(() => {
    getTags();
  }, []);
  console.log(props.route?.params?.spaceAndUserRelationship);

  // ここまじで謎だよなー。なんで毎回undefinedになるんだろうか。。。
  const onDonePress = async () => {
    // console.log('this is the space object', JSON.stringify(props.route?.params?.space._id));
    // console.log('this is the space reactios', props.route?.params?.space.reactions);
    try {
      const payload = new FormData();
      // 必ず、paramsを"merge"しろ。じゃないと、objectを上書きしちまう。
      payload.append('reactions', JSON.stringify(props.route?.params?.space.reactions));
      payload.append('caption', formData.caption);
      payload.append('location', JSON.stringify(formData.location));
      payload.append('createdTags', JSON.stringify(formData.createdTags));
      payload.append('addedTags', JSON.stringify(Object.keys(formData.addedTags)));
      payload.append('disappearAfter', props.route?.params?.space.disappearAfter);
      payload.append('createdBy', authData._id);
      payload.append('spaceId', props.route?.params?.space._id);
      for (let content of formData.contents) {
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
      props.navigation.navigate({
        name: `Space_${props.route?.params?.spaceAndUserRelationship._id}`,
        params: { afterPosted: true }, // 作ったtagをSpaceRootに入れる。
        merge: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CreateNewPostContext.Provider
      value={{
        formData,
        setFormData,
        navigation: props.navigation,
        route: props.route,
        tagOptions,
        setTagOptions,
        spaceAndUserRelationship: props.route.params.spaceAndUserRelationship,
      }}
    >
      <View style={{ flex: 1, padding: 10, backgroundColor: 'black' }}>
        <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Create new Post
          </Text>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            Post your photo/video and share your moments with your peers.
          </Text>
        </View>
        <ScrollView>
          <AddPhoto />
          <AddTags />
          <AddCaption />
          <AddLocation />
        </ScrollView>
        <LoadingSpinner />
      </View>
    </CreateNewPostContext.Provider>
  );
};

export default Form;
