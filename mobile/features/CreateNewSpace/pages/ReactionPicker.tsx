import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { emojis } from '../../../utils/emojis';
import { ReactionPickerContext } from '../contexts/ReactionPickerContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Emojis = ({ emojiType }) => {
  const { isIpad } = useContext(GlobalContext);
  const { selectedReactions, setSelectedReactions } = useContext(ReactionPickerContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 15 : Dimensions.get('window').width / 9;

  const renderEmojis = () => {
    const [emojiOptions, setEmojiOptions] = useState(emojis[emojiType]);

    // const list = emojis[emojiType].map((emoji, index) => {
    //   return (
    // <View key={index} style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
    //   <TouchableOpacity
    //     style={{
    //       width: '100%',
    //       height: '100%',
    //       // backgroundColor: 'red',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       borderRadius: 5,
    //     }}
    //     // onPress={() => {
    //     //   setSelectedReaction({ type: 'emoji', emoji: emoji, sticker: undefined });
    //     // }}
    //   >
    //     <Text style={{ fontSize: 35 }}>{emoji}</Text>
    //   </TouchableOpacity>
    // </View>
    //   );
    // });

    // return (
    //   <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
    //     <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{list}</View>
    //   </ScrollView>
    // );
    return (
      <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 10 }}>
        <FlatList
          data={emojiOptions}
          numColumns={9}
          renderItem={({ item }) => {
            return (
              <View style={{ width: oneGridWidth, aspectRatio: 1, padding: 3 }}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    // setSelectedReaction({ type: 'emoji', emoji: emoji, sticker: undefined });
                    setSelectedReactions((previous) => [...previous, item]);
                    setEmojiOptions((previous) => {
                      const updating = [...previous];
                      return updating.filter((element) => element !== item);
                    });
                  }}
                >
                  <Text style={{ fontSize: 35 }}>{item}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => `${item}-${index}`}
        />
      </View>
    );
  };

  return <>{renderEmojis()}</>;
};

const ReactionPicker = () => {
  const [selectedReactions, setSelectedReactions] = useState([]); // {emoji: true}

  const renderSelectedEmojis = () => {
    if (selectedReactions.length) {
      const list = selectedReactions.map((emoji, index) => {
        return (
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'rgb(80, 80, 80)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8,
            }}
          >
            <Text style={{ fontSize: 40 }}>{emoji}</Text>
            <TouchableOpacity style={{ position: 'absolute', top: -5, right: -5 }}>
              <AntDesign name='minuscircle' color={'red'} size={20} />
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 20 }}>
          {list}
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <ReactionPickerContext.Provider value={{ selectedReactions, setSelectedReactions }}>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
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
            Add Reactions
          </Text>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            Please choose at most 6 reaction options.
          </Text>
        </View>
        {renderSelectedEmojis()}
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgb(40,40,40)',
              // marginHorizontal: 90,
              // paddingBottom: 0, // きたー。これよ。これ。
              // borderRadius: 30,
              height: 60,
              borderTopWidth: 0,
              paddingTop: 5,
              paddingBottom: 5,
              // position: 'absolute',
              // bottom: 30,
              // justifyContent: 'center',
              // alignItems: 'center',
            },
          }}
        >
          <Tab.Screen
            name='SmileyAndPeople'
            // component={(props) => <Emojis emojiType={'smileyAndPeople'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => <Text style={{ fontSize: 25 }}>😁</Text>,
            })}
          >
            {(props) => <Emojis emojiType={'smileyAndPeople'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Symbols'
            // component={(props) => <Emojis emojiType={'symbols'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => <Text style={{ fontSize: 25 }}>❤️</Text>,
            })}
          >
            {(props) => <Emojis emojiType={'symbols'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='AnimalsAndNature'
            // component={(props) => <Emojis emojiType={'animalsAndNature'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => <Text style={{ fontSize: 25 }}>🐶</Text>,
            })}
          >
            {(props) => <Emojis emojiType={'animalsAndNature'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='FoodAndDrink'
            // component={(props) => <Emojis emojiType={'foodAndDrink'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => <Text style={{ fontSize: 25 }}>🍕</Text>,
            })}
          >
            {(props) => <Emojis emojiType={'foodAndDrink'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Activity'
            // component={(props) => <Emojis emojiType={'activity'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => <Text style={{ fontSize: 25 }}>🎾</Text>,
            })}
          >
            {(props) => <Emojis emojiType={'activity'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='TravelAndPlaces'
            // component={(props) => <Emojis emojiType={'travelAndPlaces'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => <Text style={{ fontSize: 25 }}>✈️</Text>,
            })}
          >
            {(props) => <Emojis emojiType={'travelAndPlaces'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Objects'
            // component={(props) => <Emojis emojiType={'objects'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => <Text style={{ fontSize: 25 }}>📱</Text>,
            })}
          >
            {(props) => <Emojis emojiType={'objects'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Flags'
            // component={(props) => <Emojis emojiType={'flags'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => <Text style={{ fontSize: 25 }}>🌎</Text>,
            })}
          >
            {(props) => <Emojis emojiType={'flags'} {...props} />}
          </Tab.Screen>
          {/* <Tab.Screen name='Sticker' component={HomeScreen} /> */}
        </Tab.Navigator>
      </View>
    </ReactionPickerContext.Provider>
  );
};

export default ReactionPicker;
