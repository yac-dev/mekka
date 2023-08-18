import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const TaggedPosts = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            fontWeight: 'bold',
          }}
        >
          #{props.route.params.tag.name}
        </Text>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <Text style={{ color: 'white' }}>Tagged posts</Text>
    </View>
  );
};

export default TaggedPosts;
