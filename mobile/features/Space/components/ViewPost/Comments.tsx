import React, { useContext } from 'react';
import { View, Text, ActivityIndicator, TextInput } from 'react-native';
import { ViewPostContext } from '../../contexts/ViewPostContext';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Comments = () => {
  const { comments, setComments, areCommentsFetched, post } = useContext(ViewPostContext);

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

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginBottom: 10 }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, marginRight: 20 }}>Comments</Text>
        <MaterialCommunityIcons name='plus' size={20} color={'white'} />
      </View>
      {areCommentsFetched ? renderComments() : <ActivityIndicator />}
    </View>
  );
};

export default Comments;
