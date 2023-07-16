import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../../contexts/CreateNewSpace';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { iconColorTable, iconParameterBackgroundColorTable } from '../../../../themes/color';
import Slider from '@react-native-community/slider';

const ContentTypeForm = () => {
  const [accordion, setAccordion] = useState(false);
  const { formData, setFormData } = useContext(CreateNewSpaceContext);

  const renderVideoLength = useCallback(() => {
    return (
      <Text style={{ color: 'white', alignSelf: 'flex-end', marginBottom: 15 }}>{formData.videoLength} seconds</Text>
    );
  }, [formData.videoLength]);

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
              backgroundColor: iconParameterBackgroundColorTable['yellow1'],
              marginRight: 15,
              borderRadius: 11,
            }}
          >
            <MaterialIcons name='video-library' color={iconColorTable['yellow1']} size={20} />
          </View>
          <Text style={{ color: 'white', fontSize: 18 }}>Content</Text>
        </View>
        {accordion ? (
          <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
        ) : (
          <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
        )}
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>
            What kind of content can members share in this space?
          </Text>
          <View style={{ flexDirection: 'row', width: '100%', marginBottom: 15 }}>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 5, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      contentType: 'photo',
                    };
                  })
                }
              >
                <Text>Photo</Text>
              </TouchableOpacity>
              {formData.contentType === 'photo' ? (
                <Ionicons
                  name='checkmark-circle'
                  size={20}
                  color={'green'}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
              ) : null}
            </View>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 5, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      contentType: 'video',
                    };
                  })
                }
              >
                <Text>Video</Text>
              </TouchableOpacity>
              {formData.contentType === 'video' ? (
                <Ionicons
                  name='checkmark-circle'
                  size={20}
                  color={'green'}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
              ) : null}
            </View>
          </View>
          <Text style={{ marginBottom: 10, color: 'white' }}>
            How many seconds of video can members post in this space?
          </Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={5}
            maximumValue={180}
            minimumTrackTintColor='#FFFFFF'
            maximumTrackTintColor='#000000'
            step={1}
            value={formData.videoLength}
            lowerLimit={5}
            onValueChange={(value) =>
              setFormData((previous) => {
                return {
                  ...previous,
                  videoLength: value,
                };
              })
            }
          />
          {renderVideoLength()}
          <View>
            <Text style={{ color: 'white' }}>How long will members' posts stay?</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', borderRadius: 7, marginRight: 10 }}>
              <Text style={{ color: 'white' }}>Permanent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', borderRadius: 7, marginRight: 10 }}>
              <Text style={{ color: 'white' }}>1 hour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', borderRadius: 7, marginRight: 10 }}>
              <Text style={{ color: 'white' }}>24 hours</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ContentTypeForm;
