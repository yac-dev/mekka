import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { ReactionsContext } from '../../contexts/ReactionsContext';
import FastImage from 'react-native-fast-image';

const UserReactions = () => {
  const { userReactions, setUserReactions } = useContext(ReactionsContext);

  // 正直、ここは何も変えないと思う。
  const renderUserReactions = () => {
    if (userReactions.length) {
      const list = userReactions.map((userReaction, index) => {
        return (
          <View style={{}}>
            <FastImage source={{ uri: userReaction.user.avatar }} style={{ width: 40, height: 40, borderRadius: 10 }} />
            {userReaction.reaction.type === 'emoji' ? (
              <Text style={{ fontSize: 30 }}>{userReaction.reaction.emoji}</Text>
            ) : (
              <FastImage source={{ uri: userReaction.reaction.sticker.url }} style={{ width: 30, height: 30 }} />
            )}
          </View>
        );
      });

      return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>;
    } else {
      return <Text style={{ color: 'white' }}>Be the first to react.</Text>;
    }
  };

  return <>{renderUserReactions()}</>;
};

export default UserReactions;
