import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const MediaStats = () => {
  const { isIpad, spaceMenuBottomSheetRef, currentSpaceAndUserRelationship, currentSpace } = useContext(GlobalContext);

  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <MaterialIcons name='photo-library' size={20} color='rgb(170,170,170)' style={{ marginRight: 15 }} />
        <Text style={{ color: 'white' }}>You can post photos and videos in this space.</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Ionicons name='play-circle-sharp' size={20} color='rgb(170,170,170)' style={{ marginRight: 15 }} />
        <Text style={{ color: 'white' }}>The video length is limited to 30s.</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Fontisto name='smiley' size={20} color='rgb(170,170,170)' style={{ marginRight: 15 }} />
        <Text style={{ color: 'white' }}>You have these reaction options.</Text>
      </View>
    </View>
  );
};

export default MediaStats;
{
  /* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
<MaterialCommunityIcons name='ghost' size={20} color='white' style={{ marginRight: 15 }} />
<Text style={{ color: 'white' }}>Permanent</Text>
</View> */
}
