import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { emojis } from '../../../utils/emojis';
import { ReactionPickerContext } from '../contexts/ReactionPickerContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Emojis = ({ emojiType }) => {
  const { selectedReactions, setSelectedReactions } = useContext(ReactionPickerContext);

  const renderEmojis = () => {
    const list = emojis[emojiType].map((emoji, index) => {
      return (
        <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setSelectedReaction({ type: 'emoji', emoji: emoji, sticker: undefined });
            }}
          >
            <Text style={{ fontSize: 35 }}>{emoji}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{list}</View>
      </ScrollView>
    );
  };
};

const ReactionPicker = () => {
  const [selectedReactions, setSelectedReactions] = useState({}); // {emoji: true}

  return (
    <ReactionPickerContext.Provider value={{ selectedReactions, setSelectedReactions }}>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Tab.Navigator>
          <Tab.Screen name='Sticker' component={HomeScreen} />
          <Tab.Screen name='SmileyAndPeople' component={SettingsScreen} />
          <Tab.Screen name='Symbols' component={SettingsScreen} />
          <Tab.Screen name='AnimalsAndNature' component={SettingsScreen} />
          <Tab.Screen name='FoodAndDrink' component={SettingsScreen} />
          <Tab.Screen name='Activity' component={SettingsScreen} />
          <Tab.Screen name='TravelAndPlaces' component={SettingsScreen} />
          <Tab.Screen name='Objects' component={SettingsScreen} />
          <Tab.Screen name='Flags' component={SettingsScreen} />
        </Tab.Navigator>
      </View>
    </ReactionPickerContext.Provider>
  );
};

export default ReactionPicker;
