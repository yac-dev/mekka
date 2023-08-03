import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const CommentInput: React.FC = () => {
  const [commentInput, setCommentInput] = useState<string>('');

  return (
    <TextInput
      placeholder='Add comment...'
      placeholderTextColor={'rgb(117, 117, 117)'}
      style={{ padding: 10, borderRadius: 8, color: 'white', backgroundColor: 'rgb(70,70,70)', marginBottom: 20 }}
      autoCapitalize='none'
      value={commentInput}
      onChangeText={(text) => setCommentInput(text)}
    />
  );
};

export default CommentInput;
