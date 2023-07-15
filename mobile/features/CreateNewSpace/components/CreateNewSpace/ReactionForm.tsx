import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeContext } from '../../../Home/contexts/HomeContext';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { Ionicons } from '@expo/vector-icons';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../../themes/color';

const ReactionForm = () => {
  const [accordion, setAccordion] = useState(false);
  const { navigation } = useContext(HomeContext);
  const { formData, setFormData } = useContext(CreateNewSpaceContext);

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
              backgroundColor: iconParameterBackgroundColorTable['pink1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <Ionicons name='heart' color={iconColorTable['pink1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18 }}>Reaction</Text>
        </View>
        {accordion ? (
          <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
        ) : (
          <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
        )}
      </View>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>Is it able for members to react each content.</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 5, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      isReactionAvailable: true,
                    };
                  })
                }
              >
                <Text>Yes</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 5, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      isReactionAvailable: false,
                    };
                  })
                }
              >
                <Text>No</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: 'blue', padding: 5, borderRadius: 5 }}
            onPress={() => navigation?.navigate('EmojiPicker')}
          >
            <Text>Emoji</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default ReactionForm;
