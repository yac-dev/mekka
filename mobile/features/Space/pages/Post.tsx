import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { PostContext } from '../contexts/PostContext';
import AddPhoto from '../components/Post/AddPhoto';
import AddCaption from '../components/Post/AddCaption';
import AddLocation from '../components/Post/AddLocation';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';

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

const Post: React.FC<PostProps> = (props) => {
  const { authData } = useContext(GlobalContext);
  const [formData, setFormData] = useState<FormType>({
    contents: [],
    caption: '',
    location: { type: 'Point', coordinates: [] },
  });

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
  }, [formData]);

  const onDonePress = async () => {
    const payload = new FormData();
    payload.append('caption', formData.caption);
    payload.append('location', JSON.stringify(formData.location));
    payload.append('createdBy', authData._id);
    // 前に面倒臭い開発やっていてよかったね。
    for (let content of formData.contents) {
      const obj = {
        name: content.uri.split('/').pop(),
        uri: content.uri,
        type: content.type === 'image' ? 'image/jpg' : 'video/mp4',
      };
      payload.append('contents', JSON.parse(JSON.stringify(obj)));
    }

    const result = await backendAPI.post('/posts', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  };

  return (
    <PostContext.Provider value={{ formData, setFormData, navigation: props.navigation, route: props.route }}>
      <View style={{ flex: 1, padding: 10, backgroundColor: 'black' }}>
        <AddPhoto />
        <AddCaption />
        <AddLocation />
      </View>
    </PostContext.Provider>
  );
};

export default Post;
