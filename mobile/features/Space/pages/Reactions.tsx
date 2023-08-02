import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import backendAPI from '../../../apis/backend';
import { RouteProp, ParamListBase } from '@react-navigation/native';

type ReactionsProps = {
  route: RouteProp<ParamListBase, string> | undefined;
};

type ReactionType = {
  _id: string;
  emoji: string;
  emojiType: string;
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
  // ここのts error気になるな。
  console.log(props.route?.params?.postId);

  const getReactionStatuses = async () => {
    const result = await backendAPI.get(`/reactionstatuses/post/${props.route?.params?.postId}`);
    const { reactionStatuses } = result.data;
    setReactionStatuses(reactionStatuses);
    setAreReactionStatusesFetched(true);
  };

  useEffect(() => {
    getReactionStatuses();
  }, []);

  const renderReactionStatues = () => {
    if (reactionStatuses.length) {
      const list = reactionStatuses.map((reactionStatus, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: 'blue',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
              padding: 5,
              marginBottom: 10,
            }}
          >
            {reactionStatus.reaction.emojiType === 'normal' ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 30 }}>{reactionStatus.reaction.emoji}</Text>
                <Text style={{ color: 'white' }}>10</Text>
              </View>
            ) : (
              <Text>Custom here</Text>
            )}
          </TouchableOpacity>
        );
      });

      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.3,
            marginBottom: 20,
            borderBottomColor: 'white',
          }}
        >
          <ScrollView horizontal={true}>{list}</ScrollView>
        </View>
      );
    } else {
      return <Text>No reaction</Text>;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(40, 40,40)', padding: 10 }}>
      {areReactionStatusesFetched ? renderReactionStatues() : <ActivityIndicator />}
    </View>
  );
};

export default Reactions;
