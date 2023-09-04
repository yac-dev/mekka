import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const MediaStats = () => {
  const { isIpad, spaceMenuBottomSheetRef, currentSpaceAndUserRelationship, currentSpace } = useContext(GlobalContext);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
      <View style={{ width: '33%', alignItems: 'center' }}>
        <Text style={{ color: 'white', marginBottom: 5 }}>Media type</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name='photo-library' size={20} color='white' style={{ marginRight: 5 }} />
          <Text style={{ color: 'white' }}>Photo</Text>
        </View>
      </View>
      <View style={{ width: '33%', alignItems: 'center' }}>
        <Text style={{ color: 'white', marginBottom: 5 }}>Disapear</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name='ghost' size={20} color='white' style={{ marginRight: 5 }} />
          <Text style={{ color: 'white' }}>Permanent</Text>
        </View>
      </View>
      <View style={{ width: '33%', alignItems: 'center' }}>
        <Text style={{ color: 'white', marginBottom: 5 }}>Video length</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name='play-circle-sharp' size={20} color='white' style={{ marginRight: 5 }} />
          <Text style={{ color: 'white' }}>30s</Text>
        </View>
      </View>
    </View>
  );
};

export default MediaStats;
