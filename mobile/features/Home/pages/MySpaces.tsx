import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GlobalContext from '../../../contexts/GlobalContext';
import { primaryBackgroundColor } from '../../../themes/color';
import { primaryTextColor } from '../../../themes/text';
import { icons } from '../../../utils/icons';
import { NavigationProp } from '@react-navigation/native';
import AuthButtons from '../components/AuthButtons';
import Button from '../../../components/Button/Button';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
// homeは、authされている状態、されていない状態でrenderを分けなきゃいけない。
// authなら、自分が参加しているlibraryを全部renderするし、authじゃないならlogin or signupを表示する感じ。
const MySpaces: React.FC<RouterProps> = (props) => {
  const { globalState } = useContext(GlobalContext);

  if (globalState.authData) {
    return (
      <View>
        <Text style={{ color: primaryTextColor }}>You are logged in now.</Text>
      </View>
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