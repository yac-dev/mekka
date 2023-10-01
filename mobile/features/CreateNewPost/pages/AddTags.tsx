import React, { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const AddTags = (props) => {
  const {
    navigation,
    route,
    tagOptions,
    setTagOptions,
    addedTags,
    setAddedTags,
    createdTags,
    setCreatedTags,
    dummyCreatedTagId,
    setDummyCreatedTagId,
  } = useContext(CreateNewPostContext);

  useEffect(() => {
    if (props.route?.params?.createdTag) {
      console.log(props.route.params.createdTag);
      setCreatedTags((previous) => {
        const tagObject = {
          _id: dummyCreatedTagId,
          icon: '',
          name: props.route.params.createdTag,
        };
        return [...previous, tagObject];
      });
      setDummyCreatedTagId((previous) => previous + 1);
    }
  }, [props.route?.params?.createdTag]);

  const renderTagOptions = () => {
    // if (Object.values(tagOptions).length) {
    const list = Object.values(tagOptions).map((tag, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgb(80,80,80)',
            padding: 12,
            borderRadius: 20,
            marginRight: 10,
            marginBottom: 10,
          }}
          onPress={() => {
            if (addedTags[tag._id]) {
              setAddedTags((previous) => {
                const updating = { ...previous };
                delete updating[tag._id];
                return updating;
              });
            } else {
              setAddedTags((previous) => {
                return {
                  ...previous,
                  [tag._id]: tag,
                };
              });
            }
          }}
        >
          <FastImage
            source={{ uri: tag.icon }}
            style={{ width: 20, height: 20, marginRight: 10 }}
            tintColor={'white'}
          />
          <Text style={{ color: 'white' }}>{tag.name}</Text>
          {addedTags[tag._id] && (
            <View style={{ position: 'absolute', top: -10, right: -7 }}>
              <Ionicons name='checkmark-circle' color='green' size={25} />
            </View>
          )}
        </TouchableOpacity>
      );
    });

    return <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: 10 }}>{list}</View>;
  };

  const renderCreatedTags = () => {
    if (createdTags.length) {
      const list = createdTags.map((tag, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgb(80,80,80)',
              padding: 10,
              borderRadius: 20,
              marginRight: 10,
              marginBottom: 10,
            }}
          >
            <FastImage
              source={require('../../../assets/forApp/hashtag-normal.png')}
              style={{ width: 20, height: 20, marginRight: 10 }}
              tintColor={'white'}
            />
            <Text style={{ color: 'white', marginRight: 15 }}>{tag.name}</Text>
            <TouchableOpacity
              onPress={() =>
                setCreatedTags((previous) => {
                  const updating = [...previous];
                  return updating.filter((element, idx) => element._id !== tag._id);
                })
              }
            >
              <Ionicons name='close-circle' color='white' size={20} />
            </TouchableOpacity>
          </View>
        );
      });

      return <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: 10 }}>{list}</View>;
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Add tags #
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>Please add at least one tag.</Text>
      </View>
      {renderTagOptions()}
      {renderCreatedTags()}
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 25,
          marginTop: 30,
        }}
        onPress={() => {
          navigation.navigate('CreateNewTag');
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Ionicons name='add' color='black' size={25} style={{ marginRight: 5 }} />
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Create new?</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddTags;
