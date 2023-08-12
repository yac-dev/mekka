import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { inputBackgroundColor } from '../../../../themes/color';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../../themes/color';
import { Ionicons } from '@expo/vector-icons';

const Description: React.FC = (props) => {
  const { formData, setFormData, validation, setValidation } = useContext(CreateNewSpaceContext);
  const [accordion, setAccordion] = useState<boolean>(false);
  // でも、これtopで持ってないとダメだな。

  useEffect(() => {
    if (formData.description.length && formData.name.length <= 401) {
      setValidation((previous) => {
        return {
          ...previous,
          description: true,
        };
      });
    } else {
      setValidation((previous) => {
        return {
          ...previous,
          description: false,
        };
      });
    }
  }, [formData.description]);

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
              backgroundColor: iconParameterBackgroundColorTable['lightGreen1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <MaterialIcons name='description' color={iconColorTable['lightGreen1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Description</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={validation.description ? 'rgba(45, 209, 40, 0.85)' : 'rgb(117, 117, 117)'}
          />
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </View>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>Please write the detail about this space.</Text>
          <TextInput
            placeholder='In 40 characters long'
            placeholderTextColor={'rgb(180, 180, 180)'}
            value={formData.description}
            onChangeText={(text) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  name: text,
                };
              })
            }
            autoCapitalize='none'
            style={{ backgroundColor: inputBackgroundColor, padding: 10, borderRadius: 5, color: 'white' }}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default Description;
