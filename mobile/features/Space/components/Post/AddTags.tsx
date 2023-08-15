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
    if (tagOptions.length) {
      const list = tagOptions.map((tag, index) => {
        return (
          <TouchableOpacity key={index}>
            <Text style={{ color: 'white' }}>{tag.name}</Text>
          </TouchableOpacity>
        );
      });

      return (
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return <Text style={{ color: 'white' }}>There are no created tags in this space.</Text>;
    }
  };

  const renderAddedTags = () => {
    if (formData.addedTags.length) {
      const list = formData.addedTags.map((tag, index) => {
        return (
          <TouchableOpacity key={index}>
            <Text style={{ color: 'white' }}>{tag.name}</Text>
          </TouchableOpacity>
        );
      });

      return (
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return <Text style={{ color: 'white' }}>No tags are added yet</Text>;
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'rgb(88,88,88)',
          borderRadius: 8,
        }}
        // これで、locationをaddする。地図が必要だ。そのために。
        onPress={() => navigation?.navigate('CreateTag')}
      >
        <Entypo name='globe' size={20} color='white' style={{ marginRight: 10 }} />
        <Text style={{ color: 'white' }}>Add tags</Text>
      </TouchableOpacity>
      {renderTagOptions()}
      {renderAddedTags()}
      {renderCreatedTags()}
    </View>
  );
};

export default AddTags;
