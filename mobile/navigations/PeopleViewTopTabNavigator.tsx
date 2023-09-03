import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import FastImage from 'react-native-fast-image';
import backendAPI from '../apis/backend';

const PeopleViewTopTabNavigator = () => {
  const { spaceAndUserRelationship, navigation, space, hasSpaceBeenFetched, setHasSpaceBeenFetched } =
    useContext(SpaceRootContext);
  const [people, setPeople] = useState([]);
  const [havePeopleBeenFetched, setHavePeopleBeenFetched] = useState(false);

  const getPeopleBySpaceId = async () => {
    const result = await backendAPI.get(`/spaces/${spaceAndUserRelationship.space._id}/people`);
    const { people } = result.data;
    setPeople(people);
    setHavePeopleBeenFetched(true);
  };

  useEffect(() => {
    getMembersBySpaceId();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text>PeopleViewTopTabNav</Text>
    </View>
  );
};

export default PeopleViewTopTabNavigator;
