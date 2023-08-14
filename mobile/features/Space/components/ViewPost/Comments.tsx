import React, { useContext } from 'react';
import { View, Text, ActivityIndicator, TextInput } from 'react-native';
import { ViewPostContext } from '../../contexts/ViewPostContext';

const Comments = () => {
  const { comments, setComments, areCommentsFetched } = useContext(ViewPostContext);

  const renderComments = () => {
    if (comments.length) {
      const list = comments.map((comment, index) => {
        return (
          <View>
            <Text>{comment.content}</Text>
          </View>
        );
      });

      return <View>{list}</View>;
    } else {
      return <Text style={{ color: 'white', fontSize: 17, textAlign: 'center' }}>Be the first to comment.</Text>;
    }
  };

  if (areCommentsFetched) {
    return <View>{renderComments()}</View>;
  } else {
    return <ActivityIndicator />;
  }
};

export default Comments;
