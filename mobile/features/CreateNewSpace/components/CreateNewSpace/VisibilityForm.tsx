import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../../themes/color';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const VisibilityForm = () => {
  const [accordion, setAccordion] = useState(false);
  const { formData, setFormData } = useContext(CreateNewSpaceContext);

  return (
    <View style={{ padding: 7, borderRadius: 5, marginBottom: 10, backgroundColor: 'rgb(50,50,50)' }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => setAccordion((previous) => !previous)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: iconParameterBackgroundColorTable['green1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <MaterialIcons name='public' color={iconColorTable['green1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18 }}>Visibility</Text>
        </View>
        {accordion ? (
          <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
        ) : (
          <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
        )}
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>Is this space publicly accesible?</Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 5, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      isPublic: true,
                    };
                  })
                }
              >
                <Text>Public</Text>
                {formData.isPublic ? (
                  <Ionicons
                    name='checkmark-circle'
                    size={20}
                    color={'green'}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 5, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      isPublic: false,
                    };
                  })
                }
              >
                <Text>Private</Text>
                {!formData.isPublic ? (
                  <Ionicons
                    name='checkmark-circle'
                    size={20}
                    color={'green'}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default VisibilityForm;
