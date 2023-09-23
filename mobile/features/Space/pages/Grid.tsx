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

      {/* <ChooseViewBottomSheet chooseViewBottomSheetRef={chooseViewBottomSheetRef} navigation={props.navigation} /> */}
    </View>
  );
};

export default Grid;
