import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import backendAPI from '../../../apis/backend';

const SpaceDetail = (props) => {
  // queryをする必要もないか。多分。

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text style={{ color: 'white' }}>About space</Text>
      <TouchableOpacity style={{ padding: 10 }} onPress={() => props.navigation.navigate('Dummy')}>
        <Text style={{ color: 'red' }}>route</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SpaceDetail;
