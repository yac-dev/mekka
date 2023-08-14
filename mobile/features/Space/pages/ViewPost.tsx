import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import backendAPI from '../../../apis/backend';
import { ViewPostContext } from '../contexts/ViewPostContext';
import Content from '../components/ViewPost/Content';
import ReactionOptions from '../components/ViewPost/ReactionOptions';
import Comments from '../components/ViewPost/Comments';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ViewPost = (props) => {
  const [post, setPost] = useState({});
  const [isPostFetched, setIsPostFetched] = useState(false);
  const [reactionStatuses, setReactionStatuses] = useState([]);
  const [areReactionStatusesFetched, setAreReactionStatusesFetched] = useState(false);
  const [comments, setComments] = useState([]);
  const [areCommentsFetched, setAreCommentsFetched] = useState(false);

  const getPost = async () => {
    const result = await backendAPI.get(`/posts/${props.route.params.post._id}`);
    const { post } = result.data;
    setPost(post);
    setIsPostFetched(true);
  };

  const getReactionStatuses = async () => {
    const result = await backendAPI.get(`/reactionstatuses/post/${props.route?.params?.post._id}`);
    const { reactionStatuses } = result.data;
    setReactionStatuses(reactionStatuses);
    setAreReactionStatusesFetched(true);
  };

  const getComments = async () => {
    const result = await backendAPI.get(`/comments/post/${props.route?.params?.post._id}`);
    const { comments } = result.data;
    setComments(comments);
    setAreCommentsFetched(true);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getPost();
    getReactionStatuses();
    getComments();
  }, []);

  return (
    <ViewPostContext.Provider
      value={{
        post,
        setPost,
        isPostFetched,
        setIsPostFetched,
        reactionStatuses,
        setReactionStatuses,
        areReactionStatusesFetched,
        comments,
        setComments,
        areCommentsFetched,
      }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
        <Content />
        <ReactionOptions />
        <Comments />
        <LoadingSpinner />
      </ScrollView>
    </ViewPostContext.Provider>
  );
};

export default ViewPost;
