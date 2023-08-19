import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import backendAPI from '../../../apis/backend';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';

const CalendarView = (props) => {
  const [currentYearAndMonth, setCurrentYearAndMonth] = useState('');
  const [postsTable, setPostsTable] = useState({});

  console.log(postsTable);

  useEffect(() => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const key = `${year}-${month}`; // 2023-8っていう具合
    setCurrentYearAndMonth(key);
  }, []);

  const getPostsBySpaceIdAndYearAndMonth = async () => {
    const result = await backendAPI.get(`/spaces/${props.route.params.spaceId}/posts/${currentYearAndMonth}`);
    const { posts } = result.data;
    const table = {};
    posts.forEach((post) => {
      const date = new Date(post.createdAt).toISOString().substring(0, 10);
      if (!table[date]) {
        table[date] = {
          marked: true,
          thumbnail: post.content.data,
          type: post.content.type,
        };
      }
    });

    setPostsTable((previous) => {
      return {
        ...previous,
        [currentYearAndMonth]: table,
      };
    });
  };
  useEffect(() => {
    if (currentYearAndMonth) {
      if (!postsTable[currentYearAndMonth]) {
        // ここでそのyearとmonthでassetsをfetchしてくる。
        // dataがなかったら、assetsをfetchして、かつassetsTableのdataも貯めると。
        getPostsBySpaceIdAndYearAndMonth();
      }
    }
  }, [currentYearAndMonth]);

  const DayComponent = ({ date, marking }) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          width: '100%',
          aspectRatio: 1,
          paddingRight: 2,
          paddingLeft: 2,
        }}
      >
        {marking ? (
          <TouchableOpacity
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
            onPress={() =>
              // props.navigation.navigate('Date assets', {
              //   libraryId: marking.libraryId,
              //   date: date,
              //   reactionOptions: library.reactions,
              //   isCommentAvailable: library.isCommentAvailable,
              // })
              console.log(marking)
            }
          >
            {marking.type === 'photo' ? (
              <FastImage
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
                source={{
                  uri: marking.thumbnail,
                }}
              />
            ) : (
              <Video
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
                source={{
                  uri: marking.thumbnail,
                }}
                shouldPlay={true}
                useNativeControls={false}
                resizeMode='stretch'
                isLooping={false}
              />
            )}
          </TouchableOpacity>
        ) : null}

        <Text style={{ color: 'white', position: 'absolute', top: 20, textAlign: 'center', fontWeight: 'bold' }}>
          {date.day}
        </Text>
      </View>
    );
  };

  const handleMonthChange = (monthObj) => {
    setCurrentYearAndMonth(`${monthObj.year}-${monthObj.month}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Calendar
        style={{
          width: '100%',
          height: '100%',
          // aspectRatio: 1,
        }}
        horizontal={true}
        locale={'en'}
        markedDates={postsTable[currentYearAndMonth]}
        onMonthChange={handleMonthChange}
        dayComponent={DayComponent}
        theme={{
          calendarBackground: 'black',
          textSectionTitleColor: 'white',
          dayTextColor: 'white',
          arrowColor: 'white',
          monthTextColor: 'white',
          indicatorColor: 'white',
          textMonthFontWeight: 'bold',
        }}
      />
    </View>
  );
};

export default CalendarView;
