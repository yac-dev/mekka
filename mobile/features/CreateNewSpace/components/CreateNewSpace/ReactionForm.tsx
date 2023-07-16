import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeContext } from '../../../Home/contexts/HomeContext';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { Ionicons } from '@expo/vector-icons';
import { iconColorTable, iconParameterBackgroundColorTable, inputBackgroundColor } from '../../../../themes/color';

const ReactionForm: React.FC = (props) => {
  const [accordion, setAccordion] = useState(false);
  const { formData, setFormData, navigation, route } = useContext(CreateNewSpaceContext);

  // emojipickerから帰ってきたら、emojiをarrayに入れる。
  useEffect(() => {
    if (route?.params?.selectedEmoji) {
      setFormData((previous) => {
        return {
          ...previous,
          reactions: [...previous.reactions, { emoji: route.params?.selectedEmoji, reactionIcon: '' }],
        };
      });
    }
  }, [route?.params?.selectedEmoji]);

  const renderAddedReactions = () => {
    if (formData.reactions.length) {
      const list = formData.reactions.map((reaction, index) => {
        return (
          <View
            key={index}
            style={{
              width: 50,
              height: 50,
              backgroundColor: inputBackgroundColor,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}
          >
            <Text style={{ fontSize: 40 }}>{reaction.emoji}</Text>
            <TouchableOpacity
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                position: 'absolute',
                top: -7,
                right: -7,
              }}
            >
              <Ionicons name='trash' size={15} color='white' />
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <ScrollView style={{ paddingTop: 10 }} horizontal={true}>
          <View style={{ flexDirection: 'row' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

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
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>Is it able for members to react each content.</Text>
          <View style={{ flexDirection: 'row', width: '100%', marginBottom: 15 }}>
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
                {formData.isReactionAvailable ? (
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
                      isReactionAvailable: false,
                    };
                  })
                }
              >
                <Text>No</Text>
                {!formData.isReactionAvailable ? (
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
          <Text style={{ color: 'white' }}>Please select the reaction options that can be used in this space.</Text>
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginRight: 10 }}
              onPress={() => navigation?.navigate('EmojiPicker')}
            >
              <Text style={{ color: 'white' }}>Add Emoji</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
              onPress={() => navigation?.navigate('EmojiPicker')}
            >
              <Text style={{ color: 'white' }}>Add Special Emoji</Text>
            </TouchableOpacity>
          </View>
          {renderAddedReactions()}
        </View>
      ) : null}
    </View>
  );
};

export default ReactionForm;
