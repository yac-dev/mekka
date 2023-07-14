import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { HomeContext } from '../contexts/HomeContext';
import { primaryBackgroundColor } from '../../../themes/color';
import { primaryTextColor } from '../../../themes/text';
import { icons } from '../../../utils/icons';
import { NavigationProp } from '@react-navigation/native';
import AuthButtons from '../components/AuthButtons';
import Button from '../../../components/Button/Button';
import Spaces from '../components/Spaces';
import backendAPI from '../../../apis/backend';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

type SpaceType = {
  _id: string;
  name: string;
  icon: string;
  isPublic: boolean;
};

type SpaceAndMeRelationshipType = {
  _id: string;
  space: SpaceType;
  user: string;
  createdAt: Date;
};

// homeは、authされている状態、されていない状態でrenderを分けなきゃいけない。
// authなら、自分が参加しているlibraryを全部renderするし、authじゃないならlogin or signupを表示する感じ。
const MySpaces: React.FC<RouterProps> = (props) => {
  const { globalState } = useContext(GlobalContext);
  const [spaceAndMeRelationships, setSpaceAndMeRelationships] = useState<SpaceAndMeRelationshipType[]>([]); //　[{name: 'Mario room', icon: 'https://mekka-dev...', isPublic: true}]
  console.log(spaceAndMeRelationships);
  const getMySpaces = async () => {
    const result = await backendAPI.get(`/spaceanduserrelationships/users/${globalState.authData._id}`);
    const { spaceAndUserRelationships } = result.data;
    setSpaceAndMeRelationships(spaceAndUserRelationships);
  };
  useEffect(() => {
    if (globalState.authData) {
      getMySpaces();
    }
  }, [globalState.authData]);

  if (globalState.authData) {
    return (
      <HomeContext.Provider value={{ spaceAndMeRelationships, setSpaceAndMeRelationships }}>
        <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, padding: 10 }}>
          <Spaces />
        </View>
      </HomeContext.Provider>
    );
  } else {
    return (
      <View
        style={{ flex: 1, backgroundColor: primaryBackgroundColor, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ color: primaryTextColor, fontSize: 18 }}>Sign in to experience full functions😎</Text>
        <View style={{ flexDirection: 'row' }}>
          <Button buttonLabel='Login' buttonColor='blue' onButtonPress={() => console.log('login')} />
          <Button buttonLabel='Signup' buttonColor='blue' onButtonPress={() => props.navigation.navigate('Signup')} />
        </View>
      </View>
    );
  }
};

export default MySpaces;
