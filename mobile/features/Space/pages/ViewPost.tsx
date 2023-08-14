import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import backendAPI from '../../../apis/backend';
import { ViewPostContext } from '../contexts/ViewPostContext';
import Content from '../components/ViewPost/Content';

const ViewPost = (props) => {
  const [post, setPost] = useState({});
  const [isPostFetched, setIsPostFetched] = useState(false);
  const [reactionStatuses, setReactionStatuses] = useState([]);
  const [comments, setComments] = useState([]);

  const getPost = async () => {
    const result = await backendAPI.get(`/posts/${props.route.params.post._id}`);
    const { post } = result.data;
    setPost(post);
    setIsPostFetched(true);
  };

  // reactionとcommentを全部とってくるようにする。
  // // const getReactionStatuses = async () => {
  // //   const result = await backendAPI.get(`/reactionstatuses/post/${props.route?.params?.postId}`);
  // //   const { reactionStatuses } = result.data;
  // //   setReactionStatuses(reactionStatuses);
  // //   setAreReactionStatusesFetched(true);
  // // };

  // // const getComments = async () => {
  // //   const result = await backendAPI.get(`/comments/post/${props.route?.params?.postId}`);
  // //   const { comments } = result.data;
  // //   setComments(comments);
  // //   setAreCommentsFetched(true);
  // // };

  // useEffect(() => {
  //   getReactionStatuses();
  //   getComments();
  // }, []);
  //
  useEffect(() => {
    getPost();
  }, []);

  return (
    <ViewPostContext.Provider
      value={{ post, setPost, isPostFetched, setIsPostFetched, reactionStatuses, setReactionStatuses }}
    >
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Content />
        <Text style={{ color: 'red' }}>OK???</Text>
      </View>
    </ViewPostContext.Provider>
  );
};

export default ViewPost;
