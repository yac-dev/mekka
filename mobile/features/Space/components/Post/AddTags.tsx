import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PostContext } from '../../contexts/PostContext';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const AddTags = () => {
  const { navigation, route, setFormData, formData, tagOptions } = useContext(PostContext);

  useEffect(() => {
    if (route?.params?.createdTag) {
      setFormData((previous) => {
        return {
          ...previous,
          createdTags: [...previous.createdTags, route?.params?.createdTag],
        };
      });
    }
  }, [route?.params?.createdTag]);

  const renderTagOptions = () => {
    if (Object.values(tagOptions).length) {
      const list = Object.values(tagOptions).map((tag, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: formData.addedTags[tag._id] ? 'red' : 'rgb(88,88,88)',
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              if (formData.addedTags[tag._id]) {
                setFormData((previous) => {
                  const updating = { ...previous.addedTags };
                  delete updating[tag._id];
                  return {
                    ...previous,
                    addedTags: updating,
                  };
                });
              } else {
                setFormData((previous) => {
                  return {
                    ...previous,
                    addedTags: {
                      ...previous.addedTags,
                      [tag._id]: tag,
                    },
                  };
                });
              }
            }}
          >
            <Feather name='hash' size={20} style={{ marginRight: 7 }} color={'white'} />
            <Text style={{ color: 'white' }}>{tag.name}</Text>
          </TouchableOpacity>
        );
      });

      return (
        <View>
          <ScrollView horizontal={true} style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
          </ScrollView>
          <Text style={{ color: 'white', marginBottom: 20, textAlign: 'center' }}>Or</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: 'rgb(88,88,88)',
              borderRadius: 8,
            }}
            onPress={() => navigation?.navigate('CreateTag')}
          >
            <Entypo name='globe' size={20} color='white' style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Add tags</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <Text style={{ color: 'white' }}>There are no created tags in this space.</Text>;
    }
  };

  const renderAddedTags = () => {
    if (formData.addedTags.length) {
      const list = formData.addedTags.map((tag, index) => {
        return (
          <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name='hash' size={20} style={{ marginRight: 7 }} color={'white'} />
            <Text style={{ color: 'white' }}>{tag.name}</Text>
          </TouchableOpacity>
        );
      });

      return (
        <View>
          <ScrollView horizontal={true} style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{list}</View>
          </ScrollView>
          <Text style={{ color: 'white', marginBottom: 20, textAlign: 'center' }}>or</Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: 'rgb(88,88,88)',
              borderRadius: 8,
            }}
            onPress={() => navigation?.navigate('CreateTag')}
          >
            <Entypo name='globe' size={20} color='white' style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Add tags</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderCreatedTags = () => {
    if (formData.createdTags.length) {
      const list = formData.createdTags.map((tagName, index) => {
        return (
          <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name='hash' size={20} style={{ marginRight: 7 }} color={'white'} />
            <Text style={{ color: 'white' }}>{tagName}</Text>
          </TouchableOpacity>
        );
      });

      return (
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  return (
    <View>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 15 }}>Add tags?</Text>
      {renderTagOptions()}
      {renderAddedTags()}
      {/* {renderCreatedTags()} */}
    </View>
  );
};

export default AddTags;
