import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SpaceDetailContext } from '../../contexts/SpaceDetailContext';

const Stats = () => {
  const { space } = useContext(SpaceDetailContext);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 10,
          paddingRight: 10,
          paddingLeft: 10,
          alignSelf: 'center',
        }}
      >
        <View style={{ padding: 15, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>Posts</Text>
          <Text style={{ color: 'rgb(170, 170, 170)', fontSize: 17 }}>{space.totalPosts}</Text>
        </View>
        <View style={{ padding: 15, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>Members</Text>
          <Text style={{ color: 'rgb(170, 170, 170)', fontSize: 17 }}>{space.totalMembers}</Text>
        </View>
        <View style={{ padding: 15, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>Rate</Text>
          <Text style={{ color: 'rgb(170, 170, 170)', fontSize: 17 }}>{space.rate}</Text>
        </View>
      </View>
      {/* <Text style={{ color: 'white', paddingRight: 10, paddingLeft: 10 }}>{space.description}</Text> */}
    </View>
  );
};

export default Stats;
