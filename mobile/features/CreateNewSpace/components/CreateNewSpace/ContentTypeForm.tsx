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
  const { formData, setFormData, validation, setValidation } = useContext(CreateNewSpaceContext);

  console.log(formData);

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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name='checkmark-circle'
            size={20}
            color={validation.contentType ? 'rgba(45, 209, 40, 0.85)' : 'rgb(117, 117, 117)'}
          />
          {accordion ? (
            <MaterialCommunityIcons name='chevron-up' color='white' size={20} />
          ) : (
            <MaterialCommunityIcons name='chevron-down' color='white' size={20} />
          )}
        </View>
      </TouchableOpacity>
      {accordion ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 10, color: 'white' }}>
            📸 What kind of content can members share in this space?
          </Text>
          <View style={{ flexDirection: 'row', width: '100%', marginBottom: 2 }}>
            <View style={{ width: '50%', padding: 2 }}>
              <TouchableOpacity
                style={{ backgroundColor: 'rgb(88,88,88)', padding: 10, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      contentType: 'photo',
                    };
                  })
                }
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Photo</Text>
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
                style={{ backgroundColor: 'rgb(88,88,88)', padding: 10, borderRadius: 5 }}
                onPress={() =>
                  setFormData((previous) => {
                    return {
                      ...previous,
                      contentType: 'video',
                    };
                  })
                }
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Video</Text>
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
          <TouchableOpacity
            style={{ width: '100%', backgroundColor: 'rgb(88,88,88)', padding: 10, borderRadius: 5, marginBottom: 15 }}
            onPress={() =>
              setFormData((previous) => {
                return {
                  ...previous,
                  contentType: 'photoAndVideo',
                };
              })
            }
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Photo & Video</Text>
            {formData.contentType === 'photoAndVideo' ? (
              <Ionicons
                name='checkmark-circle'
                size={20}
                color={'green'}
                style={{ position: 'absolute', top: 0, right: 0 }}
              />
            ) : null}
          </TouchableOpacity>
          {formData.contentType === 'video' ? (
            <>
              <Text style={{ marginBottom: 10, color: 'white' }}>
                ⏱ How many seconds of video can members post in this space? e.g.) On tiktok, each video is limited up to
                60 seconds.
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
              <Text style={{ color: 'white', marginBottom: 10 }}>
                ⏳ How long will members' posts stay? e.g.) On instagram story, your post will be disappeard after 24
                hours.
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, marginRight: 10 }}
                  onPress={() =>
                    setFormData((previous) => {
                      return {
                        ...previous,
                        stay: '',
                      };
                    })
                  }
                >
                  <Text style={{ color: 'white' }}>Permanent</Text>
                  {!formData.stay ? (
                    <Ionicons
                      name='checkmark-circle'
                      size={20}
                      color={'green'}
                      style={{ position: 'absolute', top: 0, right: 0 }}
                    />
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, marginRight: 10 }}
                  onPress={() =>
                    setFormData((previous) => {
                      return {
                        ...previous,
                        stay: '1',
                      };
                    })
                  }
                >
                  <Text style={{ color: 'white' }}>1 hour</Text>
                  {formData.stay === '1' ? (
                    <Ionicons
                      name='checkmark-circle'
                      size={20}
                      color={'green'}
                      style={{ position: 'absolute', top: 0, right: 0 }}
                    />
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, marginRight: 10 }}
                  onPress={() =>
                    setFormData((previous) => {
                      return {
                        ...previous,
                        stay: '24',
                      };
                    })
                  }
                >
                  <Text style={{ color: 'white' }}>24 hours</Text>
                  {formData.stay === '24' ? (
                    <Ionicons
                      name='checkmark-circle'
                      size={20}
                      color={'green'}
                      style={{ position: 'absolute', top: 0, right: 0 }}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default ContentTypeForm;
