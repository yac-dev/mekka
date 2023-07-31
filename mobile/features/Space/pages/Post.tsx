import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PostContext } from '../contexts/PostContext';
import AddPhoto from '../components/Post/AddPhoto';
import AddCaption from '../components/Post/AddCaption';
import AddLocation from '../components/Post/AddLocation';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';

// ここで、propsに関するinterfaceなりをやらんとな。。。
type PostProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any> | undefined;
};

type LocationType = {
  type: string;
  coordinates: number[];
};

type FormType = {
  photos: string[];
  caption: string;
  location: LocationType;
};

const Post: React.FC<PostProps> = (props) => {
  const [formData, setFormData] = useState<FormType>({
    photos: [],
    caption: '',
    location: { type: 'Point', coordinates: [] },
  });

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log(formData)} disabled={false}>
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
    const result = await backendAPI.post('/posts'); // どこのspaceになんのpostを、っていう感じか。。。
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
