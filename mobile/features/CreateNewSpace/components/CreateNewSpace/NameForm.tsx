import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { inputBackgroundColor } from '../../../../themes/color';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../../themes/color';
import { Ionicons } from '@expo/vector-icons';

const NameForm: React.FC = (props) => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);
  const [accordion, setAccordion] = useState<boolean>(false);
  // でも、これtopで持ってないとダメだな。

  // validationは後でいいや。
  // useEffect(() => {
  //   if (formData.name.length) {
  //   }
  // }, [formData.name]);

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
              backgroundColor: iconParameterBackgroundColorTable['red1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <Ionicons name='home' color={iconColorTable['red1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18 }}>Name</Text>
        </View>
        {accordion ? (
          <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
        ) : (
          <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
        )}
      </View>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>Please write the space name. Be unique.</Text>
          <TextInput
            placeholder='In 40 characters long'
            placeholderTextColor={'white'}
            value={formData.name}
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

export default NameForm;
