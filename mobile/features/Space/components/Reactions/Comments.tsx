import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import backendAPI from '../../../../apis/backend';
import { ReactionsContext } from '../../contexts/ReactionsContext';

const Comments: React.FC = () => {
  const { postId } = useContext(ReactionsContext);

  const getComments = async () => {
    const result = await backendAPI.get(`/posts/${postId}`);
  };

  return <View></View>;
};

export default Comments;
