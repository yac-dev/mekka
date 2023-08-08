import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import backendAPI from '../../../apis/backend';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { ReactionsContext } from '../contexts/ReactionsContext';
import UserReactions from '../components/Reactions/UserReactions';
import ReactionOptions from '../components/Reactions/ReactionOptions';
import CommentInput from '../components/Reactions/CommentInput';

type ReactionsProps = {
  route: RouteProp<ParamListBase, string> | undefined;
};

type StickerType = {
  _id: string;
  url: string;
  name: string;
};

type ReactionType = {
  _id: string;
  type: 'emoji' | 'sticker';
  emoji: string | null;
  sticker: StickerType | null;
};

type ReactionStatusType = {
  _id: string;
  post: string;
  reaction: ReactionType;
  count: number;
};

// ここのts error気になるな。
const Reactions: React.FC<ReactionsProps> = (props) => {
  const [reactionStatuses, setReactionStatuses] = useState<ReactionStatusType[]>([]);
  const [areReactionStatusesFetched, setAreReactionStatusesFetched] = useState(false);
  const [userReactions, setUserReactions] = useState([]);
  const [areUserReactionsFetched, setAreUserReactionsFetched] = useState(false);
  const [comments, setComments] = useState('');
  // ここのts error気になるな。
  console.log(props.route?.params?.postId);

  const getUserReactions = async () => {
    const result = await backendAPI.get(`/userandreactionrelationships/post/${props.route?.params?.postId}`);
    const { userAndReactionRelationships } = result.data;
    setUserReactions(userAndReactionRelationships);
    setAreUserReactionsFetched(true);
  };

  const getReactionStatuses = async () => {
    const result = await backendAPI.get(`/reactionstatuses/post/${props.route?.params?.postId}`);
    const { reactionStatuses } = result.data;
    setReactionStatuses(reactionStatuses);
    setAreReactionStatusesFetched(true);
  };

  useEffect(() => {
    getUserReactions();
    // getReactionStatuses();
  }, []);

  return (
    <ReactionsContext.Provider
      value={{
        userReactions,
        setUserReactions,
        areUserReactionsFetched,
        setAreUserReactionsFetched,
        reactionOptions: props.reactionOptions,
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'rgb(40, 40,40)', padding: 10 }}>
        {areUserReactionsFetched ? (
          <>
            <UserReactions />
            <ReactionOptions />
            <CommentInput />
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ReactionsContext.Provider>
  );
};

export default Reactions;
