import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ThumbnailParameter: React.FC = (props) => {
  const [accordion, setAccordion] = useState(false);

  return (
    <TouchableOpacity
      style={{ padding: 7, borderRadius: 5, marginBottom: 10, backgroundColor: 'rgb(50,50,50)' }}
      onPress={() => setAccordion((previous) => !previous)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',
              marginRight: 15,
              borderRadius: 5,
            }}
          >
            <AntDesign name='plus' color='red' size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18 }}>Thumbnail</Text>
        </View>
        <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
      </View>
      {accordion ? (
        <View>
          <Text>Accordion here</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default ThumbnailParameter;
