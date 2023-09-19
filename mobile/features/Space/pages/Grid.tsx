import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ChooseViewBottomSheet from './ChooseViewBottomSheet';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Grid = (props) => {
  const [tabView, setTabView] = useState('Grid');
  const chooseViewBottomSheetRef = useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text style={{ color: 'red' }}>Hello</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 30,
          left: 10,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
        }}
        onPress={() => chooseViewBottomSheetRef.current.snapToIndex(0)}
      >
        <MaterialCommunityIcons name='dots-grid' color='black' size={20} />
      </TouchableOpacity>
      <ChooseViewBottomSheet chooseViewBottomSheetRef={chooseViewBottomSheetRef} navigation={props.navigation} />
    </View>
  );
};

export default Grid;
