import React, { useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import backendAPI from '../../../../apis/backend';
import { ReactionsContext } from '../../contexts/ReactionsContext';

const Comments: React.FC = () => {
  const { comments, areCommentsFetched } = useContext(ReactionsContext);

  const renderComments = () => {
    if (comments.length) {
      const list = comments.map((comment, index) => {
        return (
          <View>
            <Text style={{ color: 'white' }}>{comment.content}</Text>
          </View>
        );
      });

      return <View>{list}</View>;
    } else {
      return (
        <View>
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>Be the first to comment this post.</Text>
        </View>
      );
    }
  };

  return <>{areCommentsFetched ? renderComments() : <ActivityIndicator />}</>;
};

export default Comments;
