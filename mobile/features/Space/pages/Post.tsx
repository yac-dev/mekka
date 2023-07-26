import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { PostContext } from '../contexts/PostContext';
import AddPhoto from '../components/Post/AddPhoto';
import AddCaption from '../components/Post/AddCaption';

const Post: React.FC = () => {
  const [formData, setFormData] = useState({ photos: [], caption: '' });

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
