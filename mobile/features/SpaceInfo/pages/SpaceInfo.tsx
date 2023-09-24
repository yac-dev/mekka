import React, { useContext, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import FastImage from 'react-native-fast-image';
import { Feather } from '@expo/vector-icons';
import SpaceInfoTopTabNavigator from '../../../navigations/SpaceInfoTopTabNavigator';

const SpaceInfo = (props) => {
  const { currentSpaceAndUserRelationship, spaceMenuBottomSheetRef, currentSpace } = useContext(GlobalContext);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3);
    // console.log(e.nativeEvent);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(30,30,30)', padding: 10 }}>
      <View style={{ height: 200, width: '100%', marginBottom: 10 }}>
        <FastImage
          source={{ uri: currentSpaceAndUserRelationship.space.icon }}
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
        />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, position: 'absolute', bottom: 10, left: 10 }}>
          {currentSpaceAndUserRelationship.space.name}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 25,
            height: 25,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
          onPress={() => props.navigation.navigate('ReportSpace')}
        >
          <Feather name='more-horizontal' color='black' size={20} />
        </TouchableOpacity>
      </View>
      <SpaceInfoTopTabNavigator />
    </View>
  );
};

export default SpaceInfo;
