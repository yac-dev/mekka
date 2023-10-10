import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import backendAPI from '../../../apis/backend';

const CommentsPage = (props) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCommentsByPostId = async () => {
    const result = await backendAPI.get(`/posts/${props.postId}/comments`);
    const { comments } = result.data;
    setComments(comments);
    setIsLoading(false);
  };

  useEffect(() => {
    getCommentsByPostId();
  }, []);

  const renderComment = useCallback((item) => {
    return (
      <View style={{ padding: 15 }}>
        <Text style={{ color: 'red' }}>{item.content}</Text>
      </View>
    );
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <FlatList data={comments} renderItem={renderComment} keyExtractor={(item, index) => `${item._id}-${index}`} />
    </View>
  );
};

export default CommentsPage;
