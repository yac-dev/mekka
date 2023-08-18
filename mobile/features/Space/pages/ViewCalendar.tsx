import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import backendAPI from '../../../apis/backend';

const CalendarView = (props) => {
  const [currentYearAndMonth, setCurrentYearAndMonth] = useState('');
  const [postsTable, setPostsTable] = useState({});

  useEffect(() => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const key = `${year}-${month}`; // 2023-8っていう具合
    setCurrentYearAndMonth(key);
  }, []);

  const getPostsByYearAndMonth = async () => {
    const result = await backendAPI.get(
      `/posts/${props.route.params.spaceId}/yearandmonth?yearAndMonth=${currentYearAndMonth}`
    );
    const { posts } = result.data;
    const table = {};
    posts.forEach((post) => {
      const date = new Date(post.createdAt).toISOString().substring(0, 10);
      if (!table[date]) {
        table[date] = {
          marked: true,
          thumbnail: post.content.data,
        };
      }
      // }
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
        getPostsByYearAndMonth();
      }
    }
  }, [currentYearAndMonth]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Calendar
        style={{
          width: '100%',
          height: '100%',
          // aspectRatio: 1,
        }}
        // horizontal={true}
        locale={'en'}
        // markedDates={assetsTable[currentYearAndMonth]}
        // onMonthChange={handleMonthChange}
        // dayComponent={DayComponent}
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
