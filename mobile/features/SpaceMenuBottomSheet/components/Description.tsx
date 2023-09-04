import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';

const Description = () => {
  const { isIpad, spaceMenuBottomSheetRef, currentSpaceAndUserRelationship, currentSpace } = useContext(GlobalContext);

  return (
    <View style={{ paddingTop: 10, paddingBottom: 10 }}>
      {/* <Text>Description</Text> */}
      <Text style={{ color: 'white' }}>{currentSpaceAndUserRelationship.space.description}</Text>
    </View>
  );
};

export default Description;
