import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PostContext } from '../contexts/PostContext';
import AddPhoto from '../components/Post/AddPhoto';
import AddCaption from '../components/Post/AddCaption';

const Post: React.FC = (props) => {
  const [formData, setFormData] = useState({ photos: [], caption: '' });

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log('Hello')} disabled={false}>
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

  return (
    <PostContext.Provider value={{ formData, setFormData }}>
      <View style={{ flex: 1, padding: 10, backgroundColor: 'black' }}>
        <AddPhoto />
        <AddCaption />
      </View>
    </PostContext.Provider>
  );
};

export default Post;
