import React from 'react';
import { View, Text } from 'react-native';

const NoSpaces = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20, marginBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          No spaces...
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          You haven't joined any spaces now. Enter key-code, discover new space or open new space to start sharing.
        </Text>
      </View>
    </View>
  );
};

export default NoSpaces;
