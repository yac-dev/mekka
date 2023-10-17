import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Moment = () => {
  const [selectedHour, setSelectedHour] = useState();
  const [selectedMin, setSelectedMin] = useState();

  function formatTime(inputSeconds) {
    if (inputSeconds < 0) {
      return 'Invalid input';
    }

    const minutes = Math.floor(inputSeconds / 60);
    const seconds = inputSeconds % 60;

    return {
      minutes: minutes,
      seconds: seconds,
    };
  }

  function calculateMinutes(hours, minutes) {
    const hourNumber = Number(hours);
    const minNumber = Number(minutes);

    return hourNumber * 60 + minNumber;
  }

  // 最後は、これの逆をやればいいのかな。
  // useEffect(() => {
  //   const res = formatTime(formData.videoLength);
  //   console.log(res);
  //   setSelectedMin(res.minutes.toString());
  //   setSelectedSec(res.seconds.toString());
  // }, []);

  // useEffect(() => {
  //   const seconds = calculateSeconds(selectedMin, selectedSec);
  //   setFormData((previous) => {
  //     return {
  //       ...previous,
  //       videoLength: seconds,
  //     };
  //   });
  // }, [selectedMin, selectedSec]);

  const renderHourPickerItems = () => {
    const secArr = Array.from({ length: 24 }, (x, i) => i);
    const list = secArr.map((sec, index) => {
      return <Picker.Item key={index} label={sec.toString()} value={sec.toString()} color='white' />;
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          selectedValue={selectedHour}
          onValueChange={(itemValue, itemIndex) => setSelectedHour(itemValue)}
          style={{ width: 100 }}
        >
          {list}
        </Picker>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>hours</Text>
      </View>
    );
  };

  const renderMinPickerItems = () => {
    const minArr = Array.from({ length: 60 }, (x, i) => i);
    const list = minArr.map((min, index) => {
      return <Picker.Item key={index} label={min.toString()} value={min.toString()} color='white' />;
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Picker
          selectedValue={selectedMin}
          onValueChange={(itemValue, itemIndex) => setSelectedMin(itemValue)}
          style={{ width: 50, marginRight: 20 }}
        >
          {list}
        </Picker>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>min</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 50 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Set Moment
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>You can post </Text>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        {renderHourPickerItems()}
        {renderMinPickerItems()}
      </View>
    </View>
  );
};

export default Moment;
