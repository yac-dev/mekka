import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { secondaryBaackgroundColor } from '../../../themes/color';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// これをもとに、各parameterに対してpropsを渡して項目を作るかんじだな。

interface MekkaParameterProps {
  parameter: string;
}

const MekkaParameter: React.FC = (props) => {
  return (
    <View style={{ backgroundColor: secondaryBaackgroundColor, padding: 7, borderRadius: 5, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => console.log('hello')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: 'red',
              padding: 5,
              borderRadius: 7,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <AntDesign name='edit' size={25} color={'red'} />
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white', marginRight: 10 }}>{props.parameter}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={stageCleared.title ? iconColorsTable['green1'] : disabledTextColor}
            style={{ marginRight: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setAccordion((previous) => {
                return {
                  ...previous,
                  title: !previous.title,
                };
              })
            }
          >
            <MaterialCommunityIcons
              name={accordion.title ? 'chevron-up' : 'chevron-down'}
              color={baseTextColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* {accordion.title ? (
        <View style={{ marginTop: 10 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <Text style={{ fontSize: 13, color: baseTextColor }}>
              Please write the library name in simple and catchy.
            </Text>
            {renderTitleLength()}
          </View>
          <TextInput
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: inputBackgroundColorNew,
              color: baseTextColor,
              borderRadius: 5,
            }}
            inputAccessoryViewID={inputAccessoryViewID}
            value={formData.title}
            onChangeText={(text) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  title: text,
                };
              })
            }
            autoCapitalize='none'
          />
          <InputAccessoryView
            nativeID={inputAccessoryViewID}
            backgroundColor={sectionBackgroundColor}
            // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
          >
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  setAccordion((previous) => {
                    return {
                      ...previous,
                      title: !previous.title,
                    };
                  });
                }}
              >
                <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        </View>
      ) : null} */}
    </View>
  );
};

export default MekkaParameter;
