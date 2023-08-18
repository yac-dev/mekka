import React from 'react';
import { View, Text } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const CalendarView = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Calendar
        style={{
          width: '100%',
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
