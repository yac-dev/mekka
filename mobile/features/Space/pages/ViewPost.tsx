import React from 'react';
import { View, Text } from 'react-native';
import backendAPI from '../../../apis/backend';
// import {ViewPostContext} from '../contexts/ViewPostContext'

const Post = (props) => {
  const [post, setPost] = useState({});
  const [reactionStatuses, setReactionStatuses] = useState([]);
  const [comments, setComments] = useState([]);

  const getPost = async () => {
    const result = await backendAPI.get(`/posts/${props.route.params.postId}`);
    const { post } = result.data;
    setPost(post);
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
  return (
    <View>
      <Text>Post</Text>
    </View>
  );
};

export default Post;
