import React, { useState, useContext, memo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { emojis } from '../../../utils/emojis';
import { ReactionPickerContext } from '../contexts/ReactionPickerContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { AntDesign } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import EmojisByCategory from '../components/EmojisByCategory';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const ReactionPicker = () => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);
  const [selectedReactions, setSelectedReactions] = useState({}); // {emoji: true}
  // ここでemojiOptionsを持っておかないとだめかね。。。
  // const renderSelectedEmojis = () => {
  //   if (selectedReactions.length) {
  //     const list = selectedReactions.map((emoji, index) => {
  //       return (
  //         <View
  //           style={{
  //             width: 50,
  //             height: 50,
  //             backgroundColor: 'rgb(80, 80, 80)',
  //             borderRadius: 15,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             marginRight: 8,
  //           }}
  //         >
  //           <Text style={{ fontSize: 40 }}>{emoji}</Text>
  //           <TouchableOpacity style={{ position: 'absolute', top: -5, right: -5 }}>
  //             <AntDesign name='minuscircle' color={'red'} size={20} />
  //           </TouchableOpacity>
  //         </View>
  //       );
  //     });

  //     return <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>{list}</View>;
  //   } else {
  //     return null;
  //   }
  // };

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
        {/* {renderSelectedEmojis()} */}
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
            name='People'
            // component={(props) => <Emojis emojiType={'smileyAndPeople'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Fontisto name='smiley' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
              ),
            })}
          >
            {/* {(props) => <Emojis emojiType={'smileyAndPeople'} {...props} />} */}
            {(props) => <EmojisByCategory category={'people'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Symbols'
            // component={(props) => <Emojis emojiType={'objects'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Ionicons name='heart' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
              ),
            })}
          >
            {(props) => <EmojisByCategory category={'symbols'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Nature'
            // component={(props) => <Emojis emojiType={'smileyAndPeople'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <MaterialCommunityIcons name='dog' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
              ),
            })}
          >
            {/* {(props) => <Emojis emojiType={'smileyAndPeople'} {...props} />} */}
            {(props) => <EmojisByCategory category={'nature'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Food'
            // component={(props) => <Emojis emojiType={'symbols'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Ionicons name='pizza' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
              ),
            })}
          >
            {(props) => <EmojisByCategory category={'food'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Activity'
            // component={(props) => <Emojis emojiType={'animalsAndNature'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Ionicons name='tennisball' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
              ),
            })}
          >
            {(props) => <EmojisByCategory category={'activity'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Travel'
            // component={(props) => <Emojis emojiType={'foodAndDrink'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <MaterialIcons name='flight' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
              ),
            })}
          >
            {(props) => <EmojisByCategory category={'travel'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Objects'
            // component={(props) => <Emojis emojiType={'travelAndPlaces'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Foundation name='telephone' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
              ),
            })}
          >
            {(props) => <EmojisByCategory category={'objects'} {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name='Flags'
            // component={(props) => <Emojis emojiType={'flags'} {...props} />}
            options={({ navigation, route }) => ({
              tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Entypo name='globe' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
              ),
            })}
          >
            {(props) => <EmojisByCategory category={'flags'} {...props} />}
          </Tab.Screen>
          {/* <Tab.Screen name='Sticker' component={HomeScreen} /> */}
        </Tab.Navigator>
      </View>
    </ReactionPickerContext.Provider>
  );
};

export default ReactionPicker;
