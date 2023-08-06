import React, { useReducer, useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { primaryBackgroundColor, inputBackgroundColor, modalBackgroundColor } from '../../../themes/color';
import { primaryTextColor, placeholderTextColor } from '../../../themes/text';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import backendAPI from '../../../apis/backend';
import Form from '../components/Form';
import { NavigationProp, RouteProp } from '@react-navigation/native';

type StickerType = {
  name: string;
  url: string;
};

type ReactionType = {
  type: 'emoji' | 'sticker';
  emoji: string;
  sticker: StickerType | undefined;
};

type FormDataStateType = {
  name: string;
  icon: string;
  contentType: string;
  isPublic: boolean | undefined;
  isCommentAvailable: boolean | undefined;
  isReactionAvailable: boolean | undefined;
  videoLength: number;
  stay: string;
  reactions: ReactionType[];
};

type RouterProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
};

const CreateNewSpace: React.FC<RouterProps> = (props) => {
  const { authData } = useContext(GlobalContext);
  const [formData, setFormData] = useState<FormDataStateType>({
    name: '',
    icon: '',
    contentType: '', // ここら辺は、全部選択式になる。
    isPublic: undefined,
    isCommentAvailable: undefined,
    isReactionAvailable: undefined,
    videoLength: 60,
    stay: '',
    reactions: [],
  });
  const [validation, setValidation] = useState({
    name: false,
    icon: false,
    contentType: false,
    isPublic: false,
    isCommentAvailable: false,
    reactions: false,
    videoLength: false,
    stay: false,
  });
  // objectのvalueが全部trueかをチェックするだけね。

  const validateForm = useCallback(() => {
    const bools = Object.values(validation);
    for (let bool of bools) {
      if (!bool) {
        return false;
      }
    }
    return true;
  }, [validation]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={false}>
          <Text
            style={{
              color: validateForm() ? 'white' : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData]);

  const onDonePress = async () => {
    // const payload = {
    //   name: formData.name,
    //   // icon: formData.icon,
    //   contentType: formData.contentType,
    //   isPublic: formData.isPublic,
    //   isCommentAvailable: formData.isCommentAvailable,
    //   isReactionAvailable: formData.isReactionAvailable,
    //   createdBy: authData._id,
    //   reactions: formData.reactions,
    //   tags: formData.tags,
    // };
    // console.log(payload);
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('contentType', formData.contentType);
    payload.append('isPublic', formData.isPublic.toString());
    payload.append('isCommentAvailable', formData.isCommentAvailable.toString());
    payload.append('isReactionAvailable', formData.isReactionAvailable.toString());
    payload.append('reactions', JSON.stringify(formData.reactions));
    payload.append('videoLength', formData.videoLength.toString());
    payload.append('createdBy', authData._id);
    const iconData = {
      name: `64ab71ebc5bab81dcfe7d2fd-${new Date()}`,
      uri: formData.icon,
      type: 'image/jpeg',
    };

    payload.append('icon', JSON.parse(JSON.stringify(iconData)));
    const result = await backendAPI.post('/spaces', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  };

  return (
    <CreateNewSpaceContext.Provider
      value={{ formData, setFormData, validation, setValidation, navigation: props.navigation, route: props.route }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
          <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Create new Space
            </Text>
            <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
              The space is where you and your friends get together and share photos/videos. {'\n'}Make yours and start
              sharing.
            </Text>
          </View>
          <Form />
        </View>
      </SafeAreaView>
    </CreateNewSpaceContext.Provider>
  );
};

export default CreateNewSpace;
