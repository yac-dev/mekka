import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { emojis } from '../../../../utils/emojis';
import { GlobalContext } from '../../../../contexts/GlobalContext';
import { inputBackgroundColor } from '../../../../themes/color';
import { iconParameterBackgroundColorTable } from '../../../../themes/color';

// smilyAndPeople, animalsAndNature, foodAndDrink, objects, flags, symbols, travelAndPlaces, activity

const EmojiPicker: React.FC = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 8;
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [filterOption, setFilterOption] = useState('smileyAndPeople');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          // このmergeって、初めて知ったな。
          onPress={() => props.navigation.navigate({ name: 'CreateNewSpace', params: { selectedEmoji }, merge: true })}
          disabled={selectedEmoji ? false : true}
        >
          <Text
            style={{
              color: selectedEmoji ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedEmoji]);

  const renderEmojis = () => {
    const list = emojis[filterOption].map((emoji, index) => {
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
              setSelectedEmoji(emoji);
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
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: inputBackgroundColor,
          borderRadius: 8,
          marginTop: 10,
          marginBottom: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 80 }}>{selectedEmoji}</Text>
      </View>
      {renderEmojis()}
      <ScrollView
        horizontal={true}
        style={{ backgroundColor: 'black', position: 'absolute', width: '100%', bottom: 0 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // alignSelf: 'center',
            // paddingTop: 5,
            // paddingBottom: 5,
            // padding: 5,
          }}
        >
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'smileyAndPeople' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('smileyAndPeople')}
            >
              <Text style={{ fontSize: 35 }}>😀</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'animalsAndNature' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('animalsAndNature')}
            >
              <Text style={{ fontSize: 35 }}>🐶</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'foodAndDrink' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('foodAndDrink')}
            >
              <Text style={{ fontSize: 35 }}>🍕</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'activity' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('activity')}
            >
              <Text style={{ fontSize: 35 }}>🎾</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'travelAndPlaces' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('travelAndPlaces')}
            >
              <Text style={{ fontSize: 35 }}>✈️</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'objects' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('objects')}
            >
              <Text style={{ fontSize: 35 }}>📱</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'symbols' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('symbols')}
            >
              <Text style={{ fontSize: 35 }}>❤️</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: filterOption === 'flags' ? 'rgba(45, 209, 40, 0.85)' : null,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              onPress={() => setFilterOption('flags')}
            >
              <Text style={{ fontSize: 35 }}>🌎</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmojiPicker;
