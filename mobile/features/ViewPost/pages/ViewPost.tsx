import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import backendAPI from '../../../apis/backend';
import { ViewPostContext } from '../contexts/ViewPostContext';
import Header from '../components/Header';
import Content from '../components/Content';
import ReactionOptionsBottomSheet from './ReactionOptionsBottomSheet';
import CommentInputBottomSheet from './CommentInputBottomSheet';
import BottomMenu from '../components/BottomMenu';
// import ReactionOptions from '../compoReactionOptions';
import Comments from './Comments';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ViewPost = (props) => {
  const [post, setPost] = useState(null);
  const [isPostFetched, setIsPostFetched] = useState(false);
  const [reactionStatuses, setReactionStatuses] = useState([]);
  const [areReactionStatusesFetched, setAreReactionStatusesFetched] = useState(false);
  const [comments, setComments] = useState([]);
  const [areCommentsFetched, setAreCommentsFetched] = useState(false);
  const reactionOptionsBottomSheetRef = useRef(null);
  const commentInputBottomSheetRef = useRef(null);
  const textInputRef = useRef(null);

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
        navigation: props.navigation,
        reactionOptionsBottomSheetRef,
        commentInputBottomSheetRef,
        textInputRef,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
        <Content />
        <Header />
        <BottomMenu />
        <ReactionOptionsBottomSheet />
        <CommentInputBottomSheet />
        {/* <ReactionOptions /> */}
        {/* <Comments /> */}
        <LoadingSpinner />
      </GestureHandlerRootView>
    </ViewPostContext.Provider>
  );
};

export default ViewPost;
