import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import backendAPI from '../../../apis/backend';

const Home = (props) => {
  const [space, setSpace] = useState();
  // const getSpace = async() => {
  //   const result = await backendAPI.get(`/space/${props.route.params.spaceId}`);
  //   const {space} = result.data;
  //   setSpace(space);
  // }
  // useEffect(() => {
  //   getSpace()
  // },[])

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <Text style={{ color: 'white' }}>Grid here</Text>
    </View>
  );
};

export default Home;
