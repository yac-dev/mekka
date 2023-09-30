import React, { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Ionicons } from '@expo/vector-icons';

const AddTags = () => {
  const { navigation, addedTags, setAddedTags } = useContext(CreateNewPostContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddTags')} disabled={addedTags.length ? false : true}>
          <Text
            style={{
              color: addedTags.length ? 'white' : 'rgb(170,170,170)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('NormalPost')}>
          <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
        </TouchableOpacity>
      ),
    });
  }, [addedTags]);

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
          Add tags
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>Please add at least one tag.</Text>
      </View>
    </View>
  );
};

export default AddTags;
