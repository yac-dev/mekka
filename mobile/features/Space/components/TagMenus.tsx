import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SpaceContext } from '../contexts/SpaceContext';

const TagMenus = () => {
  const { tags, navigation, space } = useContext(SpaceContext);

  const renderTags = () => {
    if (tags.length) {
      const list = tags.map((tag, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{ padding: 10, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
            onPress={() => navigation?.navigate('TaggedPosts', { tag })}
          >
            <Feather name='hash' size={15} style={{}} color={'white'} />
            <Text style={{ color: 'white' }}>{tag.name}</Text>
          </TouchableOpacity>
        );
      });

      return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>;
    } else {
      return null;
    }
  };

  if (space) {
    return (
      <View>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <TouchableOpacity
              style={{ padding: 10, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
              // onPress={() => navigation?.navigate('ViewMap', { spaceId: space._id })}
            >
              <MaterialCommunityIcons name='dots-grid' size={20} style={{ marginRight: 7 }} color={'white'} />
              <Text style={{ color: 'white' }}>All</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{ padding: 10, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
              onPress={() => navigation?.navigate('ViewCalendar', { spaceId: space._id })}
            >
              <MaterialCommunityIcons name='calendar-month' size={20} style={{ marginRight: 7 }} color={'white'} />
              <Text style={{ color: 'white' }}>Calendar</Text>
            </TouchableOpacity> */}
            {renderTags()}
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return null;
  }
};

export default TagMenus;
