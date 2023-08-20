import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Dummy = (props) => {
  const route = useRoute();
  const tagId = route.params.tagId; // Access the tagId parameter

  console.log(tagId);
  return (
    <View>
      <Text>Dummy</Text>
    </View>
  );
};

export default Dummy;
