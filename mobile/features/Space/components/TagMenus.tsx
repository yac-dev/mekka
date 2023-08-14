import React from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const TagMenus = () => {
  return (
    <View>
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <TouchableOpacity style={{ padding: 10, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <MaterialCommunityIcons name='dots-grid' size={20} style={{ marginRight: 7 }} color={'white'} />
            <Text style={{ color: 'white' }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <MaterialCommunityIcons name='map' size={20} style={{ marginRight: 7 }} color={'white'} />
            <Text style={{ color: 'white' }}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <MaterialCommunityIcons name='calendar-month' size={20} style={{ marginRight: 7 }} color={'white'} />
            <Text style={{ color: 'white' }}>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <Feather name='hash' size={20} style={{ marginRight: 7 }} color={'white'} />
            <Text style={{ color: 'white' }}>Nice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <Ionicons name='airplane' size={20} style={{ marginRight: 7 }} color={'white'} />
            <Text style={{ color: 'white' }}>Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <MaterialCommunityIcons name='ninja' size={20} style={{ marginRight: 7 }} color={'white'} />
            <Text style={{ color: 'white' }}>Tokyo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TagMenus;
