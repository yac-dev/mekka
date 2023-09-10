import React from 'react';
import { View, Text } from 'react-native';

const MomentoPost = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Create New Momento
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          In this space, the momento post will be automatically disappeared and no longer visible after 1 hour.
        </Text>
      </View>
    </View>
  );
};

export default MomentoPost;
