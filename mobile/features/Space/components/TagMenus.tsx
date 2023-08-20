import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
// import { SpaceContext } from '../contexts/SpaceContext';
import { SpaceRootContext } from '../contexts/SpaceRootContext';
import { iconColorTable } from '../../../themes/color';

const TagMenus = () => {
  const { tags, space, selectedTag, setSelectedTag, topTabHeight } = useContext(SpaceRootContext);

  const renderTags = () => {
    if (tags.length) {
      const list = tags.map((tag, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
              backgroundColor: selectedTag?._id === tag._id ? iconColorTable['gray1'] : null,
              borderRadius: 5,
            }}
            // onPress={() => navigation?.navigate('TaggedPosts', { tag })}
            onPress={() => setSelectedTag(tag)}
          >
            <Feather name='hash' size={15} style={{}} color={'white'} />
            <Text style={{ color: 'white', marginRight: 10 }}>{tag.name}</Text>
            <Text style={{ color: 'white' }}>{tag.count}</Text>
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
      <View style={{ position: 'absolute', width: '100%', top: topTabHeight }}>
        <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // padding: 5,
              height: 60,
            }}
          >
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
