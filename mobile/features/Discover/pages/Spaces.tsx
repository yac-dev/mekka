import React, { useReducer, useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import { primaryBackgroundColor } from '../../../themes/color';
import { primaryTextColor } from '../../../themes/text';
import CreateNewButton from '../components/CreateNewButton';
import { SpacesContext } from '../contexts/SpacesContext';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

type SpaceType = {
  name: string;
  contentType: string;
};

// client上では,mekkaとかそういう表現を使うことにする。
const Spaces: React.FC<RouterProps> = (props) => {
  const [spaces, setSpaces] = useState<SpaceType[]>([]);
  const [areSpacesFetched, setAreSpacesFetched] = useState(false);

  const onButtonPress = () => {
    props.navigation.navigate('Create new space');
  };

  const getSpaces = async () => {
    const result = await backendAPI.get('/spaces');
    const { spaces } = result.data;
    setSpaces(spaces);
  };
  useEffect(() => {
    getSpaces();
  }, []);

  return (
    <SpacesContext.Provider value={{ spaces, setSpaces }}>
      <View
        style={{ flex: 1, backgroundColor: primaryBackgroundColor, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ color: primaryTextColor }}>Mekkas</Text>
        <CreateNewButton onButtonPress={onButtonPress} />
      </View>
    </SpacesContext.Provider>
  );
};

export default Spaces;
