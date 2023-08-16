import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Comments = (props) => {
  return (
    <View>
      <Text>Comments</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Dummy')}>
        <Text>Route</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Comments;
