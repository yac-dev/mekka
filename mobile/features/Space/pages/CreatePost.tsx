import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { PostContext } from '../contexts/PostContext';
import AddPhoto from '../components/Post/AddPhoto';
import AddCaption from '../components/Post/AddCaption';
import AddLocation from '../components/Post/AddLocation';
import AddTags from '../components/Post/AddTags';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import LoadingSpinner from '../../../components/LoadingSpinner';

type SpaceType = {};

type ContentType = {
  uri: string;
  type: string; // photo or video ここのliteral型かも書いた方がいいかもな。。。
  duration: number;
};

type PostProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any> | undefined;
};

type LocationType = {
  type: string;
  coordinates: number[];
};

type FormType = {
  contents: ContentType[];
  caption: string;
  location: LocationType;
};

// 多分、spaceのobjectを全部渡した方がいいのかも。idだけではなくて。
const Post: React.FC<PostProps> = (props) => {
  const { authData, setLoading } = useContext(GlobalContext);
  const [formData, setFormData] = useState<FormType>({
    contents: [],
    caption: '',
    location: { type: 'Point', coordinates: [] },
    addedTags: [],
    createdTags: [],
  });
  // const [createdTags, setCreatedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={false}>
          <Text
            style={{
              color: 'white',
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
    const result = await backendAPI.get(`/tags/space/${props.route?.params?.space._id}`);
    const { tags } = result.data;
    setTagOptions(tags);
  };

  useEffect(() => {
    getTags();
  }, []);

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
      payload.append('addedTags', JSON.stringify(formData.addedTags));
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
      //ここのcomponentは、photos. video or photoAndVideoどれかになる。
      props.navigation.navigate({ name: 'Space', params: { createdPost: post }, merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        formData,
        setFormData,
        navigation: props.navigation,
        route: props.route,
        tagOptions,
        setTagOptions,
      }}
    >
      <View style={{ flex: 1, padding: 10, backgroundColor: 'black' }}>
        <AddPhoto />
        <AddCaption />
        <AddLocation />
        <AddTags />
        <LoadingSpinner />
      </View>
    </PostContext.Provider>
  );
};

export default Post;
